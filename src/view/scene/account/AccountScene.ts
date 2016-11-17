/**
 * AccountScene
 * @Author Ace.c
 * @Create 2016-10-25 20:02
 */
class AccountScene extends BaseScene {

    public img_portrait: eui.Image;
    public lab_uid: eui.Label;
    public lab_nick: eui.Label;
    public lab_card: eui.Label;
    public btn_recharge: eui.Button;
    public menuGroup: eui.Group;
    public btn_power: eui.Button;
    public btn_agent: eui.Button;
    public btn_room: eui.Button;
    public btn_sale: eui.Button;
    public btn_buy: eui.Button;
    public btn_transfer: eui.Button;

    public userVo: UserVo;

    public constructor() {
        super();

        this.skinName = "AccountSceneSkin";
        this.id = SceneType.account;
    }

    public childrenCreated() {
        super.childrenCreated();

        this.userVo = this.gameManager.dataManager.userVo;

        switch (this.userVo.pow) {
            case Power.gm:
                break;
            case Power.agent:
            case Power.agent_new:
                this.menuGroup.removeChild(this.btn_power);
                this.menuGroup.removeChild(this.btn_agent);
                this.menuGroup.removeChild(this.btn_room);
                break;
        }

        this.onUpdateInfo();

        this.btn_recharge.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_power.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_room.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_agent.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_sale.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_buy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_transfer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);

        this.gameManager.addEventListener(EventType.User_Info, this.onUpdateInfo, this);
    }

    private clickHandler(e: egret.TouchEvent) {
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
            case this.btn_agent:
                this.gameManager.sceneManager.open(SceneType.account_agent);
                break;
            case this.btn_sale:
                this.gameManager.sceneManager.open(SceneType.account_sale);
                break;
            case this.btn_transfer:
                this.gameManager.sceneManager.open(SceneType.account_trans_out);
                break;
            case this.btn_buy:
                this.gameManager.sceneManager.open(SceneType.account_trans_in);
                break;
        }
    }

    public onUpdateInfo() {
        switch (this.userVo.pow) {
            case Power.gm:
            case Power.agent:
                this.btn_room.visible = this.btn_agent.visible = this.btn_sale.visible = this.btn_transfer.visible = this.btn_buy.visible = true;
                break;
            case Power.agent_new:
                this.btn_room.visible = this.btn_agent.visible = this.btn_sale.visible = this.btn_transfer.visible = this.btn_buy.visible = false;
                break;
        }

        this.update();
    }

    public update() {
        this.img_portrait.source = "" + this.userVo.pic;
        this.lab_nick.text = "" + this.userVo.nick;
        this.lab_uid.text = "ID:" + this.userVo.uid;
        this.lab_card.text = "房卡:" + this.userVo.cdnum;
    }

    public open() {
        super.open();

        if (this.initComplete) {
            this.gameManager.msgManager.recharge.sendSynchro();
        }
    }
}