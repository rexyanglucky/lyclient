$(function () {
    //行业切换效果
    $(".informationTabList li").click(function () {
        $(this).addClass("acurrent").siblings().removeClass("acurrent");
        $(this).find("i").show().parent().siblings().find("i").hide();
        var $index = $(this).index();
        $(".informationContList").eq($index).show().siblings(".informationContList").hide();
    })
    //

    //聊天问答切换效果
    $(".chatQuestTab li").click(function () {
        $(this).addClass("acurrent").siblings().removeClass("acurrent");
        $(this).find("i").addClass("iAcur").parent().siblings().find("i").removeClass("iAcur");
        var $index = $(this).index();
        $(".chatQuestCont-list").eq($index).show().siblings(".chatQuestCont-list").hide();
    })
    //调研墙选项效果
    $(".selectRound").click(function () {
        $(this).find("i").show().parents("li").siblings().find("i").hide()
    })
    //投递职位点赞效果
    $(".praiseNum i").click(function () {
        if ($(this).hasClass("praiseIconAcur")) {
            $(this).removeClass("praiseIconAcur")
        } else {
            $(this).addClass("praiseIconAcur")
        }
    })
    //城市选择效果
    $(".selectTite").click(function (e) {
        var $ul = $(this).siblings('.selectCont');
        if ($ul.is(":hidden")) {
            $ul.show();
            e.stopPropagation();
        } else {
            $ul.hide();
        }
    });
    $(document).click(function (e) {
        $(".selectCont").hide();
    });
    $(".selectCont").on('click', 'li', function () {
        var $text = $(this);
        $text.parent('ul').siblings(".selectTite").find('span').text($text.text()).data('cityid', $text.data('cityid'));
        $(".selectCont").hide();
    });
})