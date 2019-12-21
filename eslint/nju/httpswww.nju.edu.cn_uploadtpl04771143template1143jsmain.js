$(function(){
	/*主大图切换*/
	$(".mbanner .focus").sudyfocus({      
		p:2,
		zWidth:1145,
		zHeight:406,
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
		zWidth:700,
		zHeight:413,
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

    //弹窗
    var p_width=$(window).width();
    if(p_width>959){
        $(".post-10").mouseenter(function(event){
            $(".panel-14").stop(true,true).slideDown(300);
        });
        $(".post-10").mouseleave(function(event){
            $(".panel-14").stop(true,true).slideUp(200);
        });
    }else{
        $(".panel-14").hide();
    }

    if(p_width>959){
        $(".post-11").mouseenter(function(event){
            event.preventDefault();
            $(".panel-15").stop(true,true).slideDown(300);
        });
        $(".post-11").mouseleave(function(event){
            $(".panel-15").stop(true,true).slideUp(200);
        });
    }

    if(p_width>959){
        $(".post-12").mouseenter(function(event){
            event.preventDefault();
            $(".panel-16").stop(true,true).slideDown(300);
        });
        $(".post-12").mouseleave(function(event){
            $(".panel-16").stop(true,true).slideUp(200);
        });
    }

    if(p_width>959){
        $(".post-13").mouseenter(function(event){
            event.preventDefault();
            $(".panel-19").stop(true,true).slideDown(300);
        });
        $(".post-13").mouseleave(function(event){
            $(".panel-19").stop(true,true).slideUp(200);
        });
    }

    //悬浮
    /*
    $(".post-10 .post-title").hover(function(event){
        $(".panel-14").show();
    },function(event){
            $(".panel-14").hide();
        }
    );
    /*友情链接下拉*/
	$(".botlinks").each(function(index, el){
		$(el).find(".links-wrap").hover(function(){
			$(this).addClass('wrap-open').children('.link-items').stop(true,true).slideDown(300);
		},function(){
			$(this).removeClass('wrap-open').children('.link-items').stop(true,true).slideUp(100);
		});
	});
    //日历
    function week(){
        var d1 = new Date();
        var d2 = new Date();
        d2.setMonth(0);
        d2.setDate(1);
        var rq = d1-d2;
        var s1 = Math.ceil(rq/(24*60*60*1000));
        var s2 = Math.ceil(s1/7);
        $(".kalendar-week").html("第"+s2+"周");
    }

    function TodayInfo(start,holiday,Tomorrow) {
        var WEEKLEN = 7, // 一周7天为常量
            WEEKDAYS = ["日", "一", "二", "三", "四", "五", "六"],
            weekInfo = {"week": null, "day": null, "Hyear": null}, // 初始化返回信息，默认第null周，星期null
            oneDay = 24 * 60 * 60 * 1000, // 一天的毫秒时长
            weekLeave, 	  // 开学当天所在周剩余天数
            weekStart,	 // 开学当天start是星期几
            today, 		// 今天
            //holiday, // 放假时间
            dateDiff, // 今天与开学当天日期差
            sDate; //开学之日，日期对象
        var rDateStr = /\d{4}[\/-]\d{1,2}[\/-]\d{1,2}/g; // 简单的日期格式校验：2013/12/19
        if (!rDateStr.test(start)) {
            alert("请使用合法的开学日期！！！");
            return weekInfo;
        }
        //sDate  = new Date(start.replace("-", "/"));     // 转化开学时间
        sDate  = new Date(start.replace(/-/g, "/"));     // 转化开学时间
        hDate  = new Date(holiday.replace(/-/g, "/"));   // 转化放假时间
        TDate  = new Date(Tomorrow.replace(/-/g, "/"));  // 转化下个开学时间
        sMonth = sDate.getMonth() +1;                   // 开学所处的月份
        //console.log(sMonth);


        weekStart = sDate.getDay();                   // 计算开学是星期几
        weekStart = weekStart === 0 ? 7 : weekStart;  // JS中周日的索引为0，这里转换为7，方便计算
        weekLeave = WEEKLEN - weekStart;

        today = new Date();
        weekInfo.day = WEEKDAYS[today.getDay()];
        today = new Date(today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + today.getDate());
        dateDiff = today - sDate;
        dateDiffs = today - hDate;
        dateDiffss = today - TDate;
        //console.log(dateDiffss);

        dateDiff = parseInt(dateDiff / oneDay);       // 计算日期差天数
        dateDiffss = parseInt(dateDiffss / oneDay);       // 计算日期差天数
        //console.log(dateDiffss);
        weekInfo.week = Math.ceil((dateDiff - weekLeave) / WEEKLEN) + 1;
        if (dateDiffs > 0){    //  判断是否是假期
            if(sMonth > 8){   //  判断上半年还是下半年
                weekInfo.week = "寒假";
            }else{
                weekInfo.week = "暑假";
            }
        }
        /*下个开学时间*/
        if(dateDiffss >0){
            //alert();
            weekInfo.week = Math.ceil((dateDiffss - weekLeave) / WEEKLEN) + 1;
        }
        return weekInfo;
    }
    // 测试结果
    if(window.calendar_config){
        var td = TodayInfo(calendar_config[0].c1,calendar_config[0].c2,calendar_config[0].c3).week;
        if(!isNaN(td))td = '第'+td+' 周';
        $(".kalendar-week").html(td);
//var t = new Date();
//$(".kalendar-week").html(parseInt(new Date(t.getFullYear() + "/" + (t.getMonth() + 1) + "/" + t.getDate())));
    }
    //var td = TodayInfo("2017/2/20","2017/7/3","").week;
    //document.write("<span class='days'>"+td+"</span>");

    function showtime() {
        var date = new Date();
        this.year = date.getFullYear();
        this.month = date.getMonth() + 1;
        this.date = date.getDate();
        this.day = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六")[date.getDay()];
        var currentTime = "现在是:" + this.year + "年" + this.month + "月" + this.date + "日 " + this.hour + ":" + this.minute + ":" + this.second + " " +"("+ this.day+")";
        $(".kalendar-year").html(this.year+'-'+this.month+'-'+this.date);
        $(".kalendar-date").html(this.day);
    }
    //week();
    showtime();

    $(document).ready(function(){
        $(".panel-5 .menu-item.i2 .menu-link").after($(".tiaoz"));
    });
    $(document).ready(function(){
        $(".panel-5 .menu-item.i1 .menu-link").after($(".ztime"));
    });

});
