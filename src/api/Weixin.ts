/**
 * WxApi
 * @Author Ace.c
 * @Create 2016-11-03 16:21
 */
class Weixin {

    /**
     * 获取授权code
     */
    static getAccessCode(appid: string, gameUrl: string) {
        var url: string = "" +
            "https://open.weixin.qq.com/connect/oauth2/authorize?" +
            "appid=" + appid +
            "&redirect_uri=" + encodeURIComponent(gameUrl) +
            "&response_type=code" +
            "&scope=snsapi_userinfo" +
            "&state=1" +
            "#wechat_redirect";

        location.href = url;
    }

    /**
     * 微信权限验证
     * @param appid
     * @param timestamp
     * @param nonceStr
     * @param signature
     * @param jsApiList
     */
    static config(appid: string, timestamp: number, nonceStr: string, signature: string, jsApiList: string[] = []) {
        var bodyConfig: BodyConfig = new BodyConfig();
        bodyConfig.appId = appid;
        bodyConfig.debug = false;
        bodyConfig.timestamp = timestamp;
        bodyConfig.nonceStr = nonceStr;
        bodyConfig.signature = signature;
        bodyConfig.jsApiList = jsApiList;

        if (wx) {
            wx.config(bodyConfig);
        }
    }

    /**
     * 支付
     * @param timestamp
     * @param nonceStr
     * @param prepay_id
     * @param paySign
     * @param success
     */
    static pay(timestamp: number, nonceStr: string, prepay_id: string, paySign: string, success?: Function) {
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
    }
}