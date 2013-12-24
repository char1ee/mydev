(function ($) {
    var handles = {
        // 选择题处理
        choices: function (data) {
            var examData = {
                items: data
            };
            for (var i = 0; i < examData.items.length; ++i) {
                examData.items[i].index = i + 1;
            }
            var tpl = document.getElementById('examList').innerHTML;
            $('#examListWrap').html(Handlebars.compile(tpl)(examData));

            function joinAnswer() {
                var ret = [];
                for (var i = 0; i < examData.items.length; ++i) {
                    ret.push(examData.items[i].answer);
                }
                return ret.join(' ');
            }

            $('#examViewAnswer').one('click', function () {
                var $examAnswer = $('#examAnswer');
                $examAnswer.html('答案是:' + joinAnswer());
                $examAnswer.show() && $(this).remove();
            });
        }
    };

    function getExamList(param) {
        // "http://child.apc.360.cn/index.php
        // ?c=Edu
        // &a=study
        // &grade=一年级
        // &course=语文
        // &start=1
        // &count=3
        // &callback=callback"
        var API = 'http://child.apc.360.cn/index.php';
        var cfg = {};
        var defaults = {
            c: 'Edu',
            a: 'study',
            course: null,
            grade: null,
            start: 1,
            count: 3,
            // examtype: 'choice',
            // type: 'jsonp',
            callback: '?'
        };

        $.extend(cfg, defaults, param);
        var cfgStr = [];
        $.each(cfg, function (o, i) {
            cfgStr.push(o + '=' + i);
        });
        $.getJSON(API + '?' + cfgStr.join('&'), function (data) {
            // 如果请求的是选择题
            // handles[data.examtype] &&
            handles.choices(data.data);
            // switch (data.examtype) {
            //     case 'choices':
            //         handles['choices'](data)
            //         break;
            //     default :
            // }
        });
    }

    window.getExamList = getExamList;
})(jQuery);

// init
(function ($) {
    // 初始化tab
    // var examTab =
    new Tab({
        eventId: 'exam',
        tabNav: '#examTabNav',
        tabContent: '#examTabContent'
    });

    // 监听tab事件
    $(document).on('examtabShow', function (e, index) {
        $.event.trigger('examChange');
    });

    // 监听单选框事件
    $('#examTabContent').find('[type=radio]').each(function () {
        $(this).on('change', function () {
            $.event.trigger('examChange');
        });
    });

    $(document).on('examChange', function () {
        var node = $('#examTabContent >').filter(':visible');
        var grade = node.find('[type=radio]').filter(':checked').val();
        getExamList({
            course: encodeURI(node.data('course')),
            grade: grade
        });
    });

    $('#examTabNav > li').eq(0).trigger('click');
})(jQuery);