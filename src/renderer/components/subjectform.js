import React from 'react';
const  IpcRenderer = require('electron').ipcRenderer;
import Util from '../../common/util.js'


//[TODO]  separate data struture definition from components 
//        create data class 

export default class SubjectForm extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {value:"",history:[Util.getDateYMD()],badges:[]};    
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleSubmit(e){
        e.preventDefault();
        let val = IpcRenderer.sendSync('mdb-insert',this.state);
        this.setState( {value:"",history:[Util.getDateYMD()],badges:[]});       
    }
    handleChange(e){
        e.preventDefault();
        this.setState({value:e.target.value});
    }
    render(){
        return (
            <div className='container'>
                <form onSubmit={this.handleSubmit} >
                    <div className='form-group row'>
                        <div className="col-8">
                            <input type="text" className="form-control" key='1' value={this.state.value}   onChange={this.handleChange} />
                        </div>
                        <div className="col-4">
                            <input type="submit" className="btn btn-default" value="submit" />
                        </div>
                    </div>
                </form>
             </div>
        );
    }
};