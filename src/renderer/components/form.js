import Icon from './icon.js';
import React from "react"
import CSSTransition from  'react-transition-group/CSSTransition';
import TransitionGroup from 'react-transition-group/TransitionGroup';

import Util from '../../common/util.js'

class Tag extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return ( 
            <span onClick={()=>{this.props.onClick(this.props.value)}}  className="badge badge-default" >
                <Icon type="tag"/> 
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
        let dateString = Util.getDateString(Util.getDate(this.props.date))

        return ( 
            <span onClick={()=>{this.props.onClick(dateString)}} className="badge badge-pill badge-default" >
                {dateString}
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



export default class Form extends React.Component {
    constructor(props){
        super(props);
        this.state = this.props.store.formData;    
        this.action = this.props.action;

        this._handleChange = this._handleChange.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
        this._addTag = this._addTag.bind(this);
        this._deleteTag = this._deleteTag.bind(this);  
        this._addHistory = this._addHistory.bind(this);
        this._deleteHistory = this._deleteHistory.bind(this);
    }
    _handleSubmit(e) {
        e.preventDefault();
        // console.log("action.saveRecode");
        this.action.saveRecode(this.state);
    }
    _handleChange(e){
        e.preventDefault();
        this.setState({value:e.target.value});
    }
    _addHistory(history){
        if ( this.state.history.indexOf(history) >= 0){
            alert(history + " is already exist.");
        }else{
            //[TODO] sort looks wired when history deleted 
            // let newHist = this.state.history.concat(history).sort();
            let newHist = this.state.history.concat(history);
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
            return ( 
                    <CSSTransition
                        key={i}
                        classNames="fade"
                        timeout={{ enter: 500, exit: 300 }}
                    >
                         <Tag value={x.value} onClick={this._deleteTag}/> 
                    </CSSTransition>
            );
        });


        let history = this.state.history.map((x,i)=>{
            return (
                    <CSSTransition
                        key={i}
                        classNames="fade"
                        timeout={{ enter: 500, exit: 300 }}
                    >
                     <History date={x} onClick={this._deleteHistory}/>    
                    </CSSTransition>
            );
        }); 

        return (
            <form onSubmit={this._handleSubmit} >
                <div className='form-group'>
                    <label>Subject</label>
                    <input type="text" className="form-control mx-sm-3"  value={this.state.value}   onChange={this._handleChange} />
                </div>
                <div className='form-group'>
                   <label>History</label>
                　　<HistoryInput onClick={this._addHistory}/>
                      <TransitionGroup component="div" >
                     {history} 
                    </TransitionGroup>  
                </div>
                <div className='form-group'>
                    <label>Tags</label>
                    <TagInput onClick={this._addTag}/>
                    <TransitionGroup component="div" >
                      {tags}  
                    </TransitionGroup>  
                </div>
                <div className='form-group'>
                    <input type="submit" className="btn btn-default"  value="Save" />
                </div>                    
            </form>

        );
    }
};


