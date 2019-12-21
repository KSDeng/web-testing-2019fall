$(function(){
	var $menu = $(".main-menu");
	
	$("#wp_news_w12").find(".news").each(function(){
		var marth = $(this).find(".year").text();
		$(this).find(".year").text(getMonthEN(marth).slice(0,3));
	});
	
	var marth="",day="",year="";
	$("#wp_news_w11").find(".news").each(function(){
		times = $(this).find(".news_time").text();
		time = times.split("-");
		year = time[0];
		marth = time[1];
		day = time[2];
		$(this).find(".news_time").text(getMonthEN(marth)+" "+$.trim(day)+","+year);
	});
	
	function getMonthEN(n){
		var num = parseInt(n, 10),
		month = "";
		if (num == 1) {
			month = "January"
		}
		if (num == 2) {
			month = "February"
		}
		if (num == 3) {
			month = "March"
		}
		if (num == 4) {
			month = "April"
		}
		if (num == 5) {
			month = "May"
		}
		if (num == 6) {
			month = "June"
		}
		if (num == 7) {
			month = "July"
		}
		if (num == 8) {
			month = "August"
		}
		if (num == 9) {
			month = "September"
		}
		if (num == 10) {
			month = "October"
		}
		if (num == 11) {
			month = "November"
		}
		if (num == 12) {
			month = "December"
		}
		return month;
	}
	
});