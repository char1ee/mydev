define(function () {
    var defaults = {
        element: '.weibo',
        share:{
            url     : 'http://edu.360.cn/',
            summary : '360教育',
            pics    : [],
            tags    : '360教育逆袭学霸'
        }
    };
    function shareOpen(param){ //打开窗口
        var dft = {
            apiurl: null,
            width : 700,
            height : 480
        };
        var cfg = $.extend(dft, param);

        var _tmp = [],
            url,
            top,
            left;

        for (var p in cfg){
            _tmp.push(p +'='+ encodeURIComponent(cfg[p]) || '');
        };
        url = 'http://' + a['apiurl'] + _tmp.join('&');

        left = (screen.width - a['width']) / 2;
        top  = (screen.height - a['height']) / 2;
        window.open(url, '',
            'width='  + cfg.width+ ',' +
            'height=' + cfg.height+ ',' +
            'top='    + top + ', ' +
            'left='   + left+ ', '+
            'toolbar=no, menubar=no, scrollbars=yes, location=yes, resizable=no, status=no');
    }

    function Share(param) {
        var cfg = {};
        $.extend(cfg, defaults, param);
        return new Share.fn.init(cfg);
    }
    Share.fn = Share.prototype = {
        init: function () {

        },

    }
    Share.fn.init.prototype = Share.fn;
    return Share;
});

/**
 * html代码：  class名不可更改
    @example
    <div class="j a-share">
        <span class="ico-sina" title="分享到新浪微博">分享到新浪微博</span>
        <span class="ico-douban" title="推荐到豆瓣">推荐到豆瓣</span>
        <span class="ico-qzone" title="分享到QQ空间">分享到QQ空间</span>
        <span class="ico-qweibo" title="分享到腾讯微博">分享到腾讯微博</span>
        <span class="ico-renren" title="分享到人人网">分享到人人网</span>
    </div>

    程序提供了尽可能多的算法取到页面的重要内容。

    需要做为微博正文的文本可放在id名为 share_summary 的容器内，div或文本框均可，留空将取meta描述，如果meta为空将取title
    @example
    <textarea class="share-summary">ss</textarea>

    需要做为微博提供的图片img的class定为 share-pic，如果没有，程序将会遍历页面上所有的绝对路径的img标签
    @example
    <img src="xxx.jpg" alt="xxx" class="share-pic" />

    NS_share 全局配置文件 ：为使插件更大程度自定义，可以在页面中配置NS_share全局变量，可缺省
    @example
    NS_share = {
        url     : '',     //String，完整url，无需encodeURI
        summary : '',     //String
        pics    : [],     //Array
        tags    : '晒菜单'//String
    }
 */
// (function ($) {
//     var G = $.gozap, D = G.duolaidian;
//     var config = window.NS_share || {};
//     $.extend(D, {
//         init_share : function (o) {
//             var $share    = $(o),
//                 $shareBtn = $share.find('span').css('cursor','pointer'),
//                 $summary  = $('#share_summary'),
//                 $sina     = $share.find('.ico-sina'),
//                 $qweibo   = $share.find('.ico-qweibo'),
//                 $qzone    = $share.find('.ico-qzone'),
//                 $douban   = $share.find('.ico-douban'),
//                 $renren   = $share.find('.ico-renren');

//             var url      = config['url'] || location.href ||'http://www.hualala.com/',//获取当前页url
//                 title    = config['title'] || '【' +document.title+ '】' ||'',//获取当前页title
//                 metainfo = (function(){//页面meta里的描述信息
//                     var metainfo = document.getElementsByTagName('meta'),_t;
//                     for(var i = 0; i < metainfo.length; i++){
//                         if ( /description/gi.test( metainfo[i].getAttribute('name') ) ){
//                             _t = metainfo[i].attributes["content"].value || '';
//                         }
//                     };
//                     return _t
//                 })(),
//                 protocol = ('http:' === document.location.protocol ?  'http://' : 'https://'),//获取协议类型
//                 pics     = config['pics'] ||
//                     (function() {//获取须要发布的图片的src，组成数组pics
//                         var $pics = $('.share-pic').length !== 0 && $('.share-pic') || //优先取.share-pic里的图片
//                                     $('img').length !== 0 && $('img[src ^="http"]').not($('[src $="blank.gif"]')).length !==0 &&$('img[src ^="http"]').not($('[src $="blank.gif"]')) ||//取不到取非 blank.gif 的图片
//                                     [],//都没图留空
//                             pics  = [];
//                         $pics.length ==='1'
//                             ? pics.push($pics.attr('src'))
//                             : $.each ($pics,function(i,o){
//                                     pics.push( $pics.eq(i).attr('src') )
//                                 })
//                         return pics;
//                     })(),
//                 tags = config['tags'] ||'';
//                 //console.log(tags)
//             /** TODO    动态获取详细描述内容，做为微博的正文**/
//             var getSummary = function (){
//                 summary =
//                     ( config['summary'] )                       || //如果有配置文件
//                     ( $summary.val()  !==''  && $summary.val() )|| //文本框value值优先
//                     ( $summary.html() !=='' && $summary.html() )|| //如果是div，取html
//                     ( metainfo &&  metainfo + title )           || //都没有取meta
//                       title;                                       //meta也没有取title
//                 if (summary.length > 130){//防止内容过长导致提交到微博失败
//                     summary  = summary.substr(0,127) + '...';
//                 }
//                 return summary;
//             }

