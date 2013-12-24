(function (window, factory) {
    if (window.define && define.amd) {
        define(function () {
            return factory;
        });
    } else if (window.define) {
        define(function (require, exports, module) {
            module.exports = factory;
        });
    } else {
        window.Snow = factory;
    }
})(this, function () {
    /*工具函数*/
    function random(start, end) {
        switch (arguments.length) {
            case 1 :
                return Math.random() * start  + 1;
            case 2 :
                return Math.random() * (end - start + 1) + start;
            default :
                return Math.random();
        }
    }
    function combileTpl(tplStr, o) {
        return tplStr.replace(/{([^}]*)}/g, function ($0, $1) {
            return o[$1]();
        });
    }

    var Snow, // 雪 场景
        SnowFlake; // 一朵雪花
    Snow = function (param) {
        var defaults = {
            parent: 'body',
            num: 15, // 雪花总数目
            typesNum : 3 // 雪花类型数
        };
        return new Snow.fn.init($.extend(defaults, param));
    };
    Snow.fn = Snow.prototype = {
        init: function (cfg) {
            var _this = this;
            _this.cfg = cfg;
            _this.parentWidth = $(cfg.parent).width();
            _this.parentHeight = $(cfg.parent).height();
            _this._makeSnow(_this.cfg.num);

            _this.isStop = false;
            _this.snow($('.snow-flake', _this.cfg.parent));
        },
        _makeSnow: function (num) {
            var _selfSnow = this,
                cfg = _selfSnow.cfg;
            var snowFlakeTpl = '<s class="snow-flake snow-flake_{types}" style="left:{left};top:{top}"></s>';
            SnowFlake = function (obj) {
                var _selfSnowFlake = this;
                _selfSnowFlake.$snowFlake = $(combileTpl(snowFlakeTpl, obj));
                $(cfg.parent).append(_selfSnowFlake.$snowFlake);
                _selfSnowFlake._y = parseInt(_selfSnowFlake.$snowFlake.css('top'), 10) || 0;
                _selfSnowFlake._x = parseInt(_selfSnowFlake.$snowFlake.css('left'), 10) || 0;

                $(window).on('resize', function () {
                    setTimeout(function () {
                        _selfSnow.parentWidth = $(cfg.parent).width();
                        _selfSnow.parentHeight = $(cfg.parent).height();
                        _selfSnowFlake._x = random(_selfSnow.parentWidth);
                        _selfSnowFlake._y = random(_selfSnow.parentHeight);
                    }, 500);
                });
            };
            SnowFlake.prototype = {
                init: function () {
                    var _$selfSnowFlake = this.$snowFlake;
                    this.swingX = 0 | random(10, 20) //水平振幅
                    this.mvY(_$selfSnowFlake);
                    this.mvX(_$selfSnowFlake);
                    return this;
                },
                mvY: function ($snowFlake) { //水平运动
                    var _self = this;
                    var offset = 16; // px
                    setTimeout(function loop() {
                        $snowFlake.css('top', _self._y + 'px');
                        if (_self._y > _selfSnow.parentHeight - offset) {
                            _self._y = 0 - offset;
                            _self._x = random(0, _selfSnow.parentWidth);
                        } else {
                            _self._y += 1;
                        }
                        !_selfSnow.isStop && setTimeout(loop, 27);
                    }, 0);
                },
                mvX: function ($snowFlake) {
                    var _self = this;
                    var offset = 16; // px
                    var flag = _self.swingX * -1;

                    setTimeout(function loop() {
                        $snowFlake.css('left', _self._x + 'px');
                        if (_self._x > _selfSnow.parentWidth - offset || _self._x < 0) {
                            _self._y = 0 - offset;
                            _self._x = random(0, _selfSnow.parentWidth);
                        } else {
                            if(flag >= _self.swingX * -1) {
                                console.log('+')
                                _self._x += 1;
                                ++flag;
                            } else if(flag >= _self.swingX){
                                console.log('-')
                                _self._x -= 1;
                                --flag;
                            }
                        }
                        !_selfSnow.isStop && setTimeout(loop, 40);
                    }, 0);
                },
                windHandler: function () {

                }

            };

            var i = 0;
            setTimeout(function loop() {
                if (i < num) {
                    i++;
                    new SnowFlake({
                        types : function () {
                            return 0 | random(0, cfg.typesNum);
                        },
                        left: function () {
                            return random() * _selfSnow.parentWidth + 'px';
                        },
                        top: function () {
                            return random() * _selfSnow.parentHeight + 'px';
                        }
                    }).init();
                    setTimeout(loop, 50);
                }
            }, 0);
        },
        snow: function (SnowFlakes) {
            // var _this = this;
        },
        add: function (n) {
            n = n || 1;
            this._makeSnow(n);
            this.isStop = false;
            return this;
        },
        stop: function () {
            this.isStop = true;
            return this;
        }
        clean: function () {
            // 清空雪花
            this.stop();
            $('.snow-flake', this.cfg.parent).remove();
            return this;
        },
        wind: function () {
            // 风
        }
    };

    Snow.fn.init.prototype = Snow.fn;
    return Snow;
}());