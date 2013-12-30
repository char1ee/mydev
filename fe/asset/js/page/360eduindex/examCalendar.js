define(function() {
    var defaults = {
        type:'', // apply_time, exam_time, score_time'
        cate: '',
        count: 6,
        callback: '?'
    };
    var API = 'http://lijinchao.class.edu.360.cn/course/exam?';

    /**
        param [?, ajaxConf, callback]
     */
    return function (param, ajaxConf, callback) {
        var is = qutil.is,
            getJSON = $.getJSON,
            extend = $.extend;
        if (is('Function', ajaxConf)) {
            callback = ajaxConf;
        }
        var cfgStr = [];
        $.each(extend(defaults, param), function (o, i) {
            cfgStr.push(o + '=' + i);
        });
        getJSON(API + cfgStr.join('&'), function (data) {
            callback && callback(data);
        });
    }
});