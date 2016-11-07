/**
 * BuyCardMessage
 * @Author Ace.c
 * @Create 2016-10-31 18:24
 */
var BuyCardMessage = (function (_super) {
    __extends(BuyCardMessage, _super);
    function BuyCardMessage() {
        _super.call(this);
    }
    var d = __define,c=BuyCardMessage,p=c.prototype;
    /**
     * 获取购卡信息
     */
    p.sendCard_Info = function () {
        var data = {};
        data.s = core.sessionid;
        this.gameManager.httpManager.send(core.serverUrl + Cmd.Card_Info, data, this.readCard_Info, this);
    };
    p.readCard_Info = function (msg) {
        if (msg.code != 0)
            return;
        this.userVo = this.gameManager.dataManager.userVo;
        this.userVo.cardMonth = msg.month;
        this.userVo.cardBuy = msg.sum;
        this.userVo.cardReward = msg.rew;
        this.gameManager.dispatchEvent(EventType.BuyCard_Info);
    };
    /**
     * 领取购卡奖励
     */
    p.sendCard_GetReward = function () {
        var data = {};
        data.s = core.sessionid;
        this.gameManager.httpManager.send(core.serverUrl + Cmd.Card_GetReward, data, this.readCard_GetReward, this);
    };
    p.readCard_GetReward = function (msg) {
        if (msg.code != 0)
            return;
    };
    return BuyCardMessage;
}(BaseMessage));
egret.registerClass(BuyCardMessage,'BuyCardMessage');
