/**
 * BuyCardMsg
 * @Author Ace.c
 * @Create 2016-10-31 18:24
 */
var BuyCardMsg = (function (_super) {
    __extends(BuyCardMsg, _super);
    function BuyCardMsg() {
        _super.call(this);
    }
    var d = __define,c=BuyCardMsg,p=c.prototype;
    /**
     * 获取购卡信息
     */
    p.sendCard_Info = function () {
        var data = {};
        data.s = core.sessionid;
        this.gameManager.httpManager.send(core.serverUrl + Cmd.BuyCard_List, data, this.readCard_Info, this);
    };
    p.readCard_Info = function (msg) {
        if (msg.code != 0)
            return;
        var userVo = this.gameManager.dataManager.userVo;
        userVo.cardMonth = msg.month;
        userVo.cardBuy = msg.sum;
        userVo.cardReward = msg.rew;
        this.gameManager.dispatchEvent(EventType.BuyCard_Info);
    };
    /**
     * 领取购卡奖励
     */
    p.sendCard_GetReward = function () {
        var data = {};
        data.s = core.sessionid;
        this.gameManager.httpManager.send(core.serverUrl + Cmd.BuyCard_Reward_Get, data, this.readCard_GetReward, this);
    };
    p.readCard_GetReward = function (msg) {
        if (msg.code != 0)
            return;
        var userVo = this.gameManager.dataManager.userVo;
        userVo.cardMonth = msg.month;
        userVo.cardBuy = msg.sum;
        userVo.cardReward = msg.rew;
        this.gameManager.dispatchEvent(EventType.BuyCard_Info);
    };
    return BuyCardMsg;
}(BaseMsg));
egret.registerClass(BuyCardMsg,'BuyCardMsg');
