/**
 * BuyCardMessage
 * @Author Ace.c
 * @Create 2016-10-31 18:24
 */
class BuyCardMessage extends BaseMessage {

    public userVo: UserVo;

    public constructor() {
        super();
    }

    /**
     * 获取购卡信息
     */
    public sendCard_Info() {
        var data: any = {};
        data.s = core.sessionid;

        this.gameManager.httpManager.send(core.serverUrl + Cmd.Card_Info, data, this.readCard_Info, this);
    }

    public readCard_Info(msg: any) {
        if (msg.code != 0)return;

        this.userVo = this.gameManager.dataManager.userVo;
        this.userVo.cardMonth = msg.month;
        this.userVo.cardBuy = msg.sum;
        this.userVo.cardReward = msg.rew;

        this.gameManager.dispatchEvent(EventType.BuyCard_Info);
    }

    /**
     * 领取购卡奖励
     */
    public sendCard_GetReward() {
        var data: any = {};
        data.s = core.sessionid;

        this.gameManager.httpManager.send(core.serverUrl + Cmd.Card_GetReward, data, this.readCard_GetReward, this);
    }

    public readCard_GetReward(msg: any) {
        if (msg.code != 0)return;

    }
}