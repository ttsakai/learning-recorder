import React from "react"
import Icon from './icon.js';

export default class Navbar extends React.Component{
    constructor(props) {
        super(props);
        
        this.styles = {

        }
    }
    render(){
        return (
            <div className="row">    
                {/* <nav className="navbar navbar-default navbar-static-top"> */}
                 <nav className="navbar-default navbar-static-top"> 
                    <div className="navbar-header">
                        <a className="navbar-brand" href="#" onClick={this.props.onClick}>
                            <Icon type="hamb" />
                        </a>
                        <a className="navbar-brand" href="#">{this.props.title}</a>
                        <a className="navbar-brand pull-right" href="#">
                            {this.props.body}
                        </a>
                    </div>
                </nav>
            </div>
        )   
    }
}
