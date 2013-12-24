// <a href="#" target="_blank" class="weibo-btn" data-share="sina"></a>
// <a href="#" target="_blank" class="weibo-btn" data-share="qweibo"></a>
// <a href="#" target="_blank" class="weibo-btn" data-share="renren"></a>
// <a href="#" target="_blank" class="weibo-btn" data-share="douban"></a>
// <a href="#" target="_blank" class="weibo-btn" data-share="qzone"></a>

define(function () {
    var defaults = {
        element: 'body',
        share: {
            url     : 'http://edu.360.cn/',
            summary : '360教育',
            pics    : [],
            tags    : '360教育'
        }
    };

    function Share(param) {
        var cfg = $.extend(true, defaults, param);
        return new Share.fn.init(cfg);
    }
    Share.fn = Share.prototype = {
        init: function (cfg) {
            var _this = this;
            _this.cfg = cfg;
            $(_this.cfg.element).on('click', '[data-share]', function () {
                var href = _this.shareOpen($(this).data('share'));
                $(this).attr({
                    'href': href,
                    'target': '_blank'
                });
                return false;
            });
        },
        set: function (param) { //更新内容
            $.extend(this.cfg.share, param);
            return this;
        },
        shareOpen: function (who) {
            var _this = this;
            var title   = document.title,
                url     = document.location.href || _this.cfg.share.url,
                summary = _this.cfg.share.summary,
                pics    = _this.cfg.share.pics,
                tags    = _this.cfg.share.tags;

            var o = {
                sina: {
                    apiurl: 'http://service.weibo.com/share/share.php?',
                    width : 700,
                    height : 480,
                    param: {
                        url       : url,
                        appkey    : '4141800259',
                        title     : (tags ? '#' + tags + '#' :'') + summary,
                        pic       : pics.join('||'),
                        searchPic : false,
                        // ralateUid : '2464827150', //关联用户的UID，分享微博会@该用户(可选)
                        language  : 'zh_cn',
                        rnd       : new Date().valueOf()
                    }
                },
                qweibo: {
                    apiurl : 'http://share.v.t.qq.com/index.php?c=share&a=index&',
                    width : 700,
                    height : 680,
                    param  : {
                        url     : url,
                        // appkey  : '801120276',
                        pic     : pics.join('|'),
                        // assname : 'hualalaw',//你注册的帐号，不是昵称
                        title   : (tags ? '#' + tags + '#':'') + summary //标题和描述信息
                    }
                },
                douban: {
                    apiurl : 'http://shuo.douban.com/%21service/share?',
                    width  : 450,
                    height : 330,
                    param  :  {
                        name  : title,
                        href  : url,//分享的页面Url
                        desc  : summary,//分享的详细描述
                        text  : tags ? '#' + tags + '#':'',
                        image : pics[0] || ''    //分享的主题图片Url
                        //&apikey= //apikey
                    }
                },
                renren: {
                    apiurl : 'http://widget.renren.com/dialog/share?',
                    height : 650,
                    param  : {
                        resourceUrl : url,  //分享的资源Url
                        pic         : pics[0] || '',     //分享的主题图片Url
                        title       : document.title,       //分享的标题
                        description : summary,  //分享的详细描述
                        charset     : 'utf-8'
                    }
                },
                qzone: {
                    apiurl: 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?',
                    param: {
                        url       : url,
                        summary   : summary,
                        title     : title,//分享标题(可选)
                        site      : '360教育',
                        showcount : '0',//是否显示分享总数,显示：'1'，不显示：'0'
                        desc      : summary,//默认分享理由(可选)
                        pics      : pics.join('||')//分享图片的路径(可选) ie6 多图时会有bug，必须把|换回来不能用%7c
                    }
                }
            };

            var _tmp = [], shareLink;
            o[who] && (function () {
                var param = o[who].param;
                for (var p in param) {
                    _tmp.push(p + '=' + encodeURIComponent(param[p]) || '');
                }
                shareLink = o[who].apiurl + _tmp.join('&');
            })();


            var left = (screen.width -  o[who].width) / 2,
                top  = (screen.height - o[who].height) / 2;
            window.open(shareLink, '',
                'width='  +  o[who].width + ',' +
                'height=' +  o[who].height + ',' +
                'top='    + top + ', ' +
                'left='   + left + ', ' +
                'toolbar=no, menubar=no, scrollbars=yes, location=yes, resizable=no, status=no'
            );

            return shareLink;
        }
    };
    Share.fn.init.prototype = Share.fn;
    return Share;
});