   ;;;(function() {
        $(document)
        .on('mousedown', '.clk-quc-login', function (e) {
            e.preventDefault();
            location.href=_jumpUrl;
        })
        .on('click', '.dologin a', function (e) {
            e.preventDefault();
            location.href=_jumpUrl;
        });
        var regCallback = function() {
            location.href = _jumpUrl;
        };
        QHPass.resConfig.loginAfterSetName = false;
        QHPass.resConfig.postCharset='utf-8';
        QHPass.resConfig.src = "pcw_open_conn_register";
        QHPass.resConfig.regOpts.needEmailActive = false;
        QHPass.showReg(regCallback, {
            wrap: 'unameWrap',
            type: 'normal'
        });
    })();