// <!--[if IE]> ie hack
// <script type="text/javascript" event="FSCommand(command,args)" for="__mp3_player">
// eval(args);
// </script>
// <![endif]-->

(function (window) {
    var playerObj;
    var noop = function () {};
    var __mp3PlayerListener = {
        position: 0,
        onInit: noop,
        onUpdate: noop
    };

    var __mp3PlayerMethod = {
        play: function (src) {
            // if (__mp3PlayerListener.position == 0) {
                playerObj.SetVariable('method:setUrl', src);
            // };
            playerObj.SetVariable('method:play', '');
            playerObj.SetVariable('enabled', 'true');
        },

        pause: noop,
        // function () {
            // getFlashObject().SetVariable("method:pause", "");
        // },

        stop: noop,
        // function () {
        //     playerObj.SetVariable('method:stop', '');
        // },

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

    var MP3Player = function () {};
    MP3Player.prototype = __mp3PlayerMethod;
    MP3Player.__mp3PlayerListener = __mp3PlayerListener;

    // append Dom
    (function () {
        if (document.getElementById('__mp3_player_wrap') == null) {
            var _wrap = document.createElement('div');
            _wrap.id = '__mp3_player_wrap';
            _wrap.style.cssText = 'position:absolute';
            _wrap.innerHTML =
                '<object class="playerpreview" id="__mp3_player" type="application/x-shockwave-flash" data="http://swf.baoku.360.cn/swf/player/mp3.swf" width="1" height="1">' +
                    '<param name="movie" value="http://swf.baoku.360.cn/swf/player/mp3.swf" />' +
                    '<param name="AllowScriptAccess" value="always" />' +
                    '<param name="FlashVars" value="listener=MP3Player.__mp3PlayerListener&amp;interval=500" />' +
                    '<embed src="http://swf.baoku.360.cn/swf/player/mp3.swf"' +
                       'id="__mp3_player"' +
                       'allowscriptaccess="always"' +
                       'swliveconnect="true"' +
                       'type="application/x-shockwave-flash"' +
                       'width="1"' +
                       'height="1"' +
                       'flashvars="listener=MP3Player.__mp3PlayerListener&amp;interval=500"' +
                   '>' +
                '</object>'
            document.body.appendChild(_wrap);
        }
        playerObj = document.getElementById('__mp3_player');
    })();

    // exports
    window.MP3Player = MP3Player;
})(this);