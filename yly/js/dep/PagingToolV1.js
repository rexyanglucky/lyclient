/**
   * @method 分页组件
   * @param param 
            url:请求url 必填;
            appendId:数据显示位置 必填;
            pageTargetId:分页显示位置 必填;
            dataCallBack:渲染列表回调   必填;
            type:请求方式，get/post 默认post 可选;
            pageSize:每页显示条数 可选 默认10;
            pageCount:分页插件 一次显示几页;
            loadingHtml:加载中loading html 可选;
            pageCallBack:渲染分页组件 无需赋值 采用默认即可;
   * @return 
   */
var PagingTool = function (param) {
    var pthis = this;
    this.init = {};
    // param=$.extend();
    function main() {
        pthis.init.url = param.url || "";//请求url   必填
        pthis.init.appendId = param.appendId || "data-warp";//数据显示位置 必填
        pthis.init.pageTargetId = param.pageTargetId || "page-warp";//分页显示位置 必填
        pthis.init.type = param.type || "post";//请求方式，get/post 默认post 可选
        pthis.init.pageSize = param.pageSize || 10;//每页显示条数 可选 默认10
        pthis.init.loadingHtml = param.loadingHtml || "";//加载中loading html 可选
        pthis.init.pageCount = param.pageCount || 6;//分页插件 一次显示几页
        pthis.dataCallBack = param.dataCallBack || pthis.dataCallBack;//渲染列表   必填
        pthis.pageCallBack = param.pageCallBack || pthis.pageCallBack;//渲染分页组件  采用默认即可

    }

    main();


}
/**
  * @method 分页组件 跳转到指定页面
  * @param 
           paramData:请求参数
           pageSize:每页显示条数 可选;
           currentPage:跳转到第几页;
  * @return 
  */
PagingTool.prototype.page = function (paramData) {
    var pthis = this;
    var paramData = typeof (paramData) == "string" ? JSON.parse(paramData) : (paramData || {});
    //设置每页显示条数
    paramData.pageSize = paramData.pageSize || pthis.init.pageSize || 10;
    paramData.currentPage = paramData.currentPage || 1;

    $.ajax({
        url: pthis.init.url,
        data: paramData,
        type: pthis.init.type,
        dataType: "json",
        beforeSend: function (r) {//加载loading动画
            console.log(2222222);
            console.log(r.data);
            console.log(r);
            r.setRequestHeader("token","123");
            var html = "";
            if (pthis.init.loadingHtml.length > 0) {
                html = "<div id='sload'>" + loadingHtml; +"</div>";
            }
            else {
                var isElement = document.getElementById(pthis.init.appendId).nodeName;
                if (isElement != "TABLE" && isElement != "TBODY") {
                    html = '<div id="sload" style="text-align:center; margin-top:30px;"><image src="/Content/images/loading.gif" /></div>';
                }
                else {
                    html = '<tr id="sload"><td  colspan="50" style="text-align:center;"><image src="/Content/images/loading.gif" /></td></tr>';
                }
            }
            $("#" + pthis.init.appendId).html(html);
        },
        complete: function () {
            $("#sload").remove();
        },
        error: function () {
            $("#sload").remove();
        },
        success: function (data) {
            data = { "TotalCount": 1200 };
            var totalCount = data.TotalCount || 0;
            if (totalCount == 0) { return; }
            var totalPages = parseInt((totalCount - 1) / pthis.init.pageSize + 1);
            var callBackParams = { "appendId": pthis.init.appendId, "data": data, "totalCount": totalCount, "totalPages": totalPages, "currentPage": paramData.currentPage };
            pthis.dataCallBack(callBackParams);
            //显示分页控件
            if (totalPages > 1) {
                //渲染分页组件所需参数
                /*pageTargetId 分页组件渲染的位置
                 *totalPages 总页数
                 *pageCount 组件每次显示的页数
                 *paramData 请求数据参数
                 */
                var pageCallBackParams = { "pageTargetId": pthis.init.pageTargetId, "totalPages": totalPages, "pageCount": pthis.init.pageCount, "paramData": paramData };
                pthis.pageCallBack(pageCallBackParams);
            }

        }
    })
}
PagingTool.prototype.dataCallBack = function () { };
/**
 * @method 分页组件
 * @param pageTargetId 分页组件渲染的位置
          totalPages 总页数
          pageCount 组件每次显示的页数
          paramData 请求数据参数
 * @return 
 */
PagingTool.prototype.pageCallBack = function (data) {
    var pthis = this;
    var curPage = data.paramData.currentPage;
    //是否显示前面的...
    var prevPageGroup = false;
    //是否显示后面的...
    var nextPageGroup = false;
    var totalPages = data.totalPages;
    var pageCount = data.pageCount;
    var mid=pageCount / 2;
    var start = curPage*1 - mid;
    var end = curPage*1 +mid<pageCount?pageCount:curPage*1 +mid;
    if (start > 0) {
        prevPageGroup = true;
    }
    else { start = 0 }
    if (end < totalPages) {
        nextPageGroup = true;
    }
    else {
       end=totalPages;
       if(end-start<pageCount){
           start=end-pageCount;
       }
    }

    var pageCount = data.totalPages > pageCount ? pageCount : data.totalPages;
    var html = '<div class="pagetool">';
    html += '<span class="pagelink firstPage" data-page="1">首页</span>';
    html += '<span class="pagelink prevPage" data-page='+(curPage*1-1)+'>&lt;上一页</span>';
    if (prevPageGroup) {
        html += '<span class="pagelink prevPageGroup" data-page='+(curPage*1-mid)+'>...</span>';
    }
    for (var k = start; k < end; k++) {
        var cur = "";
        if (curPage == k + 1) {
            cur = "active";
        }
        html += '<span data-page=' + (k + 1) + ' class="pagelink pageNum ' + cur + '" >' + (k + 1) + '</span>'

    }
    if (nextPageGroup) {
        html += '<span class="pagelink nextPageGroup" data-page='+(curPage*1+mid)+'>...</span>';
    }
    html += '<span class="pagelink nextPage" data-page='+(curPage*1+1)+'>下一页&gt;</span>';
    html += '<span class="pagelink lastPage"  data-page='+ data.totalPages+'>尾页</span>';
    html += '<span class="pageJump">';
    html += '共<span class="totalPage">' + data.totalPages + '</span>页，';
    html += '跳转至';
    html += '<input type="number" class="pageNumInput" value="1" />';
    html += '<input type="button" class="" value="确定" />';
    html += '</span>';
    html += "</div>";
    $("#" + data.pageTargetId).html(html);
    function bindEvent() {
        $("body").off("click", ".pagetool .pagelink");
        $("body").on("click", ".pagetool .pagelink", function () {
            data.paramData.currentPage = $(this).attr("data-page");
            pthis.page(data.paramData);
        });
     
    }
    bindEvent();
};


