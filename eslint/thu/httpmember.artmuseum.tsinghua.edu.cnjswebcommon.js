$(function(){
	$('.index .login .checkbox').on('click', function(){
		if( $(this).hasClass('active') ){
			$(this).removeClass('active');
		}
		else{
			$(this).addClass('active');
		}
		
	});

	//用户名框鼠标焦点移进，文字消失 
	$(".index .login .inp input").focus(function() {
		var _check = $(this).val();
		console.log(this.defaultValue);
		if (_check == this.defaultValue) {
			$(this).val("");
		}
	});
	//用户名框鼠标焦点移出，文字显示 
	$(".index .login .inp input").blur(function() {
		var _check = $(this).val();
		if (_check == '') {
			$(this).val(this.defaultValue);
		}
	});
	//会员申请性别
	$('.s-box span').on('click', function(){
		$(this).addClass('active').siblings().removeClass('active');
	});
	//会员申请单选
	$('#single-radio span').on('click', function(){
		if( $(this).hasClass('active') ){
			$(this).removeClass('active');
		}
		else{
			$(this).addClass('active');
		}
	});
	//会员申请多选
	$('#multi-select span').on('click', function(){
		if( $(this).hasClass('active') ){
			$(this).removeClass('active');
		}
		else{
			$(this).addClass('active');
		}
	});
	
	//周日多选
	$('.s-time li span').on('click', function(){
		if($(this).hasClass('active'))
		{
			$(this).removeClass('active');
		}
		else
		{
			$(this).addClass('active');
		}
	});
	
	$('.agreement').on('click', function(){
		if($(this).hasClass('active')){
			$(this).removeClass('active');
		}else{
			$(this).addClass('active');
		}
	});
	
	$('.agreement a').on('click', function(){
		$('.agree-box').show();
	});
	
	$('.agree-box .look').on('click', function(){
		$('.agree-box').hide();
	});
	
	$('#upload-pic').on('click', function(){
		$(this).hide();
		$('#pic-edit').show();
	});
	
	//二维码悬浮
	$("#attention").hover(function(){
		$(".ewm").show();
		},function(){
		$(".ewm").hide();
	});
	
	$("#contact").hover(function(){
		$(".contact_text").show();
		},function(){
		$(".contact_text").hide();
	});
	
	//弹窗
//	$('.apply-btn, #r-btn').on('click', function(){
//		$('#hover-box').show();
//		
//		setTimeout(function () {
//	        $("#hover-box").hide();
//	    }, 3000);
//	});
//	
//	$('.btn .select span').on('click', function(){
//		$(this).addClass('active').siblings().removeClass('active');
//	});
	
	
//	
	//找回密码页面弹窗
	/*$('.send-btn').on('click', function() {
		$('#pop-box').show();
	});*/
	$('#pop-box .close, #pop-box .sure, #pop-box .cancle').on('click', function() {
		$('#pop-box').hide();
	});
	
	//下拉选择
	(function () {
        var isOpen = false,
            $box = $('.select_box');
//			$('.select_title.title01 span').html($('.select_con.con02 li:first').text());
        $box.each(function () {
            var selector = $(this);
            selector.on('click', '.select_title', function () {
                if (!isOpen) {
                    selector.find('.select_con').show();
                    isOpen = true;
                } else {
                    selector.find('.select_con').hide();
                    isOpen = false;
                }
            });
            selector.on('click', '.select_con li', function () {
            	var $index = $(this).index();
				$('.about .address').eq($index).show().siblings('.address').hide();
                var $con = selector.find('.select_title span');
//              $text = $(this).text();

//              $con.html($text);
                $(this).parent().hide();
                isOpen = false;
            });
        });

//		$(document).on('click', function(){
//			var isOpen = true;
//			if (isOpen) {
//                  $('.select_con').hide();
//              } 
//			
//		});
    })();
	
});
function toggle(){
$(".link-list").toggle(10)
}
function isEmail(str){ 
	var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/; 
	return reg.test(str); 
}

function showdiv(){
	$('#pop-box').show();
	
	setTimeout(function () {
        $("#pop-box").hide();
    }, 3000);
}

function newShowDiv(str){
	$('#pop-box').find("h3").html(str);
	$('#pop-box').show();
}