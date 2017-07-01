import React from 'react';
import { Modal,Button } from 'react-bootstrap';
const  IpcRenderer = require('electron').ipcRenderer;

export default class Badges extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            view:false,
            tags:[],
            tagText : ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this._openModal = this._openModal.bind(this);
        this._closeModal = this._closeModal.bind(this);        
    }
    componentDidMount(){
        let tags = IpcRenderer.sendSync('mdb-select-tag',{_id:this.props.sid});
        this.setState({tags:tags});
    }
    handleSubmit(e){
        e.preventDefault();
        let tags = IpcRenderer.sendSync('mdb-update-tag',{_id:this.props.sid,badges:{value:this.state.tagText}});
        this.setState({tagText:"",tags:tags});
        return ;
    }
    handleChange(e){
        e.preventDefault();
        this.setState({tagText:e.target.value});
    }
    _openModal() {
        this.setState({modalIsOpen : true});      
    } 
    _closeModal() {
        this.setState({modalIsOpen : false});
    }
    handleClick(tag){
        let tags = IpcRenderer.sendSync('mdb-delete-tag',{_id:this.props.sid,tag:[tag]});
        this.setState({tags:tags});
    }
    render(){
        let icon =  <i className="fa fa-tag" aria-hidden="true"></i>;
        let badges = this.state.tags.map((x,i)=>{
            return <span className="badge badge-pill badge-default"
                         key={i} 
                         onClick={()=>{this.handleClick(x)}}>
                        {icon}
                        {" "}
                        {x.value}
                    </span>;
        });

        return (
            <a href="#" className="btn btn-primary btn-xs" onClick={this._openModal}>
                <Modal show={this.state.modalIsOpen} onHide={this._closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Tag Setting</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={this.handleSubmit} className="form-inline" >
                            <div className='form-group row' >
                                <input type="text" className="form-control" key='1' value={this.state.tagText}   onChange={this.handleChange} />
                            </div>
                            <div className='form-group row'>
                                <input type="submit" className="btn btn-default" value="submit" />
                            </div>

                        </form>
                        <h4>Tags</h4>
                        <div>{badges}</div>
                        </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this._closeModal}>Close</Button>
                    </Modal.Footer>
                </Modal>
                <i className="fa fa-tags" aria-hidden="true"></i>
            </a>
            
        );
    }
}