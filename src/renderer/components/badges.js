import React from 'react';
const  IpcRenderer = require('electron').ipcRenderer;

export default class Badges extends React.Component {
    constructor(props){
        super(props);
        // this.state = {tags: [{value:"",color:""}]};
        this.state = {view:false};
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        let id = this.props.sid;
        console.log(id);
    }
    //[TODO] listen to db update async request from main prosess 
    render(){
        // let icon = this.props.icon ;
        let icon =  <i className="fa fa-tag" aria-hidden="true"></i>;
        let badges = this.props.badges.map((x,i)=>{
            return <span className="badge badge-pill badge-default" key={i} onClick={this.handleClick}>
                        {icon}
                        {" "}
                        {x.value}
                    </span>;
        });

        return (
            <div className="">{badges}</div>
        );
    }
}