/**
 * WxApi
 * @Author Ace.c
 * @Create 2016-11-03 16:21
 */
var Weixin = (function () {
    function Weixin() {
    }
    var d = __define,c=Weixin,p=c.prototype;
    /**
     * 获取授权code, 对应支付
     */
    Weixin.getAccessCodeForPay = function (appid, gameUrl) {
        var url = "" +
            "https://open.weixin.qq.com/connect/oauth2/authorize?" +
            "appid=" + appid +
            "&redirect_uri=" + encodeURIComponent(gameUrl) +
            "&response_type=code" +
            "&scope=snsapi_base" +
            "&state=1" +
            "#wechat_redirect";
        location.href = url;
    };
    /**
     * 获取授权code, 对应登陆
     */
    Weixin.getAccessCodeForLogin = function (appid, gameUrl, pcode) {
        var url = "" +
            "https://open.weixin.qq.com/connect/oauth2/authorize?" +
            "appid=" + appid +
            "&redirect_uri=" + encodeURIComponent(gameUrl) + "?pc=" + pcode +
            "&response_type=code" +
            "&scope=snsapi_userinfo" +
            "&state=1" +
            "#wechat_redirect";
        location.href = url;
    };
    /**
     * 微信权限验证
     * @param appid
     * @param timestamp
     * @param nonceStr
     * @param signature
     * @param jsApiList
     */
    Weixin.config = function (appid, timestamp, nonceStr, signature, jsApiList) {
        if (jsApiList === void 0) { jsApiList = []; }
        var bodyConfig = new BodyConfig();
        bodyConfig.appId = appid;
        bodyConfig.debug = false;
        bodyConfig.timestamp = timestamp;
        bodyConfig.nonceStr = nonceStr;
        bodyConfig.signature = signature;
        bodyConfig.jsApiList = jsApiList;
        if (wx) {
            wx.config(bodyConfig);
        }
    };
    /**
     * 支付
     * @param timestamp
     * @param nonceStr
     * @param prepay_id
     * @param paySign
     * @param success
     */
    Weixin.pay = function (timestamp, nonceStr, prepay_id, paySign, success) {
        wx.checkJsApi({
            jsApiList: ['chooseWXPay'],
            success: function () {
                wx.chooseWXPay({
                    timestamp: timestamp,
                    nonceStr: nonceStr,
                    package: prepay_id,
                    paySign: paySign,
                    signType: "MD5",
                    success: success
                });
            }
        });
    };
    return Weixin;
}());
egret.registerClass(Weixin,'Weixin');
