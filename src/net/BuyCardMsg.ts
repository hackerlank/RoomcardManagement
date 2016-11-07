/**
 * BuyCardMsg
 * @Author Ace.c
 * @Create 2016-10-31 18:24
 */
class BuyCardMsg extends BaseMsg {

    public constructor() {
        super();
    }

    /**
     * 获取购卡信息
     */
    public sendCard_Info() {
        var data: any = {};
        data.s = core.sessionid;

        this.gameManager.httpManager.send(core.serverUrl + Cmd.BuyCard_List, data, this.readCard_Info, this);
    }

    public readCard_Info(msg: any) {
        if (msg.code != 0)return;

        var userVo: UserVo = this.gameManager.dataManager.userVo;
        userVo.cardMonth = msg.month;
        userVo.cardBuy = msg.sum;
        userVo.cardReward = msg.rew;

        this.gameManager.dispatchEvent(EventType.BuyCard_Info);
    }

    /**
     * 领取购卡奖励
     */
    public sendCard_GetReward() {
        var data: any = {};
        data.s = core.sessionid;

        this.gameManager.httpManager.send(core.serverUrl + Cmd.BuyCard_Reward_Get, data, this.readCard_GetReward, this);
    }

    public readCard_GetReward(msg: any) {
        if (msg.code != 0)return;

    }
}