import React from "react"
import ActionCreator from "../action/action.js"
import RecodeStore from "../store/recodestore.js"
import EventEmitter from "../dispatcher/eventemiter.js"
import Util from '../../common/util.js'


// EventEmitterのインスタンスをそれぞれ渡す
var dispatcher = new EventEmitter();
var action = new ActionCreator(dispatcher);
var store = new RecodeStore(dispatcher);

export default class Component extends React.Component {
    constructor(props) {
        super(props);

        this.state =  {
            recodes:store.getRecodes(),
            value:""
        };

        store.on("CHANGE", () => {
            this._onChange();
        });

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);

    }
    _onChange() {
        this.setState({recodes:store.getRecodes()});
    }
    tick() {
        action.recodesChange(this.state);
    }
    handleSubmit(e) {
        e.preventDefault();
        action.recordeInsert(this.state.value);
        this.setState({value:""});
    }
    handleChange(e){
        e.preventDefault();
        this.setState({value:e.target.value});
    }
    handleUpdate(id){
        action.recodeUpdate(id);
    }
    handleDelete(id){
        action.recodeDelete(id);
    }
    render(){
        return (
            <div>
            {this.renderForm()}
            {this.renderTable()}    
            </div>
        );

    }
    renderForm(){
        return (
            <div className='container'>
                <form onSubmit={this.handleSubmit} className="form-inline" >
                    <div className='form-group'>
                        <input type="text" className="form-control" key='1' value={this.state.value}   onChange={this.handleChange} />
                    </div>
                    <div className='form-group'>            
                        <input type="submit" className="btn btn-default" value="submit" />
                    </div>
                </form>
             </div>
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
            return this.renderRecode(x._id,x.history[x.history.length -1 ],x.value,i);
        });
        
    }
    renderRecode(_id,date,value,key){
        return ( 
            <tr className="row" key={key}>
                <td className="">{date}</td>
                <td className="">{value}</td>
                <td className="text-left" >{this.renderOperations(_id)}</td>
            </tr>
        );
    }
    renderOperations(id){
        return (
            <div className="text-nowrap">
                <a href="#" className="btn btn-primary btn-xs" onClick={()=>{this.handleUpdate(id)}}>
                    <i className="fa fa-check" aria-hidden="true"></i>
                </a>
                <a href="#" className="btn btn-primary btn-xs" onClick={()=>{this.handleDelete(id)}}>
                    <i className="fa fa-times" aria-hidden="true"></i>
                </a>
            </div>

        );
    }
}