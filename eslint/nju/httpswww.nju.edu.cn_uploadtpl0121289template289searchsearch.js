$(function(){
var articleUrl = "/_wp3services/generalQuery?queryObj=articles";
var siteId =198;
//var typeid=$("#typeid").val()
var columnId = "2539"; 
var pageIndex = 1;
var keyword2="";

var rows = 20;

//获取url参数
var $_REQUEST = new Object
var searchid=document.location.search.substr(1)

var searchid2=searchid.replace(/\%20/g," ")
aParams = searchid2.split("&");

for (i = 0; i < aParams.length; i++) {
　　var aParam = aParams[i].split("=");
　　$_REQUEST[aParam[0]] = aParam[1]
}

//获取栏目ID

$(".qh").on("mouseleave",function(){
            if($(this).hasClass("selected")){
                columnId = $(this).attr("type-columnid");
				console.log(columnId);
                loadContents(pageIndex,columnId,siteId);

            }

        });
    
loadContents(pageIndex,"2539",siteId);



//检索
function loadContents(pageIndex,columnId,siteId){

    
    var returnInfos = JSON.stringify(returnData());
    var orders = JSON.stringify(orderData());
    var conditions = JSON.stringify(conditData());
                                                                      
    $.ajax({
        url: articleUrl,
        type: 'POST',
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        async: false,
        dataType: 'json',
        data: {
            siteId:siteId,
            columnId:columnId,
			conditions: conditions,
			orders: orders,
			returnInfos: returnInfos ,
			pageIndex: pageIndex,
            rows: rows
        },
        success: function(result){
            var total = result.total;
			var html='';	
            if (result != null){
                //console.log(result);
                for (j=0;j < 8; j++){
                    var art = result.data[j];
					 if((typeof(art.topImg) != 'undefined')&&(typeof(art.newImg) != 'undefined')){
						
						html +='<li class="news n'+j+' clearfix">'+
						   '<span class="news_meta post_time">'+art.publishTime+'</span>'+
						   '<span class="news_title"><a href="'+art.url+'"><span class="topImg">'+art.topImg+'</span><span class="topImg">'+art.newImg+'</span>'+art.title+'</a></span>'+
						   '</li>'						
						}else if(typeof(art.topImg) != 'undefined'){
						
						html +='<li class="news n'+j+' clearfix">'+
						   '<span class="news_meta post_time">'+art.publishTime+'</span>'+
						   '<span class="news_title"><a href="'+art.url+'"><span class="topImg">'+art.topImg+'</span>'+art.title+'</a></span>'+
						   '</li>'						
						}else if(typeof(art.newImg) != 'undefined'){
						html +='<li class="news n'+j+' clearfix">'+
							   '<span class="news_meta post_time">'+art.publishTime+'</span>'+
							   '<span class="news_title"><a href="'+art.url+'"><span class="topImg">'+art.newImg+'</span>'+art.title+'</a></span>'+
							   '</li>'
						}else{
							
						html +='<li class="news n'+j+' clearfix">'+
						   '<span class="news_meta post_time">'+art.publishTime+'</span>'+
						   '<span class="news_title"><a href="'+art.url+'">'+art.title+'</a></span>'+
						   '</li>'						
						}
					
                }
            }
			
			if(result.data.length==0){
				$(".tab-menu-con-l .tab-list li").each(function(){
					if($(this).hasClass("active")){
						$(this).find(".news_list").html("未检索到相关信息");
						}
					
					});
				 
			}else{
				$("#wp_news_w21 .news_list").html(html);
				$(".tab-menu-con-l .tab-list li").each(function(){
					if($(this).hasClass("active")){
						$(this).find(".news_list").html(html);
						}
					
					});
						 
				
           
			}
         	var total = result.total;
			var pageCount = result.pageCount;
            var pageHtml = "";
             pageHtml += ('<div class="new_pages" >');
            pageHtml += (' <ul class="wp_paging clearfix"> ');
            pageHtml += ('   <li class="pages_count"> ');
            pageHtml += ('     <span class="per_page">每页<em class="per_count">' + rows + '</em>条记录</span> ');
            pageHtml += ('     <span class="all_count">总共<em class="all_count">' + total + '</em>条记录</span> ');
            pageHtml += ('   </li> ');
            pageHtml += ('   <li class="new_page_nav">');
            pageHtml += ('     <a class="first" href="javascript:void(0);"><span>首页</span></a> ');
            pageHtml += ('     <a class="prev" href="javascript:void(0);"  ><span>上一页</span></a> ');
            pageHtml += ('     <a class="next" href="javascript:void(0);" ><span>下一页</span></a> ');
            pageHtml += ('     <a class="last" href="javascript:void(0);"><span>尾页</span></a> ');
            pageHtml += ('   </li> ');
            pageHtml += ('   <li class="new_page_jump"> ');
            pageHtml += ('     <span class="pages">页码：<em class="curr_page" curr_page="' + pageIndex + '">' + pageIndex + '</em>/<em class="all_pages" pageCount="' + pageCount + '">' + pageCount + '</em></span> ');
            pageHtml += ('     <span><input class="pageNum" type="text" /><input type="hidden" class="currPageURL" value=""></span></span> ');
            pageHtml += ('     <span><a class="new_pagingJump" href="javascript:void(0);" target="_self">跳转</a></span> ');
            pageHtml += ('   </li> ');
            pageHtml += (' </ul> ');
            pageHtml += ('</div> ');
            $("#paging").html(pageHtml);
        }
    });
}
initpageClick("#paging",columnId,siteId,rows); //跳转页面
initFirstPageClick("#paging",columnId,siteId,rows); //首页
initLastPageClick("#paging",columnId,siteId,rows); //尾页
initPrevPageClick("#paging",columnId,siteId,rows); //上一页
initNextPageClick("#paging",columnId,siteId,rows); //下一页
/*查询条件*/
function conditData(val){
    var conditdata = [
		  
    ];
    return conditdata;
}
//请求返回参数
function returnData(){
    var returnInfosdata = [
        {field: "title",pattern: [{name: "lp",value: "30"}], name: "title"},
		{field: "shortTitle", name: "shortTitle"},
		{field: "topImg", name: "topImg"},
		{field: "newImg", name: "newImg"},
		{field: "publishTime", name: "publishTime",pattern: [{name: "d",value: "yyyy-MM-dd"}],},
        {field: "f1",name: "f1"},
		{field: "f2",name: "f2"},
		{field: "f3", name: "f3"},
        {field: "f4",name: "f4"}
    ];
    return returnInfosdata;
}
//排序参数
function orderData(){
    var orderdata = [
		{field: 'publishTime', type: 'desc'},
		{field: 'top', type: 'desc'},
		{field: 'new', type: 'desc'},
    ];
    return orderdata;
}
//初始化跳转页面
function initpageClick(idTag,columnId,siteId,rows) {
    $(document).on('click', "#" + idTag + " .new_pagingJump", function(event) {
        var pageNum = $(".new_page_jump .pageNum").val();
        if (pageNum === "") {
            alert("Please enter the page number！");
            return;
        }
        var pageCount = $(".new_pages .all_pages").attr("pageCount");
        if (isNaN(pageNum) || pageNum <= 0 || pageNum > pageCount) {
            alert("Please enter the correct page number！");
            return;
        }
        loadContents(pageNum,columnId,siteId,rows);
    });
}
//初始化首页
function initFirstPageClick(idTag,columnId,siteId,rows) {
    $(document).on('click', "#" + idTag + " .new_page_nav .first", function(event) {
        loadContents(1,columnId,siteId,rows);
    });
}
//初始化尾页
function initLastPageClick(idTag,columnId,siteId,rows) {
    $(document).on('click', "#" + idTag + " .new_page_nav .last", function(event) {
        var allPages = $(".new_pages .all_pages").attr("pageCount");
        loadContents(allPages,columnId,siteId,rows);
    });
}
//初始化上一页
function initPrevPageClick(idTag,columnId,siteId,rows) {
    $(document).on('click', "#" + idTag + " .new_page_nav .prev", function(event) {
        var pageCount = $(".new_page_jump .curr_page").attr("curr_page");
        var prev = --pageCount;
        if (prev <= 0) {
            return;
        }
        loadContents(prev,columnId,siteId,rows);
    });
}
//初始化下一页
function initNextPageClick(idTag,columnId,siteId,rows) {
    $(document).on('click', "#" + idTag + " .new_page_nav .next", function(event) {
        var pageCount = $(".new_page_jump .curr_page").attr("curr_page");
        var next = ++pageCount;
        var allPages = $(".new_pages .all_pages").attr("pageCount");
        if (allPages < next) {
            return;
        }
        loadContents(next,columnId,siteId,rows);
    });
}


});