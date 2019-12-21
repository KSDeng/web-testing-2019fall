$(function(){
	/*主大图切换*/
	$(".mbanner .focus").sudyfocus({      
		p:2,
		zWidth:1400,
		zHeight:437,
		title:{
			isAutoWidth: true,
			active:true
		},
		 text:{
			 active: false,
			 isAutoHeight: false,
			 href: false
		},
		response: true,
		speed:700, 
		pagination: true,
		navigation: true,
		isNavHover: false,
		href:true,
		effect: 'fade'
	});
	/*新闻图片切换*/
	$(".post-11 .focus").sudyfocus({      
		p:11,      
		zWidth:362,      
		zHeight:253,  
		title:{        
			isAutoWidth: false,
			active:true      
		},  
		 text: {        
			 active: false,
			 isAutoHeight: false,   
			 href: false 
		},  
		response: true,     
		speed:700, 
		pagination: true,
		navigation: true,
		isNavHover: false,
		href:true,
		effect: 'fade'
	});
	/*友情链接下拉*/
	$(".botlinks").each(function(index, el){
		$(el).find(".links-wrap").hover(function(){
			$(this).addClass('wrap-open').children('.link-items').stop(true,true).slideDown(300);
		},function(){
			$(this).removeClass('wrap-open').children('.link-items').stop(true,true).slideUp(100);
		});
	});

});
