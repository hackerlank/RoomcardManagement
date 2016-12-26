/**
 * RechargeMsg
 * @Author Ace.c
 * @Create 2016-11-02 15:02
 */
class RechargeMsg extends BaseMsg {

    public constructor() {
        super();
    }

    /**
     * 向服务器请求订单
     * @param id
     */
    public sendOrder(id: number) {
        var data: any = {};
        data.s = core.sessionid;
        data.n = id;

        this.gameManager.httpManager.send(core.serverUrl + Cmd.Recharge, data, this.readOrder, this);
    }

    public readOrder(msg: any) {
        if (msg.code != 0)return;

        var _this = this;
        Weixin.pay(msg.timestamp, msg.nonceStr, msg.package, msg.paySign, function (res) {
            if (res.err_msg == "get_brand_wcpay_request：ok") {
                _this.sendSynchro();
            }
        });
    }

    /**
     * 同步充值
     */
    public sendSynchro() {
        var data: any = {};
        data.s = core.sessionid;

        this.gameManager.httpManager.send(core.serverUrl + Cmd.Recharge_Synchro, data, this.readSynchro, this);
    }

    public readSynchro(msg: any) {
        if (msg.code != 0)return;

        var userVO: UserVo = this.gameManager.dataManager.userVo;
        userVO.cdnum = msg.cdnum;
        userVO.pow = msg.pow == 0 ? Power.agent_new : msg.pow;
        this.gameManager.dispatchEvent(EventType.User_Info);
    }
}