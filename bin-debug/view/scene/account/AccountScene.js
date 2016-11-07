/**
 * AccountScene
 * @Author Ace.c
 * @Create 2016-10-25 20:02
 */
var AccountScene = (function (_super) {
    __extends(AccountScene, _super);
    function AccountScene() {
        _super.call(this);
        this.skinName = "AccountSceneSkin";
        this.id = SceneType.account;
    }
    var d = __define,c=AccountScene,p=c.prototype;
    p.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.userVo = this.gameManager.dataManager.userVo;
        switch (this.userVo.pow) {
            case Power.superManager:
                break;
            case Power.agentLv1:
            case Power.agentLv2:
            case Power.agentLv3:
                this.menuGroup.removeChild(this.btn_power);
                this.menuGroup.removeChild(this.btn_room);
                break;
        }
        this.update();
        this.btn_recharge.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_power.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_room.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_sale.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_buy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_transfer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.gameManager.addEventListener(EventType.User_Info, this.onUpdateInfo, this);
    };
    p.clickHandler = function (e) {
        switch (e.currentTarget) {
            case this.btn_recharge:
                this.gameManager.sceneManager.open(SceneType.account_recharge);
                break;
            case this.btn_power:
                this.gameManager.sceneManager.open(SceneType.account_power);
                break;
            case this.btn_room:
                this.gameManager.sceneManager.open(SceneType.account_room);
                break;
            case this.btn_sale:
                this.gameManager.sceneManager.open(SceneType.account_sale);
                break;
            case this.btn_buy:
                break;
            case this.btn_transfer:
                this.gameManager.sceneManager.open(SceneType.account_transfer);
                break;
        }
    };
    p.onUpdateInfo = function () {
        this.update();
    };
    p.update = function () {
        this.img_portrait.source = "" + this.userVo.pic;
        this.lab_nick.text = "" + this.userVo.nick;
        this.lab_uid.text = "ID:" + this.userVo.uid;
        this.lab_card.text = "房卡:" + this.userVo.cdnum;
    };
    return AccountScene;
}(BaseScene));
egret.registerClass(AccountScene,'AccountScene');
