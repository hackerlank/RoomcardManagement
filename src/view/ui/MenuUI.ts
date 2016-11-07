/**
 * MenuUI
 * @Author Ace.c
 * @Create 2016-10-25 19:51
 */
class MenuUI extends BaseUI {

    public btn_transfer: eui.Button;
    public btn_lower: eui.Button;
    public btn_agent: eui.Button;
    public btn_account: eui.Button;

    public constructor() {
        super();

        this.skinName = "MenuUISkin";
    }

    public childrenCreated() {
        super.childrenCreated();

        this.left = 0;
        this.right = 0;
        this.bottom = 0;

        this.btn_transfer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_lower.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_agent.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_account.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
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
                // this.gameManager.sceneManager.open(SceneType.account);
                break;
            case this.btn_account:
                this.gameManager.sceneManager.open(SceneType.account);
                break;
        }
    }
}