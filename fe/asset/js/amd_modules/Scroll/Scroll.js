define(function () {
    var $window = $(window),
        $body = $('body');

    var winWidth = $window.width();
    var winHeight = $window.height();

    var defaults = {
        delay: 500
    }

    var Scroll = function (param) {
        var cfg = {};
        $.extend(cfg, defaults, param);
        return new Scroll.fn.init(cfg);
    };
    Scroll.fn = Scroll.prototype = {
        init : function (cfg) {
            var _this = this;
            _this.cfg = cfg;
            _this.$element = $(cfg.element);

            return _this;
        },
        toEl: function (el) {
            var $el = $(el);
            if(el === '#' || el === '#top') {
                return this.to(0);
            }
            if($el.length === 0) {
                return;
            }
            this.to($el.offset().top);
            return this;
        },
        to: function (top, left) {
            top = top || 0;
            left = left || 0;
            $body.animate({
                scrollTop: top,
                scrollLeft: left
            }, this.cfg.delay);
            return this;
        }
    };

    Scroll.fn.init.prototype = Scroll.fn;
    return Scroll;
});