$(function(){
	var $menu = $(".main-menu");
    /* 列表当前位置首页 */
	$(".col_path a").eq(0).addClass("homeicon");
	/*栏目图片高度*/
	var imgsrc = $(".col_banner").find("img").attr("src");
	if(imgsrc==""){
		var imgsrc = $(".col_banner").find("img").data("imgsrc");
	}
	$(".col_banner").css("backgroundImage","url("+imgsrc+")");
	//window.onload= function(){$(".xubox_imgoriginal").find("a").text("The original image")};
	/**/
	$(".info.school").find(".col-wrap").children(".col-item").each(function(){
		if($(this).find(".col-item-sub").children("ul").length == 0){
			$(this).find(".i").remove();
		}
		$(this).find(".i").click(function(){
			$(this).toggleClass("open");  
			//$(this).parents(".col-title").next(".col-item-sub").slideDown();
			$(this).parents(".col-title").next(".col-item-sub").slideToggle(); 
			$(this).parents(".col-item").siblings().find(".col-item-sub").slideUp();
			$(this).parents(".col-item").siblings().find(".i").removeClass("open");
		});
	});
	
	$(".wp_gallery_tool").find(".wp_gallery_model").remove();
        $(".wp_gallery_tool").find(".wp_gallery_image_url").remove();
        $(".wp_gallery_title").parent().prepend("<em>Campus Scenery</em>");
        $(".wp_gallery_title").remove();
});