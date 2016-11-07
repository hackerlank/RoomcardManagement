/**
 * TransferScene
 * @Author Ace.c
 * @Create 2016-10-25 20:01
 */
class TransferScene extends BaseScene {

    private txt_uid: eui.TextInput;
    private btn_search: eui.Button;
    private img_portrait: eui.Image;
    private lab_nick: eui.TextInput;
    private lab_card: eui.TextInput;
    private nba_count: NumberAdder;
    private btn_recharge: eui.Button;
    private lab_notice: eui.Label;

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

        this.txt_uid.restrict = "0-9";
        this.txt_uid.maxChars = 10;

        this.nba_count.setScope(1, 9999);

        this.btn_search.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_recharge.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.nba_count.addEventListener(CommonEventType.CHANGED, this.onUpdateCount, this);

        this.gameManager.addEventListener(EventType.LowerUser_Selected, this.onUpdateFollow, this);
        this.gameManager.addEventListener(EventType.User_Info, this.onUpdateUserInfo, this);
    }

    private onUpdateCount() {
        this.count = this.nba_count.numb;
    }

    private clickHandler(e: egret.TouchEvent) {
        switch (e.currentTarget) {
            case this.btn_search:
                var uid: string = "" + this.txt_uid.text;
                if (uid == "") {
                    this.gameManager.alertManager.open(AlertType.Normal, Lang.getText(1001));
                    return;
                }
                break;
            case this.btn_recharge:
                var uid: string = "" + this.txt_uid.text;
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
                this.gameManager.msgManager.transfer.sendTransfer(this.txt_uid.text, gid, this.count);
                break;
        }
    }

    private onUpdateUserInfo() {
    }

    private onUpdateSearch() {
    }

    private onUpdateFollow(data: any) {
        if (data) {
            this.txt_uid.text = "" + data;
        }
    }

    public open() {
        super.open();

        if (this.initComplete) {
            this.txt_uid.text = "";
            this.img_portrait.source = "img_portrait_default";
            this.lab_nick.text = "";
            this.lab_card.text = "";
            this.nba_count.setNumb(0);
        }
    }
}