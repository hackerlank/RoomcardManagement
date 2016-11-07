/**
 * TransferScene
 * @Author Ace.c
 * @Create 2016-10-25 20:01
 */
class TransferScene extends BaseScene {

    private txt_id: eui.TextInput;
    private btn_followSearch: eui.Button;
    private lab_game: eui.TextInput;
    private nba_count: NumberAdder;
    private btn_confirm: eui.Button;

    public userVo: UserVo;
    public count: number = 0;

    public constructor() {
        super();

        this.skinName = "TransferSceneSkin";
        this.id = SceneType.transfer;
    }

    public childrenCreated() {
        super.childrenCreated();

        this.userVo = this.gameManager.dataManager.userVo;

        this.txt_id.restrict = "0-9";
        this.txt_id.maxChars = 10;

        this.nba_count.setScope(1, 9999);

        this.btn_followSearch.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_confirm.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.nba_count.addEventListener(CommonEventType.CHANGED, this.onUpdateCount, this);

        this.gameManager.addEventListener(EventType.Follow_Selected, this.onUpdateFollow, this);
        this.gameManager.addEventListener(EventType.User_Info, this.onUpdateUserInfo, this);
    }

    private onUpdateUserInfo() {
        this.lab_game.text = "" + core.gameManager.dataManager.getGameName(this.userVo.gid);
    }

    private onUpdateCount() {
        this.count = this.nba_count.numb;
    }

    private onUpdateFollow(data: any) {
        if (data) {
            this.txt_id.text = "" + data;
        }
    }

    private clickHandler(e: egret.TouchEvent) {
        switch (e.currentTarget) {
            case this.btn_followSearch:
                this.gameManager.sceneManager.jumpSceneID = SceneType.transfer;
                this.gameManager.sceneManager.open(SceneType.follow_search);
                break;
            case this.btn_confirm:
                var uid: string = "" + this.txt_id.text;
                if (uid == "") {
                    this.gameManager.alertManager.open(AlertType.Normal, Lang.getText(1001));
                    return;
                }
                var gid: string = "" + this.gameManager.dataManager.userVo.gid;
                if (gid == null || gid == "") {
                    this.gameManager.alertManager.open(AlertType.Normal, Lang.getText(1002));
                    return;
                }
                this.count = this.nba_count.numb;
                if (this.count <= 0) {
                    this.gameManager.alertManager.open(AlertType.Normal, Lang.getText(1004, 0));
                    return;
                }
                this.gameManager.msgManager.transfer.sendTransfer(this.txt_id.text, gid, this.count);
                break;
        }
    }

    public open() {
        super.open();

        if (this.initComplete) {
            this.txt_id.text = "";
        }
    }
}