/**
 * AccountAgentScene
 * @Author Ace.c
 * @Create 2016-11-09 15:07
 */
var AccountAgentScene = (function (_super) {
    __extends(AccountAgentScene, _super);
    function AccountAgentScene() {
        _super.call(this);
        this.skinName = "AccountAgentSceneSkin";
        this.id = SceneType.account_agent;
    }
    var d = __define,c=AccountAgentScene,p=c.prototype;
    p.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.nba_count.setMaxChars(6);
        this.btn_search.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_recharge.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_deduct.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_off.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_on.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_record.addEventListener(egret.TouchEvent.TOUCH_TAP, this.recordHandler, this);
        this.gameManager.addEventListener(EventType.Agent_Update, this.onUpdateInfo, this);
    };
    p.recordHandler = function (e) {
        this.gameManager.sceneManager.open(SceneType.account_agent_record);
    };
    p.clickHandler = function (e) {
        var phone = "" + this.lab_phone.text;
        if (phone == "") {
            this.gameManager.alertManager.open(AlertType.Normal, "请填写手机号码");
            return;
        }
        switch (e.currentTarget) {
            case this.btn_search:
                //TODO 查询房卡
                this.gameManager.msgManager.agent.search(phone);
                break;
            case this.btn_recharge:
                //TODO 充值房卡
                this.gameManager.msgManager.agent.recharge(phone, this.nba_count.numb);
                break;
            case this.btn_deduct:
                //TODO 扣除房卡
                this.gameManager.msgManager.agent.deduct(phone, this.nba_count.numb);
                break;
            case this.btn_off:
                //TODO 取消代理
                this.gameManager.msgManager.agent.offOn(phone, 0);
                break;
            case this.btn_on:
                //TODO 开启代理
                this.gameManager.msgManager.agent.offOn(phone, 1);
                break;
        }
    };
    p.onUpdateInfo = function (data) {
        var userVo = this.gameManager.dataManager.userVo;
        if (data.hasOwnProperty("pic")) {
            this.img_portrait.source = "" + data.pic;
        }
        if (data.hasOwnProperty("nick")) {
            this.lab_nick.text = "" + data.nick;
        }
        if (data.hasOwnProperty("gid")) {
            this.lab_game.text = "" + userVo.getGameName(data.gid);
        }
        if (data.hasOwnProperty("cdnum")) {
            this.lab_card.text = "房卡:" + data.cdnum;
        }
    };
    return AccountAgentScene;
}(BaseScene));
egret.registerClass(AccountAgentScene,'AccountAgentScene');
