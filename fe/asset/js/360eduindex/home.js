require([
    '../../js/amd_modules/widget/Carousel',
    '../amd_modules/ejs/ejs',
    './examCalendar'
], function (car, EJS, getCalendar) {
    var cases;
    car({
        element: '.i-datetable',
        carCtrl: '.tab-nav',
        carCtrlItem: '.tab-nav-li',
        carCtrlItemCurrentCls: 'tab-nav-current',

        carCont: '.tab-content',
        carContItem: 'table',
        carContItemCurrentCls: 'current',
        events: {
            carCtrlItem: function (thisCtrlItem, e) {
                e.stopPropagation(), e.preventDefault();
                var _this = this;
                var index = $(thisCtrlItem).index();
                var getArr = ['applyTime', 'examTime', 'scoreTime'];
                cases  = cases || {
                    applyTime: {
                        type: 'apply_time',
                        tpl: new EJS({text: $('#examApplyTimeTpl').text()})
                    },
                    examTime: {
                        type: 'exam_time',
                        tpl: new EJS({text: $('#examExamingTimeTpl').text()})
                    },
                    scoreTime: {
                        type: 'score_time',
                        tpl: new EJS({text: $('#examScoreTimeTpl').text()})
                    }
                };

                var _case = cases[getArr[index]];
                if (_case.data) {
                    _this.switchTo(index);
                } else { // 没有缓存数据时才发ajax
                    getCalendar({
                        type: _case.type
                    }, {cach: true}, function (data) {
                        _case.data = data;
                        console.group();
                        console.log(_case.data);
                        console.log('索引是' + index);
                        console.groupEnd();
                        _this.$carContItem.eq(index).html(_case.tpl.render(data));
                        _this.switchTo(index);
                    });
                }

            }
        }
    });
    car({
        element: '.i-order',
        carCtrl: '.tab-nav',
        carCtrlItem: '.tab-nav-li',
        carCtrlItemCurrentCls: 'tab-nav-current',

        carCont: '.tab-content',
        carContItem: '.tab-cont-item',
        carContItemCurrentCls: 'current',
        events: {
            carCtrlItem: function (thisCtrlItem, e) {
                var index = $(thisCtrlItem).index();
                e.stopPropagation(), e.preventDefault();
                this.switchTo(index);
            }
        }
    });

});