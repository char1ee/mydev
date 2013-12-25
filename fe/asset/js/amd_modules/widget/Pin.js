/**
 * [description]
 * @return {[type]} [description]
 *
 * e.g new Pin('#id').init();
 */
define(function () {
    // function Pin(options) {
    //     var scrollY = 0, elements = [], disabled = false, $window = $(window);

    //     options = options || {};

    //     var recalculateLimits = function () {
    //         for (var i=0, len=elements.length; i<len; i++) {
    //             var $this = elements[i];

    //             if (options.minWidth && $window.width() <= options.minWidth) {
    //                 if ($this.parent().is(".pin-wrapper")) { $this.unwrap(); }
    //                 $this.css({width: "", left: "", top: "", position: ""});
    //                 if (options.activeClass) { $this.removeClass(options.activeClass); }
    //                 disabled = true;
    //                 continue;
    //             } else {
    //                 disabled = false;
    //             }

    //             var $container = options.containerSelector ? $this.closest(options.containerSelector) : $(document.body);
    //             var offset = $this.offset();
    //             var containerOffset = $container.offset();
    //             var parentOffset = $this.offsetParent().offset();

    //             if (!$this.parent().is(".pin-wrapper")) {
    //                 $this.wrap("<div class='pin-wrapper'>");
    //             }

    //             $this.data("pin", {
    //                 from: options.containerSelector ? containerOffset.top : offset.top,
    //                 to: containerOffset.top + $container.height() - $this.outerHeight(),
    //                 end: containerOffset.top + $container.height(),
    //                 parentTop: parentOffset.top
    //             });

    //             $this.css({width: $this.outerWidth()});
    //             $this.parent().css("height", $this.outerHeight());
    //         }
    //     };

    //     var onScroll = function () {
    //         if (disabled) { return; }

    //         scrollY = $window.scrollTop();

    //         var elmts = [];
    //         for (var i=0, len=elements.length; i<len; i++) {
    //             var $this = $(elements[i]),
    //                 data  = $this.data("pin");

    //             if (!data) { // Removed element
    //                 continue;
    //             }

    //             elmts.push($this);

    //             var from  = data.from,
    //                 to    = data.to;

    //             if (from + $this.outerHeight() > data.end) {
    //                 $this.css('position', '');
    //                 continue;
    //             }

    //             if (from < scrollY && to > scrollY) {
    //                 !($this.css("position") == "fixed") && $this.css({
    //                     left: $this.offset().left,
    //                     top: 0
    //                 }).css("position", "fixed");
    //                 if (options.activeClass) { $this.addClass(options.activeClass); }
    //             } else if (scrollY >= to) {
    //                 $this.css({
    //                     left: "",
    //                     top: to - data.parentTop
    //                 }).css("position", "absolute");
    //                 if (options.activeClass) { $this.addClass(options.activeClass); }
    //             } else {
    //                 $this.css({position: "", top: "", left: ""});
    //                 if (options.activeClass) { $this.removeClass(options.activeClass); }
    //             }
    //         }
    //         elements = elmts;
    //     };

    //     var update = function () { recalculateLimits(); onScroll(); };

    //     this.each(function () {
    //         var $this = $(this),
    //             data  = $(this).data('pin') || {};

    //         if (data && data.update) { return; }
    //         elements.push($this);
    //         $("img", this).one("load", recalculateLimits);
    //         data.update = update;
    //         $(this).data('pin', data);
    //     });

    //     $window.scroll(onScroll);
    //     $window.resize(function () { recalculateLimits(); });
    //     recalculateLimits();

    //     $window.load(update);
    // };
    // return Pin;
    var $window = $(window),
        $document = $(document);

    var winWidth = $window.width();
    var winHeight = $window.height();

    var defaults = {
        element: '#pin',
        minWidth: 1000, // 单位px 浏览器小于此大小将不再出现,
        wrapWidth: 1000,
        triggerTop: 0, // 大于此距离将触发show函数
        position: {
            right : 0,  // 单位px
            bottom: 0   // 单位px
        },
        _allowShow: true,
        isFixed: true,
        _pinCls: 'pined',
        _fixedIe6:false,
        touchTopHnadler:null
    }

    var Pin = function (param) {
        var cfg = {};
        $.extend(cfg, defaults, param);
        return new Pin.fn.init(cfg);
    };
    Pin.fn = Pin.prototype = {
        init : function (cfg) {
            var _this = this;
            _this.cfg = cfg;
            _this.$element = $(cfg.element);

            _this.offTop = _this.$element.offset().top;
            _this.selfWidth = _this.$element.outerWidth();
            _this.selfHeight = _this.$element.outerHeight();

            var timer;
            function tmp () { //待优化
                clearTimeout(timer);
                timer = setTimeout(function() {
                    _this._check() ? _this.show() : _this.hide();
                }, 500)
            }
            $window.on('scroll', tmp).on('resize',function () {
                winWidth = $window.width();
                winHeight = $window.height();
                tmp();
            });
            if(cfg._fixIe6) {
                _this._fixIe6(_this.$element);
            }
            _this.setPosition(_this.$element);
            return _this;
        },
        setPosition: function ($el, x, y) {
            var _this = this,
                cfg = _this.cfg;

            if (!this._check()){
                this.hide();
                return;
            }
            x = (x = 0 ? 0 :  x);
            y = (y = 0 ? 0 :  y);


            var top, left;
            if (cfg.position.bottom !== null) {
                top = winHeight - _this.selfHeight - cfg.position.bottom;
            }
            if (cfg.position.right !== null) {
                left =  (winWidth + _this.cfg.wrapWidth) / 2 - cfg.position.right;
            }
            $el.css({
                top: top,
                left: left
            });

            return _this;
        },
        _check: function () { //检测是否满足显示条件
            var _this = this;
            if (winWidth <= _this.cfg.minWidth) {
                return false;
            }
            if(winHeight <= _this.selfHeight) {
                return false;
            }

            if($document.scrollTop() >= _this.cfg.triggerTop) {
                return true
            } else {
                return false
            }
            // console.log(flag)
            return true;
        },
        _scrollHandler : function () {
            var _this = this;
            if ($document.scrollTop() >= _this.offTop) {
                // console.log(1);
                _this.cfg.touchTopHnadler(_this.$element);
            } else {
                // console.log(0)
                _this.$element.removeClass(_this.cfg._pinCls);
            }
        },
        _fixIe6: function ($el) {

        },
        show: function (t) {
            // console.log('show')
            this.$element.fadeIn(t);
            this.setPosition(this.$element);
            return this;
        },
        hide: function (t) {
            t = t || 100;
            this.$element.fadeOut(t);
            return this;
        }
    };

    Pin.fn.init.prototype = Pin.fn;
    return Pin;
});