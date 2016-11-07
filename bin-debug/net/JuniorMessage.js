/**
 * JuniorMessage
 * @Author Ace.c
 * @Create 2016-11-01 15:03
 */
var JuniorMessage = (function (_super) {
    __extends(JuniorMessage, _super);
    function JuniorMessage() {
        _super.call(this);
    }
    var d = __define,c=JuniorMessage,p=c.prototype;
    /**
     * 下级贡献信息
     */
    p.sendGetInfo = function () {
        var data = {};
        data.s = core.sessionid;
        this.gameManager.httpManager.send(core.serverUrl + Cmd.Junior_Info, data, this.readJuniorInfo, this);
    };
    /**
     * 领取下级贡献
     */
    p.sendGetReward = function () {
        var data = {};
        data.s = core.sessionid;
        this.gameManager.httpManager.send(core.serverUrl + Cmd.Junior_GetReward, data, this.readJuniorInfo, this);
    };
    p.readJuniorInfo = function (msg) {
        if (msg.code != 0)
            return;
        this.userVo = this.gameManager.dataManager.userVo;
        if (msg.hasOwnProperty("month")) {
            this.userVo.juniorMonth = msg.month;
        }
        if (msg.hasOwnProperty("rew")) {
            this.userVo.juniorReward = msg.rew;
        }
        if (msg.hasOwnProperty("cdnum")) {
            this.userVo.cdnum = msg.cdnum;
        }
        if (msg.hasOwnProperty("ros")) {
            this.juniorList = [];
            var junior;
            for (var i = 0; i < msg.ros.length; i++) {
                junior = new JuniorVo();
                junior.update(msg.ros[i]);
                this.juniorList.push(junior);
            }
            this.juniorList.sort(function (a, b) {
                if (a.rew > b.rew) {
                    return -1;
                }
                else {
                    return 1;
                }
            });
        }
        this.gameManager.dispatchEvent(EventType.Junior_Info);
    };
    return JuniorMessage;
}(BaseMessage));
egret.registerClass(JuniorMessage,'JuniorMessage');
