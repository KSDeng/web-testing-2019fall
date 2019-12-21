var $j = jQuery.noConflict();
var txtPlaceholder;
$j(document).ready(function($) {
    /*help*/
	$j("#lnb .menu > li").each(function(a){
		$j("#lnb .menu > li").eq(a).find("strong").each(function(b){
			$j("#lnb .menu > li").eq(a).find("strong").eq(b).click(function(){
				if($j("#lnb .menu > li").eq(a).hasClass("active"))
				{
					$j("#lnb .menu > li").removeClass("active");
					$j("#lnb .menu > li > ul").stop(true,true).slideUp("fast");
				}
				else
				{
					$j("#lnb .menu > li").removeClass("active");
					$j("#lnb .menu > li").eq(a).addClass("active");
					$j("#lnb .menu > li > ul").stop(true,true).slideUp("fast");
					$j("#lnb .menu > li").eq(a).find("ul").slideDown("fast");
				}
				
			});
		});
	});
	/*giftcard*/
	$j(".card-list li").each(function(index){
		$j(".card-list li").eq(index).mouseenter(function(){
			$j(this).find(".add").stop(true,false).animate({bottom:0},"fast");
		});
		$j(".card-list li").eq(index).mouseleave(function(){
			$j(this).find(".add").stop(true,false).animate({bottom:-60+"px"},"fast");
		});
	});
	/*point*/
	$j(".val-sv .sv").mouseenter(function(){
		$j(this).find(".exchange").stop(true,false).animate({bottom:0},"fast");
	});
	$j(".val-sv .sv").mouseleave(function(){
		$j(this).find(".exchange").stop(true,false).animate({bottom:-88+"px"},"fast");
	});

	/*
	$j(".product-list li").each(function(index){
		$j(".product-list li").eq(index).mouseenter(function(){
			$j(this).find(".exchange").stop(true,false).animate({bottom:0},"fast");
		});
		$j(".product-list li").eq(index).mouseleave(function(){
			$j(this).find(".exchange").stop(true,false).animate({bottom:-88+"px"},"fast");
		});
	});
	*/

	/*金俊杰 新添加展开JQUERY*/
	$j(".tags-hd").each(function(index){
		$j(".tags-hd").eq(index).click(function(){
			if($j(this).hasClass("active"))
			{
				$j(this).find("span").removeClass("develop-1");
				$j(this).find("span").addClass("develop-0");
				$j(".product-section").eq(index).slideUp("normal",function(){
					$j(".tags-hd").removeClass("active");
				});
			}
			else
			{
				$j(".tags-hd").removeClass("active");
				$j(this).addClass("active");
				$j(".tags-hd").find("span").removeClass("develop-0");
				$j(".tags-hd").find("span").removeClass("develop-1");
				$j(".tags-hd").find("span").addClass("develop-0");
				$j(this).find("span").removeClass("develop-0");
				$j(this).find("span").addClass("develop-1");
				$j(".product-section").slideUp("normal");
				$j(".product-section").eq(index).stop(true,true).slideDown("normal",function(){
					$j('html, body').animate({scrollTop:$j(this).offset().top-216}, 'normal');
				});
			}
		});
	});
	/*注册页面*/
	$j(".clickpswd").keydown(function(){
		$j(".password-check").css("display","inline-block");
	});
	$j(".signupin-content .form-item").each(function(index){
		$j(".signupin-content .form-item").eq(index).find(".x-input").focus(function(){
			txtPlaceholder = $j(this).attr("placeholder");
			$j(this).attr("placeholder","");
			$j(".signupin-content .form-item").eq(index).find(".fnote").show();
		});
		$j(".signupin-content .form-item").eq(index).find(".x-input").blur(function(){
			$j(".signupin-content .form-item").eq(index).find(".fnote").hide();
			$j(this).attr("placeholder",txtPlaceholder);
		});

		$j(".signupin-content .form-item").eq(index).find(".x-input").keydown(function(){
			$j(".signupin-content .form-item").eq(index).find(".fnote").hide();
		});
	});
  });