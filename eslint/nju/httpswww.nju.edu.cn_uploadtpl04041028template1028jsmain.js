$(function(){
	/*主大图切换*/
	$(".mbanner .focus").sudyfocus({      
		p:2,
		zWidth:1920,
		zHeight:560,
		title:{
			active: false,
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
		isNavHover: true,
		href:true,
		effect: 'fade'
	});
	
	//选项卡
	var $box = $("#tab-list1").children(".tab-con");
	$box.find(".news_list").slick();
	$('.main1 .sudy-tab').sudyTab({
			handle: ".tab-menu li",		// 控制器元素，默认为.tab-menu li
			content: ".tab-list > li",		// 内容体，可以有多个并以英文逗号隔开，如.tab-list li,.tab-more li,默认值为".tab-list li,.tab-more li"
			trigger: "mouseenter",		// 触发事件，默认为"mouseenter"鼠标经过
			start: 1,					// 开始项，默认为第一个
			autoPlay: {
				active: false,			// 是否激活自动切换
				interval: 5000,		// 自动切换时间间隔
				pauseHover: true		// 是否鼠标放上面时停止自动
			},
			callback:function(index){
				//var $tab_active=$("#tab-list1").children(".tab-con").eq(index).find(".news_list");
				$box.eq(index).find(".news_list").unslick();
				$box.eq(index).find(".news_list").slick({
						dots: false,  //指示点
						infinite: false,  //循环播放
						autoplay: false,  //自动播放
						autoplaySpeed: 5000, //自动播放间隔
						arrows: true,  //左右箭头
						useCSS: true,  //使用 CSS3 过度
						speed: 600,  //滑动时间
						slide: 'li',  //滑动元素查询
						slidesToShow: 10,  //幻灯片每屏显示个数
						slidesToScroll: 10,  //幻灯片每次滑动个数
				});
			}
	});
	//选项卡
	$('.main3 .sudy-tab').sudyTab({
			handle: ".tab-menu li",		// 控制器元素，默认为.tab-menu li
			content: ".tab-list > li",		// 内容体，可以有多个并以英文逗号隔开，如.tab-list li,.tab-more li,默认值为".tab-list li,.tab-more li"
			trigger: "mouseenter",		// 触发事件，默认为"mouseenter"鼠标经过
			start: 1,					// 开始项，默认为第一个
			autoPlay: {
				active: false,			// 是否激活自动切换
				interval: 5000,		// 自动切换时间间隔
				pauseHover: true		// 是否鼠标放上面时停止自动
			}
	});
	//选项卡
	$('.main5 .sudy-tab').sudyTab({
			handle: ".tab-menu li",		// 控制器元素，默认为.tab-menu li
			content: ".tab-list > li",		// 内容体，可以有多个并以英文逗号隔开，如.tab-list li,.tab-more li,默认值为".tab-list li,.tab-more li"
			trigger: "mouseenter",		// 触发事件，默认为"mouseenter"鼠标经过
			start: 1,					// 开始项，默认为第一个
			autoPlay: {
				active: false,			// 是否激活自动切换
				interval: 5000,		// 自动切换时间间隔
				pauseHover: true		// 是否鼠标放上面时停止自动
			}
	});

});

