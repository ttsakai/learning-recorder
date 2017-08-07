import React from "react"
import Icon from './icon.js';

export default class Navbar extends React.Component{
    constructor(props) {
        super(props);
    }
    render(){
        return (
            <div className="row">    
                <nav className="navbar navbar-default navbar-static-top">
                    <div className="navbar-header pull-left">
                        <a className="navbar-brand" href="#" onClick={this.props.onClick}>
                            <Icon type="hamb" />
                        </a>
                        <a className="navbar-brand" href="#">{this.props.title}</a>
                    </div>
                    {this.props.body}
                </nav>
            </div>
        )   
    }
}
