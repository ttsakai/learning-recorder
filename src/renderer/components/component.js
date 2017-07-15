import React from "react"
import ActionCreator from "../action/action.js"
import RecodeStore from "../store/recodestore.js"
import EventEmitter from "../dispatcher/eventemiter.js"
import Util from '../../common/util.js'
import { Modal,Button } from 'react-bootstrap';
import Form from './form.js'
// EventEmitterのインスタンスをそれぞれ渡す
let dispatcher = new EventEmitter();
let action = new ActionCreator(dispatcher);
let store = new RecodeStore(dispatcher);

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
            {this.renderModal("hoge",(<Form store={store}/>),"hoge")}
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