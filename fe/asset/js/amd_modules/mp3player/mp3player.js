// <!--[if IE]> ie hack
// <script type="text/javascript" event="FSCommand(command,args)" for="__mp3_player">
// eval(args);
// </script>
// <![endif]-->

(function (window, factory) {
    if (window.define && define.amd) {
        define(function () {
            return factory;
        });
    } /*else if (typeof module === 'object' && module && typeof module.exports === 'object') {
        module.exports = factory;
    } */else if (window.define) {
        define(function (require, exports, module) {
            module.exports = factory;
        });
    }
    window.MP3Player = factory;
})(this, function () {
    // 'use strict';
    var playerObj;
    var noop = function () {};
    var __mp3PlayerListener = {
        position: 0,
        onInit: noop,
        onUpdate: noop
    };

    var __mp3PlayerMethod = {
        play: function (src) {
            playerObj.SetVariable('method:setUrl', src);

            playerObj.SetVariable('method:play', '');
            playerObj.SetVariable('enabled', 'true');
        },

        pause: noop,
        // function () {
            // getFlashObject().SetVariable("method:pause", "");
        // },

        stop: function () {
            playerObj.SetVariable('method:stop', '');
        },

        setPosition: noop,
        //function () {
            // var position = document.getElementById("inputPosition").value;
            // getFlashObject().SetVariable("method:setPosition", position);
        // },

        setVolume: noop
        //function () {
            // var volume = document.getElementById("inputVolume").value;
            // getFlashObject().SetVariable("method:setVolume", volume);
        //}
    };

    var MP3Player = function () {
        // append Dom
        if (document.getElementById('__mp3_player') == null) {
            var _wrap = document.createElement('div');
            _wrap.id = '__mp3_player_wrap';
            _wrap.style.cssText = 'position:absolute;top:-9999em;';
            _wrap.innerHTML =
                '<object id="__mp3_player" type="application/x-shockwave-flash" data="http://swf.baoku.360.cn/swf/player/mp3.swf" width="1" height="1">' +
                    '<param name="movie" value="http://swf.baoku.360.cn/swf/player/mp3.swf">' +
                    '<param name="AllowScriptAccess" value="always">' +
                    '<param name="FlashVars" value="listener=MP3Player.__mp3PlayerListener&amp;interval=500">' +
                    '<embed src="http://swf.baoku.360.cn/swf/player/mp3.swf"' +
                       'id="__mp3_player"' +
                       'allowscriptaccess="always"' +
                       'swliveconnect="true"' +
                       'type="application/x-shockwave-flash"' +
                       'width="1"' +
                       'height="1"' +
                       'flashvars="listener=MP3Player.__mp3PlayerListener&amp;interval=500"' +
                   '>' +
                '</object>';
            document.body.appendChild(_wrap);
        }
        playerObj = document.getElementById('__mp3_player');
    };
    MP3Player.prototype = __mp3PlayerMethod;
    MP3Player.__mp3PlayerListener = __mp3PlayerListener;

    return MP3Player;
}());