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

    public constructor() {
        super();

        this.skinName = "AgentSceneSkin";
        this.id = SceneType.agent;
    }

    public childrenCreated() {
        super.childrenCreated();

        this.btn_add.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_notice.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_lv1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_lv2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);

        this.gameManager.addEventListener(EventType.LowerUser_Contribution, this.onUpdate, this);
    }

    private clickHandler(e: egret.TouchEvent) {
        switch (e.currentTarget) {
            case this.btn_add:
                this.gameManager.sceneManager.open(SceneType.agent_append);
                break;
            case this.btn_notice:
                this.gameManager.sceneManager.open(SceneType.agent_notice);
                break;
            case this.btn_lv1:
                this.gameManager.sceneManager.open(SceneType.agent_lv1Record);
                break;
            case this.btn_lv2:
                this.gameManager.sceneManager.open(SceneType.agent_lv2Record);
                break;
        }
    }

    private onUpdate() {
        this.btn_lv1.label = "一级代理返卡:" + this.gameManager.dataManager.userVo.agentLv1Reward;
        this.btn_lv2.label = "二级代理返卡:" + this.gameManager.dataManager.userVo.agentLv2Reward;
    }

    public open() {
        super.open();

        if (this.initComplete) {
            this.btn_lv1.label = "一级代理";
            this.btn_lv2.label = "二级代理";
            this.gameManager.msgManager.lowerUser.sendLowerUser_Contribution();
        }
    }
}