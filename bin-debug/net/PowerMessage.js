/**
 * PowerMessage
 * @Author Ace.c
 * @Create 2016-10-30 12:00
 */
var PowerMessage = (function (_super) {
    __extends(PowerMessage, _super);
    function PowerMessage() {
        _super.call(this);
    }
    var d = __define,c=PowerMessage,p=c.prototype;
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
    return PowerMessage;
}(BaseMessage));
egret.registerClass(PowerMessage,'PowerMessage');
