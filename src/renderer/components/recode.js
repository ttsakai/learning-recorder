import React from "react"
import Icon from './icon.js';
import PropTypes from 'prop-types';
import CSSTransition from  'react-transition-group/CSSTransition';


class Btn extends React.Component{
    render(){
        const cssClass = "btn btn-line btn-primary btn-sm";
        const onClick = this.props.onClick;
        const children = this.props.children;

        return(
            <div>
                <button type="button" onClick={onClick} className={cssClass} >
                    {children}
                </button>
            </div>
        ) 
    }
}

Btn.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.element,

};


export default class Recode extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isLive : true,
            isVisible :true
        };
        this.handleClickDelete = this.handleClickDelete.bind(this);
        this.handleClickEdit = this.handleClickEdit.bind(this);
        this.setIsLiveFalse = this.setIsLiveFalse.bind(this);

    }
    handleClickDelete(){
        this.setState({isVisible : false},()=>{ 
            setTimeout(()=>{
                // action.deleteRecode(this.props.recode);
                this.props.onClickDelete(this.props.recode);
            },500);       
        });
    }
    handleClickEdit (){
        this.props.onClickEdit(this.props.recode);
        // action.setForm(this.props.recode)
    }
    setIsLiveFalse(){
         this.setState({isLive:false});
    }
    render(){
        let recode = this.props.recode;
        return recode ? (
            <CSSTransition 
                in={this.state.isVisible}
                onExited={this.setIsLiveFalse}
                timeout={500}
                classNames="fade"
            >  
                <tr className={this.state.isVisible ?  '' : 'false'}> 
                    <th scope="row">
                        <Btn onClick={this.handleClickEdit} >
                            <Icon type="edit"/>
                        </Btn>
                    </th>
                    <td>
                        <div>{recode.value}</div>    
                    </td>
                    <td>
                        <Btn onClick={this.handleClickDelete} >
                            <Icon type="delete"/>
                        </Btn>
                    </td>
                </tr>
            </CSSTransition> 
        ) : null; 
    
    }
}

Recode.propTypes = {
  onClickEdit: PropTypes.func.isRequired,
  onClickDelete: PropTypes.func.isRequired
};