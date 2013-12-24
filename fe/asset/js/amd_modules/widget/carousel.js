define(['./wdiget'], function(Widget){
    var carousel = new Widget();
    return carousel;
});

// (function(define) {
//     /*
//         1. 不要给模块具名；
//         2. 可以定义依赖，但是必须使用下面这种完整路径；
//      */
//     define(['module/MODULE_B/1.0/b'], function () {
//         /* 模块的具体实现代码 */
//         function Carousel(name, options) { /* ... */ }
//         Carousel.prototype.send = function(msg) { /* ... */ };

//         return Carousel;
//     });
// })(
//     typeof define === 'function' && define.amd ? define : function (name, requires, factory) {
//         if(typeof name === 'function') {
//             factory = name;
//         } else if(typeof requires === 'function') {
//             factory = requires;
//         }

//         if(typeof module != 'undefined'){
//             module.exports = factory(require);
//         }else if(typeof window != 'undefined'){
//             /* 没有加载器时，导出到 window 下 */
//             window.Carousel = factory();
//         }
//     }
// );

// (function (window, factory) {
//     if (window.define && define.amd) {
//         define(['./wdiget'], function (Widget) {
//             return factory;
//         });
//    } else if (window.define) {
//         define(function (require, exports, module) {
//             module.exports = factory;
//         });
//     } else {
//         (window.qutil || window.qutil = {} ).Carousel = factory;
//     }
// })(this, function () {
//     function Carousel(param) {
//         return new Carousel.fn.init($.extend({
//             element: '.carousel',
//             index: 0,                           // 初始index
//             recursive: true,                    // 是否可循环
//             duration_ms: 200,                   // 切换动画时长
//             autoplay: false,                    // 是否自动轮播
//             autoplay_interval_ms: 10000,        // 自动轮播时间间隔
//             swipable: true,                     // 是否可滑动

//             selectors: {
//                 content: '.carousel-cont',      // 切换内容容器
//                 contItem: '.carousel-cont-item',         // 单个切换内容
//                 control: 'carousel-control',    // 触发器容器
//                 controlItem: '.carousel-control-item',   // 单个触发器
//                 active: '.active'               // 当前的内容或触发器
//             }
//         }, param));
//     }

//     Carousel.fn = Carousel.prototype = {
//         init : function (cfg) {
//             this.cfg = cfg;
//             return this;
//         },
//         next: function () { // 切换到下一个内容

//         },
//         prev: function(){ // 切换到上一个内容

//         },
//         switch: function(n){ // 切换到第n个内容

//         },
//         // set: function('autoplay', false){ // 打开或关闭自动轮播
//         // }
//     }
//     Carousel.fn.init.prototype = Carousel.fn;

//     return Carousel;
// }());