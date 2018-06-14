

// function ap(iserr) {
//   const a = new Promise((resolve, reject) => {
//     if (iserr) {
//       console.log('ap reject')
//       reject('ap reject');
//     }
//     else {
//       //  setTimeout(() => {

//       resolve('aaa');
//       console.log('ap resolve')
//       //  }, 500);  
//     }
//   })
//   return a;
// }

// function bp(iserr) {
//   const a = new Promise((resolve, reject) => {
//     if (iserr) {
//       console.log('bp reject')
//       reject('bp');
//     }
//     else {
//       //  setTimeout(() => {
//       console.log('bp resolve')
//       resolve('bbb');
//       //  }, 500);  
//     }
//   })
//   return a;
// }
// function cp(iserr) {
//   const a = new Promise((resolve, reject) => {
//     if (iserr) {
//       console.log('cp err')
//       reject(new Error('fd'));
//       // throw 1;
//     }
//     else {
//       //  setTimeout(() => {
//       //   console.log('cp resolve')
//       resolve('ccc');
//       //  }, 500);  
//     }
//   })
//   return a;
// }



// function init() {
//   ap().then(r => console.log(r)).then(() => bp()).then(() => cp(1)).catch(err => console.log('err'));
//   // .then(cp())
// }
// init();


function taskA() {
  console.log("Task A");
  throw new Error("throw Error @ Task A")
}
function taskB() {
  console.log("Task B");
}
function onRejected(error) {
  console.log("Catch Error: A or B", error);
}
function finalTask() {
  console.log("Final Task");
}

var promise = Promise.resolve();
promise
  .then(()=>{taskA()})
  .then(taskB)
  .catch(onRejected)
  .then(finalTask);



  const axios = require('axios')

axios.get('http://api.yangliangyu.com/article/list').then(response => {
  console.log(response.data)
}).catch(err => { console.log(err.stack) })
