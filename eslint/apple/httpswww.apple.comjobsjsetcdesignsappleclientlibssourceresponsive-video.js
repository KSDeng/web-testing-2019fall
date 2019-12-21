$(document).ready(function(){
    'use strict';
    function setResolution() {

        // Get the dimensions of the viewport
        var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        var videoFormat;

        if (width >= 1080) {
            videoFormat = "1920x1080h";
        } else if (width >= 720) {
            videoFormat = "1280x720h";
        } else {
            videoFormat = "960x540";
        }

        // Note: This will require that the video element have a data attribute called
        // 'data-video-src', which should be the path of the video file.
        $("video").each(function(i) {
            var origVideoSrc = $(this).attr('data-video-src');
            var fileExt = origVideoSrc.split('.').pop();
			var filePath = origVideoSrc.substring(0, origVideoSrc.lastIndexOf('.'));
            var videoSrc = filePath + "_" + videoFormat + "." + fileExt;
            $(this).children('source').attr('src', videoSrc);
            $(this).load();
		});

    };
    window.onload = setResolution;
});
