import React from 'react';
const  IpcRenderer = require('electron').ipcRenderer;
import Recode from './recode.js'
import Badges from './badges.js';
import Util from '../../common/util.js'
//[TODO]  separate data struture definition from components

export default class SubjectList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
                modalIsOpen: false,
                list :[],
                // tags :[],
        };    
        this._getLearningData = this._getLearningData.bind(this);
    }
    _getLearningData(arg){
        let val =  IpcRenderer.sendSync('mdb-select',arg);        
        this.setState({ list : val });        
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
    render(){

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
                                sid={obj._id}
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
            </div>
        );
    }
};