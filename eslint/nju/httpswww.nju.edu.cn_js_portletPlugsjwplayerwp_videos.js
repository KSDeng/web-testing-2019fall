/**
 * [setPlayer 播放器]
 */
var player;
function setPlayer(file, thumb, width, height, auto, play, name, playerPath) {
    if (!window.applicationCache) {
        player = jwplayerIE8(play).setup({
            flashplayer: playerPath + 'player.swf',
            file: file,
            image: thumb?thumb:(playerPath+'img/images/preview.jpg'),
            width: width,
            height: height,
            autostart: (auto==="yes")?true:false,
            controlbar: 'bottom'
        });
        player.onPlay(function() {//准备就绪设置浮动方式
            $("#" + play).css("background-color", "rgba(255,255,2, 0.1)");
         });
    } else {
        player = jwplayer(play).setup({
            flashplayer: playerPath + 'jwplayer.flash.swf',
            file: file,
            image: thumb?thumb:(playerPath+'img/images/preview.jpg'), 
            width: width,
            height: height,
            autostart: (auto==="yes")?true:false,
            controlbar: 'bottom'
        });
        player.onPlay(function() {//准备就绪设置浮动方式
            $("#" + play).css("background-color", "rgba(255,255,2, 0.1)");
         });
    }
}
;
/**
 * [getNext 列表播放]
 * @[仅支持本地视频]
 */

function getNext() {
    var $player = $(".active_player");
    if ($player.is('.autonext')) {
        $(".playing", $player).next().trigger('click');
    }
}

/**
 * [sudyPlayer 视频播放展示插件]
 */
