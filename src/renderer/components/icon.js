import React from "react"


export default class Icon extends React.Component{
    constructor(props){
        super(props);

        this.style ={
        };
    }
    render(){
        let styles = {};
        let classNames = "";
        
        switch(this.props.type){
            case "tag":
                classNames  = "fa fa-tag"
                break;
            case "hamb":
                classNames  = "fa fa-bars"
                styles ={
                    fontSize: "20px",
                     color:"#FFF"  
                }
                break;
            case "panel":
                classNames  = "fa fa-th-large fa-white";
                styles ={
                    fontSize: "20px",
                     color:"#FFF"  
                }
                break;
            case "calendar":
                classNames = "fa fa-calendar"
                styles ={
                    fontSize: "20px",
                     color:"#FFF"  
                }
                break;
            case "graph":
                classNames  = "fa fa-line-chart";
                styles ={
                    fontSize: "18px",
                     color:"#FFF"  
                }
                break;
            case "plus":
                classNames  = "fa fa-plus"
                styles ={
                    fontSize: "20px",
                    color:"#FFF"  
                }
                break;
            case "edit":
                classNames = "fa fa-pencil-square-o"
                break;

            case "delete":
                classNames = "fa fa-times"
                break;
                
            default:
        }
        // console.log(this.props)

        return ( 
            <i  style={styles} className={classNames} aria-hidden="true" onClick={this.props.onClick || ""} >
                {this.props.children || ""}
            </i>
            
        );
    }
}
