define(function () {
    var defaults = {
        el,
        currentIndex,
        direction: 'left',
        autoPlay: false,
        step: 1,
        onbeforeswitch: null,
        onafterswitch: null,
        playInterval: 2000,
        pagenation: false,
        pageContainer: '',
        container,
        loopDirection,
        currentPageCss,
        nodesClassName,
        doTimes,
        totalTime,
        lazyLoadType,
        lazyPre,
        pagenationTag,
        handlerType,
        switchItems,
        initOffset,
        isRunning,
        autoplayPause,
        _sliders,
        playIntervalHandler,
        relatedIndex,
        animateHandler



        this.container = opts.container || "";
        this.loopDirection = opts.loopDirection || "alternate";
        this.currentPageCss = opts.currentPageCss || "selected";
        this.nodesClassName = opts.nodesClassName || "switch-content-item";
        this.doTimes = opts.doTimes || 36;
        this.totalTime = opts.totalTime || 2000;
        this.lazyLoadType = opts.lazyLoadType || "none";
        this.lazyPre = opts.lazyPre || 0;
        this.pagenationTag = opts.pagenationTag || "LI";
        this.handlerType = opts.handlerType || "click";

        this.switchItems = this._getSliders();
        this.initOffset = this.switchItems[0].offsetLeft;
        this.container.scrollLeft = 0;
    }

    var noop = function () {}
    function Slide(){

    }
    // el,currentIndex,direction,autoPlay,step,onbeforeswitch,onafterswitch,playInterval,pagenation,pageContainer,container,loopDirection,currentPageCss,nodesClassName,doTimes,totalTime,lazyLoadType,lazyPre,pagenationTag,handlerType,switchItems,initOffset,isRunning,autoplayPause,_sliders,playIntervalHandler,relatedIndex,animateHandler
    Slide.prototype = {
        toNext : noop,
        toPrevious: noop,
        switchTo: noop,
        outPagenation: noop,
        auto: noop,
        switchAutoPlay: noop
    }
});