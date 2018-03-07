import React, { Component } from 'react';
class Clock extends Component {
    constructor(props) {
        super(props);
        this.state = { date: new Date(), cishu: 1 };
        // this.setState({ cishu: this.state.cishu + this.props.cishu });
        this.add = this.add.bind(this);
    }
    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 1000);
        this.setState((prevState, props) => {
            return { cishu: prevState.cishu + props.cishu }
        })
    
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    tick() {
        this.setState({ date: new Date() });

    }
    add(event){
        this.setState((prevState, props) => {
            return { cishu: prevState.cishu +1 }
        })
    }
    render() {

        return (
            <div>
                <h1>Hello, world! </h1>
                <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
                {this.state.cishu}
                <input type="button" value="add" onClick={this.add}/>
            </div>
        );
    }
}

export default Clock;