import React from 'react';
const  IpcRenderer = require('electron').ipcRenderer;
import Recode from './recode.js'
import Badges from './badges.js';
import Util from '../../common/util.js'
import { Modal,Button } from 'react-bootstrap';
//[TODO]  separate data struture definition from components

export default class SubjectList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
                modalIsOpen: false,
                list :[],
                tags :[],
                selectedId : "",
                tagText : ""
        };    
        this._getLearningData = this._getLearningData.bind(this);
        this._getAllTags = this._getAllTags.bind(this);
        this._getTagsById = this._getTagsById.bind(this);

        this._openModal = this._openModal.bind(this);
        this._closeModal = this._closeModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    _getLearningData(arg){
        let val =  IpcRenderer.sendSync('mdb-select',arg);        
        this.setState({ list : val });        
    }
    _getTagsById(){
        let tags = IpcRenderer.sendSync('mdb-select-tag',{_id:this.state.selectedId});
        this.setState({tags:tags});
    }
    _getAllTags(){
        let tags =  IpcRenderer.sendSync('mdb-badge-select',{});        
        this.setState({tags:tags});                
    }
    componentDidMount(){
        this._getLearningData({});        
        IpcRenderer.on('mdb-insert', (e, msg) => {
            this._getLearningData({});
            //[TODO] calling _getLearningData is inefficient. 
            // edit to use msg variable.
            // this.setState(msg);  
        });
    }
    _openModal(id="") {
        this.setState({selectedId : id,modalIsOpen : true},this._getTagsById);
    } 
    _closeModal() {
        this.setState({selectedId : "",modalIsOpen : false});
    }
    handleSubmit(e){
        e.preventDefault();
        let val = IpcRenderer.sendSync('mdb-update-tag',{_id:this.state.selectedId,badges:{value:this.state.tagText}});
        this.setState({tagText:""});
        this._getTagsById()
    }
    handleChange(e){
        e.preventDefault();
        this.setState({tagText:e.target.value});
    }
    render(){
        let modal = <Modal show={this.state.modalIsOpen} onHide={this._closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Tag Setting</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={this.handleSubmit} >
                        <div className='form-group row'>
                            <input type="text" className="form-control" key='1' value={this.state.value}   onChange={this.handleChange} />
                            <input type="submit" className="btn btn-default" value="submit" />
                        </div>
                    </form>
                    <h4>Tags</h4>
                    <Badges badges={this.state.tags} sid={this.state.selectedId}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this._closeModal}>Close</Button>
                </Modal.Footer>
            </Modal>;

        let recodes = "";
        if( Object.keys(this.state.list).length > 0 ) {
            recodes = Object.keys(this.state.list).map((x,i)=>{
                let obj = this.state.list[x];
                let hl = obj.history.length - 1;
                let date = new Date(obj.history[hl]);
                return  <Recode key={i}
                                type='body'
                                date={Util.getDateString(date)}
                                value={obj.value}
                                badges={obj.badges}
                                sid={obj._id}
                                handleClick={()=>{this._openModal(obj._id)}}
                        />                          
           });
        }else{
            recodes =  null;
        }         
        return (
            <div className="container">
                <table className="table table-hover" >
                    <thead className="thead-inverse">
                        <Recode type='head' date="last-studied" />  
                    </thead>
                    <tbody >
                    {recodes}
                    </tbody>
                </table>
                {modal}
            </div>
        );
    }
};