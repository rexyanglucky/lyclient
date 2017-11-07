import React from 'react';
function Clock(props){
    let children = (<div> <h1>Hello, world! </h1><h2>It is {props.date.toLocaleTimeString()}.</h2></div>);
    return children;
}
export default Clock;