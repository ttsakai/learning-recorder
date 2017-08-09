import React from "react"
import Icon from './icon.js';


export default class Recode extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isLive : true,
            isVisible :true
        };
        this._handleClickDelete = this._handleClickDelete.bind(this);
        this._handleClickEdit = this._handleClickEdit.bind(this);

    }
    _handleClickDelete(){
        this.setState({isVisible : false},()=>{ 
            setTimeout(()=>{
                action.deleteRecode(this.props.recode);
            },500);       
        });
    }
    _handleClickEdit (){
        action.setForm(this.props.recode)
    }
    render(){
        
        let recode = this.props.recode;
        // let date = Util.getDate(recode.history[recode.history.length - 1]);
        // let dateString = Util.getDateString(date);
        if ( recode !== null) {
            return  (
                <CSSTransition 
                    in={this.state.isVisible}
                    onExited={()=>{
                            this.setState({isLive:false});  
                    }}
                    timeout={500}
                    classNames="fade"
                >  
                    <tr className={this.state.isVisible ?  '' : 'false'}> 
                        <th scope="row">
                            <div>
                                <button type="button" onClick={this._handleClickEdit} className="btn btn-line btn-primary btn-sm" >
                                    <Icon type="edit"/>
                                </button>
                            </div>
                        </th>
                        <td>
                            <div>
                                {recode.value}
                            </div>    
                        </td>
                        <td>
                            <div>
                                <button type="button" onClick={this._handleClickDelete} className="btn btn-line btn-primary btn-sm" >
                                    <Icon type="delete"/>
                                </button>
                            </div>
                        </td>
                    </tr>
                </CSSTransition> 
            ); 
        }else {
            return null;
        }
    }
}
