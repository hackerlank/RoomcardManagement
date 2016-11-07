/**
 * AgentScene
 * @Author Ace.c
 * @Create 2016-11-07 15:39
 */
class AgentScene extends BaseScene {

    private btn_add: eui.Button;
    private btn_notice: eui.Button;
    private btn_lv1: eui.Button;
    private btn_lv2: eui.Button;
    private lab_reward: eui.TextInput;
    private btn_get: eui.Button;

    public constructor() {
        super();

        this.skinName = "AgentSceneSkin";
        this.id = SceneType;
    }

    public childrenCreated() {
        super.childrenCreated();

        this.btn_add.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_notice.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_lv1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_lv2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_get.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
    }

    private clickHandler(e: egret.TouchEvent) {
        switch (e.currentTarget) {
            case this.btn_add:
                break;
            case this.btn_notice:
                break;
            case this.btn_lv1:
                break;
            case this.btn_lv2:
                break;
            case this.btn_get:
                break;
        }
    }
}