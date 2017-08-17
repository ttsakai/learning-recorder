import React from "react";
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import Util from '../../common/util.js';


export default class Calendar extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isVisible:this.props.isVisible
        }
         this.style = {
            display:"block",
        }

        this.onSelectDate = this.onSelectDate.bind(this);
    }
    componentWillReceiveProps(nextProps)
    {  
        this.setState({isVisible : nextProps.isVisible}); 
    }
    onSelectDate(date){
        let tes = Util.getDateString(date);
        alert(tes,date);
        
    }
    render(){
        let style = Object.assign({},this.style);
        this.style = style;
        if ( this.state.isVisible === true){
            this.style = {display:"block"};
        }else{
            this.style = {display:"none"};   
        }


        let today = new Date();
        // console.log(today);
        let lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);

        return (
            <div className="well" style={this.style}>
             <InfiniteCalendar
                width={"100%"}
                height={600}
                displayOptions={{
                    showHeader: false,
                    shouldHeaderAnimate: false
                }}
                theme={{
                    accentColor: 'rgb(97, 97, 97)',
                    floatingNav: {
                        background: 'rgb(97, 97, 97)',
                        chevron: '#FFA726',
                        color: '#FFF',
                    },
                    headerColor: 'rgb(97, 97, 97)',
                    selectionColor: 'rgb(50, 50, 50)',
                    textColor: {
                        active: '#FFF',
                        default: '#333',
                    },
                    todayColor: '#FFA726',
                    weekdayColor: 'rgb(50, 50, 50)',
                }}
                onSelect={this.onSelectDate}
                selected={today}
                minDate={lastWeek}
            />  
            </div> 
            
        ) ;
    }
}
