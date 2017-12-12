; (function ($) {
    $.fn.slider = function (options) {
        var opts = {
            imgSrc: [],
            imgLink: [],
            speed: 500,
            delay: 4000
        };
        $.extend(opts, options);
        $(".picList").children("li").each(function () {
            var thisLi = "<li>" + $(this).html() + "</li>";
            opts.imgSrc.push(thisLi);

        });
        $(".picList").html("");
        $("<ul class=\"dots\"></ul>").appendTo(this);
        $("" + opts.imgSrc[0] + "").appendTo(".picList");
        $("" + opts.imgSrc[1] + "").appendTo(".picList");
        for (var i = 0; i < opts.imgSrc.length; i++) {
           // $("<li class=\"cIcon cIcon_bannerRound fl\"><span></span></li>").appendTo(".dots")
        };
       //$(".dots").find("li:first").addClass("aCur");

        var curIndex = 0,
			nextIndex = 1,
			timer = null,
			scrollW = $(this).width();
        var method = {
            startMove: function (flag) {
                $(".picList").find("li:first").animate({ marginLeft: -scrollW }, opts.speed);

                setTimeout(function () { $(".picList").find("li:first").remove() }, opts.speed)
                if (flag) {
                    if (curIndex < opts.imgSrc.length - 1) {
                        curIndex++;
                    } else {
                        curIndex = 0;
                    }
                    nextIndex++;
                    if (curIndex == opts.imgSrc.length - 1) {
                        nextIndex = 0;
                    };
                };
                $(".dots").find("li:eq(" + curIndex + ")").addClass("aCur").siblings().removeClass("aCur");
                $("" + opts.imgSrc[nextIndex] + "").appendTo(".picList");
            },
            autoPlay: function () {
                timer = setInterval(function () {
                    method.startMove(true);
                }, opts.delay)
            },
            stopPlay: function () {
                clearInterval(timer);
            },
            roundBindEvent: function () {
                $(".dots").find("li").live("click", function () {

                    $(".picList").find("li:last").remove();
                    $("" + opts.imgSrc[$(this).index()] + "").appendTo(".picList");

                    curIndex = $(this).index();
                    if (curIndex == opts.imgSrc.length - 1) {
                        nextIndex = 0
                    } else {
                        nextIndex = curIndex + 1;
                    }
                    method.startMove(false);

                });
            }
        };

        method.autoPlay();
        method.roundBindEvent();
        $(this).live({
            mouseover: function () {
                method.stopPlay();
            },
            mouseout: function () {
                method.autoPlay();
            }
        });
    };
})(jQuery);