$(function(){
	
//底部二维码
	var act_class;
	$("footer li").hover(
		function(){
			act_class = $(this).attr("class");
			act_class =	act_class+"_act";
			$(this).attr("class",act_class)
			$(this).find("div").show();
		},
		function(){
			act_class = $(this).attr("class");
			act_class =	act_class.substr(0,6);
			$(this).attr("class",act_class)
			$(this).find("div").hide();
		}
	)
	
	
});




$(".wzjj a").click(function(e) {
	$(this).addClass("act").siblings().removeClass("act");
	$(".contant").css("font-size",$(this).attr("rel"));
	$(".contant *").css("font-size",$(this).attr("rel"));
});
/*$(".yyrs_sub").click(function(e) {
	if($("#input_yyrs").val()>1){
		$("#input_yyrs").val(parseInt($("#input_yyrs").val())-0.1);
	}
});
$(".yyrs_add").click(function(e) {
	$("#input_yyrs").val(parseInt($("#input_yyrs").val())+0.1);
});
*/

/*foot效果*/
$(".dhy_yq").click(function(){

	$(".dhy_tc").toggle(10)
	$(this).parents().css("margin-bottom","inherit")

	}

)
$(".dhy_gz").hover(function(){
	$(".dhy_erwm").css("display","block")
	
	}

)
$(".footer").mouseleave(function(){
	$(".dhy_erwm").css("display","none")
	
	}
);



/*组织机构*/
$(document).ready(function() {
$(".dhy_ck_gd").click( function(){
	$(this).siblings(" ul").css("height","auto");
	$(this).hide();
	$(this).siblings(".dhy_ck_gds").show();
	
	})
	
	$(".dhy_ck_gds").click( function(){
	$(this).siblings(" ul").css("height","237px");
	$(this).hide();
	$(this).siblings(".dhy_ck_gd").show();	
	
	})
	
 });
 
 /*谭*/
 $(".btn_menu").click(function(e) {
	$(".tcc_mobile").toggle();
	$(".nav_mobile").slideToggle();
});


$(".nav_mobile h3").click(function(e) {
	$(".nav_mobile h3").removeClass("act");
	$(this).addClass("act");
	if($(this).siblings("ul").is(":visible")){
		$(this).siblings("ul").slideUp();
		$(this).removeClass("act");
	}else{
		$(".nav_mobile ul ul").hide();
		$(this).siblings("ul").slideDown();
	}

});	

$(document).click(function(e) {
	if(e.target.className=="tcc_mobile"){
		$(".nav_mobile").slideUp();
		$(".tcc_mobile").toggle();
	}
});
$(function(){
	$(".tcc_mobile").height($(document).height());
})	
  

/*左侧导航浮动*/
$(function() {
    $(window).scroll(function() {
        var scrollHeight = $(document).scrollTop();
        if (scrollHeight > 460 ) {
            $("#dhy_cg").addClass("dhy_cgs");
        } else {
            $("#dhy_cg").removeClass("dhy_cgs");
        }
    });
})



