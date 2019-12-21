 var OOo = {
    __detectBrowser: function (a) {
        var b = "[object Opera]" === Object.prototype.toString.call(window.opera);
        a = {
            IE: !! window.attachEvent && !b,
            Opera: b,
            WebKit: -1 < a.indexOf("AppleWebKit/"),
            Chrome: -1 < a.indexOf("Chrome"),
            Gecko: -1 < a.indexOf("Gecko") && -1 === a.indexOf("KHTML"),
            MobileSafari: /Apple.*Mobile.*Safari/.test(a),
            PalmPre: -1 < a.indexOf("Pre/"),
            BlackBerry: -1 < a.indexOf("BlackBerry"),
            Fennec: -1 < a.indexOf("Fennec"),
            IEMobile: -1 < a.indexOf("IEMobile"),
            OperaMobile: -1 < a.search(/Opera (?:Mobi|Mini)/),
            Kindle: -1 < a.search(/[ ](Kindle|Silk)/),
            ua: a
        };
        a.isMobile = a.MobileSafari || a.PalmPre || a.BlackBerry || a.Fennec || a.IEMobile || a.OperaMobile || a.Kindle;
        return a
    }
};
OOo.Browser = OOo.__detectBrowser(navigator.userAgent);
OOo.Cache = {};
OOo.instanceCount = 0;
OOo.K = function () {};
var OnlineOpinion = OnlineOpinion || OOo;
(function () {
    function a(a, b) {
        for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c]);
        return a
    }

    function b(a) {
        var b = [],
            c;
        for (c in a) a.hasOwnProperty(c) && b.push(c + "\x3d" + (encodeURIComponent(a[c]) || ""));
        return b.join("\x26")
    }

    function c(a) {
        var c = b(a.metrics),
            c = c + ("\x26custom_var\x3d" + OOo.createLegacyVars(a.legacyVariables, a.tealeafId + "|" + a.clickTalePID + "/" + a.clickTaleUID + "/" + a.ClickTaleGetSID));
        "OnPage" === a.metrics.type && (c += "|iframe");
        a.asm && (c += "\x26asm\x3d2");
        c += "\x26_rev\x3d2";
        a.customVariables && (c += "\x26customVars\x3d" +
            encodeURIComponent(OOo.serialize(a.customVariables)));
        return c
    }
    var d = function () {
        var a = document.body,
            b, c, d, f;
        if (document.createElement && a && a.appendChild && a.removeChild) {
            b = document.createElement("div");
            if (!b.getBoundingClientRect) return null;
            b.innerHTML = "x";
            b.style.cssText = "position:fixed;top:100px;";
            a.appendChild(b);
            c = a.style.height;
            d = a.scrollTop;
            a.style.height = "3000px";
            a.scrollTop = 500;
            f = b.getBoundingClientRect().top;
            a.style.height = c;
            c = 100 === f;
            a.removeChild(b);
            a.scrollTop = d;
            return c
        }
        return null
    }(),
        f = function () {
            if ("Microsoft Internet Explorer" === navigator.appName && -1 !== navigator.userAgent.search("MSIE 6")) return !0;
            var a = document.body,
                b, c;
            return document.createElement && a && a.appendChild && a.removeChild ? (b = document.createElement("iframe"), b.setAttribute("name", "oo_test"), b.style.display = "none", a.appendChild(b), c = !document.getElementsByName("oo_test")[0], a.removeChild(b), c) : null
        }();
    a(OOo, {
        extend: a,
        toQueryString: b,
        addEventListener: function (a, b, c, d) {
            a.addEventListener ? a.addEventListener(b, c, d) : a.attachEvent &&
                a.attachEvent("on" + b, c)
        },
        $: function (a) {
            return document.getElementById(a)
        },
        appendOOForm: function (a, b) {
            var d = document,
                f = d.createElement("form"),
                m = d.createElement("input"),
                o = a.referrerRewrite;
            a.metrics.referer = location.href;
            o && (a.metrics.referer = OOo.referrerRewrite(o));
            f.style.display = "none";
            f.method = "post";
            f.target = b || "OnlineOpinion";
            f.action = a.onPageCard ? "https://secure.opinionlab.com/ccc01/comment_card_json_4_0_b.asp?r\x3d" + location.href : "https://secure.opinionlab.com/ccc01/comment_card_d.asp";
            a.commentCardUrl &&
                (f.action = a.commentCardUrl, a.onPageCard && (f.action += "?r\x3d" + location.href));
            m.name = "params";
            m.value = c(a);
            f.appendChild(m);
            d.body.appendChild(f);
            return f
        },
        removeEventListener: function (a, b, c, d) {
            a.removeEventListener ? a.removeEventListener(b, c, d) : a.detachEvent && a.detachEvent("on" + b, c)
        },
        createMetrics: function () {
            return {
                width: screen.width,
                height: screen.height,
                referer: location.href,
                prev: document.referrer,
                time1: (new Date).getTime(),
                time2: null,
                currentURL: location.href,
                ocodeVersion: "5.6.6"
            }
        },
        truncateMetric: function (a) {
            var b =
                "";
            if (a && -1 < a.search("://")) {
                a = a.split("/");
                for (i = 3; i < a.length; i++) b += "/", b += a[i]
            }
            return b
        },
        createLegacyVars: function (a, b) {
            a = a || {};
            return "string" === typeof a ? b + "|" + a : a.override ? a.vars : b + (a.vars ? "|" + a.vars : "")
        },
        POSITION_FIXED_SUPPORTED: d,
        DYNAMIC_FRAME_NAME_IS_BUGGY: f,
        getFormParams: c,
        referrerRewrite: function (a, b) {
            b || (b = location);
            return "string" === typeof a ? a : a.searchPattern ? b.href.replace(a.searchPattern, a.replacePattern) : a.replacePattern
        },
        hidePrompt: function () {
            OOo.$("oo_container").style.display = "none"
        },
        getPrompt: function () {
            if (OOo.$("oo_invitation_prompt")) {
                var a = OOo.$("oo_container");
                this.showPrompt(a)
            } else {
                var b = window.XMLHttpRequest ? new XMLHttpRequest : new window.ActiveXObject("Microsoft.XMLHTTP"),
                    c = this;
                document.createElement("link");
                b.onreadystatechange = function () {
                    4 === b.readyState && c.showPrompt(b.responseText)
                };
                b.open("GET", this.options.pathToAssets + this.options.promptMarkup, !0);
                b.send(null)
            }
        },
        showPrompt: function (a, b) {
            var c = document,
                d = "string" === typeof a ? c.createElement("div") : a,
                f = c.createElement("div"),
                o = this.options,
                r;
            f.id = "oo_invitation_overlay";
            d.id = "oo_container";
            d.style.visibility = "hidden";
            "string" === typeof a && (d.innerHTML = a, c.body.appendChild(d));
            d.appendChild(f);
            r = OOo.$("oo_launch_prompt");
            o.companyLogo && (c = new Image, c.src = o.companyLogo, OOo.$("oo_company_logo").appendChild(c));
            OOo.addEventListener(r, "click", b.bind(this), !1);
            o.clickCallbacks && ("function" === typeof o.clickCallbacks.yes && OOo.addEventListener(r, "click", function () {
                    o.clickCallbacks.yes()
                }, !1), "function" === typeof o.clickCallbacks.no &&
                OOo.addEventListener(OOo.$("oo_no_thanks"), "click", function () {
                    o.clickCallbacks.no()
                }, !1));
            o.neverShowAgainButton && (c = OOo.$("oo_never_show"), c.style.visibility = "visible", OOo.addEventListener(c, "click", this.killPrompt.bind(this), !1));
            OOo.Browser.IE && !window.XMLHttpRequest && (f.style.position = "absolute", f.style.width = Math.max(document.documentElement.clientWidth, document.body.offsetWidth) + "px", f.style.height = Math.max(document.documentElement.clientHeight, document.body.offsetHeight) + "px", d.style.position =
                "absolute");
            d.style.visibility = "visible";
            d.style.display = "block";
            f.className = "no_loading"
        }
    })
})();
(function () {
    function a(b) {
        if (!b) return null;
        switch (typeof b) {
        case "number":
        case "boolean":
        case "function":
            return b;
        case "string":
            return "'" + b + "'";
        case "object":
            var c, d, f;
            if (b.constructor === Array || "undefined" !== typeof b.callee) {
                c = "[";
                f = b.length;
                for (d = 0; d < f - 1; d += 1) c += a(b[d]) + ",";
                c += a(b[d]) + "]"
            } else {
                c = "{";
                for (d in b) b.hasOwnProperty(d) && (c += d + ":" + a(b[d]) + ",");
                c = c.replace(/\,$/, "") + "}"
            }
            return c;
        default:
            return null
        }
    }
    OOo.extend(OOo, {
        serialize: a
    })
})();
(function () {
    OOo.extend(OOo, {
        checkTunnel: function (a, b, c) {
            var d;
            if (-1 !== a.search(b[0])) return OOo.createCookie(c, 0), !1;
            if (OOo.readCookie(c)) {
                d = parseInt(OOo.readCookie(c), 10);
                if (-1 !== a.search(b[d + 1]) && d + 1 !== b.length - 1) return OOo.createCookie(c, d + 1), !1;
                if (-1 !== a.search(b[d])) return !1;
                if (d + 1 === b.length - 1 && -1 !== a.search(b.pop())) return OOo.eraseCookie(c), !0;
                OOo.eraseCookie(c)
            }
            return !1
        }
    })
})();
(function () {
    function a(a) {
        var b = "",
            f;
        for (f = 7; 0 <= f; f -= 1) b += "0123456789abcdef".charAt(a >> 4 * f & 15);
        return b
    }

    function b(a, b) {
        var f = (a & 65535) + (b & 65535);
        return (a >> 16) + (b >> 16) + (f >> 16) << 16 | f & 65535
    }
    OOo.extend(OOo, {
        sha1: function (c) {
            var d = (c.length + 8 >> 6) + 1,
                f = Array(16 * d),
                e;
            for (e = 0; e < 16 * d; e += 1) f[e] = 0;
            for (e = 0; e < c.length; e += 1) f[e >> 2] |= c.charCodeAt(e) << 24 - 8 * (e % 4);
            f[e >> 2] |= 128 << 24 - 8 * (e % 4);
            f[16 * d - 1] = 8 * c.length;
            c = Array(80);
            d = 1732584193;
            e = -271733879;
            var h = -1732584194,
                j = 271733878,
                l = -1009589776,
                m, o, r, p, y, B, k, n;
            for (k = 0; k <
                f.length; k += 16) {
                m = d;
                o = e;
                r = h;
                p = j;
                y = l;
                for (n = 0; 80 > n; n += 1) {
                    c[n] = 16 > n ? f[k + n] : (c[n - 3] ^ c[n - 8] ^ c[n - 14] ^ c[n - 16]) << 1 | (c[n - 3] ^ c[n - 8] ^ c[n - 14] ^ c[n - 16]) >>> 31;
                    B = d << 5 | d >>> 27;
                    var t;
                    t = 20 > n ? e & h | ~e & j : 40 > n ? e ^ h ^ j : 60 > n ? e & h | e & j | h & j : e ^ h ^ j;
                    B = b(b(B, t), b(b(l, c[n]), 20 > n ? 1518500249 : 40 > n ? 1859775393 : 60 > n ? -1894007588 : -899497514));
                    l = j;
                    j = h;
                    h = e << 30 | e >>> 2;
                    e = d;
                    d = B
                }
                d = b(d, m);
                e = b(e, o);
                h = b(h, r);
                j = b(j, p);
                l = b(l, y)
            }
            return a(d) + a(e) + a(h) + a(j) + a(l)
        }
    })
})();
(function () {
    OOo.extend(OOo, {
        checkAbandonment: function (a, b) {
            b || (b = location);
            var c = a.cookieName || "oo_abandon",
                d = OOo.readCookie(c),
                f = a.startPage,
                e = a.endPage,
                h = a.middle;
            if (d) {
                if (-1 !== b.pathname.indexOf(e)) return OOo.eraseCookie(c), !1;
                if (-1 !== b.pathname.search(h)) return !1;
                OOo.eraseCookie(c);
                return !0
            } - 1 !== b.pathname.indexOf(f) && OOo.createCookie(c);
            return !1
        }
    })
})();
(function () {
    OOo.extend(OOo, {
        checkThirdPartyCookies: function (a) {
            var b, c;
            for (b = a.length - 1; 0 <= b; b -= 1)
                if (a[b].read && ((c = OOo.readCookie(a[b].name)) && c === a[b].value || "undefined" === typeof a[b].value && OOo.readCookie(a[b].name))) return !0;
            return !1
        },
        setThirdPartyCookies: function (a) {
            var b;
            for (b = a.length - 1; 0 <= b; b -= 1) a[b].set && OOo.createCookie(a[b].name, a[b].value, a[b].expiration)
        }
    })
})();
OOo.extend(Function.prototype, function () {
    function a(a) {
        if (2 > arguments.length && "undefined" === typeof a) return this;
        var d = this,
            f = b.call(arguments, 1);
        return function () {
            for (var e = f, h = arguments, e = b.call(e, 0), j = e.length, l = h.length; l;) l -= 1, e[j + l] = h[l];
            return d.apply(a, e)
        }
    }
    if ("undefined" === typeof Function.prototype.bind) {
        var b = Array.prototype.slice;
        return {
            bind: a
        }
    }
}());
(function () {
    function a(a) {
        a || (a = location);
        var b;
        if (-1 !== a.host.search(/\.[a-z]+/)) {
            b = a.host.split(".").reverse();
            if (3 < b.length) return a.host;
            b = "." + b[1] + "." + b[0]
        } else b = a.host;
        return b
    }

    function b(b, d, f) {
        var e = "",
            e = "";
        f && (e = new Date, e.setTime(e.getTime() + 1E3 * f), e = "; expires\x3d" + e.toGMTString());
        document.cookie = location.host !== a() ? b + "\x3d" + d + e + "; path\x3d/; domain\x3d" + a() + ";" : b + "\x3d" + d + e + "; path\x3d/;"
    }
    OOo.extend(OOo, {
        getCookieDomain: a,
        createCookie: b,
        readCookie: function (a) {
            a += "\x3d";
            var b = document.cookie.split(";"),
                f, e;
            for (e = 0; e < b.length; e += 1) {
                for (f = b[e];
                    " " === f.charAt(0);) f = f.substring(1, f.length);
                if (0 === f.indexOf(a)) return f.substring(a.length, f.length)
            }
            return null
        },
        eraseCookie: function (a) {
            b(a, "", -1)
        }
    })
})();
OOo.Ocode = function (a) {
    var b = OOo.Browser;
    if (!a.disableMobile || !b.isMobile)
        if (!a.disableNoniOS || !(-1 !== navigator.userAgent.search("Android") || b.PalmPre || b.IEMobile || b.OperaMobile || b.Fennec || b.Kindle))
            if (OOo.instanceCount += 1, this.options = {
                tealeafCookieName: "TLTSID"
            }, OOo.extend(this.options, a), a = this.options, a.metrics = OOo.createMetrics(), this.frameName = a.onPageCard ? "OnlineOpinion" + OOo.instanceCount : "OnlineOpinion", !a.cookie || !OOo.Ocode.matchUrl(a.cookie, location))
                if (!a.thirdPartyCookies || !OOo.checkThirdPartyCookies(a.thirdPartyCookies))
                    if (!a.abandonment ||
                        OOo.checkAbandonment(a.abandonment))
                        if (!a.tunnel || OOo.checkTunnel(location.pathname, a.tunnel.path, a.tunnel.cookieName)) a.events && a.events.onSingleClick && (this.singProbability = Math.random() < 1 - a.events.onSingleClick / 100), a.tealeafId = OOo.readCookie(a.tealeafCookieName) || OOo.readCookie(a.sessionCookieName), a.events && (this.setupEvents(), (a.events.disableLinks || a.events.disableFormElements) && this.setupDisableElements()), a.floating ? this.floating() : a.bar ? this.bar() : a.tab && this.tab()
};
OOo.Ocode.prototype = {
    show: function (a, b) {
        "Tab" === a && (b && b.preventDefault) && b.preventDefault();
        if (!this.onPageCardVisible) {
            var c = this.options;
            c.events && c.events.prompt && (c.cookie && OOo.eraseCookie(c.cookie.name || "oo_r"), OOo.hidePrompt());
            if (!this.interruptShow && (this.floatingLogo || !c.cookie || !OOo.Ocode.matchUrl(c.cookie)))
                if (c.floating || !c.events || !this.singProbability) {
                    c.events && c.events.onSingleClick && (this.singProbability = !0);
                    c.cookie && OOo.Ocode.tagUrl(c.cookie);
                    if (c.thirdPartyCookies) {
                        if (OOo.checkThirdPartyCookies(c.thirdPartyCookies)) return;
                        OOo.setThirdPartyCookies(c.thirdPartyCookies)
                    }
                    this.floatingLogo && this.floatingLogo.children[0].blur();
                    this.floatingLogo && c.disappearOnClick && (this.floatingLogo.style.display = "none");
                    a && (c.metrics.trigger = a);
                    c.clickTalePID && "function" === typeof window.ClickTale && (c.clickTaleUID = window.ClickTaleGetUID(), c.clickTaleSID = window.ClickTaleGetSID());
                    c.onPageCard ? this.setupOnPageCC() : this.launchOOPopup();
                    if ((c = c.floating || c.tab || c.bar) && "function" === typeof c.onClickCallback) c.onClickCallback();
                    if (OOo.Browser.IE) return !1
                }
        }
    }
};
OOo.extend(OOo.Ocode, {
    tagUrl: function (a, b) {
        b || (b = location);
        var c = a.name || "oo_r",
            d = "page" === a.type ? b.href : b.hostname,
            f = OOo.readCookie(c) || "";
        OOo.Ocode.matchUrl(a, b) || OOo.createCookie(c, f + OOo.sha1(d), a.expiration)
    },
    matchUrl: function (a, b) {
        b || (b = location);
        var c = OOo.readCookie(a.name || "oo_r");
        return !c ? !1 : -1 !== c.search(OOo.sha1("page" === a.type ? b.href : b.hostname))
    }
});
(function () {
    var a = 0;
    OOo.extend(OOo.Ocode.prototype, {
        launchOOPopup: function () {
            var b = this.options,
                c = b.newWindowSize || [545, 325],
                d = [parseInt((b.metrics.height - c[1]) / 2, 10), parseInt((b.metrics.width - c[0]) / 2, 10)],
                d = "location\x3dno,status\x3dno,width\x3d" + c[0] + ",height\x3d" + c[1] + ",top\x3d" + d[0] + ",left\x3d" + d[1];
            ie7 = OOo.Browser.IE && -1 !== navigator.userAgent.search("MSIE 7");
            windowName = "OnlineOpinion";
            b.newWindow && (windowName += a++);
            b.metrics.time2 = (new Date).getTime();
            b.metrics.type = "Popup";
            b.asm && (d += ",scrollbars\x3d1");
            c = OOo.appendOOForm(b, windowName);
            window.open(ie7 ? b.commentCardUrl || "https://secure.opinionlab.com/ccc01/comment_card_d.asp?" + c.children[0].value : "", windowName, d) && !ie7 && c.submit()
        }
    })
})();
(function () {
    function a(a) {
        a = a.target || a.srcElement;
        for (var b = this.options.events, f = a.parentNode, e = 0; f && ("A" !== a.nodeName || "INPUT" !== a.nodeName) && 5 !== e;) "A" === f.nodeName && (a = f), f = f.parentNode, e += 1;
        if (b.disableFormElements && ("INPUT" === a.tagName || "BUTTON" === a.tagName) && ("submit" === a.type || "image" === a.type || "reset" === a.type || "button" === a.type)) this.interruptShow = !0;
        if (b.disableLinks && ("A" === a.nodeName || "AREA" === a.nodeName) && "http" === a.href.substr(0, 4) && -1 !== a.href.search(b.disableLinks)) this.interruptShow = !0
    }

    function b() {
        this.interruptShow = !0
    }
    OOo.extend(OOo.Ocode.prototype, {
        setupEvents: function () {
            var a = this.options.events,
                b = [!1, !1],
                f = ["onExit", "onEntry"],
                e = OOo.Browser.Opera ? "unload" : "beforeunload",
                h, j, l;
            a.prompt && OOo.extend(this.options, {
                promptMarkup: a.prompt.promptMarkup || "oo_event_prompt.html",
                neverShowAgainButton: !1,
                pathToAssets: a.prompt.pathToAssets
            });
            for (j = f.length - 1; 0 <= j; j -= 1)
                if (h = f[j], a[h] instanceof Array) {
                    h = a[h];
                    for (l = h.length; l && !b[j];) l -= 1, -1 !== window.location.href.search(h[l].url) && Math.random() >=
                        1 - h[l].p / 100 && (b[j] = !0)
                } else a[h] && Math.random() >= 1 - a[h] / 100 && (b[j] = !0);
            b[0] && OOo.addEventListener(window, e, this.show.bind(this, "onExit"), !1);
            b[1] && (a.delayEntry ? window.setTimeout(function () {
                a.prompt ? this.getPrompt() : this.show()
            }.bind(this, "onEntry"), 1E3 * a.delayEntry) : a.prompt ? this.getPrompt() : this.show("onEntry"))
        },
        setupDisableElements: function () {
            OOo.addEventListener(document.body, "mousedown", a.bind(this));
            if (this.options.events.disableFormElements) {
                var c = document.getElementsByTagName("form"),
                    d;
                for (d = c.length - 1; 0 <= d; d -= 1) OOo.addEventListener(c[d], "submit", b.bind(this))
            }
        },
        getPrompt: function () {
            OOo.getPrompt.call(this)
        },
        showPrompt: function (a) {
            this.options.cookie && OOo.Ocode.tagUrl(this.options.cookie);
            OOo.showPrompt.call(this, a, this.show)
        }
    })
})();
OOo.extend(OOo.Ocode.prototype, {
    floating: function () {
        function a() {
            k.style.left = m.offsetLeft + m.offsetWidth + "px"
        }

        function b() {
            d.style.top = (c.documentElement.scrollTop || c.body.scrollTop) + (c.documentElement.clientHeight || document.body.clientHeight) - (D || 0) - 10 + "px"
        }
        var c = document,
            d = this.floatingLogo = document.createElement("div"),
            f = c.createElement("div"),
            e = c.createElement("div"),
            h = c.createElement("div"),
            j = c.createElement("span"),
            l = this.options.floating,
            m = OOo.$(l.contentId),
            o = l.id,
            r = c.createElement("span"),
            p, y, B, k, n, t, D;
        r.innerHTML = "Screen reader users: Please switch to forms mode for this link.";
        r.className = "screen_reader";
        o && (d.id = o);
        d.className = "oo_feedback_float";
        e.className = "oo_transparent";
        f.className = "olUp";
        h.className = "olOver";
        f.tabIndex = 0;
        f.onkeyup = function (a) {
            p = a || window.event;
            13 === p.keyCode && this.show()
        }.bind(this);
        f.innerHTML = l.caption || "Feedback";
        d.appendChild(r);
        d.appendChild(f);
        j.innerHTML = l.hoverCaption || "Click here to\x3cbr\x3erate this page";
        h.appendChild(j);
        d.appendChild(h);
        d.appendChild(e);
        OOo.Browser.MobileSafari ? -1 !== OOo.Browser.ua.search("OS 4") && (y = window.innerHeight, d.style.bottom = null, d.style.top = window.pageYOffset + window.innerHeight - 60 + "px", f = function () {
            B = window.pageYOffset - (y - window.innerHeight);
            d.style.webkitTransform = "translateY(" + B + "px)"
        }, OOo.addEventListener(window, "scroll", f, !1), setTimeout(f, 100)) : OOo.POSITION_FIXED_SUPPORTED || (d.style.position = "absolute", d.style.bottom = "", OOo.addEventListener(window, "scroll", b, !1), OOo.addEventListener(window, "resize", b, !1), "BackCompat" ===
            c.compatMode && (d.style.background = "white"));
        if (l.position && l.position.search(/Content/) && m) {
            k = this.spacer = c.createElement("div");
            n = OOo.Browser.WebKit ? c.body : c.documentElement;
            k.id = "oo_feedback_fl_spacer";
            k.style.left = m.offsetLeft + m.offsetWidth + "px";
            c.body.appendChild(k);
            switch (l.position) {
            case "rightOfContent":
                t = function () {
                    d.style.left = m.offsetLeft + m.offsetWidth - n.scrollLeft + "px";
                    OOo.POSITION_FIXED_SUPPORTED || (t = null)
                };
                break;
            case "fixedPreserveContent":
                t = function () {
                    var a = OOo.POSITION_FIXED_SUPPORTED ?
                        n.scrollLeft : 0;
                    (OOo.Browser.IE ? c.body.clientWidth : window.innerWidth) <= m.offsetLeft + m.offsetWidth + d.offsetWidth + parseInt("10px", 10) ? d.style.left = m.offsetLeft + m.offsetWidth - a + "px" : (d.style.left = "", d.style.right = "10px")
                };
                break;
            case "fixedContentMax":
                t = function (a) {
                    (OOo.Browser.IE ? c.body.clientWidth : window.innerWidth) <= m.offsetLeft + m.offsetWidth + d.offsetWidth + parseInt("10px", 10) ? (d.style.left = "", d.style.right = "10px", !OOo.POSITION_FIXED_SUPPORTED && (a && "scroll" === a.type) && (d.style.left = c.body.clientWidth +
                        c.body.scrollLeft - 105 + "px")) : (d.style.left = m.offsetLeft + m.offsetWidth - n.scrollLeft + "px", d.style.right = "")
                }
            }
            window.setTimeout(t, 0);
            OOo.addEventListener(window, "scroll", t, !1);
            OOo.addEventListener(window, "resize", t, !1);
            OOo.addEventListener(window, "resize", a, !1)
        } else d.style.right = "10px";
        OOo.addEventListener(d, "click", this.show.bind(this, "Floating"), !1);
        OOo.addEventListener(d, "touchend", this.show.bind(this, "Floating"), !1);
        c.body.appendChild(d);
        !OOo.POSITION_FIXED_SUPPORTED && !OOo.Browser.MobileSafari &&
            (e.style.height = d.clientHeight + "px", D = d.clientHeight, setTimeout(b, 100))
    },
    removeFloatingLogo: function () {
        document.body.removeChild(this.floatingLogo);
        this.spacer && document.body.removeChild(this.spacer)
    }
});
OOo.extend(OOo.Ocode.prototype, {
    bar: function () {
        var a = document,
            b = this.floatingLogo = a.createElement("div"),
            c = a.createElement("span"),
            d, f, e, h = a.createElement("div");
        h.innerHTML = "Link opens comment card";
        h.className = "screen_reader";
        b.appendChild(h);
        this.reflowBar = OOo.K;
        b.id = "oo_bar";
        c.innerHTML = this.options.bar.caption || "Feedback";
        b.appendChild(c);
        b.tabIndex = 0;
        b.onkeyup = function (a) {
            13 === (a || window.event).keyCode && this.show()
        }.bind(this);
        OOo.addEventListener(b, "click", this.show.bind(this, "Bar"));
        document.body.className +=
            1 > document.body.className ? "oo_bar" : " oo_bar";
        document.body.appendChild(b);
        OOo.Browser.IE ? (d = "CSS1Compat" === a.compatMode ? function (c) {
            c && "resize" === c.type && setTimeout(d, 50);
            b.style.top = a.documentElement.scrollTop + document.documentElement.clientHeight - b.clientHeight - 1 + "px";
            b.style.width = Math.max(a.documentElement.clientWidth, a.body.offsetWidth) + "px"
        } : function () {
            b.style.top = a.body.scrollTop + document.body.clientHeight - b.clientHeight - 1 + "px";
            b.style.width = Math.max(a.documentElement.clientWidth, a.body.offsetWidth) -
                22 + "px"
        }, b.style.position = "absolute", OOo.addEventListener(window, "scroll", d, !1), OOo.addEventListener(window, "resize", d, !1), this.reflowBar = function () {
            b.style.display = "none";
            d();
            b.style.display = "block"
        }, d()) : OOo.Browser.MobileSafari && -1 !== OOo.Browser.ua.search("OS 4") && (f = window.innerHeight, b.style.bottom = null, b.style.top = window.pageYOffset + window.innerHeight - 22 + "px", d = function () {
            e = window.pageYOffset - (f - window.innerHeight);
            b.style.webkitTransform = "translateY(" + e + "px)"
        }, OOo.addEventListener(window, "scroll",
            d, !1), setTimeout(d, 100));
        OOo.addEventListener(document.body, "keyup", function () {
            var a = document.activeElement,
                c;
            if (a) {
                c = a;
                var d = curtop = 0;
                if (c.offsetParent) {
                    do d += c.offsetLeft, curtop += c.offsetTop; while (c = c.offsetParent);
                    c = [d, curtop]
                } else c = void 0;
                c && c[1] + a.clientHeight > (window.innerHeight || document.body.clientHeight) + (window.pageYOffset || document.body.scrollTop) - b.clientHeight && window.scrollBy(0, a.clientHeight + 20)
            }
        }, !1)
    }
});
OOo.extend(OOo.Ocode.prototype, {
    tab: function () {
        function a() {
            var a = c.documentElement.scrollLeft || c.body.scrollLeft;
            d.style.top = (c.documentElement.scrollTop || c.body.scrollTop) + ((c.documentElement.clientHeight || document.body.clientHeight) / 2 - d.clientHeight / 2) + "px";
            if (!j.position || "right" === j.position) d.style.right = -1 * a + 2 + "px"
        }

        function b() {
            d.style.top = pageYOffset + (innerHeight / 2 - d.clientHeight / 2) + "px";
            d.style.right = document.documentElement.clientWidth - window.innerWidth - window.pageXOffset - 15 + "px"
        }
        var c =
            document,
            d = this.floatingLogo = c.createElement("div"),
            f = c.createElement("div"),
            e = c.createElement("div"),
            h = c.createElement("span"),
            j = this.options.tab;
        d.id = "oo_tab";
        d.className = "oo_tab_" + (j.position || "right");
        if (!OOo.POSITION_FIXED_SUPPORTED && !OOo.Browser.MobileSafari && (d.style.position = "absolute", (!j.position || "right" === j.position) && OOo.Browser.IE)) d.className += " oo_tab_ie_right", -1 === OOo.Browser.ua.search("IE 6") && (OOo.addEventListener(window, "scroll", a, !1), OOo.addEventListener(window, "resize", a, !1));
        d.tabIndex = 0;
        d.onkeyup = function (a) {
            13 === (a || window.event).keyCode && this.show()
        }.bind(this);
        e.appendChild(h);
        d.appendChild(e);
        f.className = "screen_reader";
        f.innerHTML = "Activate to launch comment card";
        d.appendChild(f);
        OOo.addEventListener(d, "click", this.show.bind(this, "Tab"), !1);
        c.body.appendChild(d);
        OOo.Browser.MobileSafari && -1 !== OOo.Browser.ua.search("OS 4") && (d.style.position = "absolute", OOo.addEventListener(window, "scroll", b, !1), setTimeout(b, 100))
    }
});
OOo.extend(OOo.Ocode.prototype, {
    setupOnPageCC: function () {
        function a(a) {
            a && a.preventDefault && a.preventDefault();
            document.body.focus();
            l.tabIndex = -1;
            l.title = "empty";
            l["aria-hidden"] = "true";
            c.style.display = "none";
            c.className = "";
            b.body.removeChild(d);
            window.postMessage ? OOo.removeEventListener(window, "message", n) : window.clearInterval(y);
            B = !1;
            return k.onPageCardVisible = !1
        }
        var b = document,
            c = OOo.Cache.overlay || b.createElement("div"),
            d = this.wrapper = b.createElement("div"),
            f = b.createElement("div"),
            e = b.createElement("div"),
            h = b.createElement("span"),
            j = this.frameName,
            l = b.createElement(OOo.DYNAMIC_FRAME_NAME_IS_BUGGY ? '\x3ciframe name\x3d"' + j + '"\x3e' : "iframe"),
            m = b.createDocumentFragment(),
            o = this.options,
            r = o.onPageCard,
            p, y, B = !1,
            k = this,
            n, t, D;
        t = b.createElement("span");
        n = OOo.Ocode.postMessageHandler(function (e) {
            var f = parseInt(e, 10);
            if (0 < f) {
                if (B) return;
                B = !0;
                e = window.innerHeight || b.documentElement.clientHeight || b.body.clientHeight;
                D = d.offsetTop;
                f + D > e && (f = e - 40 - D, l.style.width = "555px");
                l.style.height = f + "px";
                d.style.visibility =
                    "visible";
                20 > h.clientHeight && (h.style.height = d.offsetHeight + "px");
                c.className = "no_loading";
                k.onPageCardVisible = !0;
                p && b.body.removeChild(p)
            } else "submitted" === e && a();
            OOo.Browser.IE && "BackCompat" === b.compatMode && window.scrollTo(0, 0)
        }, k.options.commentCardUrl);
        o.metrics.type = "OnPage";
        OOo.Cache.overlay = c;
        c.id = "oo_overlay";
        c.style.display = "block";
        c.className = "";
        e.className = "iwrapper";
        d.className = "oo_cc_wrapper";
        d.setAttribute("role", "alert");
        d.setAttribute("aria-describedby", "comment_card_description");
        t.className = "screen_reader";
        t.id = "comment_card_description";
        t.innerHTML = "Please leave your feedback in the comment card you just activated";
        d.appendChild(t);
        f.className = "oo_cc_close";
        f.innerHTML = '\x3cspan class\x3d"screen_reader"\x3eLink closes comment card\x3c/span\x3eX';
        f.title = "Click to close comment card";
        d.style.visibility = "hidden";
        f.tabIndex = 0;
        f.onkeyup = function (b) {
            13 === (b || window.event).keyCode && a()
        };
        if (OOo.Browser.IE && (l.frameBorder = "0", !window.XMLHttpRequest || "BackCompat" === b.compatMode)) t =
            Math.max(b.documentElement.clientWidth, b.body.offsetWidth), c.style.position = "absolute", c.style.width = "BackCompat" === b.compatMode ? t - 21 + "px" : t + "px", c.style.height = Math.max(b.documentElement.clientHeight, b.body.offsetHeight) + "px", d.style.position = "absolute", OOo.addEventListener(window, "scroll", function () {
                c.style.top = b.body.scrollTop + document.body.clientHeight - c.clientHeight + "px";
                d.style.top = b.body.scrollTop + D + 25 + "px"
            });
        OOo.addEventListener(f, "click", a);
        r.closeWithOverlay && !OOo.Browser.isMobile && (d.appendChild(h),
            h.onclick = a, c.onclick = a);
        l.src = " ";
        l.name = j;
        l.title = "Comment Card";
        e.appendChild(f);
        e.appendChild(l);
        d.appendChild(e);
        m.appendChild(d);
        m.appendChild(c);
        b.body.appendChild(m);
        window.postMessage ? OOo.addEventListener(window, "message", n) : y = setInterval(n, 500);
        o.metrics.time2 = (new Date).getTime();
        p = OOo.appendOOForm(o, j);
        p.submit()
    }
});
OOo.extend(OOo.Ocode, {
    postMessageHandler: function (a, b, c) {
        return function (d) {
            var f;
            c || (c = location);
            if (d && !("https://secure.opinionlab.com" === d.origin || 0 !== d.origin.indexOf(b)) || !d && -1 === c.hash.search("OL\x3d")) return !1;
            f = d ? d.data : c.hash.split("\x3d").pop();
            !d && location.hash && (location.hash = "");
            a(f);
            return f
        }
    }
});
OOo.Invitation = function (a) {
    if (!OOo.Browser.isMobile) {
        this.options = {
            tunnelCookie: "oo_inv_tunnel",
            repromptTime: 604800,
            responseRate: 50,
            repromptCookie: "oo_inv_reprompt",
            promptMarkup: "oo_inv_prompt.html",
            promptStyles: "oo_inverstitial_style.css",
            percentageCookie: "oo_inv_percent",
            pagesHitCookie: "oo_inv_hit",
            popupType: "popunder",
            promptDelay: 0,
            neverShowAgainButton: !1,
            loadPopupInBackground: !1,
            truncatePrevCurrentMetrics: !1,
            disablePrevCurrentMetrics: !1,
            tealeafCookieName: "TLTSID",
            monitorWindow: "oo_inv_monitor.html",
            beforePrompt: OOo.K
        };
        this.popupShown = !1;
        OOo.extend(this.options, a);
        var b = this.options;
        a = parseInt(OOo.readCookie(b.pagesHitCookie), 10) || 0;
        OOo.Invitation.friendlyDomains = b.friendlyDomains || null; - 1 !== location.search.search("evs") && (b.loadPopupInBackground = !0, this.launchPopup(), OOo.createCookie(b.repromptCookie, 1, -1 === b.repromptTime ? 0 : b.repromptTime));
        setTimeout(function () {
            window.oo_inv_monitor && (b.area && -1 === location.href.search(b.area) ? (this.options.popupType = "popup", this.launchPopup()) : b.goal && -1 !==
                location.href.search(b.goal) && window.oo_inv_monitor.close())
        }.bind(this), 1600);
        if (!OOo.readCookie(b.repromptCookie) && (!b.thirdPartyCookies || !OOo.checkThirdPartyCookies(b.thirdPartyCookies))) {
            OOo.readCookie(b.percentageCookie) || OOo.createCookie(b.percentageCookie, Math.random() > 1 - b.responseRate / 100 ? "1" : "0");
            if ("undefined" !== typeof b.promptTrigger)
                if (b.promptTrigger instanceof RegExp) {
                    if (!window.location.href.match(b.promptTrigger)) return
                } else if (b.promptTrigger instanceof Array && !OOo.checkTunnel(location.pathname,
                b.promptTrigger, b.tunnelCookie)) return;
            a += 1;
            OOo.createCookie(b.pagesHitCookie, a);
            b.pagesHit && a < b.pagesHit || (OOo.eraseCookie(b.tunnelCookie), "1" === OOo.readCookie(b.percentageCookie) && window.setTimeout(function () {
                OOo.createCookie(b.repromptCookie, 1, b.repromptTime);
                this.options.beforePrompt();
                this.getPrompt()
            }.bind(this), 1E3 * b.promptDelay))
        }
    }
};
OOo.Invitation.prototype = {
    getPrompt: function () {
        OOo.getPrompt.call(this)
    },
    showPrompt: function (a) {
        OOo.showPrompt.call(this, a, this.launchPopup)
    },
    launchPopup: function () {
        if (!this.popupShown) {
            this.popupShown = !0;
            var a = this.options,
                b = "popup" === a.popupType ? "https://secure.opinionlab.com/ccc01/comment_card.asp?" : a.pathToAssets + a.monitorWindow + "?" + (new Date).getTime() + "\x26",
                c, d = a.asm ? [555, 500] : [400, 335],
                f;
            c = OOo.createMetrics();
            var e = OOo.readCookie(a.tealeafCookieName);
            a.clickTalePID && (window.ClickTaleGetUID &&
                window.ClickTaleGetSID) && (e += "|" + [a.clickTalePID, window.ClickTaleGetUID(), window.ClickTaleGetSID()].join("/"));
            d = a.newWindowSize || d;
            d = "location\x3dno,status\x3dno,width\x3d" + d[0] + ",height\x3d" + d[1];
            a.referrerRewrite && (c.referer = OOo.referrerRewrite(a.referrerRewrite));
            a.truncatePrevCurrentMetrics && (c.prev = OOo.truncateMetric(c.prev), c.currentURL = OOo.truncateMetric(c.currentURL));
            a.disablePrevCurrentMetrics && (c.prev = "", c.currentURL = "");
            a.thirdPartyCookies && OOo.setThirdPartyCookies(a.thirdPartyCookies);
            c = OOo.toQueryString(c) + "\x26type\x3dInvitation";
            a.customVariables && (c += "\x26customVars\x3d" + encodeURIComponent(OOo.serialize(a.customVariables)));
            c += "\x26custom_var\x3d" + OOo.createLegacyVars(a.legacyVariables, e);
            a.asm && (c += "\x26asm\x3d2", d += ",scrollbars\x3d1");
            b += c;
            2 === b.match(/\?/g).length && (b = b.replace(/\?([^?]*)$/, "\x26$1"));
            f = window.open(b, "OnlineOpinionInvitation", d);
            !a.loadPopupInBackground && OOo.$("oo_container") && OOo.hidePrompt();
            "popunder" === a.popupType ? OOo.Browser.Chrome ? (a.loadPopupInBackground ||
                window.alert(a.chromeMainWinPrompt || "Please fill out the form behind this window when you are finished."), a.chromeSurveyPrompt && setTimeout(function () {
                    f.postMessage(a.chromeSurveyPrompt, "*")
                }, 500)) : (f.blur(), window.focus()) : window.oo_inv_monitor && (OOo.Browser.Chrome ? (f.alert(a.chromeSurveyPrompt || "Please fill out the form"), f.focused = !0) : (window.blur(), f.focus()))
        }
    },
    killPrompt: function () {
        this.options.clickCallbacks && "function" === typeof this.options.clickCallbacks.no && this.options.clickCallbacks.no();
        OOo.createCookie(this.options.repromptCookie, 1, 15768E4);
        OOo.hidePrompt()
    }
};
OOo.extend(OOo.Invitation, {
    navigateToFriendlyDomain: function (a) {
        location.href = a
    }
});

