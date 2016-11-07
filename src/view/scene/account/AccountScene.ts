/**
 * AccountScene
 * @Author Ace.c
 * @Create 2016-10-25 20:02
 */
class AccountScene extends BaseScene {

    public img_portrait: eui.Image;
    public lab_nick: eui.Label;
    public lab_id: eui.Label;
    public lab_card: eui.Label;
    public menuGroup: eui.Group;
    public btn_recharge: eui.Button;
    public btn_record: eui.Button;
    public btn_record1: eui.Button;
    public btn_room: eui.Button;
    public btn_room1: eui.Button;
    public juniorGroup: eui.Group;
    public btn_junior: eui.Button;
    public btn_junior1: eui.Button;
    public btn_reward: eui.Button;
    public btn_reward1: eui.Button;
    public powerGroup: eui.Group;
    public btn_power: eui.Button;
    public btn_power1: eui.Button;

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
            case Power.superManager:
                break;
            case Power.superAgent:
                this.deletePower();
                break;
            case Power.agent:
                this.deletePower();
                this.deleteJunior();
                break;
        }

        this.update();

        this.btn_recharge.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_record.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_record1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_room.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_room1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_junior.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_junior1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_reward.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_reward1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_power.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_power1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);

        this.gameManager.addEventListener(EventType.User_Info, this.onUpdateInfo, this);
    }

    private deletePower() {
        this.menuGroup.removeChild(this.powerGroup);
    }

    private deleteJunior() {
        this.menuGroup.removeChild(this.juniorGroup);
    }

    private clickHandler(e: egret.TouchEvent) {
        switch (e.currentTarget) {
            case this.btn_recharge:
                this.gameManager.sceneManager.open(SceneType.account_recharge);
                break;
            case this.btn_record:
            case this.btn_record1:
                this.gameManager.sceneManager.open(SceneType.account_record);
                break;
            case this.btn_room:
            case this.btn_room1:
                this.gameManager.sceneManager.open(SceneType.account_room);
                break;
            case this.btn_junior:
            case this.btn_junior1:
                this.gameManager.sceneManager.open(SceneType.account_junior);
                break;
            case this.btn_reward:
            case this.btn_reward1:
                this.gameManager.sceneManager.open(SceneType.account_reward);
                break;
            case this.btn_power:
            case this.btn_power1:
                this.gameManager.sceneManager.open(SceneType.account_power);
                break;
        }
    }

    public onUpdateInfo() {
        this.update();
    }

    public update() {
        this.img_portrait.source = "" + this.userVo.pic;
        this.lab_nick.text = "" + this.userVo.nick;
        this.lab_id.text = "ID:" + this.userVo.uid;
        this.lab_card.text = "房卡:" + this.userVo.cdnum;
    }
}