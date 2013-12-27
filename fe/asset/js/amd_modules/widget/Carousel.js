define(function () {
    var defaults = {
        element: '#car',
        index: 0, // 初始页
        events : {
            carCtrlItem: function (thisCtrlItem, e) {
                this.switchTo($(thisCtrlItem).index());
                e.stopPropagation(),e.preventDefault();
            }
        },
        carCtrl: '.car-ctrl',
        carCtrlItem: '.car-ctrl-item',
        carCtrlItemCurrentCls: 'current',

        carCont: 'car-cont',
        carContItem: 'car-cont-item',
        carContItemCurrentCls: 'current',

        eventTrigger: 'click'

        // element: '.carousel',
        // index: 0,                           // 初始index
        // recursive: true,                    // 是否可循环
        // duration_ms: 200,                   // 切换动画时长
        // autoplay: false,                    // 是否自动轮播
        // autoplay_interval_ms: 10000,        // 自动轮播时间间隔
        // swipable: true,                     // 是否可滑动

        // selectors: {
        //     content: '.carousel-cont',      // 切换内容容器
        //     contItem: '.carousel-cont-item',         // 单个切换内容
        //     control: 'carousel-control',    // 触发器容器
        //     controlItem: '.carousel-control-item',   // 单个触发器
        //     active: '.active'               // 当前的内容或触发器
        // }
    };
    var Carousel = function (param) {
        var cfg = {};
        $.extend(true, cfg, defaults, param);
        return new Carousel.fn.init(cfg);
    };
    Carousel.fn = Carousel.prototype = {
        init: function (cfg) {
            var _this = this;
            _this.cfg = cfg;

            _this.$element = $(cfg.element);
            _this.$carCtrl = _this.$element.find(cfg.carCtrl);
            _this.$carCtrlItem = _this.$carCtrl.find(cfg.carCtrlItem);
            _this.$carCont = _this.$element.find(cfg.carCont);
            _this.$carContItem = _this.$carCont.find(cfg.carContItem);

            _this._bindEvent();
            _this.$carCtrlItem.eq(cfg.index).trigger(cfg.eventTrigger);
            return _this;
        },
        _bindEvent: function () {
            var _this = this;
            _this.$element.on(_this.cfg.eventTrigger, _this.cfg.carCtrlItem, function (e) {
                _this.cfg.events.carCtrlItem.call(_this, this, e);
            });
        },
        switchTo: function (i) {
            var _this = this;
            _this.$carCtrlItem.removeClass(_this.cfg.carCtrlItemCurrentCls);
            _this.$carCtrlItem.eq(i).addClass(_this.cfg.carCtrlItemCurrentCls);

            _this.$carContItem.removeClass(_this.cfg.carContItemCurrentCls);
            _this.$carContItem.eq(i).addClass(_this.cfg.carContItemCurrentCls);

        }
    };
    Carousel.fn.init.prototype = Carousel.fn;
    return Carousel;
});
