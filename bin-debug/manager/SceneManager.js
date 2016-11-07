/**
 * Created by Ace.C on 2016/4/15.
 */
var SceneManager = (function (_super) {
    __extends(SceneManager, _super);
    function SceneManager() {
        _super.call(this);
        this.gather = {};
        this.initManager();
    }
    var d = __define,c=SceneManager,p=c.prototype;
    p.initManager = function () {
        _super.prototype.initManager.call(this);
        this.gather = {};
        this.welcomScene = new WelcomScene();
        this.addScene(this.welcomScene);
        this.errorScene = new ErrorScene();
        this.addScene(this.errorScene);
        this.transferScene = new TransferScene();
        this.addScene(this.transferScene);
        this.followScene = new FollowScene();
        this.addScene(this.followScene);
        this.followSearchScene = new FollowSearchScene();
        this.addScene(this.followSearchScene);
        this.followDetailsScene = new FollowDetailsScene();
        this.addScene(this.followDetailsScene);
        this.accountScene = new AccountScene();
        this.addScene(this.accountScene);
        this.accountRecordScene = new AccountRecordScene();
        this.addScene(this.accountRecordScene);
        this.accountRewardScene = new AccountRewardScene();
        this.addScene(this.accountRewardScene);
        this.accountJuniorScene = new AccountJuniorScene();
        this.addScene(this.accountJuniorScene);
        this.accountRoomScene = new AccountRoomScene();
        this.addScene(this.accountRoomScene);
        this.accountRechargeScene = new AccountRechargeScene();
        this.addScene(this.accountRechargeScene);
        this.accountPowerScene = new AccountPowerScene();
        this.addScene(this.accountPowerScene);
    };
    p.addScene = function (scene) {
        if (!this.gather) {
            this.gather = {};
        }
        this.gather[scene.id] = scene;
    };
    /**
     * 打开
     * @param id
     */
    p.open = function (id) {
        if (id === void 0) { id = null; }
        if (!id || !this.gather[id]) {
            return;
        }
        if (this.curScene) {
            this.curScene.close();
        }
        this.curScene = this.gather[id];
        this.curScene.open();
        if (id == SceneType.welcom || id == SceneType.error) {
            this.gameManager.uiManager.menuUI.close();
        }
        else {
            this.gameManager.uiManager.menuUI.open();
        }
    };
    return SceneManager;
}(BaseManager));
egret.registerClass(SceneManager,'SceneManager');
