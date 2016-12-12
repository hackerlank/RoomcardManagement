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
    public btn_logingame: eui.Button;
    public btn_room: eui.Button;
    public btn_sale: eui.Button;
    public btn_buy: eui.Button;
    public btn_transfer: eui.Button;
    public btn_checkRecord: eui.Button;

    public userVo: UserVo;

    public constructor() {
        super();

        this.skinName = "AccountSceneSkin";
        this.id = SceneType.account;
    }

    public childrenCreated() {
        super.childrenCreated();

        this.userVo = this.gameManager.dataManager.userVo;

        this.menuGroup.contains(this.btn_power) && this.menuGroup.removeChild(this.btn_power);

        this.onUpdateInfo();

        this.btn_recharge.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_power.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_room.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_agent.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_sale.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_buy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_transfer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_logingame.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_checkRecord.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);

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
            case this.btn_logingame:
                this.gameManager.sceneManager.open(SceneType.loginGame);
                break;
            case this.btn_checkRecord:
                this.gameManager.sceneManager.open(SceneType.account_agent_checkrecord);
                break;
        }
    }

    public onUpdateInfo() {

        if (Power.hasSuperManagerPower() == false) {
            this.menuGroup.contains(this.btn_power) && this.menuGroup.removeChild(this.btn_power);
            this.menuGroup.contains(this.btn_agent) && this.menuGroup.removeChild(this.btn_agent);
            this.menuGroup.contains(this.btn_room) && this.menuGroup.removeChild(this.btn_room);
        }
        else {
            this.menuGroup.contains(this.btn_logingame) && this.menuGroup.removeChild(this.btn_logingame);
            this.menuGroup.contains(this.btn_sale) && this.menuGroup.removeChild(this.btn_sale);
            this.menuGroup.contains(this.btn_buy) && this.menuGroup.removeChild(this.btn_buy);
        }

        this.btn_sale.visible = this.btn_transfer.visible = this.btn_buy.visible = this.btn_checkRecord.visible = this.userVo.pow != Power.agent_new;

        this.update();
    }

    public update() {
        this.img_portrait.source = "" + this.userVo.pic;
        this.lab_nick.text = "" + this.userVo.nick;
        this.lab_uid.text = "ID:" + this.userVo.uid;
        this.lab_card.text = "剩余房卡:" + this.userVo.cdnum;
    }

    public open() {
        super.open();

        if (this.initComplete) {
            this.gameManager.msgManager.recharge.sendSynchro();
        }
    }
}