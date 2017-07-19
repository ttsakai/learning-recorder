import React from "react"
import ActionCreator from "../action/action.js"
import RecodeStore from "../store/recodestore.js"
import EventEmitter from "../dispatcher/eventemiter.js"
import Util from '../../common/util.js'
import { Modal,Button } from 'react-bootstrap';

let dispatcher = new EventEmitter();
let action = new ActionCreator(dispatcher);
let store = new RecodeStore(dispatcher);


class Tag extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return ( 
            <span  onClick={()=>{this.props.onClick(this.props.value)}}  className="badge badge-pill badge-default" >
                <i aria-hidden="true" className="fa fa-tag" ></i>
                {" " + this.props.value}
            </span>
        );
    }
}

class History extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return ( 
            <span className="badge badge-pill badge-default"  >
                {Util.getDateString(Util.getDate(this.props.date))}
            </span>
        );
    }
}

class TagInput extends React.Component {
    constructor(props){
        super(props);
        this.state = {value:""};

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);

    }
    handleChange(e){
        e.preventDefault();
        this.setState({value:e.target.value});
    }
    handleClick(e){
        e.preventDefault();
        this.props.onClick(this.state.value);
        this.setState({value:""});
    }
    render(){
        return (
            <div>
                <input type="text" value={this.state.value} onChange={this.handleChange} className="form-control" />
                <button onClick={this.handleClick} className="btn btn-default" >Add tag</button>
            </div>
        );
     }   
};

class Form extends React.Component {
    constructor(props){
        super(props);
        this.state = this._getFormData();    

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.tagUpdate = this.tagUpdate.bind(this);
        this.tagDelete = this.tagDelete.bind(this);
        
    }
    _getFormData(){
        return store.getFormData();
    }
    handleSubmit(e) {
        e.preventDefault();
        action.recordeInsert(this.state);
        this.setState(this._getFormData());
    }
    handleChange(e){
        e.preventDefault();
        this.setState({value:e.target.value});
    }
    tagUpdate(tag){
        this.setState((s) => ({ tags: s.tags.concat({value:tag}) }));       
    }
    tagDelete(tag){
        this.setState({tags: this.state.tags.filter((v)=> { 
            return v.value  !== tag ;
        })});
    }
    render(){   
        let tags = this.state.tags.map((x,i)=>{
            return <Tag value={x.value} key={i} onClick={this.tagDelete}/>;
        }); 
        let history = this.state.history.map((x,i)=>{
            return  <History date={x} key={i}/>
        }); 
        
        return (
            <form onSubmit={this.handleSubmit} className="form-inline" >
                <div className='form-group'>
                    <label>Subject</label>
                    <input type="text" className="form-control"  value={this.state.value}   onChange={this.handleChange} />
                </div>
                <div className='form-group'>
                    <label>History</label>
                    {history}
                </div>
                <div className='form-group'>
                    <label>Tags</label>
                    <TagInput onClick={this.tagUpdate}/>
                    {tags}
                </div>
                <div className='form-group'>
                    <input type="submit" className="btn btn-default"  onSubmit={this.handleSubmit} value="Save" />
                </div>                    
            </form>

        );
    }

};




export default class Component extends React.Component {
    constructor(props) {
        super(props);

        this.state =  {
            isModal:false,
            recodes:store.getRecodes(),
        };

        store.on("CHANGE", () => {
            this._onStoreChange();
        });
        this._openModal = this._openModal.bind(this);
        this._closeModal = this._closeModal.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleHistoryInsert = this.handleHistoryInsert.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    _onStoreChange() {
        this.setState({recodes:store.getRecodes()});
    }
    _openModal(recode) {
        if ( recode !== undefined){
            this.setState({isModal:true});
        }else{
            this.setState({isModal:true});
        }
    }
    _closeModal(){
        this.setState({isModal:false});
    }
    handleClick(recode){
    }
    handleHistoryInsert(recode){
        action.recodeHistoryInsert(recode);
    }
    handleDelete(recode){
        action.recodeDelete(recode);
    }
    render(){
        return (
            <div>
            {/*<Form store={recodeStore}/>*/}
            {this.renderModal("hoge",(<Form/>),"hoge")}
            {this.renderTable()}    
            </div>
        );
    }
    renderModal(title,body,footer){
        return (
            <a href="#" className="btn btn-primary btn-xs" onClick={(e)=>{this._openModal()}}>
                <Modal show={this.state.isModal} onHide={this._closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{body}</Modal.Body>
                    <Modal.Footer>{footer}
                    </Modal.Footer>
                </Modal>
                <i className="fa fa-tags" aria-hidden="true"></i>
            </a>
        );
    }
    renderTable(){
         return (
            <div className="container">
                <table className="table table-hover " >
                    <thead className="thead-inverse">
                    {this.renderTHeader()}
                    </thead>
                    <tbody >
                    {this.renderTBody()}
                    </tbody>
                </table>
            </div>
        );
    }
    renderTHeader(){
        return (
            <tr className="row">
                <th  className="col-2">date</th>
                <th  className="col-8 text-left">item</th>
                <th  className="col-2 text-left">operation</th> 
            </tr>      
        );
    }
    renderTBody(){            
        return this.state.recodes.map((x,i)=>{
            return this.renderRecode(x,i);
        });
        
    }
    renderRecode(recode,idx){
        return ( 
            <tr className="row" key={idx}>
                <td className="">{Util.getDateString(Util.getDate(recode.history[recode.history.length - 1]))}</td>
                <td className="" >{recode.value}</td>
                {/*<td className="" onClick={()=>{this._openModal(recode)}}>{recode.value}</td>*/}
                <td className="text-left" >{this.renderOperations(recode)}</td>
            </tr>
        );
    }
    renderOperations(recode){
        return (
            <div className="text-nowrap">
                <a href="#" className="btn btn-primary btn-xs" onClick={()=>{this.handleHistoryInsert(recode)}}>
                    <i className="fa fa-check" aria-hidden="true"></i>
                </a>
                <a href="#" className="btn btn-primary btn-xs" onClick={()=>{this.handleDelete(recode)}}>
                    <i className="fa fa-times" aria-hidden="true"></i>
                </a>
            </div>
        );
    }
}