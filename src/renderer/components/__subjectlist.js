import React from 'react';
import Recode from './recode.js';

export default class SubjectHistryList extends React.Component {
    constructor(props){
        super(props);
        // this.handleClickAdd = this.handleClickAdd.bind(this);
        // this.handleClickRefresh = this.handleClickRefresh.bind(this);
        this.state = {list:[]};
    }
    componentWillMount(){

    }
    render(){
        return (
            <div className="container">
                <table className="table" >
                    <thead className="thead-inverse">
                       <Recode type='head' name="name" value="item"/>  
                    </thead>
                    <tbody >
                    {
                        this.state.list.map((item,i)=>{
                            return (
                                <Recode type='body' key={i} name={item} value={item}/>  
                            );
                        })
                    }
                    </tbody>
                </table>
            </div>
        );
    }


};