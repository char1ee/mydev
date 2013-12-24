define(function () {
    /**
     * 广播自定义事件:
     *  $document.on(eventId+'tabshow', function (e, index) {
     *
     * })
     * @param {[type]} param [description]
     */
    function Tab(param) {
        return new Tab.fn.init(param);
    }
    Tab.fn = Tab.prototype = {
        init: function (param) {
            var _this = this;
            var defaults = {
                eventId: '',
                tabNav: '',
                tabNavCls: 'current',
                tabContent: '',
                triggerType: 'click'
            }
            var cfg = {};
            this.cfg = cfg;
            $.extend(cfg, defaults, param);
            _this._bindEvent(cfg.triggerType, this._handle);
            // $(_this.cfg.tabNav + ' >').eq(0).trigger(_this.cfg.triggerType);
        },

        _bindEvent: function (triggerType, handle) {
            var _this = this;
                var _$all = $(_this.cfg.tabNav + ' >');
                _$all.each(function (index) {
                    $(this).on(triggerType, function (e) {
                        _$all.removeClass(_this.cfg.tabNavCls) && $(this).addClass(_this.cfg.tabNavCls);
                        _this._handle(e, index);
                    })
                })
        },

        _handle: function (e, index) {
            var _this = this;
            e.stopPropagation() && e.preventDefault();
            $(_this.cfg.tabContent + ' >').each(function (i) {
                $(this)[ i === index ? 'show' : 'hide']();
            });
            _this._broadCast(index);
        },

        _broadCast: function (index) {
            index = index || 0;
            var _this = this;
            _this.cfg.eventId && $.event.trigger( _this.cfg.eventId + 'tabShow', index);
        }
    }
    Tab.fn.init.prototype = Tab.fn;

    return Tab;
});