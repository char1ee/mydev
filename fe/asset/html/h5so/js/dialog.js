(function (exports){
    var noop = function () {}
    function dialog() {
        this.msg = args.msg || ''
        this.ok = args.ok ||  noop;
        this.cancle = args.cancle || noop;
    }
    dialog.prototype.close = function () {

    }
    exports.dialog = dialog;
})(this);


