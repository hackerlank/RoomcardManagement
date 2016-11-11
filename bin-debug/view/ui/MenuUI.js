/**
 * MenuUI
 * @Author Ace.c
 * @Create 2016-10-25 19:51
 */
var MenuUI = (function (_super) {
    __extends(MenuUI, _super);
    function MenuUI() {
        _super.call(this);
        this.skinName = "MenuUISkin";
    }
    var d = __define,c=MenuUI,p=c.prototype;
    p.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
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
    };
    p.clickHandler = function (e) {
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
    };
    p.onUpdateInfo = function () {
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
    };
    return MenuUI;
}(BaseUI));
egret.registerClass(MenuUI,'MenuUI');
