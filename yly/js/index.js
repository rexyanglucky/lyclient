$(function () {
// var slider=new Slider({"warp":".nav-img","controll":".nav-img-numbox"});

    lazyLoadImg();
    function lazyLoadImg() {
        // var scrolltop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        // var clientheight = document.documentElement.clientHeight;

        // window.screenNum = (scrolltop + clientheight) / clientheight;
        window.screenNum={};
        lazyLoadImgScroll();
        window.onscroll = function (event) {

// 页可见区域宽： document.body.clientWidth;
// 网页可见区域高： document.body.clientHeight;
// 网页可见区域宽： document.body.offsetWidth (包括边线的宽);
// 网页可见区域高： document.body.offsetHeight (包括边线的宽);
// 网页正文全文宽： document.body.scrollWidth;
// 网页正文全文高： document.body.scrollHeight;
// 网页被卷去的高： document.body.scrollTop;
// 网页被卷去的左： document.body.scrollLeft;
// 网页正文部分上： window.screenTop;
// 网页正文部分左： window.screenLeft;
// 屏幕分辨率的高： window.screen.height;
// 屏幕分辨率的宽： window.screen.width;
// 屏幕可用工作区高度： window.screen.availHeight;

            lazyLoadImgScroll();

        }
    }

});
function lazyLoadImgScroll() {
    var scrolltop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    var clientheight = document.documentElement.clientHeight;
    var documentHeight=document.body.offsetHeight|| document.documentElement.offsetHeight;
    var screenNum = Math.ceil((scrolltop + clientheight) / clientheight);
    var screenNumStr="screenNum"+screenNum;
    //判断此屏是否已经加载过
    if(!window.screenNum.hasOwnProperty(screenNumStr)){
        window.screenNum[screenNumStr]=screenNum;
        $("img[data-realsrc][data-real-done!=1]").each(function (index, item) {
            var imgtop = this.offsetTop;
            var scrolltop = document.body.scrollTop;
            console.log(imgtop);
            console.log(scrolltop);
            var endpos=screenNum *clientheight>documentHeight?documentHeight:screenNum *clientheight;

            if(imgtop<=endpos&&imgtop>=endpos-clientheight-clientheight){
                $(item).attr("src", $(this).attr("data-realsrc"));
            }


        })
    }

}