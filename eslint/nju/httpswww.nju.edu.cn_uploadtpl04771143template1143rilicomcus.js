	if(!calendar114_wh){
		var calendar114_wh = [];
	}else{
		var calendar_dates = [];
		$.each(calendar114_wh,function(index,val){	
			var times = $(this)[0].date.split("-"),
			dates = times[2],
			time = times[0]+'-'+times[1];
			timess = times[1]+'.'+times[2];
			calendar_dates.push({'dates':dates,'time':time,'timess':timess});
			$.extend(true,calendar114_wh,calendar_dates);
		});
		//console.log(calendar_dates);
		calendar_wh.push.apply(calendar_wh,calendar114_wh);
		//extend(false,calendar_wh,calendar114_wh); 
	}
	
	if(!calendar_wh){var calendar_wh = [];}
	var calendar_date = [];
	if(calendar_wh.length > 0){	
		$.each(calendar_wh,function(index,val){	
			var times = $(this)[0].date.split("-"),
			dates = times[2],
			time = times[0]+'-'+times[1];
			calendar_date.push({'dates':dates,'time':time});
			$.extend(true,calendar_wh,calendar_date); 
		});
	}
	$("#calendar_wh").sudyclndr({
		json:calendar_wh,
		eventWrapDate:false,
		eventTitle:"活动",
		noShow:".rili_content",
		eventWrap:'.rili_content',
		eventTpl:'<li class="rili_news">{{ d.timess }} <a href="{{ d.url }}" target="_blank" title="{{ d.title }}">{{ d.title }}</a></li>',
		isSingle:false,
		start: calendar_config[0].c1,
		holiday: calendar_config[0].c2,
		Tomorrow: calendar_config[0].c3
	});

$("#calendar_sjb").sudyclndr({
		json:calendar_wh,
		eventWrapDate:false,
		eventTitle:"活动",
		noShow:".rili_content",
		eventWrap:'.rili_content',
		eventTpl:'<li class="rili_news">{{ d.timess }} <a href="{{ d.url }}" target="_blank" title="{{ d.title }}">{{ d.title }}</a></li>',
		isSingle:false,
		start: calendar_config[0].c1,
		holiday: calendar_config[0].c2,
		Tomorrow: calendar_config[0].c3
	});

$(function(){
	$(".search-submit").click(function(event){
		$(this).removeAttr("name");
		event.preventDefault();
		var val = $.trim($(".search-title").val());
		if(val!==""){
			$(".wp-search").find("form").submit();
		}else{
			alert("请输入关键词");
		}
		return false;
	});

	/*
	$(".wp-menu li").hover(function(){
		$(".menu-item").css("background","#473373");
		$(".menu-switch-arrow2").style.background="url(img/nav-icon2.png) no-repeat center center";
		$(".menu-link").style.color="#f00";
	});
	*/
	
	/*媒体链接*/
	$(".shares li").each(function(){
		$(this).children("a").hover(function(){
			$(this).parent().find(".con").stop(true,true).fadeIn();			
		},function(){
			$(this).parent().find(".con").stop(true,true).fadeOut();
		});
	});	
	if ($(".listl .banner").find("img").length>0) {
		$(".listl .banners").addClass("none");
	}else {
		$(".listl .banner").addClass("none");
	}
	
	$(".column-path a:last-child").css("color","#b5b5b5");
	var siteUrl = location.pathname;
	if(/xstz_3392|jstz_3393/.test(siteUrl)){
		$(".column-news-nav").remove();
	}
	
	$(".column-title2 .colum-tit11").each(function(){
		var columHref = $(this).find("a").attr("href");
		if(siteUrl == columHref){
			$(this).addClass("hover");
		};
		
	});

	/*var PageClick,currPage = $(".curr_page").text(),pageCount = $(".all_pages").text();
	PageClick = function(pageclickednumber){
		$("#wp_paging_w9").pager({ pagenumber: pageclickednumber, pagecount: pageCount, buttonClickCallback: PageClick });
		window.location.href = siteUrl.replace(/list/g, "list" + pageclickednumber).replace(/list(\d+)/g, "list" + pageclickednumber);
	}
	$("#wp_paging_w9").pager({ pagenumber:currPage, pagecount: pageCount, buttonClickCallback: PageClick });*/




	$(document).ready(function(){
		$(".panel-5 .menu-item.i2 .menu-link").after($(".tiaoz"));
	});
	$(document).ready(function(){
		$(".panel-5 .menu-item.i1 .menu-link").after($(".ztime"));
	});
	
	
	var os = function(){  
		var ua = navigator.userAgent,  
		isWindowsPhone = /(?:Windows Phone)/.test(ua),  
		isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,   
		isAndroid = /(?:Android)/.test(ua),   
		isFireFox = /(?:Firefox)/.test(ua),   
		isChrome = /(?:Chrome|CriOS)/.test(ua),  
		isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),  
		isPhone = /(?:iPhone)/.test(ua) && !isTablet,  
		isPc = !isPhone && !isAndroid && !isSymbian;  
		return {  
			isTablet: isTablet,  
			isPhone: isPhone,  
			isAndroid : isAndroid,  
			isPc : isPc  
		};  
	}();
	
	if(os.isAndroid || os.isPhone || os.isTablet){
	    scrollTable()
	}
	if(os.isPhone || os.isTablet){
		var idIframe = 'wrapperinner-iframe-t';
		$(".wp_articlecontent iframe").each(function(i, iframe){
			var idsIframe = idIframe+'-'+i;
			$wrapper = $('<div class="wrapperiframe" id="'+idsIframe+'" />');
			$(iframe).wrap($wrapper);
			var resultContentH = $(iframe).height();
			$("#"+ids).height(resultContentH+20);
		});
	}
	function scrollTable(){
		setTimeout(function(){
			var id = 'wrapperinner-tab-t';
			$(".wp_articlecontent table").each(function(i, table){
				var ids = id+'-'+i;
				$wrapper = $('<div class="wrapperinner" id="'+ids+'" />');
				$scroller = $('<div class="scroller" />');
				$(table).wrap($wrapper);
				$(table).wrap($scroller);
				
				var resultContentH = $(table).height();
				$("#"+ids).height(resultContentH+20);
				var scroller = new IScroll("#"+ids, { eventPassthrough: true, scrollX: true, scrollY: false, preventDefault: false });
				setTimeout(function(){
					scroller.refresh();
				},60);
				$(table).data("scroller", scroller);
			});
		},30);
	}
});