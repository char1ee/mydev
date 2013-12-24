
define(['./Carousel'], function (Carousel) {
    var defaults = {
        element: '#tab',
        carCtrl: '.tab-ctrl',
        carCtrlItem: '.tab-ctrl-item',
        carCtrlItemCurrentCls: 'current',

        carCont: '.tab-cont',
        carContItem: '.tab-cont-item',
        carContItemCurrentCls: 'current',

        eventTrigger: 'click'
    };

    return function (param) {
        return new Carousel($.extend({}, defaults, param));
    }
});