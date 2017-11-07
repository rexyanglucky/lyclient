function Slider(param) {
    var stop = false;
    var warp = $(param.warp);
    var controll = $(param.controll);
    var imgwidth = parseInt(warp.parent().css("width").replace("px", ""));
    var imglength = warp.find("li").length - 1;
    var t = 0;
    function run() {
        runindex();
    }
    function runindex(index) {
        var oldleft = parseInt(warp.css("margin-left").replace("px", ""));
        var newleft = oldleft - imgwidth;
        if (index >= 0) {
            newleft = -imgwidth * index;
        }
        var indexcontroll = newleft / imgwidth * -1;
        if (indexcontroll > imglength - 1) { indexcontroll = 0; }
        controll.find("i").removeClass("active").eq(indexcontroll).addClass("active");
        warp.animate({ "margin-left": newleft + "px" }, 1500, "linear", function () {
            if (oldleft <= -imgwidth * (imglength - 1)) {
                newleft = 0;
                warp.css({ "margin-left": newleft + "px" });
            }
            if (!t) {
                t = setInterval(function () { run(); }, 3000);
            }
        });
    }
    function init() {
        controll.find("i").removeClass("active").eq(0).addClass("active");
        controll.on("click", "i", function () {
            var index = $(this).index();
            t = clearInterval(t);
            runindex(index);

        });
         t = setInterval(function () { run(); }, 3000);
    }
    init();


}