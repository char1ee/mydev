(function (exports, window) {
    if (typeof console !== 'undefined') {
        return;
    }
    // 'use strict';
    var document = window.document,
        defaultColors = 'darkpink,blue,orange,darkgreen'.split(','),
        _console = window.console || {
            isNative: false,
            log:
        };

    function random(m, n) {
        return 0 | Math.random() * (n - m) + m;
    }

    function log(s, colors) {
        if (_console.isNative === false) {
            return _console.log(s);
        }
        colors = colors || defaultColors;
        if (typeof s === 'string') {
            var as = s.split(/\s+/),
                al = as.length,
                cl = colors.length,
                tmp = [];
            s = s.replace(/(^|\s+)/g, '$1%c');
            for (var i = 0; al > i; ++i) {
                tmp.push(colors[random(0, cl)]);
            }
            tmp = tmp.map(function (s) {
                return 'color:' + s;
            });
            tmp.unshift(s);
            _console.log.apply(_console, tmp);
            return;
        }
        _console.log(s);
    }
    exports.log = log;
})(this, this);