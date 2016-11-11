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
        this.loginScene = new LoginScene();
        this.addScene(this.loginScene);
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
        this.agentScene = new AgentScene();
        this.addScene(this.agentScene);
        this.agentAppendScene = new AgentAppendScene();
        this.addScene(this.agentAppendScene);
        this.agentNoticeScene = new AgentNoticeScene();
        this.addScene(this.agentNoticeScene);
        this.agentLv1RecordScene = new AgentLv1RecordScene();
        this.addScene(this.agentLv1RecordScene);
        this.agentLv2RecordScene = new AgentLv2RecordScene();
        this.addScene(this.agentLv2RecordScene);
        this.accountScene = new AccountScene();
        this.addScene(this.accountScene);
        this.accountRechargeScene = new AccountRechargeScene();
        this.addScene(this.accountRechargeScene);
        this.accountPowerScene = new AccountPowerScene();
        this.addScene(this.accountPowerScene);
        this.accountRoomScene = new AccountRoomScene();
        this.addScene(this.accountRoomScene);
        this.accountSaleScene = new AccountSaleScene();
        this.addScene(this.accountSaleScene);
        this.accountTransOutScene = new AccountTransOutScene();
        this.addScene(this.accountTransOutScene);
        this.accountTransInScene = new AccountTransInScene();
        this.addScene(this.accountTransInScene);
        this.accountAgentScene = new AccountAgentScene();
        this.addScene(this.accountAgentScene);
        this.accountAgentRecordScene = new AccountAgentRecordScene();
        this.addScene(this.accountAgentRecordScene);
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
        if (!id || !this.gather[id] || id == this.curSceneId) {
            return;
        }
        if (this.curScene) {
            this.curScene.close();
        }
        this.curScene = this.gather[id];
        this.curScene.open();
        this.curSceneId = id;
        if (id == SceneType.welcom || id == SceneType.error || id == SceneType.login) {
            this.gameManager.uiManager.menuUI.close();
        }
        else {
            this.gameManager.uiManager.menuUI.open();
        }
    };
    return SceneManager;
}(BaseManager));
egret.registerClass(SceneManager,'SceneManager');
