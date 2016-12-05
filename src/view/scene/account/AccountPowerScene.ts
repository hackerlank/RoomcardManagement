/**
 * AccountPowerScene
 * @Author Ace.c
 * @Create 2016-10-26 16:45
 */
class AccountPowerScene extends BaseScene {

    private txt_id: eui.TextInput;
    private btn_followSearch: eui.Button;
    private ddm_games: MenuDropDown;
    private btn_agent: eui.Button;
    private scroller: eui.Scroller;
    private itemGroup: eui.Group;
    private ttl_page: TurningTool;

    public constructor() {
        super();

        this.skinName = "AccountPowerSceneSkin";
        this.id = SceneType.account_power;
    }

    public childrenCreated() {
        super.childrenCreated();

        // this.ttl_page.setScope(1, Math.ceil(this.gameManager.dataManager.transferOutRecordLength / core.pageLength));

        this.update();

        this.ttl_page.addEventListener(CommonEventType.CHANGED, this.onUpdateCount, this);
        this.btn_agent.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);

        this.gameManager.addEventListener(EventType.LowerUser_Selected, this.onUpdateFollow, this);
        this.gameManager.addEventListener(EventType.User_Info, this.onUpdateUserInfo, this);
    }

    private clickHandler(e: egret.TouchEvent) {
        switch (e.currentTarget) {
            case this.btn_followSearch:
                this.gameManager.sceneManager.jumpSceneID = SceneType.account_power;
                this.gameManager.sceneManager.open(SceneType.follow_search);
                break;
            case this.btn_agent:
                var uid: string = "" + this.txt_id.text;
                var gid: string = "" + this.gameManager.dataManager.userVo.getGameId(this.ddm_games.selectedValue);
                if (uid == "") {
                    this.gameManager.alertManager.open(AlertType.Normal, Lang.getText(1001));
                    return;
                }
                if (gid == null || gid == "") {
                    this.gameManager.alertManager.open(AlertType.Normal, Lang.getText(1002));
                    return;
                }

                var pow: Power = Power.agent_normal;
                // this.gameManager.msgManager.agent_normal.appent(uid, gid, pow);
                break;
        }
    }

    private onUpdateCount() {
        // this.page = this.ttl_page.page;
        // if (this.gameManager.dataManager.getTransferOutRecordList.length < this.page * core.pageLength) {
        //     this.gameManager.msgManager.transfer.transferOutRecord("", this.page, core.pageLength);
        // }
    }

    private onUpdateUserInfo() {
        this.ddm_games.update(core.gameTpl);
    }

    private onUpdateFollow(data: any) {
        if (data) {
            this.txt_id.text = "" + data;
        }
    }

    public update() {
        this.txt_id.text = "";
        this.ddm_games.update(core.gameTpl);

        this.itemGroup.removeChildren();

        this.scroller.viewport.scrollV = 0;
        this.scroller.validateNow();
    }

    public open() {
        super.open();

        if (this.initComplete) {
            this.update();
        }
    }
}