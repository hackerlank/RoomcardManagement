/**
 * Created by Ace.C on 2016/4/15.
 */
class SceneManager extends BaseManager {

    public gather: any = {};
    public curScene: BaseScene;
    public jumpSceneID: string;

    public welcomScene:WelcomScene;
    public errorScene: ErrorScene;

    public transferScene: TransferScene;

    public followScene: FollowScene;
    public followSearchScene: FollowSearchScene;
    public followDetailsScene: FollowDetailsScene;

    public accountScene: AccountScene;
    public accountRechargeScene: AccountRechargeScene;
    public accountPowerScene: AccountPowerScene;
    public accountRoomScene: AccountRoomScene;
    public accountSaleScene: AccountSaleScene;
    public accountTransferScene: AccountTransferScene;

    public constructor() {
        super();

        this.initManager();
    }

    public initManager(): void {
        super.initManager();

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

        this.accountTransferScene = new AccountTransferScene();
        this.addScene(this.accountTransferScene);

        this.accountSaleScene = new AccountSaleScene();
        this.addScene(this.accountSaleScene);

        this.accountRoomScene = new AccountRoomScene();
        this.addScene(this.accountRoomScene);

        this.accountRechargeScene = new AccountRechargeScene();
        this.addScene(this.accountRechargeScene);

        this.accountPowerScene = new AccountPowerScene();
        this.addScene(this.accountPowerScene);
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
        if (!id || !this.gather[id]) {
            return;
        }

        if (this.curScene) {
            this.curScene.close();
        }

        this.curScene = this.gather[id];
        this.curScene.open();

        if(id == SceneType.welcom || id == SceneType.error){
            this.gameManager.uiManager.menuUI.close();
        }
        else {
            this.gameManager.uiManager.menuUI.open();
        }
    }
}