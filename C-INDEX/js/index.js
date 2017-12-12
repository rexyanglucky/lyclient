$(function () {
    //轮播效果
    $(".picList a").each(function () {
        var url = $(this).attr('href');
        var ht = $(this).html();
        if (url == '//xiaoyuan.zhaopin.com') {
            $(this).parent().html(ht);
        }
    });

    // $(".banner").slider();
    $(".dots li").live({
        mouseover: function () {
            $(this).addClass("hover");
        },
        mouseout: function () {
            $(this).removeClass("hover");
        }
    });
    //头部tab切换效果
    $(".headTab li").click(function () {
        $(this).find("a").addClass("acurrent").parent().siblings().find("a").removeClass("acurrent");
    })

    //行业切换效果
    $(".pressfesstionTabList li").click(function () {
        $(this).addClass("acurrent").siblings().removeClass("acurrent");
        $(this).find("i").show().parent().siblings().find("i").hide()
    })
    $(".directSeeding-company li:last").css("border-bottom", "none");
    $(".playback-company li:last").css("border-bottom", "none");
    $("#kxad li:first").css("padding-top", "5px");



    //今日新增职位
    $(".j_allNumBox").numScroll({
        "allNum": parseInt(217920)
    });
})
