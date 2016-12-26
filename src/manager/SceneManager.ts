/**
 * Created by Ace.C on 2016/4/15.
 */
class SceneManager extends BaseManager {

    public gather: any = {};

    public welcomScene: WelcomScene;
    public loginScene: LoginScene;
    public loginGameScene: LoginGameScene;
    public errorScene: ErrorScene;

    public transferScene: TransferScene;

    public followScene: FollowScene;
    public followSearchScene: FollowSearchScene;
    public followDetailsScene: FollowDetailsScene;

    public agentScene: AgentScene;
    public agentAppendScene: AgentAppendScene;
    public agentNoticeScene: AgentNoticeScene;
    public agentLv1RecordScene: AgentLv1RecordScene;
    public agentLv2RecordScene: AgentLv2RecordScene;
    public agentCheckCenterScene: AgentCheckCenterScene;

    public accountScene: AccountScene;
    public accountRechargeScene: AccountRechargeScene;
    public accountPowerScene: AccountPowerScene;
    public accountRoomScene: AccountRoomScene;
    public accountSaleScene: AccountSaleScene;
    public accountTransOutScene: AccountTransOutScene;
    public accountTransInScene: AccountTransInScene;
    public accountAgentScene: AccountAgentScene;
    public accountAgentRecordScene: AccountAgentRecordScene;
    public accountCheckRecordScene: AccountCheckRecordScene;

    public curScene: BaseScene;
    public curSceneId: string;
    public jumpSceneID: string;

    public constructor() {
        super();

        this.initManager();
    }

    public initManager(): void {
        super.initManager();

        this.gather = {};

        this.welcomScene = new WelcomScene();
        this.addScene(this.welcomScene);

        this.loginScene = new LoginScene();
        this.addScene(this.loginScene);

        this.loginGameScene = new LoginGameScene();
        this.addScene(this.loginGameScene);

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

        this.agentCheckCenterScene = new AgentCheckCenterScene();
        this.addScene(this.agentCheckCenterScene);

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

        this.accountCheckRecordScene = new AccountCheckRecordScene();
        this.addScene(this.accountCheckRecordScene);
    }

    public addScene(scene: BaseScene) {
        if (!this.gather) {
            this.gather = {};
        }
        this.gather[scene.id] = scene;
    }

    /**
     * 打开
     * @param id
     */
    public open(id: any = null): void {
        if (!id || !this.gather[id] || id == this.curSceneId) {
            return;
        }

        if (this.curScene) {
            this.curScene.close();
        }

        this.curScene = this.gather[id];
        this.curScene.open();

        this.curSceneId = id;

        if (id == SceneType.welcom || id == SceneType.error || id == SceneType.login || id == SceneType.loginGame) {
            this.gameManager.uiManager.menuUI.close();
        }
        else {
            if (core.gt && core.gtNonopen) {
                return;
            }
            this.gameManager.uiManager.menuUI.open();
        }
    }
}