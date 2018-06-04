
var loadFlag = false;;
var PagingTool = {}
PagingTool.Init = {} //初始化参数 
PagingTool.Init.HasSlideAnimate = false;
PagingTool.funPageCallBack = function (data) {
    var pParams = data.pParams;//查询参数
    var pageCount = data.pageCount;//每页显示条目
    var totalPages = data.totalPages;//总页数
    var pageIndex = data.pParams.currentPage; // 当前页
    PagingTool.Init.PageIndex = pageIndex;
    var pageTargetId = data.pageTargetId;
    var totalCount = data.totalCount;
    var pageHtml = "";
    if (totalPages > 1) {
        var beginPage = 1, endPage = 1;

        beginPage = pageIndex < pageCount ? 1 : Math.ceil((pageIndex - pageCount / 2));
        if (beginPage == 1) {
            endPage = pageCount;
        } else {
            endPage = pageIndex + (pageCount % 2 > 0 ? Math.ceil(pageCount / 2 - 1) : Math.ceil(pageCount / 2 - 1));
        }
        if (endPage > totalPages) {
            endPage = totalPages;
            beginPage = totalPages - pageCount + 1;
            beginPage = beginPage > 0 ? beginPage : 1;
        }
        if (beginPage > 1 || pageIndex > 1) //上一页 首页
        {
            /****首页****/
            //pageHtml += '<span class="item">';
            //pParams["currentPage"] = 1;
            //pageHtml += '<a href=\"javascript:;\" onclick=\'PagingTool.Paging(' + JSON.stringify(pParams) + ')\' class=\"pageLink\"><<</a>';
            //pageHtml += '</span>';
            //pageHtml += '<span class="item">';
            /****首页****/
            pParams["currentPage"] = pageIndex - 1;
            pageHtml += '<a href=\"javascript:;\" onclick=\'PagingTool.Paging(' + JSON.stringify(pParams) + ')\' class=\"pageLink\">上一页</a>'
            //pageHtml += '</span>';
            if (beginPage > 1) {
                //pageHtml += '<span class="item">';
                pParams["currentPage"] = (pageIndex - pageCount) > 1 ? pageIndex - pageCount : 1;
                pageHtml += '<a href=\"javascript:;\" onclick=\'PagingTool.Paging(' + JSON.stringify(pParams) + ')\' class=\"pageLink\">...</a>'
                //pageHtml += '</span>';
            }
        }
        else {
            /****首页****/
            //pageHtml += '<span class="item">';
            //pageHtml += '<a href=\"javascript:;\" class=\"pageLink\"><<</a>';
            //pageHtml += '</span>';
            /****首页****/
            //pageHtml += '<span class="item">';
            pageHtml += '<a href=\"javascript:;\"  disabled="disabled" class=\"pageLink colH\">上一页</a>'
            //pageHtml += '</span>';
        }

        //中间页码
        for (var i = beginPage; i <= endPage; i++) {
            //pageHtml += '<span class="item">';
            if (pageIndex == i) {

                //pageHtml += '<a href=\"javascript:;\" class=\"cpb\"> ' + i + '</a>';
                //pageHtml += "<span class='cpb'>" + i + "</span>";
                pageHtml += '<a href=\"javascript:;\"  class=\"cur\">' + i + '</a>';

            }
            else {
                pParams["currentPage"] = i;
                pageHtml += '<a href=\"javascript:;\" onclick=\'PagingTool.Paging(' + JSON.stringify(pParams) + ')\'>' + i + '</a>';

            }
            //pageHtml += '</span>';
        }

        if (endPage < totalPages || pageIndex < totalPages) //下一页 尾页
        {
        
            if (endPage < totalPages) {
                //pageHtml += '<span class="item">';

                var tempcurrentpage = 0;
                if (pageIndex + pageCount > totalPages) {
                    //alert(pageIndex + "-----" + totalPages);
                    tempcurrentpage = totalPages;
                }
                else {
                    tempcurrentpage = pageIndex + pageCount;

                }
                pParams["currentPage"] = tempcurrentpage;
                pageHtml += '<a href=\"javascript:;\" onclick=\'PagingTool.Paging(' + JSON.stringify(pParams) + ')\' class=\"pageLink\">...</a>'
                //pageHtml += '</span>';
            }
            //pageHtml += '<span class="item">';
          
            pParams["currentPage"] = pageIndex + 1;
            pageHtml += '<a href=\"javascript:;\" onclick=\'PagingTool.Paging(' + JSON.stringify(pParams) + ')\' class=\"pageLink\">下一页</a>'
            //pageHtml += '</span>';
            /****尾页****/
            //pageHtml += '<span class="item">';
            //pParams["currentPage"] = totalPages;
            //pageHtml += '<a href=\"javascript:;\" onclick=\'PagingTool.Paging(' + JSON.stringify(pParams) + ')\' class=\"pageLink\">>></a>';
            //pageHtml += '</span>';
            /****尾页****/

        }
        else {

            //pageHtml += '<span class="item">';
            pageHtml += '<a href=\"javascript:;\" disabled="disabled" class=\"pageLink colH\">下一页</a>'
            //pageHtml += '</span>';
            //pageHtml += '<span class="item">';
            //pageHtml += '<a href=\"javascript:;\"  class=\"pageLink\">尾页</a>';
            //pageHtml += '</span>';
        }


        //}

        $("#" + pageTargetId).show();
        $("#" + pageTargetId).html(pageHtml);
    } else {
        $("#" + pageTargetId).html("");
        $("#" + pageTargetId).hide();
    }

}
/**
 * 返回当前集合中指定位置的元素
 * @method PagingTool.Paging 分页操作方法
 * @param {pParams}  查询条件  { "intUstate": 0, "currentPage": 1, "intType": 1, "PageSize": 3 }
 * @return {HTML} 返回html loadingIcon.gif
 */