//             /** TODO    拼接url打开窗口
//              * @example
//                 shareOpen({
//                     apiurl : 'shuo.douban.com/%21service/share?',
//                     width  : 450,
//                     height : 330,
//                     param  :  {
//                         image : pics[0],    //图片url
//                         href  : url,        //分享的主题图片Url
//                         name  : summary     //分享的详细描述
//                     },
//                     callback : function(){
//                         alert(1)
//                     }
//                 });
//             */
//             var shareOpen = function (){
//                 var a = {
//                         width : 700,
//                         height : 480,
//                         callback : function (){return false}
//                     },
//                     p,_u,_tmp = [],_t,_l;
//                 $.extend(a, arguments[0]);
//                 for (p in a['param']){
//                     _tmp.push(p +'='+ encodeURIComponent(a['param'][p]) || '')
//                 };
//                 _u = 'http://' + a['apiurl'] + _tmp.join('&');
//                 //console.log(_u)
//                 _l = (screen.width - a['width']) / 2;
//                 _t = (screen.height - a['height']) / 2;
//                 window.open(_u, '', 'width=' +a['width']+ ', height=' +a['height']+ ', top=' +_t+ ', left=' +_l+ ', toolbar=no, menubar=no, scrollbars=yes, location=yes, resizable=no, status=no');
//                 a['callback']();
//             }

//             //新浪微博
//             $sina.click(function(){
//                 getSummary();
//                 //console.log( ( tags ? '#'+tags+'#' :'' )+ summary)
//                 shareOpen({
//                     apiurl : 'service.weibo.com/share/share.php?',
//                     param  : {
//                         url       : url,
//                         appkey    : '4141800259',
//                         title     : ( tags ? '#'+tags+'#' :'' )+ summary,
//                         pic       : pics.join('||'),
//                         searchPic : false,
//                         ralateUid : '2464827150', //关联用户的UID，分享微博会@该用户(可选)
//                         language  : 'zh_cn',
//                         rnd       : new Date().valueOf()
//                     }
//                 });

//                 return false
//             });
//             //腾迅微博
//             $qweibo.click(function(){
//                 getSummary();
//                 shareOpen({
//                     apiurl : 'share.v.t.qq.com/index.php?c=share&a=index&',
//                     height : 680,
//                     param  : {
//                         url     : url,
//                         appkey  : '801120276',
//                         pic     : pics.join('|'),
//                         assname : 'hualalaw',//你注册的帐号，不是昵称
//                         title   : ( tags ? '#'+tags+'#' :'' )+ summary //标题和描述信息
//                     }
//                 });
//             });
//             //豆瓣
//             $douban.click(function(){
//                 getSummary();
//                 shareOpen({
//                     apiurl : 'shuo.douban.com/%21service/share?',
//                     width  : 450,
//                     height : 330,
//                     param  :  {
//                         name  : title,
//                         href  : url,//分享的页面Url
//                         desc  : summary,//分享的详细描述
//                         text  : tags ? '#'+tags+'#' :'',
//                         image : pics[0] ||''    //分享的主题图片Url
//                         //&apikey= //apikey
//                     }
//                 });
//             });
//             //人人网
//             $renren.click(function(){
//                 getSummary();
//                 shareOpen({
//                     apiurl : 'widget.renren.com/dialog/share?',
//                     height : 650,
//                     param  : {
//                         resourceUrl : url,  //分享的资源Url
//                         pic         : pics[0] ||'',     //分享的主题图片Url
//                         title       : document.title,       //分享的标题
//                         description : summary,  //分享的详细描述
//                         charset     : 'utf-8'
//                     }
//                 });
//             });
//             //QQ空间
//             $qzone.click(function(){
//                 getSummary();
//                 var e = encodeURIComponent,
//                     p = {
//                         url       : e(url),
//                         showcount : '0',//是否显示分享总数,显示：'1'，不显示：'0'
//                         desc      : e(summary),//默认分享理由(可选)
//                         //summary   : '',//分享摘要(可选)
//                         title     : e(title),//分享标题(可选)
//                         site      : e('哗啦啦'),//分享来源 如：腾讯网(可选)
//                         pics      : e(pics.join('||')).replace(/%7c/ig,'|')//分享图片的路径(可选) ie6 多图时会有bug，必须把|换回来不能用%7c
//                     };
//                 var s = [],_l,_t;
//                 for(var i in p){
//                     s.push(i + '=' + (p[i]||''));
//                 }
//                 var _u = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?' + s.join('&');
//                 _l = (screen.width - 700) / 2;
//                 _t = (screen.height - 680) / 2;
//                 window.open( _u,'', 'width=700, height=680, top=' +_t+ ', left=' +_l+ ', toolbar=no, menubar=no, scrollbars=yes, location=yes, resizable=no, status=no' );
//                 return false;
//             });
//         }
//     })
//     //暴露接口
// })(jQuery);
