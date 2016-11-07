/**
 * LoginMsg
 * @Author Ace.c
 * @Create 2016-10-30 11:57
 */
var LoginMsg = (function (_super) {
    __extends(LoginMsg, _super);
    function LoginMsg() {
        _super.call(this);
    }
    var d = __define,c=LoginMsg,p=c.prototype;
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
        var userVo = this.gameManager.dataManager.userVo;
        if (msg.data) {
            userVo.update(msg.data);
            core.sessionid = userVo.sid;
            Weixin.config(core.appid, userVo.api_timestamp, userVo.api_noncestr, userVo.api_sign, ['chooseWXPay']);
        }
        var gameTpl = msg.gameTpl;
        if (gameTpl) {
            userVo.gameMap = {};
            core.gameList = [];
            var game;
            for (var i = 0; i < gameTpl.length; i++) {
                game = gameTpl[i];
                userVo.gameMap[game.gameid] = game;
                core.gameList.push(game.name);
            }
        }
        var rechargeList = msg.recTpl;
        if (rechargeList) {
            userVo.rechargeList = [];
            var rechargeVo;
            for (var i = 0; i < rechargeList.length; i++) {
                rechargeVo = new RechargeVo();
                rechargeVo.update(rechargeList[i]);
                userVo.rechargeList.push(rechargeVo);
            }
            userVo.rechargeList.sort(function (a, b) {
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
            userVo.rewardRuleList = [];
            var rewardRuleVo;
            for (var i = 0; i < rewardRuleList.length; i++) {
                rewardRuleVo = new RewardRuleVo();
                rewardRuleVo.update(rewardRuleList[i]);
                userVo.rewardRuleList.push(rewardRuleVo);
            }
            userVo.rewardRuleList.sort(function (a, b) {
                if (a.min > b.min) {
                    return 1;
                }
                else {
                    return -1;
                }
            });
        }
        this.gameManager.msgManager.lowerUser.sendLowerUser_List(1);
        this.gameManager.dispatchEvent(EventType.User_Info);
    };
    return LoginMsg;
}(BaseMsg));
egret.registerClass(LoginMsg,'LoginMsg');
