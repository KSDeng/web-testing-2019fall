(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(factory);
  } else if (typeof exports === 'object') {
    // CommonJS
    module.exports = factory;
  } else {
    // Browser globals (Note: root is window)
    root.wishabi = factory(root);
  }
}(this, function (root) {
  // Constants
  var Sizing = {
    'FIXED': 600,
    'WINDOW': 'window',
    'HEADER': 'header',
    'PAGE': 'page'
  };

  var ForwardParams = [
    'flyer_run_id',
    'flyer_item_id',
    'locale',
    'postal_code',
    'store_code',
    'auto_locate',
    'auto_store',
    'auto_flyer',
    'sort_by',
    'hide',
    'lon',
    'lat',
    'zoom',
    'page',
    'store_group_id',
    'test_shopping_cart_integration',
    'show_shopping_list_integration',
    'show_shopping_list',
    'chrome',
    'mobile_layout_name',
    'preview_feature',
    'google_store_code',
    'sku',
    'pop_item',

    // for google tracking
    'utm_source',
    'utm_medium',
    'utm_term',
    'utm_content',
    'utm_campaign',


    // for gma tracking
    'gma_flyer_id',
    'gma_flyer_item_id',
    'gma_ad_tag',
    'gma_audience_tag',
    'gma_campaign_tag',
    'gma_bandwidth',
    'gma_fsa',




    // for personalization
    'segment'
  ];
  function getHeight (el) {
    var styles = window.getComputedStyle(el);
    var height = el.offsetHeight;
    var borderTopWidth = parseFloat(styles.borderTopWidth);
    var borderBottomWidth = parseFloat(styles.borderBottomWidth);
    var paddingTop = parseFloat(styles.paddingTop);
    var paddingBottom = parseFloat(styles.paddingBottom);
    return height - borderBottomWidth - borderTopWidth - paddingTop - paddingBottom;
  }

  function getOffset (el) {
    var box = el.getBoundingClientRect();
    return {
      top: box.top + window.pageYOffset - document.documentElement.clientTop,
      left: box.left + window.pageXOffset - document.documentElement.clientLeft
    }
  }

  function scrollTop(el, opt_position) {
    if (opt_position) {
      el.scrollTop = opt_position;
    }
    return el.scrollTop;
  }

  // Exposed public methods
  function resizeFixed(iframe, sizing, extraPadding) {

    // Resize the iframe to the set height
    var height = sizing - extraPadding;

    return function() {
      iframe.setAttribute('height', height + 'px');
    };
  }

  function resizeWindow(iframe, minus, minHeight) {

    return function() {
      var windowHeight = window.innerHeight;
      var height = windowHeight - minus;

      iframe.setAttribute('height', Math.max(minHeight, height) + 'px');
    };
  }

  function resizePage(iframe, options) {
    return function(e) {
      if (e.source !== iframe.contentWindow)
        return;

      try {
        // Deserialized data
        var data = JSON.parse(e.data);

        if (data && data.hasOwnProperty('type') && (typeof data.type === 'string')) {
          if (data.type == 'page_ratio') {
            // Target height
            var targetHeight = Math.max(options.minHeight, data.pageHeight);

            // Get the ratio between the current width and the median page.
            var resizeOnce = wishabi.hostedservices.iframe.resizeFixed(
                iframe, targetHeight, options.extraPadding);

            resizeOnce();
          } else if (data.type == 'window_scroll_request') {
            var html = document.documentElement;
            var body = document.body;
            var iframeOffset = getOffset(iframe);
            var styles = {
              scrollTop: iframeOffset.top + data.scroll_top
            };

            scrollTop(html, styles.scrollTop);
            scrollTop(body, styles.scrollTop);

          } else if (data.type == 'window_height_request') {
            iframe.style.overflowY = 'hidden';
            iframe.setAttribute('scrolling',"no");

            var resizeOnce = wishabi.hostedservices.iframe.resizeFixed(
                iframe, data.viewport_height, options.extraPadding);

              resizeOnce();
          } else if (data.type == 'refresh_request') {
            var iframeOffset = getOffset(iframe);
            var windowScrollTop = window.scrollY || document.documentElement.scrollTop;
            var scrollMsg = {
              'type': 'window_scroll_height',
              'scroll_top': windowScrollTop - iframeOffset.top,
              'viewport_height': window.innerHeight,
              'iframe_top': iframeOffset.top,
              'iframe_min_height': parseInt(iframe.style.minHeight, 10),
              'iframe_container_width': iframe.parentNode.clientWidth
            };

            if (iframe.contentWindow && iframe.contentWindow.postMessage) {
              iframe.contentWindow.postMessage(JSON.stringify(scrollMsg), '*');
            }
          }
        }
      } catch (error) {
        console.log('event data is not JSON format');
      }

      return;

    };
  }

  function decorate(div, flyerIdentifier, sizing, options) {
    options = options || {};
    options.extraPadding = options.extraPadding       || 0;
    options.minHeight = options.minHeight             || 0;
    options.initialHeight = options.initialHeight     || 0;
    options.queryParameters = options.queryParameters || '';

    // Make sure the minimum height at least fits the viewport + margin
    // on mobile
    if (screen.height < 700 && options.minHeight > screen.height * 0.9) {
      options.minHeight = 0;
    }

    // Read parameters from the containing page.
    var parentParams = {};
    var search = window.location.search;
    if (search && search.length > 0) {
      search = search.slice(1);
      var split = search.split('&');
      for(var i = 0; i < split.length; i++) {
        var pair = split[i].split('=');
        parentParams[pair[0]] = pair[1];
      }
    }

    if (parentParams['preview_code'])
      options.exclusivePreviewCode = parentParams['preview_code'];

    // Set the shared flyer item id if it exists.
    if (parentParams['share_flyer_item_id'])
      options.shareFlyerItemId = parentParams['share_flyer_item_id'];

    // Set the flyer type name in the identifier if it exists.
    if (parentParams['flyer_type_name']) {
      // Strip all non alphanumeric characters.
      var flyerTypeName = parentParams['flyer_type_name'].replace(/\W/g, '')

      // Remove any old flyer type in the old identifier.
      var nameIndex = flyerIdentifier.indexOf('-');
      if (nameIndex > -1) {
        flyerIdentifier = flyerIdentifier.substring(0, nameIndex);
      }

      // Set the new flyer type name.
      flyerIdentifier += '-' + flyerTypeName;
    }

    // Filter for parameters.
    var paramPairs = [];
    for (var param in parentParams) {
      var found = false;

      // Check param is in source list
      for(var i = 0;
          i < wishabi.hostedservices.iframe.ForwardParams.length; i++) {
        if (wishabi.hostedservices.iframe.ForwardParams[i] == param) {
          found = true;
          break;
        }
      }

      // If we found this in the whitelist, pass on.
      if (found) {
        paramPairs.push(param + '=' + parentParams[param]);
      }
    }

    // Construct the filtered additonal parameters to the query parameters.
    var parentSearch = paramPairs.join('&');


    // Get the div from the identifier or passed element.
    if ('string' == typeof div) {
      div = document.getElementById(div);
    }

    if (!div) {
      throw('No div found to render the flyer into.');
    }

    // Construct the url.
    var url = 'https://weeklyads.walmart.com';

    if (options.exclusivePreviewCode) {
      url = url + '/preview/' + flyerIdentifier + '?type=2&preview_code=' +
          options.exclusivePreviewCode;
    }
    else if (options.shareFlyerItemId){
      url = url + '/flyers_share/' + flyerIdentifier + '/flyer_item/' +
          options.shareFlyerItemId + '?type=2';

    } else {
      url = url + '/flyers/' + flyerIdentifier + '?type=2';
    }

    // Remove ' characters at start and end of parameter string
    if (options.queryParameters[0] == "'") {
      options.queryParameters = options.queryParameters
          .slice(1, options.queryParameters.length-1);
    }

    // Attach the passed query params.
    if (options.queryParameters.length > 0){
      var params = options.queryParameters.split('&');
      for(var i = 0; i < params.length; i++){
        if (params[i].split('=')[0] != 'type') {
          url = url + '&' + params[i];
        }
      }
    }

    // Attach the parent query params.
    if (parentSearch.length > 0)
      url = url + '&' + parentSearch;

    // Clear out content.
    div.innerHTML = '';

    // Insert styles.
    var style =
        ".wishabi-iframe { border: none; }";
    div.insertAdjacentHTML('beforeend', "<style>" + style + "</style>");

    // Create the iframe.
    var iframe = document.createElement('iframe');
    iframe.setAttribute('id', 'flipp-iframe');
    iframe.setAttribute('title', 'flipp-iframe');
    iframe.setAttribute('frameBorder', '0');
    iframe.setAttribute('allowTransparency', 'true');
    iframe.setAttribute('scrolling', 'no');
    iframe.setAttribute('width', '100%');
    iframe.style.minHeight = parseInt(options.minHeight, 10) + "px";
    iframe.setAttribute('src', url);
    window.iframm = iframe;

    var divOffset = getOffset(div);

    // Get the appropriate resize function.
    var resizeFn;
    if (sizing == wishabi.hostedservices.iframe.Sizing.PAGE) {
      // Listen for the postMessage from the iframe with the proper size.
      window.addEventListener('message',
          wishabi.hostedservices.iframe.resizePage(iframe, options));

      var resizeOnce = wishabi.hostedservices.iframe.resizeFixed(
          iframe, options.initialHeight, options.extraPadding);
      resizeOnce();
    } else if (sizing == wishabi.hostedservices.iframe.Sizing.WINDOW) {
      resizeFn = wishabi.hostedservices.iframe.resizeWindow(
          iframe, options.extraPadding, options.minHeight);
    } else if (sizing == wishabi.hostedservices.iframe.Sizing.HEADER) {
      var padding = options.extraPadding;
      padding = padding + (divOffset.top || 0);

      resizeFn = wishabi.hostedservices.iframe.resizeWindow(
          iframe, padding, options.minHeight);
    } else {
      resizeFn = wishabi.hostedservices.iframe.resizeFixed(
          iframe, sizing, options.extraPadding);
    }

    if (resizeFn) {
      resizeFn();

      // Listen to the resize event of the page.
      window.addEventListener('resize', resizeFn);
    }

    var msgIframe = function() {
      var iframeOffset = getOffset(iframe);
      var windowScrollTop = window.scrollY || document.documentElement.scrollTop;
      var scrollMsg = {
        'type': 'window_scroll_height',
        'scroll_top': windowScrollTop - iframeOffset.top,
        'viewport_height': window.innerHeight,
        'iframe_top': iframeOffset.top,
        'iframe_min_height': parseInt(iframe.style.minHeight, 10),
        'iframe_container_width': iframe.parentNode.clientWidth
      };

      if (iframe.contentWindow && iframe.contentWindow.postMessage) {
        iframe.contentWindow.postMessage(JSON.stringify(scrollMsg), '*');
      }
    };

    // Listen to scroll and post messages to the iframe
    window.addEventListener('scroll', msgIframe);
    window.addEventListener('orientationchange', msgIframe);
    window.addEventListener('resize', msgIframe);

    // Send over undrag events
    var msgDragEnd = function() {
      var scrollMsg = {
        'type': 'force_drag_end'
      };

      if (iframe.contentWindow && iframe.contentWindow.postMessage) {
        iframe.contentWindow.postMessage(JSON.stringify(scrollMsg), '*');
      }
    };

    iframe.addEventListener('mouseleave', msgDragEnd);

    // Append the iframe to the container div.
    div.appendChild(iframe);

    return;
  }

  return {
    'hostedservices' : {
      'iframe' : {
        'Sizing' : Sizing,
        'ForwardParams' : ForwardParams,
        'resizeFixed' : resizeFixed,
        'resizeWindow' : resizeWindow,
        'resizePage' : resizePage,
        'decorate' : decorate
      }
    }
  };
}));