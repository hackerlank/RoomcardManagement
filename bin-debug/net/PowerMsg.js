/**
 * PowerMsg
 * @Author Ace.c
 * @Create 2016-10-30 12:00
 */
var PowerMsg = (function (_super) {
    __extends(PowerMsg, _super);
    function PowerMsg() {
        _super.call(this);
    }
    var d = __define,c=PowerMsg,p=c.prototype;
    /**
     * 添加代理人
     */
    p.sendAddAgent = function (uid, gid, pow) {
        var data = {};
        data.s = core.sessionid;
        data.u = uid;
        gid && (data.g = gid);
        data.p = pow;
        this.gameManager.httpManager.send(core.serverUrl + Cmd.Add_Agent, data, this.readAddAgent, this);
    };
    p.readAddAgent = function (data) {
        if (data.code != 0)
            return;
        this.gameManager.alertManager.open(AlertType.Normal, Lang.getText(2002));
    };
    return PowerMsg;
}(BaseMsg));
egret.registerClass(PowerMsg,'PowerMsg');
