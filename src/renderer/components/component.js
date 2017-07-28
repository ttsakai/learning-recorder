import React from "react"
import ActionCreator from "../action/action.js"
import RecodeStore from "../store/recodestore.js"
import EventEmitter from "../dispatcher/eventemiter.js"
import Util from '../../common/util.js'
import { Modal,Button } from 'react-bootstrap';
import Transition from 'react-transition-group/Transition';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import CSSTransition from  'react-transition-group/CSSTransition';

let dispatcher = new EventEmitter();
let action = new ActionCreator(dispatcher);
let store = new RecodeStore(dispatcher);

class Tag extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return ( 
            <span  onClick={()=>{this.props.onClick(this.props.value)}}  className="badge badge-default" >
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
        // [TODO] statement below was in constructor. that didn't work as expected need research how counstructor and render work 
        this.dateString = Util.getDateString(Util.getDate(this.props.date))
        return ( 
            <span onClick={()=>{this.props.onClick(this.dateString)}} className="badge badge-pill badge-default"  >
                {this.dateString}
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
            <div className="input-group">
                <input type="text" value={this.state.value} onChange={this.handleChange} className="form-control" />
                <span className="input-group-btn">
                    <button onClick={this.handleClick} className="btn btn-secondary" >Add tag</button>
                </span>
            </div>
        );
     }   
};

class HistoryInput extends React.Component {
    constructor(props){
        super(props);
        this.state = {value:Util.getDateString()};

        this._handleChange = this._handleChange.bind(this);
        this._handleClick = this._handleClick.bind(this);

    }
    _handleChange(e){
        e.preventDefault();
        this.setState({value:e.target.value});
    }
    _handleClick(e){
        e.preventDefault();
        this.props.onClick(this.state.value);
        this.setState({value:Util.getDateString()});
    }
    render(){
        return (
            <div className="input-group">
                <input type="date" value={this.state.value} onChange={this._handleChange} className="form-control" />
                <span className="input-group-btn">
                    <button onClick={this._handleClick} className="btn btn-secondary" >Add History</button>
                </span>
            </div>
        );
     }   
};





class Navbar extends React.Component{
    constructor(props) {
        super(props);
    }
    render(){
        return (
            <nav className="navbar navbar-default navbar-static-top">
                <div className="navbar-header pull-left">
                    <a className="navbar-brand" href="#">{this.props.title}</a>
                </div>
                {this.props.body}
            </nav>
        )   
    }
}


class Form extends React.Component {
    constructor(props){
        super(props);
        this.state = store.formData;    
        
        this._handleChange = this._handleChange.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
        this._addTag = this._addTag.bind(this);
        this._deleteTag = this._deleteTag.bind(this);  
        this._addHistory = this._addHistory.bind(this);
        this._deleteHistory = this._deleteHistory.bind(this);
              
    }
    _handleSubmit(e) {
        e.preventDefault();
        action.saveRecode(this.state);
    }
    _handleChange(e){
        e.preventDefault();
        this.setState({value:e.target.value});
    }
    _addHistory(history){
        if ( this.state.history.indexOf(history) >= 0){
            alert(history + " is already exist.");
        }else{
            let newHist = this.state.history.concat(history).sort();
            // console.log(newHist);
            this.setState({ history: newHist });       
        }
        // console.log(history,typeof history);
    }
    _deleteHistory(history){
        this.setState({history: this.state.history.filter((v)=> { 
            return v  !== history ;
        })});
    }
    _addTag(tag){
        let tagTrimed = tag.trim();
        let flg = 0;

        if ( tagTrimed === "" || tagTrimed === "undefined"){
            return false;
        }

        this.state.tags.forEach((v,i)=>{
            if ( v.value === tagTrimed ){
                flg = 1;
            }
        });
        
        if ( flg ){
            alert(tagTrimed + " is already exist.");
        }
        else{
            this.setState((s) => ({ tags: s.tags.concat({value:tagTrimed}) }));       
        }
    }
    _deleteTag(tag){
        this.setState({tags: this.state.tags.filter((v)=> { 
            return v.value  !== tag ;
        })});
    }
    render(){   
        let tags = this.state.tags.map((x,i)=>{
            return <Tag value={x.value} key={i} onClick={this._deleteTag}/>;
        }); 
        let history = this.state.history.map((x,i)=>{
            return  <History date={x} key={i} onClick={this._deleteHistory}/>;
        }); 
        // console.log(history);
        return (
            <form onSubmit={this._handleSubmit} >
                <div className='form-group'>
                    <label>Subject</label>
                    <input type="text" className="form-control mx-sm-3"  value={this.state.value}   onChange={this._handleChange} />
                </div>
                <div className='form-group'>
                   <label>History</label>
                    <HistoryInput onClick={this._addHistory}/>
                  <div>{history}</div>
                </div>
                <div className='form-group'>
                    <label>Tags</label>
                    <TagInput onClick={this._addTag}/>
                    <div>{tags}</div>
                </div>
                <div className='form-group'>
                    <input type="submit" className="btn btn-default"  value="Save" />
                </div>                    
            </form>

        );
    }
};

