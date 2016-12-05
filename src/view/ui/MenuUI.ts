/**
 * MenuUI
 * @Author Ace.c
 * @Create 2016-10-25 19:51
 */
class MenuUI extends BaseUI {

    private btn_transfer: eui.Button;
    private btn_lower: eui.Button;
    private btn_agent: eui.Button;
    private btn_account: eui.Button;

    private userVo: UserVo;

    public constructor() {
        super();

        this.skinName = "MenuUISkin";
    }

    public childrenCreated() {
        super.childrenCreated();

        this.userVo = this.gameManager.dataManager.userVo;

        this.onUpdateInfo();

        this.left = 0;
        this.right = 0;
        this.bottom = 0;

        this.btn_transfer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_lower.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_agent.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_account.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);

        this.gameManager.addEventListener(EventType.User_Info, this.onUpdateInfo, this);
    }

    private clickHandler(e: egret.TouchEvent) {
        switch (e.currentTarget) {
            case this.btn_transfer:
                this.gameManager.sceneManager.open(SceneType.transfer);
                break;
            case this.btn_lower:
                this.gameManager.sceneManager.open(SceneType.follow);
                break;
            case this.btn_agent:
                this.gameManager.sceneManager.open(SceneType.agent);
                break;
            case this.btn_account:
                this.gameManager.sceneManager.open(SceneType.account);
                break;
        }
    }

    private onUpdateInfo() {
        switch (this.userVo.pow) {
            case Power.gm:
            case Power.agent:
                this.btn_transfer.visible = this.btn_lower.visible = this.btn_agent.visible = true;
                break;
            case Power.agent_new:
                this.btn_transfer.visible = this.btn_lower.visible = this.btn_agent.visible = false;
                this.gameManager.sceneManager.open(SceneType.account);
                break;
        }
    }
}