function opinionLabInit() {
    var a = "",
        b = OOo.readCookie("com.wm.visitor"),
        c = OOo.readCookie("com.wm.anoncart"),
        d = OOo.readCookie("WMSessionID"),
        f = "undefined" !== typeof s_omni && "undefined" !== typeof s_omni.server ? s_omni.server : "null";
    null != d ? (d = d.split("_", 1), a += d) : a += "null";
    a = null != c ? a + ("|" + c) : a + "|null";
    null != b ? (b = b.split("~~", 1), a += "|" + b) : a += "|null";
    a += "|" + f;
    oo_feedback = new OOo.Ocode({
        legacyVariables: {
            vars: a,
            override: !0
        },
        customVariables: {
            page: "undefined" !== typeof s_omni ? "undefined" !== typeof s_omni.pageName ?
                s_omni.pageName : "" : "",
            prop12: "undefined" !== typeof s_omni ? "undefined" !== typeof s_omni.prop12 ? s_omni.prop12.split("+", 2)[0] : "" : "",
            prop13: "undefined" !== typeof s_omni ? "undefined" !== typeof s_omni.prop13 ? s_omni.prop13.split("-", 2)[0] : "" : "",
            s_vi: OOo.readCookie("s_vi"),
            eVar21: "undefined" !== typeof s_omni ? "undefined" !== typeof s_omni.eVar21 ? s_omni.eVar21 : "" : "",
            eVar16: "undefined" !== typeof s_omni ? "undefined" !== typeof s_omni.eVar16 ? s_omni.eVar16 : "" : ""
        }
    });
    oo_beta = new OOo.Ocode({
        legacyVariables: {
            vars: a,
            override: !0
        },
        referrerRewrite: {
            searchPattern: /:\/\/[^\/]*/,
            replacePattern: "://beta.walmart.com"
        },
        customVariables: {
            page: "undefined" !== typeof s_omni ? "undefined" !== typeof s_omni.pageName ? s_omni.pageName : "" : "",
            prop12: "undefined" !== typeof s_omni ? "undefined" !== typeof s_omni.prop12 ? s_omni.prop12.split("+", 2)[0] : "" : "",
            prop13: "undefined" !== typeof s_omni ? "undefined" !== typeof s_omni.prop13 ? s_omni.prop13.split("-", 2)[0] : "" : "",
            s_vi: OOo.readCookie("s_vi"),
            eVar21: "undefined" !== typeof s_omni ? "undefined" !== typeof s_omni.eVar21 ?
                s_omni.eVar21 : "" : "",
            eVar16: "undefined" !== typeof s_omni ? "undefined" !== typeof s_omni.eVar16 ? s_omni.eVar16 : "" : ""
        }
    });
    oo_trending = new OOo.Ocode({
        legacyVariables: {
            vars: a,
            override: !0
        },
        referrerRewrite: {
            searchPattern: /:\/\/[^\/]*/,
            replacePattern: "://trending.walmart.com"
        },
        customVariables: {
            page: "undefined" !== typeof s_omni ? "undefined" !== typeof s_omni.pageName ? s_omni.pageName : "" : "",
            prop12: "undefined" !== typeof s_omni ? "undefined" !== typeof s_omni.prop12 ? s_omni.prop12.split("+", 2)[0] : "" : "",
            prop13: "undefined" !== typeof s_omni ?
                "undefined" !== typeof s_omni.prop13 ? s_omni.prop13.split("-", 2)[0] : "" : "",
            s_vi: OOo.readCookie("s_vi"),
            eVar21: "undefined" !== typeof s_omni ? "undefined" !== typeof s_omni.eVar21 ? s_omni.eVar21 : "" : "",
            eVar16: "undefined" !== typeof s_omni ? "undefined" !== typeof s_omni.eVar16 ? s_omni.eVar16 : "" : ""
        }
    });
    oo_online = new OOo.Ocode({
        legacyVariables: {
            vars: a,
            override: !0
        },
        referrerRewrite: {
            searchPattern: /:\/\/[^\/]*/,
            replacePattern: "://online.walmart.com"
        },
        customVariables: {
            page: "undefined" !== typeof s_omni ? "undefined" !== typeof s_omni.pageName ?
                s_omni.pageName : "" : "",
            prop12: "undefined" !== typeof s_omni ? "undefined" !== typeof s_omni.prop12 ? s_omni.prop12.split("+", 2)[0] : "" : "",
            prop13: "undefined" !== typeof s_omni ? "undefined" !== typeof s_omni.prop13 ? s_omni.prop13.split("-", 2)[0] : "" : "",
            s_vi: OOo.readCookie("s_vi"),
            eVar21: "undefined" !== typeof s_omni ? "undefined" !== typeof s_omni.eVar21 ? s_omni.eVar21 : "" : "",
            eVar16: "undefined" !== typeof s_omni ? "undefined" !== typeof s_omni.eVar16 ? s_omni.eVar16 : "" : ""
        }
    });
    oo_store = new OOo.Ocode({
        legacyVariables: {
            vars: a,
            override: !0
        },
        referrerRewrite: {
            searchPattern: /:\/\/[^\/]*/,
            replacePattern: "://store.walmart.com"
        },
        customVariables: {
            page: "undefined" !== typeof s_omni ? "undefined" !== typeof s_omni.pageName ? s_omni.pageName : "" : "",
            prop12: "undefined" !== typeof s_omni ? "undefined" !== typeof s_omni.prop12 ? s_omni.prop12.split("+", 2)[0] : "" : "",
            prop13: "undefined" !== typeof s_omni ? "undefined" !== typeof s_omni.prop13 ? s_omni.prop13.split("-", 2)[0] : "" : "",
            s_vi: OOo.readCookie("s_vi"),
            eVar21: "undefined" !== typeof s_omni ? "undefined" !== typeof s_omni.eVar21 ?
                s_omni.eVar21 : "" : "",
            eVar16: "undefined" !== typeof s_omni ? "undefined" !== typeof s_omni.eVar16 ? s_omni.eVar16 : "" : ""
        }
    });
    oo_feedback_yes = new OOo.Ocode({
        legacyVariables: {
            vars: a,
            override: !0
        },
        referrerRewrite: {
            searchPattern: /:\/\/[^\/]*/,
            replacePattern: "://search.www.walmart.com"
        },
        customVariables: {
            SearchAnswer: "Yes",
            search_term: "",
            dept: "",
            result: "false",
            page: "undefined" !== typeof s_omni ? "undefined" !== typeof s_omni.pageName ? s_omni.pageName : "" : "",
            prop12: "undefined" !== typeof s_omni ? "undefined" !== typeof s_omni.prop12 ?
                s_omni.prop12.split("+", 2)[0] : "" : "",
            prop13: "undefined" !== typeof s_omni ? "undefined" !== typeof s_omni.prop13 ? s_omni.prop13.split("-", 2)[0] : "" : "",
            s_vi: OOo.readCookie("s_vi"),
            eVar21: "undefined" !== typeof s_omni ? "undefined" !== typeof s_omni.eVar21 ? s_omni.eVar21 : "" : "",
            eVar16: "undefined" !== typeof s_omni ? "undefined" !== typeof s_omni.eVar16 ? s_omni.eVar16 : "" : ""
        }
    });
    oo_feedback_no = new OOo.Ocode({
        legacyVariables: {
            vars: a,
            override: !0
        },
        referrerRewrite: {
            searchPattern: /:\/\/[^\/]*/,
            replacePattern: "://search.www.walmart.com"
        },
        customVariables: {
            SearchAnswer: "No",
            search_term: "",
            dept: "",
            result: "false",
            page: "undefined" !== typeof s_omni ? "undefined" !== typeof s_omni.pageName ? s_omni.pageName : "" : "",
            prop12: "undefined" !== typeof s_omni ? "undefined" !== typeof s_omni.prop12 ? s_omni.prop12.split("+", 2)[0] : "" : "",
            prop13: "undefined" !== typeof s_omni ? "undefined" !== typeof s_omni.prop13 ? s_omni.prop13.split("-", 2)[0] : "" : "",
            s_vi: OOo.readCookie("s_vi"),
            eVar21: "undefined" !== typeof s_omni ? "undefined" !== typeof s_omni.eVar21 ? s_omni.eVar21 : "" : "",
            eVar16: "undefined" !==
                typeof s_omni ? "undefined" !== typeof s_omni.eVar16 ? s_omni.eVar16 : "" : ""
        }
    });
    return {
        oo_feedback: oo_feedback
    }
}
var opinonLab = opinionLabInit();

function buildEmailSubscribeURL(a, b, c, d, f, e) {
    return "/popup.gsp?" + c + "\x3d" + d + "\x26email_email\x3d" + e + "\x26" + a + "\x3d" + b + "\x26save.x\x3d0\x26save.y\x3d0"
}

function validateForm(a, b, c, d, f, e) {
    e = e.firstChild.value;
    return /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(e) ? (a = buildEmailSubscribeURL(a, b, c, d, f, e), window.open(a, "thankyou", "menubar\x3dno,resizable\x3dno,status\x3dno,scrollbar\x3dno,toolbar\x3dno,toolbar\x3dno,width\x3d550,height\x3d500"), !0) : !1
}
var googletag = googletag || {};
googletag.cmd = googletag.cmd || [];

function getCookie(a) {
    var b = document.cookie;
    a += "\x3d";
    var c = b.indexOf("; " + a);
    if (-1 == c) {
        if (c = b.indexOf(a), 0 != c) return null
    } else c += 2;
    var d = document.cookie.indexOf(";", c); - 1 == d && (d = b.length);
    return unescape(b.substring(c + a.length, d))
}