class DateFilter extends React.Component{
    constructor(props){
        super(props);
    }
    render(){

    }
}

class TagFilter extends React.Component{
    constructor(props){
        super(props);
    }
    render(){

    }
}


class Modalwindow extends React.Component{
    constructor(props){
        super(props);
        this.state =  {
            isModal:false
        };
        store.on("FORMCHANGE",(err)=>{
            this.setState({isModal:true});
        });

        this._openModal = this._openModal.bind(this);
        this._closeModal = this._closeModal.bind(this);

    }
    _openModal() {
        this.setState({isModal:true});
    }
    _closeModal(){
        this.setState({isModal:false});
    }
    render(){
        return (
            <button type="button" onClick={(e)=>{
                action.setForm({});
                this._openModal();
             
                }
            }  className="btn btn-default navbar-btn pull-right" >
                <i className="fa fa-plus" aria-hidden="true" >
                    <Modal show={this.state.isModal} onHide={this._closeModal}>
                        <Modal.Header closeButton>
                            <Modal.Title></Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        {this.props.body} 
                        </Modal.Body>
                        <Modal.Footer></Modal.Footer>
                    </Modal>
                </i>
            </button>

        );
    }
}


class Recode extends React.Component{
    constructor(props){
        super(props);

    }
    render(){
        let recode = this.props.recode;
        let date = Util.getDate(recode.history[recode.history.length - 1]);
        let dateString = Util.getDateString(date);
        return ( 
                 <div className="row"> 
                    <div className="col-xs-2">
                        <span>{dateString}</span>
                    </div>
                    <div className="col-xs-6">
                        <span>{recode.value}</span>
                    </div>
                    <div className="col-xs-4">
                        <span className="text-left">
                            <div className="btn-group" role="group" aria-label="Basic example">
                                <button type="button" className="btn btn-primary btn-sm" onClick={()=>{action.setForm(recode)}}>
                                    <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                                </button>
                                <button type="button" className="btn btn-primary btn-sm" onClick={()=>{action.deleteRecode(recode)}}>
                                    <i className="fa fa-times" aria-hidden="true"></i>
                                </button>
                            </div>                        
                        </span>
                    </div>
                 </div> 
           
        );
    }
}
class DataTable extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        let recodes = this.props.recodes.map((x,i)=>{
                       return ( 
                             <CSSTransition
                                key={i}
                                classNames="fade"
                                timeout={{ enter: 500, exit: 300 }}>
                                 <Recode  recode={x} />
                              </CSSTransition>
                       )
        });
         
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-2">
                        <span>date</span>
                    </div>
                    <div className="col-xs-6">
                        <span>item</span>
                    </div>
                    <div className="col-xs-4">
                        <span>operation</span>
                    </div>
                </div>
                <TransitionGroup component="div" className="row">
                    {recodes}
                </TransitionGroup>
             </div> 
        );
    }    
}



export default class Component extends React.Component {
    constructor(props) {
        super(props);

        this.state = {recodes:store.recodes};
        store.on("CHANGE",(err)=>{
            this.setState({recodes:store.recodes});
        });
        
    }
    render(){
        let navbarBody = <Modalwindow body={<Form/>} />
        let inv = false;
        setInterval(() => {
            inv = !inv;
        }, 5000)
        return (
            
            <div>
                <Navbar title="Lerning Recorder" body={navbarBody}/>
                <DataTable recodes={this.state.recodes}/>
            </div>
        );
    }


}