import React from 'react';

export default class Commnents  extends React.Component {
  constructor(props){
    super(props);

    this.state = { date : new Date()}; 
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(){
    this.setState( {date : new Date()});
  }
  componentDidMount(){
    //   this.timerID = setInterval(
    //       ()=>{this.tick()},1000
    //   );
  }
  componentWillUnmount(){
    //   clearInterval(this.timerID);
  }
  tick(){
      this.setState({
        date: new Date()
      });
  }
  render() {
      return (
          <div>
              <h1>{this.props.name}ComportnentTest</h1>
              <h2 onClick={this.handleClick}>{this.state.date.toLocaleTimeString()}</h2>
          </div>
      )
  }
}

