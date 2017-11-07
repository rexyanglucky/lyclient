/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

eval("\r\n\r\n// var qs=require(\"qs\");\r\n// axios.post('https://oms.mofangge.com/Ability/index/GetAbilityPaper',\r\n//     qs.stringify({userInfo:'{\"AuthID\":\"47K41D5885D\",\"OrgID\":\"2\",\"UserID\":\"3\",\"StructureID\":\"3\"}'}),\r\n//     {headers:{'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8','Accept':'*/*'} }\r\n//\r\n// )\r\n//     .then(function (res) {\r\n//         console.log(res);\r\n//     }).catch(function(err){\r\n//     console.log(err);\r\n// })\r\n\r\n var pagetool=new PagingTool({\r\n     // url:'https://oms.mofangge.com/Ability/index/GetAbilityPaper',\r\n     url:'http://localhost:6535/Ability/index/GetAbilityPaper',\r\n     appendId:'data-warp',\r\n     pageTargetId:'page-warp',\r\n     type:'post',\r\n     pageSize:10,\r\n     loadingHtml:'',\r\n     dataCallBack:function(){console.log(11);}\r\n });\r\n pagetool.page({\r\n     currentPage:1,\r\n     userInfo:'{\"AuthID\":\"47K41D5885D\",\"OrgID\":\"2\",\"UserID\":\"3\",\"StructureID\":\"3\"}'\r\n });\r\n\r\n //\r\n // function A(){}; function B(){};\r\n // A.prototype={fun:function(){}};\r\n //\r\n // var a=new A();\r\n // console.log(a.constructor===A);\r\n // console.log(A.prototype.constructor);\r\n // console.log(A.prototype.constructor===A);\r\n // console.log(a.hasOwnProperty('constructor'));\r\n // console.log(a instanceof A);\r\n //\r\n // A.prototype=new B();\r\n // var b=new A();\r\n //\r\n // console.log(b.constructor===A);\r\n // console.log(B.prototype.constructor===A);\r\n // console.log(b.constructor.prototype.constructor===A);\r\n // console.log(b.hasOwnProperty('constructor'));\r\n // console.log(b instanceof A);\r\n // console.log(b instanceof B);\r\n //\r\n //\r\n // var b={x:4};\r\n // function fn2(o){\r\n //     this.x=o.x;\r\n // }\r\n // fn2.prototype={\r\n //     init:function(){\r\n //         return this.x;\r\n //     }\r\n // }\r\n // var fn3=new fn2({x:5});\r\n // console.log(fn3.init());\r\n // console.log(fn3.init===fn2.init);\r\n // console.log(fn3.init.call(b));\r\n // var c=fn3.init;\r\n // console.log(c());\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2pzL3Rlc3QuanM/NjRkZiJdLCJzb3VyY2VzQ29udGVudCI6WyJcclxuXHJcbi8vIHZhciBxcz1yZXF1aXJlKFwicXNcIik7XHJcbi8vIGF4aW9zLnBvc3QoJ2h0dHBzOi8vb21zLm1vZmFuZ2dlLmNvbS9BYmlsaXR5L2luZGV4L0dldEFiaWxpdHlQYXBlcicsXHJcbi8vICAgICBxcy5zdHJpbmdpZnkoe3VzZXJJbmZvOid7XCJBdXRoSURcIjpcIjQ3SzQxRDU4ODVEXCIsXCJPcmdJRFwiOlwiMlwiLFwiVXNlcklEXCI6XCIzXCIsXCJTdHJ1Y3R1cmVJRFwiOlwiM1wifSd9KSxcclxuLy8gICAgIHtoZWFkZXJzOnsnQ29udGVudC1UeXBlJzonYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkOyBjaGFyc2V0PVVURi04JywnQWNjZXB0JzonKi8qJ30gfVxyXG4vL1xyXG4vLyApXHJcbi8vICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7XHJcbi8vICAgICAgICAgY29uc29sZS5sb2cocmVzKTtcclxuLy8gICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycil7XHJcbi8vICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4vLyB9KVxyXG5cclxuIHZhciBwYWdldG9vbD1uZXcgUGFnaW5nVG9vbCh7XHJcbiAgICAgLy8gdXJsOidodHRwczovL29tcy5tb2ZhbmdnZS5jb20vQWJpbGl0eS9pbmRleC9HZXRBYmlsaXR5UGFwZXInLFxyXG4gICAgIHVybDonaHR0cDovL2xvY2FsaG9zdDo2NTM1L0FiaWxpdHkvaW5kZXgvR2V0QWJpbGl0eVBhcGVyJyxcclxuICAgICBhcHBlbmRJZDonZGF0YS13YXJwJyxcclxuICAgICBwYWdlVGFyZ2V0SWQ6J3BhZ2Utd2FycCcsXHJcbiAgICAgdHlwZToncG9zdCcsXHJcbiAgICAgcGFnZVNpemU6MTAsXHJcbiAgICAgbG9hZGluZ0h0bWw6JycsXHJcbiAgICAgZGF0YUNhbGxCYWNrOmZ1bmN0aW9uKCl7Y29uc29sZS5sb2coMTEpO31cclxuIH0pO1xyXG4gcGFnZXRvb2wucGFnZSh7XHJcbiAgICAgY3VycmVudFBhZ2U6MSxcclxuICAgICB1c2VySW5mbzone1wiQXV0aElEXCI6XCI0N0s0MUQ1ODg1RFwiLFwiT3JnSURcIjpcIjJcIixcIlVzZXJJRFwiOlwiM1wiLFwiU3RydWN0dXJlSURcIjpcIjNcIn0nXHJcbiB9KTtcclxuXHJcbiAvL1xyXG4gLy8gZnVuY3Rpb24gQSgpe307IGZ1bmN0aW9uIEIoKXt9O1xyXG4gLy8gQS5wcm90b3R5cGU9e2Z1bjpmdW5jdGlvbigpe319O1xyXG4gLy9cclxuIC8vIHZhciBhPW5ldyBBKCk7XHJcbiAvLyBjb25zb2xlLmxvZyhhLmNvbnN0cnVjdG9yPT09QSk7XHJcbiAvLyBjb25zb2xlLmxvZyhBLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcik7XHJcbiAvLyBjb25zb2xlLmxvZyhBLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcj09PUEpO1xyXG4gLy8gY29uc29sZS5sb2coYS5oYXNPd25Qcm9wZXJ0eSgnY29uc3RydWN0b3InKSk7XHJcbiAvLyBjb25zb2xlLmxvZyhhIGluc3RhbmNlb2YgQSk7XHJcbiAvL1xyXG4gLy8gQS5wcm90b3R5cGU9bmV3IEIoKTtcclxuIC8vIHZhciBiPW5ldyBBKCk7XHJcbiAvL1xyXG4gLy8gY29uc29sZS5sb2coYi5jb25zdHJ1Y3Rvcj09PUEpO1xyXG4gLy8gY29uc29sZS5sb2coQi5wcm90b3R5cGUuY29uc3RydWN0b3I9PT1BKTtcclxuIC8vIGNvbnNvbGUubG9nKGIuY29uc3RydWN0b3IucHJvdG90eXBlLmNvbnN0cnVjdG9yPT09QSk7XHJcbiAvLyBjb25zb2xlLmxvZyhiLmhhc093blByb3BlcnR5KCdjb25zdHJ1Y3RvcicpKTtcclxuIC8vIGNvbnNvbGUubG9nKGIgaW5zdGFuY2VvZiBBKTtcclxuIC8vIGNvbnNvbGUubG9nKGIgaW5zdGFuY2VvZiBCKTtcclxuIC8vXHJcbiAvL1xyXG4gLy8gdmFyIGI9e3g6NH07XHJcbiAvLyBmdW5jdGlvbiBmbjIobyl7XHJcbiAvLyAgICAgdGhpcy54PW8ueDtcclxuIC8vIH1cclxuIC8vIGZuMi5wcm90b3R5cGU9e1xyXG4gLy8gICAgIGluaXQ6ZnVuY3Rpb24oKXtcclxuIC8vICAgICAgICAgcmV0dXJuIHRoaXMueDtcclxuIC8vICAgICB9XHJcbiAvLyB9XHJcbiAvLyB2YXIgZm4zPW5ldyBmbjIoe3g6NX0pO1xyXG4gLy8gY29uc29sZS5sb2coZm4zLmluaXQoKSk7XHJcbiAvLyBjb25zb2xlLmxvZyhmbjMuaW5pdD09PWZuMi5pbml0KTtcclxuIC8vIGNvbnNvbGUubG9nKGZuMy5pbml0LmNhbGwoYikpO1xyXG4gLy8gdmFyIGM9Zm4zLmluaXQ7XHJcbiAvLyBjb25zb2xlLmxvZyhjKCkpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vanMvdGVzdC5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///0\n");

/***/ })
/******/ ]);