PagingTool.Paging = function (pParams) {
    var funDCallBack = PagingTool.Init.DataCallBack;
    var funPCallBack = PagingTool.funPageCallBack;
    if (PagingTool.Init.PageCallBack) {
        funPCallBack = PagingTool.Init.PageCallBack;
    }
    var appendId = PagingTool.Init.AppendId;
    var targetId = PagingTool.Init.PageTargetId;
    var pageSize = PagingTool.Init.PageSize;
    var pageCount = PagingTool.Init.PageCount;
    var showHTML = PagingTool.Init.NoDataShowHTML;


    //请求参数
    if (PagingTool.Init.paramData) {
        var p = PagingTool.Init.paramData;
        //p.currentPage = pParams.currentPage;
        p.pageSize = pParams.pageSize;
        pParams = p;
    }
    if (!pParams.PageSize) {
        pParams.PageSize = pageSize;
    }
    $.ajax({
        url: PagingTool.Init.Url,
        //data: { data: JSON.stringify(pParams) },
        data: pParams,
        type: PagingTool.Init.Type,
        dataType: "json",
        beforeSend: function () {
            var isElement = document.getElementById(appendId).nodeName;
            var html = "";
            if (isElement != "TABLE" && isElement != "TBODY") {
                html = '<div id="sload" style="text-align:center; margin-top:30px;"><image src="/Content/images/loading.gif" /></div>';
            }
            else {
                html = '<tr id="sload"><td  colspan="50" style="text-align:center;"><image src="/Content/images/loading.gif" /></td></tr>';
            }
            $("#" + appendId).html(html);
        },
        complete: function () {
            $("#sload").remove();
        },
        error: function () {
            $("#sload").remove();
        },
        success: function (data) {
            var totalCount = data.TotalCount;
            if (totalCount >= 0) {
                var totalPages = parseInt((totalCount - 1) / pageSize + 1);
                var callDBackParams = { "appendId": appendId, "jsonData": data.jsonData, "totalCount": totalCount, "totalPages": totalPages, "currentPage": pParams.currentPage };
                var callPBackParams = { "pageTargetId": targetId, "pageSize": pageSize, "totalPages": totalPages, "pageCount": pageCount, "totalCount": totalCount, "pParams": pParams };
                funDCallBack(callDBackParams);//回到函数
                funPCallBack(callPBackParams);//分页控件回调函数


                if (PagingTool.Init.HasSlideAnimate) {
                    $("#" + appendId).ready(function () {
                        if (loadFlag) {
                            //$("#" + appendId + "").slideUp(100).slideDown(300);
                        }
                        loadFlag = true;
                    });
                }
            }
            else {
                var desc = showHTML();//提示没有数据
                $("#" + appendId + "").html(desc);
                $("#" + targetId + "").html("");
                if ($("#ptop") != null) {
                    $("#ptop").text("");
                }
                //没有数据 
            }

        }
    });
}

/* 方法说明 使用说明 方法 PageTargetId【分页条呈现位置ID】 AppendId【数据呈现ID】DataCallBack【数据回调函数】PageCallBack【页面呈现回调函数】
    PagingTool.Init = { "Url": "/LshSystem/User/AjaxIndex", "Type": "POST", "PageCount": 3, "PageSize": 3, "PageTargetId": "pageId", "AppendId": "appendId", "DataCallBack": funDataCallBack, "PageCallBack": PagingTool.funPageCallBack };
    PagingTool.Paging({ "intUstate": 0, "currentPage": 1, "intType": 1, "PageSize": 3 });
     //数据回调函数 页面操作逻辑
    funDataCallBack= function(data) {
        var appendId = data.appendId;
        var jsonData = data.jsonData.PageData;
        var htmlData = "";
        for (var i = 0; i < jsonData.length; i++) { //便利数据
            htmlData += "<tr id=\"Temp" + i + "\">" +
                    "<td class=\"thcenter\">" +
                      "<input type=\"checkbox\" value=\"" + jsonData[i].UAccount + "\" name=\"ckUAccount\" /></td>" +
                        "<td id=\"UAccount\">" + jsonData[i].UAccount + "</td>" +
                         "<td id=\"SFName\">" + jsonData[i].SFName + "</td> </tr>"
        }
        $("#" + appendId + "").html(htmlData);
    }
*/