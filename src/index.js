import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// import Test from './test1'
// import Clock from './ClockClass'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();


// function tick() {
//     // const element=(
//     //     <div>
//     //         <h1>Hello, world!  {a} {1+1} </h1>
//     //         <h2>It is {new Date().toLocaleTimeString()}.</h2>
//     //     </div>
//     // )
//     let children = (
//         <div>
//             <Test />
//             <Clock cishu={1} />
//             <Clock cishu={2}/>
//             <Clock cishu={3} />
//             <Clock  cishu={4}/>
//         </div>
//     );
//     const element = React.createElement("div", { className: 'greeting', datak: '1' }, children);

//     ReactDOM.render(element, document.getElementById('root'));

// }
// setInterval(tick, 1000);

// let children = (
//     <div>
//         <Test />
//         <Clock cishu={1} />
//         <Clock cishu={2} />
//         <Clock cishu={3} />
//         <Clock cishu={4} />
//     </div>
// );
// const element = React.createElement("div", { className: 'greeting', datak: '1' }, children);

// ReactDOM.render(element, document.getElementById('root'));

function Life(name) {
    this.name = name;
    this.className = "earth";
}
Life.prototype.say = function () { console.log("I'm " + this.className + ";My name is " + this.name); };
function Person(name, nation) {
    Life.apply(this, [name, "person"]);
    this.Nation = nation;
};


function inherit(subType, superType) {
    function object(o) {
        function F() { };
        F.prototype = o;
        return new F();
    }
    var prototype = object(superType.prototype);
    subType.prototype = prototype;
    subType.prototype.constructor = subType;
    if (superType) Object.setPrototypeOf ? Object.setPrototypeOf(subType, superType) : subType.__proto__ = superType;
}
inherit(Person, Life);
// let a={};
// Object.getPrototypeOf(Person).call(a);
// console.log(Person.__proto__);
// console.log(a);
Person.prototype.say = function () { console.log("I'm " + this.className + " and I'm  " + this.Nation + " My name is " + this.name); }
function test(p) {
    if (p instanceof Life) {
        p.say();
    }
}
test(new Person("rex", "chinese"));

