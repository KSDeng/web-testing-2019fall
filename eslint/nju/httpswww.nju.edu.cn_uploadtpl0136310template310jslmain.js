$(function(){
	$("body,html").click(function(){
			$(".search-window").animate({"width":"45px"});
			$(".searchbtn").stop(true,true).fadeIn();
			$(".navlist").slideUp();
				
	});
        

       $(".search-submit").click(function(event) {
		$(this).removeAttr("name");
		/* Act on the event */
		event.preventDefault();
		var val = $.trim($(".search-title").val());
		if(val!==""){
			$(".search-window").find("form").submit();
			
		}else{
			alert("请输入关键词");
		}
		return false;
	});
	
	$(".searchbtn").click(function(){
		$(this).stop(true,true).fadeOut();
		$(".search-window").stop(true,true).animate({"width":"200px"});
		return false;
	});	
	$(".search-input").click(function(){
		return false;
	});
	
	$(".navbox .wp_nav > .nav-item").each(function(index,val){
		$(this).find("a").removeAttr("title");
		var html = $(this).find(".sub-nav").html();
		$(".navlist").append("<div class='navlist-li navlist-li-"+index+"'></div>");
		$(".navlist").find(".navlist-li").eq(index).html(html);
		$(".navlist").children(".navlist-li").find("ul").remove();
	});
	$(".navlist").append("<div class='clear'></div>");

	$(".navbar .nav-item:not(.i2)").click(function(){
	  $(".navlist").slideToggle("slow");
      return false;  
	});

	/*媒体链接*/
	$(".shares .share").each(function(){
		$(this).children("a").hover(function(){
			$(this).parent().find(".con").fadeIn();			
		},function(){
			$(this).parent().find(".con").fadeOut();
		});
	});
	
   /*  $(".sudy-select").sudySelect({
		handle:".select-name",			
		selects:".select-list",		
		trigger:"click",			
		effect:"slide",					// 显示效果，支持slide(下拉)、fade(淡入)、show(即显),默认为slide(下拉)
		speed: 100,					
		dir: "down",					
		autoWidth: true					
	}); */
	
/* 	var cname = $(".Column_Anchor").text();
	$(".acon").each(function(){
		var lname = $(this).find("img").attr("title");
		if(cname == lname){
			$(this).css("display","block");
		}
	}); */
       
     $(".site-logo").parent("a").attr("href","/main.htm");
	 
	 
	 var $box = $(".jgyx").children(".box").children(".list-paddingleft-2");
	 $box.children("li").each(function(){
		var subnumm = $(this).next("ul").length;
		if(subnumm>0){
			$(this).addClass("sub");
		}
	 });
	 
	$(".sub",".jgyx").find("p").append("<div class='jt'/>");
	$(".sub",".jgyx").each(function(){
		 var _this = $(this);
		 $(this).find(".jt").click(function(){
			_this.next().slideToggle();
		 });
	});




	 var $boxs = $(".jgx").find(".b3").find(".list-paddingleft-2");
	 $boxs.children("li").each(function(){
		var subnumm = $(this).next("ul").length;
		if(subnumm>0){
			$(this).addClass("sub");
		}
	 });
	 
	$(".sub",".jgx").find("p").append("<div class='jt'/>");
	$(".sub",".jgx").each(function(){
		 var _this = $(this);
		 $(this).find(".jt").click(function(){
			_this.next().slideToggle();
		 });
	});


}); 

if($(window).width()>768){
	$(window).scroll(function(event) {
		var winTop =  $(window).scrollTop();
		var conheight = $(".wp-column-menu").height()+130;
		var bodyheight = $("body").innerHeight();
		var winheight = $(window).innerHeight();
		var offtop = $(".wp-foot-top")[0].offsetTop;
		if(winTop>=600 && winTop<=(bodyheight-conheight-240) && conheight < (offtop - winTop)){
			$(".wp-column-menu:not(.menu_yx)").css({"position":"fixed","top":"0px","marginTop":"0px"});
		}else{
			$(".wp-column-menu:not(.menu_yx)").removeAttr("style");
		}
	});
}



