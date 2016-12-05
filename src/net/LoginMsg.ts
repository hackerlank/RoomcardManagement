/**
 * LoginMsg
 * @Author Ace.c
 * @Create 2016-10-30 11:57
 */
class LoginMsg extends BaseMsg {

    public constructor() {
        super();
    }

    /**
     * 登录Gm
     */
    public loginGm(phone, phoneCode) {
        var data: any = {};
        data.p = phone;
        data.v = phoneCode;

        this.gameManager.httpManager.send(core.serverUrl + Cmd.Login_gm, data, this.loginHandler, this);
    }

    /**
     * 登录
     */
    public sendLogin() {
        var data: any = {};
        data.code = core.code;
        data.pcode = core.code_p;
        data.url = location.href.split("#")[0];
        data.t = core.loginType;

        this.gameManager.httpManager.send(core.serverUrl + Cmd.Login, data, this.loginHandler, this);
    }

    public loginHandler(msg: any) {
        if (msg.code != 0)return;

        var userVo: UserVo = this.gameManager.dataManager.userVo;

        if (msg.data) {
            userVo.update(msg.data);

            core.sessionid = userVo.sid;

            if (!core.gm || core.gm == "") {
                Weixin.config(core.appid_p, userVo.api_timestamp, userVo.api_noncestr, userVo.api_sign, ['chooseWXPay']);
            }
        }

        if (msg.hasOwnProperty("gl")) {
            core.gameDatas = msg.gl;
            if (core.gameDatas.length == 1) {
                this.sendLoginGame(core.gameDatas[0].gid);
            }
            else {
                core.gameManager.sceneManager.open(SceneType.loginGame);
            }
        }
        else {
            this.loginGameHandler(msg);
        }
    }

    /**
     * 登录指定游戏
     */
    public sendLoginGame(g: string) {
        var data: any = {};
        data.s = core.sessionid;
        data.g = g;

        this.gameManager.httpManager.send(core.serverUrl + Cmd.Login_game, data, this.loginGameHandler, this);
    }

    public loginGameHandler(msg: any) {
        if (msg.code != 0)return;

        var userVo: UserVo = this.gameManager.dataManager.userVo;
        if (msg.data) {
            userVo.update(msg.data);
        }

        var gameTpl: any[] = msg.gameTpl;
        if (gameTpl) {
            userVo.gameMap = {};
            core.gameTpl = [];
            var game: any;
            for (var i: number = 0; i < gameTpl.length; i++) {
                game = gameTpl[i];
                userVo.gameMap[game.gameid] = game;
                core.gameTpl.push(game.name);
            }
        }

        var rechargeList: any[] = msg.recTpl;
        if (rechargeList) {
            userVo.rechargeList = [];

            var rechargeVo: RechargeVo;
            for (var i: number = 0; i < rechargeList.length; i++) {
                rechargeVo = new RechargeVo();
                rechargeVo.update(rechargeList[i]);
                userVo.rechargeList.push(rechargeVo);
            }

            userVo.rechargeList.sort(function (a: RechargeVo, b: RechargeVo) {
                if (a.card > b.card) {
                    return 1;
                }
                else {
                    return -1;
                }
            });
        }

        var rewardRuleList: any[] = msg.buycTpl;
        if (rewardRuleList) {
            userVo.rewardRuleList = [];

            var rewardRuleVo: RewardRuleVo;
            for (var i: number = 0; i < rewardRuleList.length; i++) {
                rewardRuleVo = new RewardRuleVo();
                rewardRuleVo.update(rewardRuleList[i]);
                userVo.rewardRuleList.push(rewardRuleVo);
            }

            userVo.rewardRuleList.sort(function (a: RewardRuleVo, b: RewardRuleVo) {
                if (a.min > b.min) {
                    return 1;
                }
                else {
                    return -1;
                }
            });
        }
        this.gameManager.sceneManager.open(SceneType.transfer);
        this.gameManager.uiManager.menuUI.open();

        this.gameManager.dispatchEvent(EventType.User_Info);
    }
}