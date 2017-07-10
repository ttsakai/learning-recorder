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
                orgList:[],
                list :[],
                // tags :[],
        };    
        this._getLearningData = this._getLearningData.bind(this);
        this.deleteRecode = this.deleteRecode.bind(this);
      
    }
    _getLearningData(arg){
        let val =  IpcRenderer.sendSync('mdb-select',arg);        
        this.setState({ orgList : val, list : val });        
    }
    filterList(callack){
        let filteredList = this.state.orglist.filter(callback);
        this.setState({list:filterdList});

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
    deleteRecode(id){
        let val =  IpcRenderer.sendSync('mdb-delete-recode',id); 
        this._getLearningData({});
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
                                delete={this.deleteRecode}
                                histroy={obj.history}
                        />                          
           });
        }else{
            recodes =  null;
        }         
        return (
            <div className="container">
                <table className="table table-hover " >
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