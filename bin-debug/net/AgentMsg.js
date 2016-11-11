/**
 * AgentMsg
 * @Author Ace.c
 * @Create 2016-10-30 12:00
 */
var AgentMsg = (function (_super) {
    __extends(AgentMsg, _super);
    function AgentMsg() {
        _super.call(this);
    }
    var d = __define,c=AgentMsg,p=c.prototype;
    /**
     * 获取手机验证码
     * @param phone
     * @param type
     */
    p.getPhoneCode = function (phone, type) {
        if (type === void 0) { type = 0; }
        var data = {};
        data.t = type;
        data.p = phone;
        this.gameManager.httpManager.send(core.serverUrl + Cmd.Agent_GetPhoneCode, data, this.getPhoneCodeHandler, this);
    };
    p.getPhoneCodeHandler = function (msg) {
    };
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
    p.appent = function (uid, gid, wx, phone, vercode, province, city, area, server) {
        var data = {};
        data.s = core.sessionid;
        data.uid = uid;
        data.gid = gid;
        data.wx = wx;
        data.phone = phone;
        data.vercode = vercode;
        data.addr = province + city + area + server;
        this.gameManager.httpManager.send(core.serverUrl + Cmd.Agent_Append, data, this.appentHandler, this);
    };
    p.appentHandler = function (data) {
        this.gameManager.alertManager.open(AlertType.Normal, Lang.getText(2002));
        this.gameManager.dispatchEvent(EventType.Agent_Success);
    };
    /**
     * 查找代理
     * @param phone
     */
    p.search = function (phone) {
        var data = {};
        data.s = core.sessionid;
        data.p = phone;
        this.gameManager.httpManager.send(core.serverUrl + Cmd.Agent_Search, data, this.searchHandler, this);
    };
    /**
     * {code, nick, pic, cdnum, gid}
     * @param data
     */
    p.searchHandler = function (data) {
        this.gameManager.dispatchEvent(EventType.Agent_Update, data);
    };
    /**
     * 代理充值
     * @param phone
     * @param count
     */
    p.recharge = function (phone, count) {
        var data = {};
        data.s = core.sessionid;
        data.p = phone;
        data.n = count;
        this.gameManager.httpManager.send(core.serverUrl + Cmd.Agent_Recharge, data, this.rechargeHandler, this);
    };
    p.rechargeHandler = function (data) {
        this.gameManager.alertManager.open(AlertType.Normal, "操作成功");
        if (data.hasOwnProperty("mcdnum")) {
            this.gameManager.dataManager.userVo.cdnum = data.mcdnum;
        }
        this.gameManager.dispatchEvent(EventType.User_Info);
        this.gameManager.dispatchEvent(EventType.Agent_Update, data);
    };
    /**
     * 代理扣卡
     * @param phone
     * @param count
     */
    p.deduct = function (phone, count) {
        var data = {};
        data.s = core.sessionid;
        data.p = phone;
        data.n = count;
        this.gameManager.httpManager.send(core.serverUrl + Cmd.Agent_Deduct, data, this.deductHandler, this);
    };
    p.deductHandler = function (data) {
        this.gameManager.alertManager.open(AlertType.Normal, "操作成功");
        this.gameManager.dispatchEvent(EventType.Agent_Update, data);
    };
    /**
     * 代理开关
     * @param phone
     * @param type 0关闭 1开启
     */
    p.offOn = function (phone, type) {
        var data = {};
        data.s = core.sessionid;
        data.p = phone;
        data.t = type;
        this.gameManager.httpManager.send(core.serverUrl + Cmd.Agent_OffOn, data, this.offOnHandler, this);
    };
    p.offOnHandler = function (data) {
        this.gameManager.alertManager.open(AlertType.Normal, "操作成功");
        this.gameManager.dispatchEvent(EventType.Agent_Update, data);
    };
    /**
     * 记录
     * @param page
     * @param count
     */
    p.record = function (page, count) {
        if (count === void 0) { count = core.pageLength; }
        var data = {};
        data.s = core.sessionid;
        data.p = page;
        data.n = count;
        this.gameManager.httpManager.send(core.serverUrl + Cmd.Agent_Record, data, this.recordHandler, this);
    };
    /**
     * {code:0, rcs:[{id:"", opuid:"",taruid:"",opt:0, num:0, ctime:0}]}
     * @param data
     */
    p.recordHandler = function (msg) {
        if (msg.hasOwnProperty("total")) {
            this.gameManager.dataManager.recs_gm_length = msg.total;
        }
        var list = msg.rcs;
        if (list) {
            var map = this.gameManager.dataManager.recs_gm_map;
            var dat;
            var rec;
            for (var i = 0; i < list.length; i++) {
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
    };
    return AgentMsg;
}(BaseMsg));
egret.registerClass(AgentMsg,'AgentMsg');
