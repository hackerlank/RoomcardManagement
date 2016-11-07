/**
 * LoginMessage
 * @Author Ace.c
 * @Create 2016-10-30 11:57
 */
var LoginMessage = (function (_super) {
    __extends(LoginMessage, _super);
    function LoginMessage() {
        _super.call(this);
    }
    var d = __define,c=LoginMessage,p=c.prototype;
    /**
     * 登录
     */
    p.sendLogin = function () {
        var data = {};
        data.code = core.code;
        data.url = location.href.split("#")[0];
        data.t = core.loginType;
        this.gameManager.httpManager.send(core.serverUrl + Cmd.Login, data, this.readLogin, this);
    };
    p.readLogin = function (msg) {
        if (msg.code != 0)
            return;
        this.gameManager.sceneManager.open(SceneType.transfer);
        this.gameManager.uiManager.menuUI.open();
        if (msg.data) {
            this.userVo = this.gameManager.dataManager.userVo;
            this.userVo.update(msg.data);
            core.sessionid = this.userVo.sid;
            Weixin.config(core.appid, this.userVo.api_timestamp, this.userVo.api_noncestr, this.userVo.api_sign, ['chooseWXPay']);
        }
        var gameTpl = msg.gameTpl;
        if (gameTpl) {
            this.userVo.gameMap = {};
            core.gameList = [];
            var game;
            for (var i = 0; i < gameTpl.length; i++) {
                game = gameTpl[i];
                this.userVo.gameMap[game.gameid] = game;
                core.gameList.push(game.name);
            }
        }
        var rechargeList = msg.recTpl;
        if (rechargeList) {
            this.userVo.rechargeList = [];
            var rechargeVo;
            for (var i = 0; i < rechargeList.length; i++) {
                rechargeVo = new RechargeVo();
                rechargeVo.update(rechargeList[i]);
                this.userVo.rechargeList.push(rechargeVo);
            }
            this.userVo.rechargeList.sort(function (a, b) {
                if (a.card > b.card) {
                    return 1;
                }
                else {
                    return -1;
                }
            });
        }
        var rewardRuleList = msg.buycTpl;
        if (rewardRuleList) {
            this.userVo.rewardRuleList = [];
            var rewardRuleVo;
            for (var i = 0; i < rewardRuleList.length; i++) {
                rewardRuleVo = new RewardRuleVo();
                rewardRuleVo.update(rewardRuleList[i]);
                this.userVo.rewardRuleList.push(rewardRuleVo);
            }
            this.userVo.rewardRuleList.sort(function (a, b) {
                if (a.min > b.min) {
                    return 1;
                }
                else {
                    return -1;
                }
            });
        }
        this.gameManager.msgManager.follow.sendFollowList(1);
        this.gameManager.dispatchEvent(EventType.User_Info);
    };
    return LoginMessage;
}(BaseMessage));
egret.registerClass(LoginMessage,'LoginMessage');
