import React from "react";
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';


export default class Calendar extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isVisible:this.props.isVisible
        }
         this.style = {
            display:"block",
        }

    }
    componentWillReceiveProps(nextProps)
    {  
        this.setState({isVisible : nextProps.isVisible}); 
    }
    render(){
        let style = Object.assign({},this.style);
        this.style = style;
        if ( this.state.isVisible === true){
            this.style = {display:"block"};
        }else{
            this.style = {display:"none"};   
        }


        var today = new Date();
        console.log(today);
        var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);

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
                selected={today}
                disabledDays={[0,6]}
                minDate={lastWeek}
            />  
            {/* <div></div> */}
            </div> 
            
        ) ;
    }
}
