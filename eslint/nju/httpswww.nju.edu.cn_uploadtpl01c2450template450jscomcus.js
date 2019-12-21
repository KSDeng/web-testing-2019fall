$(function(){
	$("a[href*='http://www.nju']").each(function(){
		$(this).attr("href",$(this).attr("href").replace(/^(http:\/\/)/,"https://"));
	});

	var $menu = $(".main-menu");
	/*复制下拉*/
	$(".main-menu .wp-menu > .menu-item").each(function(index,val){
		$(this).find("a").removeAttr("title");
		var licon = $(this).html();
		var html = $(this).find(".sub-menu").html();
		$(".navlist").append("<div class='navlist-li navlist-li-"+index+"'></div>");
		var $navlistli = $(".navlist").find(".navlist-li");
		if(index==6){
			$navlistli.eq(5).html(licon);
			$navlistli.eq(5).append("<div class='subnavbg'/>");
		}else{
			$navlistli.eq(index).html(licon);
			$navlistli.eq(index).append("<div class='subnavbg'/>");
		}
		$(this).hover(function(){
			$navlistli.eq(index).parent().siblings().find(".navlist-li").removeClass("hover");
			$navlistli.eq(index).siblings().removeClass("hover");
			$navlistli.eq(index).addClass("hover");
		});
	});
	var htmls = $(".main-menu .wp-menu > .menu-item").eq(5).html();
	$(".navlist").find(".navlist-li").eq(6).html(htmls);
	$(".navlist").find(".navlist-li").eq(6).append("<div class='subnavbg'/>");
	
	var $navlistli = $(".navlist").find(".navlist-li");
	$(".main-menu .wp-menu > .menu-item").eq(6).hover(function(){
		$navlistli.eq(5).parent().siblings().find(".navlist-li").removeClass("hover");
		$navlistli.eq(5).siblings().removeClass("hover");
		$navlistli.eq(5).addClass("hover");
	});
	$(".main-menu .wp-menu > .menu-item").eq(5).hover(function(){
		$navlistli.eq(6).parent().siblings().find(".navlist-li").removeClass("hover");
		$navlistli.eq(6).siblings().removeClass("hover");
		$navlistli.eq(6).addClass("hover");
	});
	
	$(".navlist").append("<div class='bg'></div>");
	$(".navlist").append("<div class='clear'></div>");
	$(".navlist-li-0,.navlist-li-1").wrapAll("<div class='box box1'/>");
	$(".navlist-li-2,.navlist-li-3").wrapAll("<div class='box box2'/>");
	$(".navlist-li-4,.navlist-li-5").wrapAll("<div class='box box3'/>");
	$(".navlist-li-6").wrapAll("<div class='box box4'/>");
	
	
	
	/*导航hover*/
	$(".main-menu .wp-menu").hover(function(){
		$(this).parents(".main-menu").next().slideDown("slow");
	},function(){
		$(this).parents(".main-menu").next().stop(true,true).delay(200).slideUp(200);
	});
	
	$(".navlist").mouseenter(function(){
		$(this).stop(true,true).slideDown(300);
	});
	$(".navlist").mouseleave(function(){
		$(this).stop(true,true).delay(200).slideUp(200);
	});	
	
	
	
	/*$(".main-menu .menu-item").click(function(){
	   $(".navlist").slideToggle("slow");	  
       return false;  
	});

	$("body,html").click(function(){
			$(".navlist").slideUp();
	});
	
	
	
	$(".menu-item", $menu).each(function(){
		$(this).mouseenter(function() {
			$(".sub-menu", this).stop(true,true).slideDown(300);
		});
		$(this).mouseleave(function(){
			$(".sub-menu", this).stop(true,true).slideUp(200);
		});
		
	});
	
	
	$("body,html").click(function(){
			$(".search-bar").animate({"width":"50px"});
			$(".searchbtn").stop(true,true).fadeIn();		
	});*/
	
	$(".searchbtn").click(function(){
		$(this).stop(true,true).fadeOut();
		$(".search-bar").stop(true,true).animate({"width":"132px"});
		return false;
	});	
	
	$("#keyword").click(function(){
		return false;
	});
	
	$("#keyword").focus(function(event) {
		/* Act on the event */
		var val = $.trim($(this).val());
		if(val=="在此输入"){
			$(this).val("");
		}
	}).blur(function(event) {
		/* Act on the event */
		var val = $.trim($(this).val());
		if(val==""){
			$(this).val("在此输入");
		}
	});

	$("#search-submit").click(function(event) {
		/* Act on the event */
		event.preventDefault();
		var val = $.trim($("#keyword").val());
		if(val!==""&& val!=="在此输入"){
			$("#searchform").submit();
		}else{
			alert("请输入关键词");
		}
		return false;
	});
	
	
	/*媒体链接*/
	$(".shares .share").each(function(){
		$(this).children("a").hover(function(){
			$(this).parent().find(".con").stop(true,true).fadeIn();			
		},function(){
			$(this).parent().find(".con").stop(true,true).fadeOut();
		});
	});
	
	
	$(".foot-tel").each(function(index, el) {
		$(el).hover(function() {
			$(this).addClass('wrap-open').find('.telcon').stop(true,true).slideDown(300);
		}, function() {
			$(this).removeClass('wrap-open').find('.telcon').stop(true,true).slideUp(100);
		});
	});


});