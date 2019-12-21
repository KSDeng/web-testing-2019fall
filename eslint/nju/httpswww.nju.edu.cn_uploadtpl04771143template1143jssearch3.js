$(function() {
    var articleUrl = "/_wp3services/generalQuery?queryObj=articles";
    loadContents();
    function loadContents() {
        $(".post-41").find("ul.news_list").children().remove();
        var orderData = [{
            field: 'top',
            type: 'desc'
        }, {
            field: 'new',
            type: 'desc'
        }, {
            field: 'createTime',
            type: 'desc'
        }];
        var returnInfos = JSON.stringify(returnData());
        var orders = JSON.stringify(orderData);
        $.ajax({
            url: articleUrl,
            type: 'POST',
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            async: false,
            dataType: 'json',
            data: {
                siteId: 414,
                columnId: 26263,
                pageIndex: 1,
                rows: 12,
                orders: orders,
                returnInfos: returnInfos
            },
            success: function(result) {
                $(".loading").hide();
                var total = result.total;
                var html = '';
                if (result != null) {
                    for (j = 0; j < result.data.length; j++) {
                        var art = result.data[j];
                        var arr = art.f1.split('，');
                        if ((typeof(art.topImg) != 'undefined') && (typeof(art.newImg) != 'undefined')) {
                            html += '<li class="news n1 clearfix">   <span class="wjj">' + arr[0] + '</span>   <span class="news_meta">' + art.publishTime + '</span>   <span class="news_title"><a href="' + art.url + '" target="_blank" title="' + art.title + '">' + art.title + '</a></span>   <span class="news_top">' + art.topImg + '</span>   <span class="news_new">' + art.newImg + '</span></li>'
                        } else if (typeof(art.topImg) != 'undefined') {
                            html += '<li class="news n1 clearfix">   <span class="wjj">' + arr[0] + '</span>   <span class="news_meta">' + art.publishTime + '</span>   <span class="news_title"><a href="' + art.url + '" target="_blank" title="' + art.title + '">' + art.title + '</a></span>   <span class="news_top">' + art.topImg + '</span></li>'
                        } else if (typeof(art.newImg) != 'undefined') {
                            html += '<li class="news n1 clearfix">   <span class="wjj">' + arr[0] + '</span>   <span class="news_meta">' + art.publishTime + '</span>   <span class="news_title"><a href="' + art.url + '" target="_blank" title="' + art.title + '">' + art.title + '</a></span>   <span class="news_new">' + art.newImg + '</span></li>'
                        } else {
                            html += '<li class="news n1 clearfix">   <span class="wjj">' + arr[0] + '</span>   <span class="news_meta">' + art.publishTime + '</span>   <span class="news_title"><a href="' + art.url + '" target="_blank" title="' + art.title + '">' + art.title + '</a></span></li>'
                        }
                    }
                    $(".post-41").find("ul.news_list").append(html)
                }$(".post-41 .news_list").fadeIn();
            }
        })
    }

    function returnData() {
        var returnInfosdata = [{
            field: "title",
            pattern: [{
                name: "lp",
                value: "23"
            }],
            name: "title"
        }, {
            field: "f1",
            name: "f1"
        }, {
            field: "publishTime",
            pattern: [{
                name: "d",
                value: "MM-dd"
            }],
            name: "publishTime"
        }, {
            field: "topImg",
            name: "topImg"
        }, {
            field: "newImg",
            name: "newImg"
        }, ];
        return returnInfosdata
    }

    $('.post-41 .news_list .news').each(function() {
        if ($(this).find(".wjj").text() == "") {
            $(this).find(".wjj").text("信息");
            $(this).find(".wjj").css("background", "#8470a3")
        }
        if ($(this).find(".wjj").text() == "成绩") {
            $(this).find(".wjj").css("background", "#9d6da7")
        }
        if ($(this).find(".wjj").text() == "考试") {
            $(this).find(".wjj").css("background", "#b9a93e")
        }
        if ($(this).find(".wjj").text() == "毕业") {
            $(this).find(".wjj").css("background", "#d47c7c")
        }
        if ($(this).find(".wjj").text() == "课程") {
            $(this).find(".wjj").css("background", "#bf9063")
        }
        if ($(this).find(".wjj").text() == "交流") {
            $(this).find(".wjj").css("background", "#92a454")
        }
        if ($(this).find(".wjj").text() == "信息") {
            $(this).find(".wjj").css("background", "#8470a3")
        }
        if ($(this).find(".wjj").text() == "退课") {
            $(this).find(".wjj").css("background", "#be6fcc")
        }
        if ($(this).find(".wjj").text() == "培养") {
            $(this).find(".wjj").css("background", "#578b30")
        }
        if ($(this).find(".wjj").text() == "排课") {
            $(this).find(".wjj").css("background", "#667858")
        }
        if ($(this).find(".wjj").text() == "项目") {
            $(this).find(".wjj").css("background", "#587278")
        }
        if ($(this).find(".wjj").text() == "值班") {
            $(this).find(".wjj").css("background", "#2da1bc")
        }
        if ($(this).find(".wjj").text() == "教室") {
            $(this).find(".wjj").css("background", "#aed595")
        }
    });
    $('.wjj').each(function() {
        $(this).click(function() {
            var key = escape($(this).text());
            OnSearchCheckAndSubmit(key)
        })
    })
});