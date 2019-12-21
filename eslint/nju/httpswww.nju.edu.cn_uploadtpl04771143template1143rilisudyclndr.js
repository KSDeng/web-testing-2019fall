(function($){
	/*
	默认配置项
	 */
	var defaultSetting = {
			dateFormat: "yyyy-MM-dd",  // 日历格式
			weeksCN: ["教学周","\u4e00","\u4e8c","\u4e09","\u56db","\u4e94","\u516d","\u65e5"], // 中文日历星期
			weeksEN: ["MON","TUE","WED","THU","FRI","SAT","SUN"], // 英文日历星期
			language:"cn", // 日历语言默认为中文
			rows: 5,  // 日历默认为6行
			eventTitle: "News Event", // 日历标题
			eventMoreUrl: 'http://www.sudytech.com',	// 日历更多链接
			eventWrap:'.event-news-list', // 用于显示事件内容的容器，如果存在，那么事件显示在此处
			eventTpl:'<div class="sudyclndr-event-news"><h2><a href="{{ d.url }}" target="_blank">{{ d.title }}</a></h2><p><span class="event-news-filed">Locale：</span>{{ d.locale }}</p><p><span class="event-news-filed">Time：</span>{{ d.time }}</p></div>',
			eventWrapDate:true,
			noShow:'',
			gotoday:false,	// 指定默认跳到哪一天
			ajaxUrl: null,	// ajax 请求地址
			ajaxData: {}, // ajax 参数
			isSingle:true,	// 当日只有一个文章时，是否点击日历当天直接访问这篇文章
			eventsSpeed:300,	// 文章拉出动画速度
			json:[],	// 前台模板构造json
			start: "2018/02/08",
			holiday: "2018/07/06",
			Tomorrow: "2018/09/17"
	};

	var Clndr = function(element, setting){
		this.element = element;
		this.setting = $.extend(true, {}, defaultSetting, setting);
		this.curday = null;
		this.events = {};
		this.setup();
	}

	// javascript模板
	if(!window.laytpl){
		;!function(){"use strict";var f,b={open:"{{",close:"}}"},c={exp:function(a){return new RegExp(a,"g")},query:function(a,c,e){var f=["#([\\s\\S])+?","([^{#}])*?"][a||0];return d((c||"")+b.open+f+b.close+(e||""))},escape:function(a){return String(a||"").replace(/&(?!#?[a-zA-Z0-9]+;)/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"&#39;").replace(/"/g,"&quot;")},error:function(a,b){var c="tpl Error：";return"object"==typeof console&&console.error(c+a+"\n"+(b||"")),c+a}},d=c.exp,e=function(a){this.tpl=a};e.pt=e.prototype,e.pt.parse=function(a,e){var f=this,g=a,h=d("^"+b.open+"#",""),i=d(b.close+"$","");a=a.replace(/[\r\t\n]/g," ").replace(d(b.open+"#"),b.open+"# ").replace(d(b.close+"}"),"} "+b.close).replace(/\\/g,"\\\\").replace(/(?="|')/g,"\\").replace(c.query(),function(a){return a=a.replace(h,"").replace(i,""),'";'+a.replace(/\\/g,"")+'; view+="'}).replace(c.query(1),function(a){var c='"+(';return a.replace(/\s/g,"")===b.open+b.close?"":(a=a.replace(d(b.open+"|"+b.close),""),/^=/.test(a)&&(a=a.replace(/^=/,""),c='"+_escape_('),c+a.replace(/\\/g,"")+')+"')}),a='"use strict";var view = "'+a+'";return view;';try{return f.cache=a=new Function("d, _escape_",a),a(e,c.escape)}catch(j){return delete f.cache,c.error(j,g)}},e.pt.render=function(a,b){var e,d=this;return a?(e=d.cache?d.cache(a,c.escape):d.parse(d.tpl,a),b?(b(e),void 0):e):c.error("no data")},f=function(a){return"string"!=typeof a?c.error("Template not found"):new e(a)},f.config=function(a){a=a||{};for(var c in a)b[c]=a[c]},f.v="1.1","function"==typeof define?define(function(){return f}):"undefined"!=typeof exports?module.exports=f:window.laytpl=f}();
	}

	/*
	初始化日历设置
	 */

	Clndr.prototype.setup = function(){
		var _this = this, el = this.element;
		if(/cn/gi.test(this.setting.language)){
			this.setting.weeks = this.setting.weeksCN;
			datesep = ["\u5e74","\u6708","\u65e5"];
		}else{
			this.setting.weeks = this.setting.weeksEN;
			datesep = [".",".",""];
		};
		var	template = '<div class="sudyclndr">'+
						'<div class="clndr-controls">'+
							'<a class="clndr-nav clndr-prev" href="javascript:void(0);"><span>上一月</span></a>'+
							'<a class="clndr-nav clndr-current" href="javascript:void(0);"><span>当前月</span></a>'+
							'<a class="clndr-nav clndr-next" href="javascript:void(0);"><span>下一月</span></a>'+
							'<div class="clndr-dates">'+
								'<a><span class="clndr-select-year"></span>'+datesep[0]+'</a>'+
								'<a><span class="clndr-select-month"></span>'+datesep[1]+'</a>'+
								//'<a><span class="clndr-select-day"></span>'+datesep[2]+'</a>'+
							'</div>'+
						'</div>'+
						'<div class="clndr-container">'+
								'<div class="clndr-days">'+
									'<table class="clndr-days-head" width="100%" cellpadding="0" cellspacing="0" border="0">'+
										'<tr class="clndr-days-week"></tr>'+
									'</table>'+
									'<table class="clndr-days-table" width="100%" cellpadding="0" cellspacing="0" border="0"></table>'+
								'</div>'+
								'<div class="clndr-events">'+
									'<div class="clndr-events-head"><a class="clndr-events-close">x</a><h3 class="clndr-events-title"></h3></div>'+
									'<ul class="clndr-events-list"></ul>'+
								'</div>'+
						'</div>'+
					  '</div>';
		$(el).html(template);
		
		$(".clndr-days-week", el).html(function(){
			var html = "";
			$.each(_this.setting.weeks, function(index, val) {
				 html += '<th style="width:'+(100/8)+'%;" class="clndr-week clndr-week-'+ index +'"><div class="week-box">'+val+'</div></th>';
			});
			return html;
		});

		this.curday = this.setting.gotoday ? this.setting.gotoday : new Date();

		if(this.setting.json.length>0){

			this.events = this.jsonToEvents(this.setting.json);
		}
		this.getEvents();
	
		$(el).on("click",".clndr-prev",function(e){
			e.preventDefault();
			_this.curday = _this.getPrevMonth(_this.Format(_this.curday)).date;
			
			var date = (_this.Format(_this.curday)).split("-"),
			dateIndex = date[0]+"-"+date[1];
			var events = _this.events[dateIndex]||{};
			_this.loadEvents(dateIndex,events);
			_this.getEvents();

		});

		$(el).on("click",".clndr-next",function(e){
			e.preventDefault();
			_this.curday = _this.getNextMonth(_this.Format(_this.curday)).date;
			var date = (_this.Format(_this.curday)).split("-"),
			dateIndex = date[0]+"-"+date[1];
			var events = _this.events[dateIndex]||{};
			_this.loadEvents(dateIndex,events);
			_this.getEvents();

		});

		$(el).on("click",".clndr-current",function(e){
			e.preventDefault();
			_this.curday = _this.getCurrentMonth(_this.Format(new Date())).date;
			var date = (_this.Format(_this.curday)).split("-"),
			dateIndex = date[0]+"-"+date[1];
			var events = _this.events[dateIndex]||{};
			_this.loadEvents(dateIndex,events);			
			_this.getEvents();
		});		
		
		$(el).on("click",".clndr-day:not('.clndr-day-w')",function(e){
			e.preventDefault();
			var datestr = $(this).find("[data-date]").attr("data-date"),
				date = datestr.split("-"),
				dateIndex = date[0]+"-"+date[1];
			_this.curday = new Date(parseInt(date[0],10),parseInt(date[1],10)-1,parseInt(date[2],10));
			_this.getEvents();
			//console.log(_this.events);
			var events = _this.events[dateIndex]||{};
				events = events[datestr]||[];
			if(_this.setting.isSingle&&events.length==1){
				window.open(events[0].url,"_blank");
			}else{
				_this.loadEvents(datestr,events);
			}
		});

		$(el).on("click",".clndr-events-close",function(e){
			e.preventDefault();
			$(".clndr-days", el).stop().animate({left:0}, _this.setting.eventsSpeed);
			$(".clndr-events", el).stop().animate({left:"100%"}, _this.setting.eventsSpeed);
		});
	};

	Clndr.prototype.jsonToEvents = function(json){
		var _this = this, el = this.element, events = {};

		if(json.length>0){

			$.each(json, function(index, val) {
				 /* iterate through array or object */
				 if(val.date){
				 	var date = val.date.split("-"),
						dateIndex = date[0]+"-"+date[1];
					if(!events[dateIndex])
						events[dateIndex] = {};

					if(!events[dateIndex][val.date])
						events[dateIndex][val.date] = [];

					events[dateIndex][val.date].push(val);
				 }
			});
		}

		return events;
	}

	Clndr.prototype.getEvents = function(){
		var _this = this, eventsIndex = this.Format(this.curday,"yyyy-MM");
		///////////////////////////////////////////////////////////////
		var events = _this.events[eventsIndex]||{};
		this.loadEvents(eventsIndex,events);
		
		if(this.setting.ajaxUrl!=null && !_this.events[eventsIndex]){

			$.ajax({
				url: this.setting.ajaxUrl,
				type: 'GET',
				dataType: 'json',
				data: $.extend(true, {}, {date: eventsIndex}, this.setting.ajaxData)
			})
			.done(function(json) {	
				_this.events[eventsIndex] = _this.jsonToEvents(json)[eventsIndex];
				_this.loadDates();
			})
			.fail(function() {
				_this.loadDates();
			});
		}else{

			this.loadDates();
		}
	
	}

	/*
	加载日期,创建日历
	 */
	Clndr.prototype.loadDates = function(){
		var _this = this, el = this.element, curmonth = this.curday, today = new Date(),
			prevmonth = this.getPrevMonth(this.Format(this.curday,"yyyy-MM-dd"));
			nextmonth = this.getNextMonth(this.Format(this.curday,"yyyy-MM-dd"));
			currentmonth = new Date(this.curday.getFullYear(),this.curday.getMonth(),1);			//获取当月第一天的日期
			lastmonth = new Date(this.curday.getFullYear(),this.curday.getMonth()+1,0);				//获取当月最后一天的日期
		var monthFirst = this.Format(currentmonth,"yyyy-MM-dd"),monthLast = this.Format(lastmonth,"yyyy-MM-dd"),weekTeaching = 0;				////////////////////////////////////
		
		var day1 = new Date(this.curday.getFullYear(),this.curday.getMonth(),0).getDay();
		//var day1 = new Date(this.curday.getFullYear(),this.curday.getMonth(),1).getDay(); ////////////////////////////////////
		var days = new Date(this.curday.getFullYear(),this.curday.getMonth()+1,0).getDate();
		$(".clndr-select-year", el).html(this.Format(this.curday,"yyyy"));
		$(".clndr-select-month", el).html(this.Format(this.curday,"MM"));
		$(".clndr-select-day", el).html(this.Format(this.curday,"dd"));

		var events = this.events[this.Format(this.curday,"yyyy-MM")] || {};

		var weekTeachingF = this.TodayInfo(monthFirst,this.setting.start,this.setting.holiday,this.setting.Tomorrow).week;
		var weekTeachingL = this.TodayInfo(monthLast,this.setting.start,this.setting.holiday,this.setting.Tomorrow).week;
		window.console && console.log("第一天:"+weekTeachingF+'================ 最后一天:'+weekTeachingL);

		if((/假/gi).test(weekTeachingF)){
			weekTeaching = weekTeachingL - 5;
		}else{
			weekTeaching = weekTeachingF;
		}
		//console.log(isNaN(weekTeaching));
		$(".clndr-days-table", el).html(function(){
			var html = "",date;
			for(var k = 0; k < _this.setting.rows; k++){
			    html += '<tr class="clndr-days-wrap clndr-days-wrap-'+ k +'">';
				
				html += '<td style="width:'+(100/8)+'%;" class="clndr-day clndr-day-w"><div class="day-box" data-week=""><div class="weeks none">'+weekTeaching+'</div></div></td>';
				weekTeaching++;
				
				for(var i =0; i < 7; i++) {
				 	 var index = k*7+i, y, m, d, n = "", c = "", t = "", note = "", noteColor = "";
				 	 if(index<day1){
				 	 	d = prevmonth.days-day1+index+1;
				 	 	c =" clndr-day-out";
				 	 	y = prevmonth.date.getFullYear();
				 	 	m = prevmonth.date.getMonth();
				 	 }else if(index>day1+days-1){
				 	 	d = index+1-day1-days;
				 	 	c =" clndr-day-out";
				 	 	y = nextmonth.date.getFullYear();
				 	 	m = nextmonth.date.getMonth();
				 	 }else{
				 	 	d = index+1-day1;
				 	 	y = _this.curday.getFullYear();
				 	 	m = _this.curday.getMonth();
				 	 	if(d==_this.curday.getDate()){
				 	 		c = " clndr-day-cur";
				 	 	}
				 	 	if(y==today.getFullYear()&&m==today.getMonth()&&d==today.getDate()){
				 	 			c = " clndr-today";
				 	 	}
				 	 }
				 	 date = _this.Format(new Date(y,m,d));
				 	 if(events[date]){
				 	 	n = " clndr-has-events";
				 	 	t = date+"\u6709"+events[date].length+"\u7bc7\u6587\u7ae0";
						$.each(events[date],function(index,val){
							if(val.note){
								//console.log(val);
								note = '<span class="day-note" >'+val.noteText+'</span>';
								if(val.noteColor !==''){
									noteColor = 'style= "color:'+val.noteColor+'"';
								}else{
									if(val.note == '节日')
									noteColor = 'style= "color:#d62c2c"';;
								}
								return false;
							}
						})
				 	 }
				 	 html += '<td style="width:'+(100/8)+'%;" class="clndr-day clndr-day-'+i+c+n+'"><div class="day-box" data-date="'+date+'"><a class="day-number" '+noteColor+' title="'+t+'">'+d+' '+note+'</a></div></td>';
				 };
				 html +='</tr>';
			};
			return html;
		});

		$(".weeks", el).each(function(){
			if(/^\d+(?=\.{0,1}\d+$|$)/.test($(this).text()) && $(this).text() !== '0'){
				$(this).show();
			}
		});
		
		var height = $(".clndr-days", el).outerHeight(),
			theight = $(".clndr-events-head", el).outerHeight();
		$(".clndr-container", el).height(height);
		$(".clndr-events-list", el).height(height-theight);
	}

	/*
	加载事件，创建事件列表
	 */
	
	Clndr.prototype.loadEvents = function(datestr, events){

		var _this = this, el = this.element,
			title = this.setting.eventTitle,
			titleUrl = $.trim(this.setting.eventMoreUrl),
			$eventWrap = $(this.setting.eventWrap);

		var date = new Date(Date.parse(datestr.replace(/-/g,"/")));

		var year = date.getFullYear(),
			month = date.getMonth()+1,
			day = date.getDate(),
			week = this.setting.weeksCN[date.getDay()];

        if($eventWrap.length > 0){
			$(this.setting.noShow).hide();
			//console.log(JSON.stringify(events) == "{}");
        	if(events.length < 1 || JSON.stringify(events) == "{}"){
        		return $eventWrap.empty().show().html('<p style="text-align:center;font-size:16px;">当前没有检索到信息！</p>');
        		//return $eventWrap.empty().hide();
        	}
	        $eventWrap.addClass('sudyclndr-event-wrap').html(function(html){
	        	var html = "";
	        	if(_this.setting.eventWrapDate){
	        		html += '<div class="sudyclndr-event-date">'+year+'年'+month+'月'+day+'日'+' 星期'+week+'</div>';
	        	}
				///////////////////////////////////////////////////////////
				//console.log(events);
	        	$.each(events, function(index, val){
					if( val.length > 0){
						$.each(val, function(i,v){

							if(_this.Transdate(v.endTime) >= _this.Transdate(_this.Format(new Date(),"yyyy-MM-dd hh:mm:ss")) ){ //判断截止日期...
								if(v.note == undefined && v.note !==''){
									html += laytpl(_this.setting.eventTpl).render(v);
								}
							}
							
						});
					}else{
						
						html += laytpl(_this.setting.eventTpl).render(val);
					}
				});

	        	return html;
	        }).show();
		}else{
			if(events.length<1){
				return false;
			};
			if(titleUrl!==""&&titleUrl!=="#")
	        	title = '<a href="'+titleUrl+'" target="_blank">'+title+'</a>';
			$(".clndr-events-title", el).html(title);
			$(".clndr-events-list", el).html(function(){
				var html ="";
				$.each(events, function(index, val) {
					/* iterate through array or object */
					html += '<li><a target="_blank" title="'+val.title+'" href="'+val.url+'">'+val.title+'</a></li>';
				});
				return html;
			});

			$(".clndr-days",el).stop().animate({left:"-100%"}, this.setting.eventsSpeed);
			$(".clndr-events",el).stop().animate({left:"0"}, this.setting.eventsSpeed);
		}
	}

	/*
	格式化日期
	(new Date()).Format("yyyy-M-d hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
	(new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
	 */


	Clndr.prototype.Format = function(date,fmt){
		  if(!date)var date = new Date();
		  if(!fmt)var fmt = this.setting.dateFormat;
		  var o = { 
		    "M+" : date.getMonth()+1,
		    "d+" : date.getDate(),
		    "h+" : date.getHours(),
		    "m+" : date.getMinutes(),
		    "s+" : date.getSeconds(),
		    "q+" : Math.floor((date.getMonth()+3)/3),
		    "S"  : date.getMilliseconds()
		  }; 
		  if(/(y+)/.test(fmt)) 
		    fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length)); 
		  for(var k in o) 
		    if(new RegExp("("+ k +")").test(fmt)) 
		  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length))); 
		  return fmt;

	}
	
	Clndr.prototype.Transdate = function(endTime){
		var date = new Date(); 
		date.setFullYear(endTime.substring(0,4)); 
		date.setMonth(endTime.substring(5,7)-1); 
		date.setDate(endTime.substring(8,10)); 
		date.setHours(endTime.substring(11,13)); 
		date.setMinutes(endTime.substring(14,16)); 
		date.setSeconds(endTime.substring(17,19)); 
		return Date.parse(date)/1000; 
	} 	
	
	/*
	获取上一个月份日期
	 */

	Clndr.prototype.getPrevMonth = function(date) {

	    var arr = date.split('-');
	    var year = parseInt(arr[0],10);
	    var month = parseInt(arr[1],10);
	    var day = parseInt(arr[2],10);
	    var days = new Date(year, month, 0);
	    days = days.getDate();
	    var year2 = year;
	    var month2 = month - 1;
	    if (month2 == 0) {
	        year2 = year2 - 1;
	        month2 = 12;
	    }
	    var day2 = day;
	    var days2 = new Date(year2, month2, 0);
	    days2 = days2.getDate();
	    if (day2 > days2) {
	        day2 = days2;
	    }

	    var prevMonth = new Date(year2,month2-1,day2);

	    return {
	    	date:prevMonth,
	    	days: days2
	    };
	}

	/*
	获取下一个月份日期
	 */
	Clndr.prototype.getNextMonth = function(date){

	    var arr = date.split('-');
	    var year = parseInt(arr[0],10);
	    var month = parseInt(arr[1],10);
	    var day = parseInt(arr[2],10);
	    var days = new Date(year, month, 0);
	    days = days.getDate();
	    var year2 = year;
	    var month2 = month + 1;
	    if (month2 == 13) {
	        year2 = year2 + 1;
	        month2 = 1;
	    }
	    var day2 = day;
	    var days2 = new Date(year2, month2, 0);
	    days2 = days2.getDate();
	    if (day2 > days2) {
	        day2 = days2;
	    }

	    var nextMonth = new Date(year2,month2-1,day2);
	    return {
	    	date: nextMonth,
	    	days: days2
	    };
	}
	
	/*
	获取当前月份日期
	 */
	Clndr.prototype.getCurrentMonth = function(date){

	    var arr = date.split('-');
	    var year = parseInt(arr[0],10);
	    var month = parseInt(arr[1],10);
	    var day = parseInt(arr[2],10);
	    var days = new Date(year, month, 0);
	    var currentMonth = new Date(year,month-1,day);
	    return {
	    	date: currentMonth,
	    	days: day
	    };
	}
	
	/*
	获取当前教学周
	 */
	Clndr.prototype.TodayInfo = function(date,start,holiday,Tomorrow){
		var WEEKLEN = 7, // 一周7天为常量
			weekInfo = {"week": null, "day": null, "Hyear": null}, // 初始化返回信息，默认第null周，星期null
			oneDay = 24 * 60 * 60 * 1000, // 一天的毫秒时长
			weekLeave, 	     // 开学当天所在周剩余天数
			weekStart,	     // 开学当天start是星期几
			today, 			 // 今天
			dateDiff,		 // 今天与开学当天日期差
			sDate;           //开学之日，日期对象
		var rDateStr = /\d{4}[\/-]\d{1,2}[\/-]\d{1,2}/g; // 简单的日期格式校验：2013/12/19
		if (!rDateStr.test(start)) {
			alert("请使用合法的开学日期！！！");
			return weekInfo;
		}
		sDate  = new Date(start.replace(/-/g, "/"));    // 转化开学时间
		sDate  = new Date(start.replace(/-/g, "/"));    // 转化开学时间
		hDate  = new Date(holiday.replace(/-/g, "/"));  // 转化放假时间
		TDate  = new Date(Tomorrow.replace(/-/g, "/")); // 转化下个开学时间
		sMonth = sDate.getMonth() +1;                  // 开学所处的月份 
		weekStart = sDate.getDay();                    // 计算开学是星期几
		weekStart = weekStart === 0 ? 7 : weekStart;   // JS中周日的索引为0，这里转换为7，方便计算
		weekLeave = WEEKLEN - weekStart;
		
		today = new Date(date);
		today = new Date(today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + today.getDate());
		dateDiff = today - sDate;
		dateDiffs = today - hDate;
		dateDiffss = today - TDate;
		//console.log(dateDiffss);
		dateDiff = parseInt(dateDiff / oneDay);           // 计算日期差天数
		dateDiffss = parseInt(dateDiffss / oneDay);       // 计算日期差天数
		weekInfo.week = Math.ceil((dateDiff - weekLeave) / WEEKLEN) + 1;
		if (dateDiffs > 0){    //  判断是否是假期		     
			if(sMonth > 8){    //  判断上半年还是下半年
				weekInfo.week = "寒假";
			}else{
				weekInfo.week = "暑假";
			}
		}
		/*下个开学时间*/
		if(dateDiffss >0){
			weekInfo.week = Math.ceil((dateDiffss - weekLeave) / WEEKLEN) + 1;
		}
		return weekInfo;
		// 测试结果
		//var td = TodayInfo("2018/03/05","2018/07/01","2018/09/01").week;
		//document.write("<span class='days'>"+"第"+td+"周"+"</span>");
	}
		
	
	/*
	注册sudyclndr插件
	*/

	$.fn.sudyclndr = function(setting){
		var clndrs = [];
		this.each(function() {
			
			clndrs.push(new Clndr(this, setting));
		});
		return clndrs;
	}
	
})(jQuery);