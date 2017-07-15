import React from 'react';
import Util from '../../common/util.js'
import { Modal,Button } from 'react-bootstrap';


//[TODO]  separate data struture definition from components 
//        create data class 

export default class SubjectForm extends React.Component {
    constructor(props){
        super(props);
        this.state = this._getFormData();
    }
    _getFormData(){
        return this.props.store.getFormData();
    }
    handleSubmit(e) {
        e.preventDefault();
        // action.recordeInsert(this.state.value);
        // this.setState({value:""});
    }
    handleChange(e){
        e.preventDefault();
        // this.setState({value:e.target.value});
    }
    render(){       
        let tags = this.state.tags.map((x,i)=>{
            return  <span className="badge badge-pill badge-default"key={i} >
                        <i className="fa fa-tag" aria-hidden="true"></i>
                        {" " + x.value}
                    </span>;
        }); 
        let history = this.state.history.map((x,i)=>{
            return  <span className="badge badge-pill badge-default"key={i} >
                    {Util.getDateString(Util.getDate(x))}
                    </span>;
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
                </div>
                <div className='form-group'>            
                    <input type="submit" className="btn btn-default" value="submit" />
                </div>
                <input type="text" className="form-control"  value="" />
                {tags}
            </form>
        );
    }

};