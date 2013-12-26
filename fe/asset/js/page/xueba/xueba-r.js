define("../../amd_modules/widget/./Carousel", [], function() {
    var e = {
        element: "#car",
        index: 0,
        events: {},
        carCtrl: ".car-ctrl",
        carCtrlItem: ".car-ctrl-item",
        carCtrlItemCurrentCls: "current",
        carCont: "car-cont",
        carContItem: "car-cont-item",
        carContItemCurrentCls: "current",
        eventTrigger: "click"
    }, t = function(n) {
            var r = {};
            return $.extend(r, e, n), new t.fn.init(r)
        };
    return t.fn = t.prototype = {
        init: function(e) {
            var t = this;
            return t.cfg = e, t.$element = $(e.element), t.$carCtrl = t.$element.find(e.carCtrl), t.$carCtrlItem = t.$carCtrl.find(e.carCtrlItem), t.$carCont = t.$element.find(e.carCont), t.$carContItem = t.$carCont.find(e.carContItem), t._bindEvent(), t.$carCtrlItem.eq(e.index).trigger(e.eventTrigger), t
        },
        _bindEvent: function() {
            var e = this;
            e.$element.on(e.cfg.eventTrigger, e.cfg.carCtrlItem, function(t) {
                e.switchTo($(this).index())
            })
        },
        switchTo: function(e) {
            var t = this;
            t.$carCtrlItem.removeClass(t.cfg.carCtrlItemCurrentCls), t.$carCtrlItem.eq(e).addClass(t.cfg.carCtrlItemCurrentCls), t.$carContItem.removeClass(t.cfg.carContItemCurrentCls), t.$carContItem.eq(e).addClass(t.cfg.carContItemCurrentCls)
        }
    }, t.fn.init.prototype = t.fn, t
}), define("../../amd_modules/widget/Tab", ["./Carousel"], function(e) {
    var t = {
        element: "#tab",
        carCtrl: ".tab-ctrl",
        carCtrlItem: ".tab-ctrl-item",
        carCtrlItemCurrentCls: "current",
        carCont: ".tab-cont",
        carContItem: ".tab-cont-item",
        carContItemCurrentCls: "current",
        eventTrigger: "click"
    };
    return function(n) {
        return new e($.extend({}, t, n))
    }
}), define("../../amd_modules/widget/Pin", [], function() {
    if (navigator.userAgent.indexOf("MSIE 6.0") > -1) return function() {};
    var e = $(window),
        t = $(document),
        n = function(e) {}, r = e.width(),
        i = e.height(),
        s = {
            element: "#pin",
            minWidth: 1e3,
            wrapWidth: 1e3,
            triggerTop: 0,
            position: {
                right: 0,
                bottom: 0
            },
            _allowShow: !0,
            isFixed: !0,
            _pinCls: "pined",
            _fixedIe6: !1,
            alwaysShow: !1,
            touchTopHnadler: null
        }, o = function(e) {
            var t = {};
            return $.extend(t, s, e), new o.fn.init(t)
        };
    return o.fn = o.prototype = {
        init: function(t) {
            function o() {
                t.alwaysShow && (n.hide = n.show), clearTimeout(s), s = setTimeout(function() {
                    n._check() ? n.show() : n.hide()
                }, 500)
            }
            var n = this;
            n.cfg = t, n.$element = $(t.element), n.offTop = n.$element.offset().top, n.selfWidth = n.$element.outerWidth(), n.selfHeight = n.$element.outerHeight();
            var s;
            return e.on("scroll", o).on("resize", function() {
                r = e.width(), i = e.height(), o()
            }), t._fixIe6 && n._fixIe6(n.$element), n.setPosition(n.$element), n
        },
        setPosition: function(e, t, n) {
            var s = this,
                o = s.cfg;
            if (!o.alwaysShow && !s._check()) {
                s.hide();
                return
            }
            t = t = t, n = n = n;
            var u, a;
            return o.position.bottom !== null && (u = i - s.selfHeight - o.position.bottom), o.position.right !== null && (a = (r + s.cfg.wrapWidth) / 2 - o.position.right), e.css({
                top: u,
                left: a
            }), s
        },
        _check: function() {
            var e = this;
            return r <= e.cfg.minWidth ? !1 : i <= e.selfHeight ? !1 : t.scrollTop() >= e.cfg.triggerTop ? !0 : !1
        },
        _scrollHandler: function() {
            var e = this;
            t.scrollTop() >= e.offTop ? e.cfg.touchTopHnadler(e.$element) : e.$element.removeClass(e.cfg._pinCls)
        },
        _fixIe6: function(e) {},
        show: function(e) {
            return n("show"), this.$element.fadeIn(e), this.setPosition(this.$element), this
        },
        hide: function(e) {
            return n("hide"), e = e || 100, this.$element.fadeOut(e), this
        }
    }, o.fn.init.prototype = o.fn, o
}), define("../../amd_modules/Share/Share", [], function() {
    function t(n) {
        var r = $.extend(!0, e, n);
        return new t.fn.init(r)
    }
    var e = {
        element: "body",
        share: {
            url: "http://edu.360.cn/",
            summary: "360教育",
            pics: [],
            tags: "360教育"
        }
    };
    return t.fn = t.prototype = {
        init: function(e) {
            var t = this;
            t.cfg = e, $(t.cfg.element).on("click", "[data-share]", function() {
                var e = t.shareOpen($(this).data("share"));
                return $(this).attr({
                    href: e,
                    target: "_blank"
                }), !1
            })
        },
        set: function(e) {
            return $.extend(this.cfg.share, e), this
        },
        shareOpen: function(e) {
            var t = this,
                n = document.title,
                r = document.location.href || t.cfg.share.url,
                i = t.cfg.share.summary,
                s = t.cfg.share.pics,
                o = t.cfg.share.tags,
                u = {
                    sina: {
                        apiurl: "http://service.weibo.com/share/share.php?",
                        width: 700,
                        height: 480,
                        param: {
                            url: r,
                            appkey: "4141800259",
                            title: (o ? "#" + o + "#" : "") + i,
                            pic: s.join("||"),
                            searchPic: !1,
                            language: "zh_cn",
                            rnd: (new Date).valueOf()
                        }
                    },
                    qweibo: {
                        apiurl: "http://share.v.t.qq.com/index.php?c=share&a=index&",
                        width: 700,
                        height: 680,
                        param: {
                            url: r,
                            pic: s.join("|"),
                            title: (o ? "#" + o + "#" : "") + i
                        }
                    },
                    douban: {
                        apiurl: "http://shuo.douban.com/%21service/share?",
                        width: 450,
                        height: 330,
                        param: {
                            name: n,
                            href: r,
                            desc: i,
                            text: o ? "#" + o + "#" : "",
                            image: s[0] || ""
                        }
                    },
                    renren: {
                        apiurl: "http://widget.renren.com/dialog/share?",
                        height: 650,
                        param: {
                            resourceUrl: r,
                            pic: s[0] || "",
                            title: document.title,
                            description: i,
                            charset: "utf-8"
                        }
                    },
                    qzone: {
                        apiurl: "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?",
                        param: {
                            url: r,
                            summary: i,
                            title: n,
                            site: "360教育",
                            showcount: "0",
                            desc: i,
                            pics: s.join("||")
                        }
                    }
                }, a = [],
                f;
            u[e] && function() {
                var t = u[e].param;
                for (var n in t) a.push(n + "=" + encodeURIComponent(t[n]) || "");
                f = u[e].apiurl + a.join("&")
            }();
            var l = (screen.width - u[e].width) / 2,
                c = (screen.height - u[e].height) / 2;
            return window.open(f, "", "width=" + u[e].width + "," + "height=" + u[e].height + "," + "top=" + c + ", " + "left=" + l + ", " + "toolbar=no, menubar=no, scrollbars=yes, location=yes, resizable=no, status=no"), f
        }
    }, t.fn.init.prototype = t.fn, t
}), define("../../amd_modules/Scroll/Scroll", [], function() {
    var e = $(window),
        t = $("body"),
        n = e.width(),
        r = e.height(),
        i = {
            delay: 500
        }, s = function(e) {
            var t = {};
            return $.extend(t, i, e), new s.fn.init(t)
        };
    return s.fn = s.prototype = {
        init: function(e) {
            var t = this;
            return t.cfg = e, t.$element = $(e.element), t
        },
        toEl: function(e) {
            var t = $(e);
            if (e === "#" || e === "#top") return this.to(0);
            if (t.length === 0) return;
            return this.to(t.offset().top), this
        },
        to: function(e, n) {
            return e = e || 0, n = n || 0, t.animate({
                scrollTop: e,
                scrollLeft: n
            }, this.cfg.delay), this
        }
    }, s.fn.init.prototype = s.fn, s
}), require(["../../amd_modules/widget/Tab", "../../amd_modules/widget/Pin", "../../amd_modules/Share/Share", "../../amd_modules/Scroll/Scroll"], function(e, t, n, r) {
    $(".tab").each(function() {
        new e({
            element: this,
            eventTrigger: "mouseenter"
        })
    });
    var i = $('<div class="pin" id="pin" bk><a href="#xb" class="pin-nxbxk">逆袭必修课</a><a href="#nxmj"  class="pin-nxmj">逆袭秘籍</a><a href="#mszl"  class="pin-mszl">名师指路</a><a href="#share" class="pin-zfyl">转发有礼</a><a href="#top"   class="pin-gotop">回顶部</a></div>');
    $("body").append(i);
    var s = new t({
        element: i,
        wrapWidth: 1e3,
        minWidth: 0,
        triggerTop: 500,
        isFixed: !1,
        alwaysShow: !0,
        position: {
            right: -15,
            bottom: 25
        }
    }),
        o = [];
    $("img").each(function() {
        o.push($(this).attr("src"))
    }), new n({
        element: ".weibo",
        share: {
            summary: _share.summary,
            url: _share.url,
            tags: _share.tags,
            pics: _share.pics
        }
    });
    var u = new r;
    i.on("click", "a", function() {
        u.toEl($(this).attr("href"))
    }), $(".pin-gotop").click(function() {
        s.hide(500)
    }), $(".share").click(function() {
        u.toEl("#share")
    });
    var a = $(".nav li a"),
        f = $(".nav li").has(".current").index();
    $(".nav li a").hover(function() {
        var e = $(this);
        a.removeClass("current")
    }, function() {
        a.eq(f).addClass("current")
    }), $("body").attr("id") === "nZxx" && $(".tab2").each(function() {
        new e({
            element: this,
            eventTrigger: "mouseenter",
            carCtrl: ".tab2-ctrl",
            carCtrlItem: ".tab2-ctrl-item",
            carCtrlItemCurrentCls: "current2",
            carCont: ".tab2-cont",
            carContItem: ".tab2-cont-item",
            carContItemCurrentCls: "current2"
        })
    }), $(document).on("click", "a", function() {
        var e = document.location.host,
            t = $(this).attr("href");
        if (t.indexOf(e) < 0 && /^http/.test(t)) return window.open(t), !1
    })
}), define("xueba", function() {});