;
(function($) {

    $.fn.sudyPlayer = function(option) {
        var defaults = {
            id:"container1",
            width: 320, // 播放器宽度
            height: 240, // 播放器高度
            playerPath: "player/", // 定义播放器目录路径
            type: 1, // 播放器展示类型，支持4种1，2，3，4
            autoNext: false, // 是否连播
            isAuto: "yes", // 是否自动播放
            bgcolor: "#000000", // 播放器填充背景色
            JSON: [] // 支持传入JSON视频数据
        },
        o = $.extend(true, {}, defaults, option);
        o.JSON = $.grep(o.JSON, function(a) {
            return !$.isEmptyObject(a);
        });
        return this.each(function() {
            var $c = $(this),
                    len = o.JSON.length,
                    vid = Number(new Date()) + 1,
                    playID = "play" + vid,
                    playerName = "player" + vid,
                    w = $(this).width(),
                    h = $(this).height();
            $c.addClass("wp_videos");
            if (o.autoNext) {
                $c.addClass("autonext");
            }
            ;
            function activePlayer() {
                $(".wp_videos", document).removeClass('active_player');
                $c.addClass('active_player');
            }
            if (len > 0) {
                $('<div class="playwrap"><div id="'+playID+'"></div><div class="playlist"><ul></ul></div></div>').appendTo($c);
                $(".playwrap", $c).addClass("player-type-" + o.type).css({
                    width: o.width
                });
                /*
                 播放器类型1
                 */
                if (o.type == 1 && len > 1) {
                    $(".playwrap", $c).append('<div class="playpage">').hover(function() {
                        $(".playpage", $c).stop().fadeIn(200);
                    }, function() {
                        $(".playpage", $c).stop().fadeOut(200);
                    });
                    
                }

                $.each(o.JSON, function(i, e) {
                    var eo = i % 2;
                    var $itemClass = eo == 0 ? "video_meta eve" : "video_meta odd";
                    if ($.trim(o.JSON[i].thumb).length < 1) {
                        o.JSON[i].thumb = o.playerPath + 'start.jpg';
                    }
                    $(".playlist", $c).find("ul").append('<li class="' + $itemClass + '"><i class="video_icon"></i><div class="video_title"><p class="video_title_text">' + e.title + '</p></div><div class="video_thumb"><img src="' + o.JSON[i].thumb + '"></div><a class="video_link" href="' + e.url + '" title="打开视频文章" target="_blank"></a></li>');
					
                    $(".playpage", $c).append('<a><span>' + (i + 1) + '</span></a>');
                });
                $(".playpage").children().eq(0).addClass("active").siblings().removeClass("active");
                setPlayer(o.JSON[0].video, o.JSON[0].thumb, o.width, o.height, o.isAuto, playID, playerName, o.playerPath);
                    
                function playIndex(index) {
                    setPlayer(o.JSON[index].video, o.JSON[index].thumb, o.width, o.height, o.isAuto, playID, playerName, o.playerPath);
                    $(".playpage", $c).children().eq(index).addClass("active").siblings().removeClass("active");
                $(".playlist ul", $c).children().eq(index).addClass("playing").siblings().removeClass("playing");
                }
                function playIndex1(index) {
                    setPlayer(o.JSON[index].video, o.JSON[index].thumb, o.width, o.height, o.isAuto, playID, playerName, o.playerPath);
                    $(".playpage", $c).children().eq(index).addClass("active").siblings().removeClass("active");
                $(".playlist ul", $c).children().eq(index).addClass("playing").siblings().removeClass("playing");
                }
//                 $(".playpage", $c).children().on("click", function() {
//                     var index = $(this).index();
//                     activePlayer();
//                     playIndex(index);
//                 });
//                 $(".playlist ul", $c).children().on("click", function() {
// 					var index = $(this).index();
// 					activePlayer();
// 					playIndex1(index);
// 				}).eq(0).trigger("click");
                                
                 /*
                播放器类型3
                 */
                if (o.type == 3) {
                        var thumb_width = 80;
                        if (320 < o.width) {
                                thumb_width = o.width / 4;
                        }
                        if (o.width > 754) {
                                thumb_width = 190;
                        };
                        var num = Math.ceil(o.width / thumb_width);
                        var $w = o.width / num,
                                $h = o.height / num;
                        $(".playlist", $c).height($h).children("ul").css({
                                width: $w * len,
                                height: $h
                        }).children().css({
                                width: $w,
                                height: $h
                        }).children(".video_thumb").css({
                                width: $w - 4,
                                height: $h - 4
                        });
                        if (len > 0) {
                                $('<div class="playnav"><div class="navbtn"></div></div>').appendTo($(".playwrap", $c));
                                if (len > num) {
                                        var btnW = $(".navbtn", $c).width(),
                                                dist = o.width - btnW;

                                        function navActionX(moveX) {
                                                if (moveX < 0) {
                                                        moveX = 0;
                                                }
                                                if (moveX > dist) {
                                                        moveX = dist;
                                                }
                                                $(".navbtn", $c).css({
                                                        "left": moveX
                                                });
                                                $(".playlist", $c).children("ul").css({
                                                        "left": moveX / dist * $w * (num - len)
                                                });
                                        }
                                        $(".playlist ul", $c).children().hover(function() {
                                                $(this).children(".video_title").stop().animate({
                                                        bottom: -40
                                                }, 200);
                                        }, function() {
                                                $(this).children(".video_title").stop().animate({
                                                        bottom: 0
                                                }, 200);
                                        });
//                                         $(".playnav", $c).on("click", function(e) {
//                                                 e.preventDefault();
//                                                 var moveX = $(this).children(".navbtn").position().left + e.pageX - $(this).children(".navbtn").offset().left - btnW / 2;
//                                                 navActionX(moveX);
//                                         });
//                                         $(".navbtn", $c).on("mousedown", function(e) {
//                                                 var posX = e.pageX,
//                                                         left = $(this).position().left;
//                                                 $(document).on("mousemove", function(e) {
//                                                         e.preventDefault();
//                                                         var moveX = left + e.pageX - posX;
//                                                         navActionX(moveX);
//                                                 }).on("mouseup", function(e) {
//                                                         $(this).unbind("mousemove");
//                                                 });
//                                         });
//                                         $(".playlist", $c).on("mousewheel", function(e, delta) {
//                                                 e.preventDefault();
//                                                 var posX = $(".navbtn", $c).position().left,
//                                                         moveX = delta > 0 ? posX - 50 : posX + 50;
//                                                 navActionX(moveX);
//                                         });
                                }
                        }
                }

                /*
                播放器类型4
                 */
                if (o.type == 4) {
                        var thumb_height = 40;
                        if (200 < o.height) {
                                thumb_height = o.height / 5;
                        }
                        if (o.height > 356) {
                                thumb_height = 90;
                        };
                        var num = Math.ceil(o.height / thumb_height);
                        var $w = o.width / num,
                                $h = o.height / num;
                        var $lw = $w * 2 + 41;
                        $(".playlist", $c).css({
                                height: o.height,
                                width: $lw,
                                right: -$lw
                        }).children("ul").css({
                                width: $lw - 24,
                                height: o.height
                        }).children().css({
                                height: $h
                        }).children(".video_thumb").css({
                                width: $w,
                                height: $h - 8
                        }).siblings(".video_title").css({
                                width: $w,
                                height: $h - 8
                        });
                        if (len > 0) {
                                $('<div class="playnav"><div class="navbtn"></div></div>').appendTo($(".playwrap", $c));
                                $(".playnav", $c).css({
                                        right: -$lw
                                });
                                if (len > num) {
                                        var btnH = $(".navbtn", $c).height(),
                                                dist = o.height - btnH;

                                        function navActionY(moveY) {
                                                if (moveY < 0) {
                                                        moveY = 0;
                                                }
                                                if (moveY > dist) {
                                                        moveY = dist;
                                                }
                                                $(".navbtn", $c).css({
                                                        "top": moveY
                                                });
                                                $(".playlist", $c).children("ul").css({
                                                        "top": moveY / dist * $h * (num - len)
                                                });
                                        }
//                                         $(".playnav", $c).on("click", function(e) {
//                                                 e.preventDefault();
//                                                 var moveY = $(this).children(".navbtn").position().top + e.pageY - $(this).children(".navbtn").offset().top - btnH / 2;
//                                                 navActionY(moveY);
//                                         });
//                                         $(".navbtn", $c).on("mousedown", function(e) {
//                                                 var posY = e.pageY,
//                                                         top = $(this).position().top;
//                                                 $(document).on("mousemove", function(e) {
//                                                         e.preventDefault();
//                                                         var moveY = top + e.pageY - posY;
//                                                         navActionY(moveY);
//                                                 }).on("mouseup", function(e) {
//                                                         $(this).unbind("mousemove");
//                                                 });
//                                         });
//                                         $(".playlist", $c).on("mousewheel", function(e, delta) {
//                                                 e.preventDefault();
//                                                 var posY = $(".navbtn", $c).position().top,
//                                                         moveY = delta > 0 ? posY - 30 : posY + 30;
//                                                 navActionY(moveY);
//                                         });
                                }
                        }
                }
            }
        });
    }
})(jQuery);