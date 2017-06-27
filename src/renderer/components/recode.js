import React from 'react';
import Badges from './badges.js';


export default class Recode extends React.Component {
    constructor(props){
        super(props);
        // this.state = {
        //     modalIsOpen: false,
        // };

    }
    render(){        
        if ( this.props.type === 'head'){
            return (
                <tr className="row">
                    <th  className="col-2">{this.props.date}</th>
                    <th  className="col-4 text-left">item</th>
                    <th  className="col-5 text-left">badges</th>
                    <th  className="col-1 text-left">operation</th> 
                </tr>      
            );
        }else if ( this.props.type ==='body'){
            return ( 
                <tr className="row">
                    <td  className="col-2 data-cell">
                        <p className="text-left" >
                        {this.props.date}
                        </p>
                    </td>
                    <td  className="col-4 data-cell">
                        <p className="text-left" >
                        {this.props.value}
                        </p>
                    </td>
                    <td className="col-5" >
                        <Badges sid={this.props.sid}/>
                    </td>
                    <td className="col-1">
                     </td>
                </tr>
                   
            );
        }
    }
}