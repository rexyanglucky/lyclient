export default function (imgTag) {
  imgTag = imgTag || "data-realsrc";


  document.onscroll = throttle(renderRealImg, 300)
  //节流
  function throttle(callback, wait) {
    function next() {
      prev = new Date().getTime();
      callback && callback()
    }
    let prev = 0;
    let timer = null;
    return function () {
      let now = new Date().getTime();
      let remaining = wait - (now - prev);
      if (remaining > 0) {
        if (!timer) {
          timer = setTimeout(() => {
            next()
          }, remaining);
        }
      } else {
        if (timer) {
          clearTimeout(timer);
        }
        next();
      }
    }
  }
  let screenNumObj = {};
  /*  function renderRealImg() {
     let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
     //屏幕高度
     let clientHeight =document.documentElement.clientHeight;
     console.log(clientHeight);
     //文档高度
     let documentHeight=document.body.offsetHeight|| document.documentElement.offsetHeight;
     documentHeight=documentHeight<clientHeight?clientHeight:documentHeight;
     //当前在第几屏
     var screenNum = Math.ceil((scrollTop + clientHeight) / clientHeight);
     // console.log(screenNum);
     var screenNumStr="screenNum"+screenNum;
     //判断此屏是否已经加载过
     if(!screenNumObj.hasOwnProperty(screenNumStr)){
       screenNumObj[screenNumStr]=screenNum;
       const nodeList = document.querySelectorAll(`img[${imgTag}]`);
       let start=(screenNum-1)*clientHeight;
       let end=screenNum*clientHeight>documentHeight?documentHeight:screenNum*clientHeight;
       nodeList.forEach(item=>{
         let itemTop=item.offsetTop;
         let itemBottom=item.offsetHeight+itemTop;
         if((itemTop>=start&&itemTop<=end)){
           item.src=item.getAttribute(imgTag);
           item.removeAttribute(imgTag);
         }
       })
     }
    
   } */
  function renderRealImg() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    //屏幕高度
    let clientHeight = document.documentElement.clientHeight;
    console.log(clientHeight);
    //文档高度
    let documentHeight = document.body.offsetHeight || document.documentElement.offsetHeight;
    documentHeight = documentHeight < clientHeight ? clientHeight : documentHeight;
    const nodeList = document.querySelectorAll(`img[${imgTag}]`);
    let start = scrollTop;
    let end = scrollTop + clientHeight;
    nodeList.forEach(item => {
      let itemTop = item.offsetTop;
      let itemBottom = item.offsetHeight + itemTop;
      if ((itemTop >= start && itemTop <= end)||(itemBottom>=start&&itemBottom<=end)) {
        item.src = item.getAttribute(imgTag);
        item.removeAttribute(imgTag);
      }
    })


  }
  window.onload = renderRealImg();

}