require(['../../js/amd_modules/widget/Carousel'], function (Car) {

    new Car({
        element: '.i-datetable',
        carCtrl: '.tab-nav',
        carCtrlItem: '.tab-nav-li',
        carCtrlItemCurrentCls: 'tab-nav-current',

        carCont: '.tab-content',
        carContItem: 'table',
        carContItemCurrentCls: 'current'
    });
    new Car({
        element: '.i-order',
        carCtrl: '.tab-nav',
        carCtrlItem: '.tab-nav-li',
        carCtrlItemCurrentCls: 'tab-nav-current',

        carCont: '.tab-content',
        carContItem: '.tab-cont-item',
        carContItemCurrentCls: 'current'
    });

});