/**
 * RechargeMessage
 * @Author Ace.c
 * @Create 2016-11-02 15:02
 */
var RechargeMessage = (function (_super) {
    __extends(RechargeMessage, _super);
    function RechargeMessage() {
        _super.call(this);
    }
    var d = __define,c=RechargeMessage,p=c.prototype;
    /**
     * 向服务器请求订单
     * @param id
     */
    p.sendOrder = function (id) {
        var data = {};
        data.s = core.sessionid;
        data.n = id;
        this.gameManager.httpManager.send(core.serverUrl + Cmd.Recharge, data, this.readOrder, this);
    };
    p.readOrder = function (msg) {
        if (msg.code != 0)
            return;
        var _this = this;
        Weixin.pay(msg.timestamp, msg.nonceStr, msg.package, msg.paySign, function (res) {
            if (res.err_msg == "get_brand_wcpay_request：ok") {
                _this.sendSynchro();
            }
        });
    };
    /**
     * 同步充值
     */
    p.sendSynchro = function () {
        var data = {};
        data.s = core.sessionid;
        this.gameManager.httpManager.send(core.serverUrl + Cmd.Recharge, data, this.readSynchro, this);
    };
    p.readSynchro = function (msg) {
        if (msg.code != 0)
            return;
        var userVO = this.gameManager.dataManager.userVo;
        userVO.cdnum = msg.cdnum;
        this.gameManager.dispatchEvent(EventType.User_Info);
    };
    return RechargeMessage;
}(BaseMessage));
egret.registerClass(RechargeMessage,'RechargeMessage');
