import React from 'react';
import IpcRendererWrapper from '../container/ipcrendererwrapper.js'
import Util from '../../common/util.js'


//[TODO]  separate data struture definition from components 
//        create data class 
//[TODO]  change list if mdb is updated is it possible to pushed from Main Process?

export default class SubjectForm extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {value:"",history:[Util.getDateYMD()],badges:[]};    
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleSubmit(e){
        e.preventDefault();
        let r = new IpcRendererWrapper();
        let val = r.sendSync('mdb-insert',this.state);
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