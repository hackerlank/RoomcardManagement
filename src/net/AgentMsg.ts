/**
 * AgentMsg
 * @Author Ace.c
 * @Create 2016-10-30 12:00
 */
class AgentMsg extends BaseMsg {

    public constructor() {
        super();
    }

    /**
     * 获取手机验证码
     * @param phone
     * @param type
     */
    public getPhoneCode(phone, type: number = 0) {
        var data: any = {};
        data.t = type;
        data.p = phone;

        this.gameManager.httpManager.send(core.serverUrl + Cmd.Agent_GetPhoneCode, data, this.getPhoneCodeHandler, this);
    }

    private getPhoneCodeHandler(msg: any) {
    }

    /**
     * 代理添加
     * @param uid
     * @param gid
     * @param wx
     * @param phone
     * @param vercode
     * @param province
     * @param city
     * @param area
     * @param server
     */
    public appent(uid, gid, wx, phone, vercode, province, city, area, server) {
        var data: any = {};
        data.s = core.sessionid;
        data.uid = uid;
        data.gid = gid;
        data.wx = wx;
        data.phone = phone;
        data.vercode = vercode;
        data.addr = province + city + area + server;

        this.gameManager.httpManager.send(core.serverUrl + Cmd.Agent_Append, data, this.appentHandler, this);
    }

    private appentHandler(data: any) {
        this.gameManager.alertManager.open(AlertType.Normal, Lang.getText(2002));
        this.gameManager.dispatchEvent(EventType.Agent_Success);
    }

    /**
     * 查找代理
     * @param phone
     */
    public search(phone) {
        var data: any = {};
        data.s = core.sessionid;
        data.p = phone;

        this.gameManager.httpManager.send(core.serverUrl + Cmd.Agent_Search, data, this.searchHandler, this);
    }

    /**
     * {code, nick, pic, cdnum, gid}
     * @param data
     */
    private searchHandler(data: any) {

        this.gameManager.dispatchEvent(EventType.Agent_Update, data);
    }

    /**
     * 代理充值
     * @param phone
     * @param count
     */
    public recharge(phone, count) {
        var data: any = {};
        data.s = core.sessionid;
        data.p = phone;
        data.n = count;

        this.gameManager.httpManager.send(core.serverUrl + Cmd.Agent_Recharge, data, this.rechargeHandler, this);
    }

    private rechargeHandler(data: any) {
        this.gameManager.alertManager.open(AlertType.Normal, "操作成功");

        if (data.hasOwnProperty("mcdnum")) {
            this.gameManager.dataManager.userVo.cdnum = data.mcdnum;
        }

        this.gameManager.dispatchEvent(EventType.User_Info);
        this.gameManager.dispatchEvent(EventType.Agent_Update, data);
    }

    /**
     * 代理扣卡
     * @param phone
     * @param count
     */
    public deduct(phone, count) {
        var data: any = {};
        data.s = core.sessionid;
        data.p = phone;
        data.n = count;

        this.gameManager.httpManager.send(core.serverUrl + Cmd.Agent_Deduct, data, this.deductHandler, this);
    }

    private deductHandler(data: any) {
        this.gameManager.alertManager.open(AlertType.Normal, "操作成功");
        this.gameManager.dispatchEvent(EventType.Agent_Update, data);
    }

    /**
     * 代理开关
     * @param phone
     * @param type 0关闭 1开启
     */
    public offOn(phone, type) {
        var data: any = {};
        data.s = core.sessionid;
        data.p = phone;
        data.t = type;

        this.gameManager.httpManager.send(core.serverUrl + Cmd.Agent_OffOn, data, this.offOnHandler, this);
    }

    private offOnHandler(data: any) {
        this.gameManager.alertManager.open(AlertType.Normal, "操作成功");
        this.gameManager.dispatchEvent(EventType.Agent_Update, data);
    }

    /**
     * 记录
     * @param page
     * @param count
     */
    public record(page: number, count: number = core.pageLength) {
        var data: any = {};
        data.s = core.sessionid;
        data.p = page;
        data.n = count;

        this.gameManager.httpManager.send(core.serverUrl + Cmd.Agent_Record, data, this.recordHandler, this);
    }

    /**
     * {code:0, rcs:[{id:"", opuid:"",taruid:"",opt:0, num:0, ctime:0}]}
     * @param data
     */
    private recordHandler(msg: any) {

        if (msg.hasOwnProperty("total")) {
            this.gameManager.dataManager.recs_gm_length = msg.total;
        }

        var list: any[] = msg.rcs;
        if (list) {
            var map: any = this.gameManager.dataManager.recs_gm_map;
            var dat: any;
            var rec: any;
            for (var i: number = 0; i < list.length; i++) {
                dat = list[i];

                if (map.hasOwnProperty(dat.id)) {
                    rec = map[dat.id];
                }
                else {
                    rec = new TransferRecordVo();
                    map[dat.id] = rec;
                }

                rec.update(dat);
            }
        }

        this.gameManager.dispatchEvent(EventType.Agent_Record);
    }
}