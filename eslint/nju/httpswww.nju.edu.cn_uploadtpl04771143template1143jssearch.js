$(function() {
    var articleUrl = "/_wp3services/generalQuery?queryObj=articles";
    loadContents();
    function loadContents() {
        $(".post-61").find("ul.news_list").children().remove();
        var orderData = [{
            field: 'top',
            type: 'desc'
        }, {
            field: 'hot',
            type: 'desc'
        }, {
            field: 'visitCount',
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
                columnId: 24739,
                pageIndex: 1,
                rows: 14,
                orders: orders,
                returnInfos: returnInfos
            },
            success: function(result) {
                var total = result.total;
                var html = '';
                if (result != null) {
                    for (j = 0; j < result.data.length; j++) {
                        var art = result.data[j];
                        if ((typeof(art.topImg) != 'undefined') && (typeof(art.hotImg) != 'undefined')) {
                            html += '<li class="news n1 clearfix">   <span class="news_title"><a href="' + art.url + '" target="_blank" title="' + art.title + '">' + art.title + '</a></span>   <span class="news_top">' + art.topImg + '</span>   <span class="news_hot">' + art.hotImg + '</span></li>'
                        } else if (typeof(art.topImg) != 'undefined') {
                            html += '<li class="news n1 clearfix">   <span class="news_title"><a href="' + art.url + '" target="_blank" title="' + art.title + '">' + art.title + '</a></span>   <span class="news_top">' + art.topImg + '</span></li>'
                        } else if (typeof(art.hotImg) != 'undefined') {
                            html += '<li class="news n1 clearfix">   <span class="news_title"><a href="' + art.url + '" target="_blank" title="' + art.title + '">' + art.title + '</a></span>   <span class="news_hot">' + art.hotImg + '</span></li>'
                        } else {
                            html += '<li class="news n1 clearfix">   <span class="news_title"><a href="' + art.url + '" target="_blank" title="' + art.title + '">' + art.title + '</a></span></li>'
                        }
                    }
                    $(".post-61").find("ul.news_list").append(html)
                }
            }
        })
    }
   
    function returnData() {
        var returnInfosdata = [{
            field: "title",
            pattern: [{
                name: "lp",
                value: "30"
            }],
            name: "title"
        }, {
            field: "publishTime",
            pattern: [{
                name: "d",
                value: "yyyy-MM-dd"
            }],
            name: "publishTime"
        }, {
            field: "topImg",
            name: "topImg"
        }, {
            field: "hotImg",
            name: "hotImg"
        }, ];
        return returnInfosdata
    }
});