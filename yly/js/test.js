$(function(){
// $.ajax({
//     type:"post",
//     url:"http://localhost:6535/Ability/index/GetAbilityPaper",
//     //  url:"https://oms.mofangge.com/Ability/index/GetAbilityPaper",
//     data:{
//         "userInfo":{"AuthID":"47K41D5885D","OrgID":"2","UserID":"3","StructureID":"3"}
//     },
//     success:function(data){
//         console.log(data);

//     },
//     error:function(err){
//         console.log(err);
//     }

// });


var pagetool=new PagingTool({
    url:'https://oms.mofangge.com/Ability/index/GetAbilityPaper',
    appendId:'data-warp',
    pageTargetId:'page-warp',
    type:'post',
    pageSize:10,
    loadingHtml:'',
    dataCallBack:function(){console.log(11);}
})
pagetool.page({
    currentPage:1,
    userInfo:'{"AuthID":"47K41D5885D","OrgID":"2","UserID":"3","StructureID":"3"}'
});
});
function A(){}; function B(){};
A.prototype={fun:function(){}};

var a=new A();
console.log(a.constructor===A);
console.log(A.prototype.constructor);
console.log(A.prototype.constructor===A);
console.log(a.hasOwnProperty('constructor'));
console.log(a instanceof A);

A.prototype=new B();
var b=new A();

console.log(b.constructor===A);
console.log(B.prototype.constructor===A);
console.log(b.constructor.prototype.constructor===A);
console.log(b.hasOwnProperty('constructor'));
console.log(b instanceof A);
console.log(b instanceof B);


var b={x:4};
function fn2(o){
    this.x=o.x;
}
fn2.prototype={
    init:function(){
        return this.x;
    }
}
var fn3=new fn2({x:5});
console.log(fn3.init());
console.log(fn3.init===fn2.init);
console.log(fn3.init.call(b));
var c=fn3.init;
console.log(c());
