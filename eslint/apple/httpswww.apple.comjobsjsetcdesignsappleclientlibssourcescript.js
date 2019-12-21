/*
 * Responsive Functions
 */
var is_landscape = function() {
  return $(window).width() >= 1024;
}

var is_portrait = function() {
  return $(window).width() >= 768;
}

var is_phone = function() {
  return $(window).width() >= 640;
}

var is_ios = function() {
  var agent = navigator.userAgent.toLowerCase();
  return agent.indexOf('iphone') !== -1 || agent.indexOf('ipad') !== -1;
};

/*
 * Some global vars.
 */
var $doc = document.documentElement;
var window_width = $(window).width();
var scroll_pos = 0;
var search_overlay_timer;
var search_focus = false;
var search_focus_timer;
var window_focus = true;

$(document).ready(function() {
  /*
   * Add body classes.
   */
  if (is_ios()) {
    $('body').addClass('is-ios');
  }
  else {
    $('body').addClass('is-desktop');
  }

  /*
   * Add browser classes.
   */
  $doc.setAttribute('data-useragent', navigator.userAgent);

  /*
   * Make local nav sticky.
   */
  $('.local-nav').sticky({topSpacing:0});

  /*
   * Add class on section nav block based on the number of items.
   */
  if ($('.section-nav-block li').length >= 2) {
    $('.section-nav-block').addClass('blocks-' + $('.section-nav-block li').length);
  }

  /*
   * Show and hide job opportunities on retail and corporate pages.
   */
  $('body').on('click', '.show-hide', function(e) {
    var $opportunities = $(this).closest('.site-width').next('.opportunities');
    e.preventDefault();
    $(this).find('.show-hide-text').toggle();
    $opportunities.attr('aria-hidden', $opportunities.attr('aria-hidden') == 'true' ? 'false' : 'true');
    $(this).attr('aria-expanded', $(this).attr('aria-expanded') == 'false' ? 'true' : 'false');
    $(this).attr('aria-selected', $(this).attr('aria-selected') == 'false' ? 'true' : 'false');
    $opportunities.slideToggle();
    $(window).resize();
  });

  /*
   * Window State.
   */
  window.onblur = function() {
    window_focus = false;
  };

  window.onfocus = function() {
    window_focus = true;
  };

  /*
   * Body Lock
   */
  var $docEl = $('html, body'),
      $wrap = $('.content'),
      scrollTop;

  function lockBody() {
    if(window.pageYOffset) {
      $wrap.css({
        top: - (scrollTop = window.pageYOffset)
      });
    }
    $docEl.css('overflow', 'hidden');
  }

  function unlockBody() {
    $docEl.css('overflow', '');
    $wrap.css({
      top: ''
    });
    window.scrollTo(0, scrollTop);
    window.setTimeout(function () {
      scrollTop = null;
    }, 0);
  }

  /*
   * Overlay
   */
  function overlayIn() {
    lockBody();
    $('.overlay').show();
  }

  function overlayOut() {
    unlockBody();
    $('.overlay').hide();
    $(window).unbind('resize.video');
  }

  $('.play-video').click(function() {   
    var show = this.id;
    var player = $('.video-wrapper > video.' + show)[0];
    $('.video-wrapper > video.' + show).show();
    $('.video-wrapper > video:not(".'+show+'")').hide();

    // Change phantom track elements from 'Unknown CC' to 'No CC'.
    var tracks = player.textTracks;
    for (var i = 0; i < tracks.length; i++) {
      if (tracks[i].label === '') {
        tracks[i].language = ' No';
      }
    }

    player.play();
    return false;
  });

  /*
   * Slider/gallery.
   */
//  $(".slider-wrapper").slick({
//    accessibility: true,
//    mobileFirst: true,
//    dots: true,
//    arrows: false,
//    prevArrow: '<button type="button" data-role="none" class="slick-prev">&larr;</button>',
//    nextArrow: '<button type="button" data-role="none" class="slick-next">&rarr;</button>',
//    responsive: [
//      {
//        breakpoint: 750,
//        settings: {
//          dots: false,
//          arrows: true
//        }
//      }
//    ]
//  });
    
  function video_position() {
    var win_h = $(window).height();
    var $video = $('.video-wrapper');
    var video_h = $video.outerHeight();
    var video_min_top = 85;
    var video_top = video_min_top;

    if (win_h > video_h) {
      video_top = (win_h - video_h) / 2;

      if (video_top < video_min_top) {
        video_top = video_min_top;
      }
    }

    $video.css({
      'margin-top': video_top + 'px'
    });
  }

  // Overlay links.
  $('.play-video').click(function(e) {
    overlayIn();
    video_position();
    $(this).addClass('overlay-opened');
    $('.overlay')
      .focus()
      .attr('aria-hidden', 'false');

    $(window).bind('resize.video', function() {
      slider_position();
      video_position();
    });

    e.preventDefault();
  });

  $('.overlay__close').click(function(e) {
    overlayOut();
    $('.video-wrapper video').each(function(){
      $(this).get(0).pause();
    });
    $('.overlay').attr('aria-hidden', 'true');
    $('.overlay-opened')
      .focus()
      .removeClass('overlay-opened');
    $('.play-video').blur();
    e.preventDefault();
  });

  /*
   * Students Dropdown
   */
  $('#events_selector').change(function() {
    var optionID = '#school-' + $(this).val() + '-opt',
      tableSelected = '#school-' + $(this).val() + '-list',
      tableID = '#school-' + $(this).val() + '-list';

    //Hide/reveal appropriate table.
    if (optionID != '#school-1-opt') {
      $(this).attr('aria-expanded', 'true');
      $('.student-opportunities ' + tableID).css('height', 'auto');
      $('.student-opportunities > .table-container').not(tableID).css('height', 0);
      $('.student-opportunities')
        .addClass('active')
        .slideDown(300)
        .attr('aria-hidden', 'false')
        .focus();
    }
    else {
      $(this).attr('aria-expanded', 'false');
      $('.student-opportunities > .table-container').css('height', 0);
      $('.student-opportunities')
        .slideUp(300)
        .removeClass('active')
        .attr('aria-hidden', 'true');
    }
    $(window).resize();
    
  });

  // Fix server side footer include link for choose your country.
/*  $('a[href$="/choose-your-country/"]').each(function(){
    this.href = 'https://www.apple.com/jobs/choose-your-country.html';
  });*/
});