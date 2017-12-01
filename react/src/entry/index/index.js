import React from 'react';
import ReactDOM from 'react-dom';
import '../../css/index.css';
import App from '@/components/App';

import registerServiceWorker from '../../registerServiceWorker';

ReactDOM.render(<App/>, document.getElementById('root'));
// registerServiceWorker();


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

