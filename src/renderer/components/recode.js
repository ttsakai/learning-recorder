import React from 'react';
import Badges from './badges.js';
import Util from '../../common/util.js'

export default class Recode extends React.Component {
    constructor(props){
        super(props);
        //this.props.delete
    }
    render(){       

        if ( this.props.type === 'head'){
            return (
                <tr className="row">
                    <th  className="col-2">{this.props.date}</th>
                    <th  className="col-8 text-left">item</th>
                    <th  className="col-2 text-left">operation</th> 
                </tr>      
            );
        }else if ( this.props.type ==='body'){
            let color = Util.getColor(this.props.histroy); 

            return ( 
                <tr className="row">
                    <td  className="">
                        <p className="text-left" >
                        {this.props.date}
                        </p>
                    </td>
                    <td  className="">
                        <p className="text-left" style={color}>
                        {this.props.value}
                        </p>
                    </td>
                    <td className="text-left" >
                        <div className="text-nowrap">
                            <Badges sid={this.props.sid}/>
                            <a href="#" className="btn btn-primary btn-xs" onClick={()=>{this.props.delete(this.props.sid)}}>
                                <i className="fa fa-times" aria-hidden="true"></i>
                            </a>
                        </div>
                    </td>
                </tr>
                   
            );
        }
    }
}