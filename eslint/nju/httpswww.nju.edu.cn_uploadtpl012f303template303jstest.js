(function(){

    $.fn.extend({
        floatAd:function(isLoad){
            var _this = this;
            var winH = parseInt($(window).height());
            var objH = parseInt(_this.height());

            var topDis = parseInt((winH/3) - (objH/2) + $(window).scrollTop());
            if (winH < objH) {
                topDis = 0 + $(window).scrollTop();
            }
            if(!isLoad) {
                $(_this).css({ "top": topDis });
                $(window).resize(function(){
                    $(_this).floatAd(!isLoad);
                });
                $(window).scroll(function(){
                    $(_this).floatAd(!isLoad);
                });
            } else {
                $(_this).animate({ "top": topDis + "px" }, 50,"linear");
            }
        }
    });

    $.fn.extend({
        sMouseWheel:function(fn){
            return this.bind("mousewheel onmousewheel DOMMouseScroll",fn);
        }
    });

})(jQuery);