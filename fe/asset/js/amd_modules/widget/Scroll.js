define(function () {
    var $window = $(window),
        $document = $(document);

    var winWidth = $window.width();
    var winHeight = $window.height();

    var defaults = {
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
        }
    };

    Scroll.fn.init.prototype = Scroll.fn;
    return Scroll;
});