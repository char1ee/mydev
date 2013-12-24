var snow_obj = (function() {
        var snow_array = [];
        var num = 15; //雪花的个数
        var dx = new Array(); //水平振动参数
        var am = new Array(); //水平振动幅度
        var xp = new Array(); // 雪花下落的水平位置
        var yp = new Array(); //雪花下落的垂直位置
        var stx = new Array(); //水平位置步距
        var sty = new Array(); //垂直位置步距
        var doc_width; //雪花范围宽度
        var doc_height; //雪花范围高度
        var parent = null;
        var x_offset = 0;
        var x_offset_high = 0;

        function makeSnow(index, left, top) {
            var r = parseInt(Math.random() * 7);
            var background_l = -r * 28;
            var snow_item = $("<div class='snow-item' id='snow_" + index + "' style='z-index:9999999;width:28px;height:33px;background-image:url(http://p3.qhimg.com/d/360browser/20131202/snow-icons.png);background-repeat:no-repeat;background-position:" + background_l + "px 0px;position:absolute;z-index:eval_r(30" + index + ");visibility:visible;top:" + top + "px;left:" + left + "px;'></div>");
            parent.append(snow_item);
        }

        function snow() {
            for (var i = 0; i < num; i++) {
                yp[i] += sty[i];
                if (yp[i] > doc_height - 30) { //如果到底底部，则回到顶部，重设此朵雪花所有的参数
                    xp[i] = Math.random() * (x_offset_high - x_offset_low + 1) + x_offset_low;
                    yp[i] = 0;
                    stx[i] = 0.02 + Math.random() / 10;
                    sty[i] = 0.7 + Math.random();
                }
                dx[i] += stx[i];
                $("#snow_" + i).css("top", yp[i] + "px");
                $("#snow_" + i).css("left", xp[i] + am[i] * Math.sin(dx[i]) + "px");
                //document.getElementById("snow_"+i).style.top=yp[i];
                //document.getElementById("snow_"+i).style.left=xp[i]+am[i]*Math.sin(dx[i]); //让雪花在水平方向在正弦波的范围内摆动（-am[i]->am[i]）
            }
            setTimeout(function() {
                snow();
            }, 40);
        }
        //初始化参数

        function init(d_w, d_h, snow_num, parentid) {
            doc_width = d_w;
            doc_height = d_h;
            num = snow_num;
            parent = parentid ? $("#" + parentid) : $(document.body);
            var g_w = Geometry.getViewportWidth();
            var parent_w = parent.width();
            x_offset_high = g_w;
            if (g_w < parent_w) {
                x_offset_low = (parent_w - g_w) / 2;
                x_offset_high = (parent_w - g_w) / 2 + g_w;
            }
            for (var i = 0; i < num; i++) {
                dx[i] = 0; //设置每个雪花还没飘落时候的振幅参数
                xp[i] = Math.random() * (x_offset_high - x_offset_low + 1) + x_offset_low; //设置每个雪花随机下落时候的水平开始位置
                yp[i] = Math.random() * (doc_height); //设置每个雪花随机下落时候的垂直开始位置
                am[i] = Math.random() * 20; //设置每个雪花下落时候的振幅
                stx[i] = 0.02 + Math.random() / 10; //水平移动步距
                sty[i] = 0.7 + Math.random(); //垂直移动步距
                makeSnow(i, xp[i], yp[i]);
                //document.write("<div id='snow_"+i+"' style='position:absolute;z-index:eval_r(30"+i+");visibility:visible;top:15px;left:15px;font-size:"+snow_size[i]+";color:"+snow_color[i]+"'>*</div>");
            }
            snow();
        }

        return {
            init: init
        };
    })()

        function ajust_snow_width() {
            var screen_width = Geometry.getViewportWidth();
            $("#snow-outer").width(screen_width).css("margin-left", -screen_width / 2 + "px");
        }
