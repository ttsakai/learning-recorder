import React from 'react';
const  IpcRenderer = require('electron').ipcRenderer;

import IpcRendererWrapper from '../container/ipcrendererwrapper.js'
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
                tags :[{ value: "Loading..."}]
        };    
        this._getLearningData = this._getLearningData.bind(this);
        this._openModal = this._openModal.bind(this);
        this._closeModal = this._closeModal.bind(this);
  
   }
    _getLearningData(arg){
        let r = new IpcRendererWrapper();
        let val = r.sendSync('mdb-select',arg);
        
        let tags = [];
        val.forEach((x)=>{
            x.badges.forEach((y)=>{
                if (tags.indexOf(y) < 0 ) {
                    tags.push(y);
                }
            });
        });

        this.setState({ list : val,tags:tags });        
    }
    componentDidMount(){
        this._getLearningData({});        
        IpcRenderer.on('mdb-insert', (e, msg) => {
            this.setState(msg);  
        });
    }
    _openModal() {
        this.setState({modalIsOpen :true});
    } 
    _closeModal() {
        this.setState({modalIsOpen :false});
    }
    render(){
        let modal = <Modal show={this.state.modalIsOpen} onHide={this._closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>tags</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>tags</h4>
                    <Badges badges={this.state.tags}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this._closeModal}>Close</Button>
                </Modal.Footer>
                </Modal>;

        let recodes = "";
        if( Object.keys(this.state.list).length > 0 ) {
            recodes = Object.keys(this.state.list).map((x,i)=>{
                let obj = this.state.list[x]
                let hl = obj.history.length - 1;
                let date = new Date(obj.history[hl]);
                return  <Recode key={i}
                    type='body'
                    date={Util.getDateString(date)}
                    value={obj.value}
                    badges={obj.badges} 
                    handleClick={this._openModal}
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