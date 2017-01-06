/**
 * Created by mszz on 2017/1/3.
 */
(function () {

    var url = location.href.split('#')[0];
    // console.log(url);
    url = url.replace("&","55555");
    // console.log(url);
    $.ajax({
        type : "get",
        url : "share.PHP",
        dataType : "html",
        async : false,
        data:"url="+url,
        success:function(data,response){
            // alert("ok");
            // alert(response);
            var share = JSON.parse(data);
            // console.log(share);

            wx.config({
                debug: true,
                appId: share.appId,
                timestamp: share.timestamp,
                nonceStr: share.nonceStr,
                url: share.url,
                signature: share.signature,
                jsApiList: [
                    'onMenuShareTimeline',  //朋友圈
                    'onMenuShareAppMessage' //朋友
                ]
            });
        },
        error:function(data){
            alert("连接失败！");
        }
    });
        wx.ready(function () {

            //朋友圈
            wx.onMenuShareTimeline({
                title: '互联网之子/朋友圈',
                link: 'http://movie.douban.com/subject/25785114/',
                imgUrl: 'http://demo.open.weixin.qq.com/jssdk/images/p2166127561.jpg',
                trigger: function (res) {
                    alert('用户点击分享到朋友圈');
                },
                success: function (res) {
                    alert('已分享');
                },
                cancel: function (res) {
                    alert('已取消');
                },
                fail: function (res) {
                    alert(JSON.stringify(res));
                    alert('err')
                }
            });

            //分享给朋友
            wx.onMenuShareAppMessage({
                title: '互联网之子/给朋友', // 分享标题
                desc: '电影', // 分享描述
                link: 'http://movie.douban.com/subject/25785114/', // 分享链接
                imgUrl: 'http://demo.open.weixin.qq.com/jssdk/images/p2166127561.jpg', // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                    // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });

        });

        wx.error(function (res) {
            alert(res)
        });
})();


