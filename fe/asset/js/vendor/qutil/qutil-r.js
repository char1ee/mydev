onerror = function(msg, jsurl, line) {
    var encodeURIComponent = window.encodeURIComponent;
    var s = '/asset/img/blank.gif' +
            '?msg='   + encodeURIComponent(msg) +
            '&jsurl=' + encodeURIComponent(jsurl) +
            '&url='   + encodeURIComponent(location.href) +
            '&line='  + line +
            '&t=_'     + +new Date();
    var img = new Image().src = s;
    return true;
};

(function (window, document, arrPro, strPro, objPro) {
    var qutil = function () {};
    qutil.is = function (type, o) {
        return  type === 'Null' ? o === null :
                type === 'Undefined' ? typeof o === 'undefined' :
                objPro.toString.call(o) === '[object ' + type + ']';
    };

    qutil.event = {
        on : function (el, type, handle) {
            if (document.addEventListener) {
                el.addEventListener(type, handle, false);
            } else {
                el.attachEvent('on' + type, function () {
                    var e = window.event;
                    e.target = e.srcElement;
                    e.stopPropagation = function () {
                        e.cancelBubble = true;
                    };
                    e.preventDefault = function () {
                        e.returnValue = false;
                    };
                    handle.call(this, e);
                });
            }
        }
    };

    // sham
    // trim
    strPro.trim = strPro.trim || function () {
        var ws = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';
        var rLeft  = new RegExp('^[' +ws+ ']+'),
            rRight = new RegExp('[' +ws+ ']+$');
        return this.replace(rLeft, '').replace(rRight, '');
    };

    // forEach
    arrPro.forEach = arrPro.forEach || function (callback) {00
        var _this = this;
        for (var i = 0, l = _this.length; i < l; ++ i) {
            callback(_this[i], i);
        }
    };

    // JSON
    (function () {
        if (typeof window.JSON !== 'undefined') {
            return;
        }
        var JSON = {
            parse : function (s) {
                return new Function('return ' + s)();
            },
            stringify: function (o) {
                var s = '',
                    is = qutil.is;
                s = is('String', o) ? '"' + o.replace(/\"/g, '\\"') + '"' :
                    is('Boolean', o) || is('Number', o) || is('Null', o) ? o.toString() :
                    s;
                function recurs(_o) {
                    if (is('Array', _o)) {
                        parseArray(_o);
                    } else if (is('Object', _o)) {
                        parseObject(_o);
                    }
                }

                function parseArray(arr) {
                    s += '[';
                    for (var i = 0, l = arr.length; i < l; ++i) {
                        if (
                            !is('Array',  arr[i]) &&
                            !is('Object', arr[i])
                        ) {
                            if (is('String', arr[i])) {
                                s += '"' + arr[i].replace(/\"/g, '\\"') + '",';
                            } else if (is('Number', arr[i])) {
                                s += arr[i] + ',';
                            } else if (is('Boolean', arr[i])) {
                                s += arr[i] + ',';
                            } else if (is('Null', arr[i])) {
                                s += 'null' + ',';
                            }
                        } else {
                            recurs(arr[i]);
                        }
                    }
                    s += '],';
                }

                function parseObject(obj) {
                    s += '{';
                    for (var j in obj) {
                        if (obj.hasOwnProperty(j)) {
                            s += '"' + j + '":';
                            if (is('String', obj[j])) {
                                s += '"' + obj[j].replace(/\"/g, '\\"') + '",';
                            } else if (is('Number', obj[j])) {
                                s += obj[j] + ',';
                            } else if (is('Boolean', obj[j])) {
                                s += obj[j] + ',';
                            } else if (is('Null', obj[j])) {
                                s += 'null' + ',';
                            } else if (typeof obj[j] === 'object') {
                                recurs(obj[j]);
                            }
                        }
                    }
                    s += '},';
                }

                recurs(o);
                s = s.replace(/,(]|})/g, '$1').replace(/,$/, '');
                return s;
            }
        };

        window.JSON = JSON;
    })();

    // console
    (function () {
        var methods =  'memory,profiles,debug,error,info,log,warn,dir,dirxml,table,trace,assert,count,markTimeline,profile,profileEnd,time,timeEnd,timeStamp,group,groupCollapsed,groupEnd,clear'.split(',');
        var console = {};
        var noop = function () {}
        methods.forEach(function (o) {
            console[o] = noop;
        });
        window.console = console;
    })();

    // html5shim
    window.qutil = qutil;
})(this, this.document, Array.prototype, String.prototype, Object.prototype);

