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
    private menu_game: MenuPopup;
    private nba_count: NumberAdder;
    private btn_recharge: eui.Button;
    private lab_notice: eui.Label;

    private userVo: UserVo;

    public constructor() {
        super();

        this.skinName = "TransferSceneSkin";
        this.id = SceneType.transfer;
    }

    public childrenCreated() {
        super.childrenCreated();

        this.txt_uid.restrict = "0-9";
        this.txt_uid.maxChars = 10;

        this.userVo = this.gameManager.dataManager.userVo;

        switch (this.userVo.pow) {
            case Power.gm:
                this.menu_game.enabled = true;
                this.menu_game.update(this.userVo.getGames());
                break;
            case Power.agent:
            case Power.agent_new:
                this.menu_game.enabled = false;
                this.menu_game.update([this.userVo.getGameName(this.userVo.gid)]);
                break;
        }

        this.nba_count.setMaxChars(6);

        this.btn_search.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_recharge.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);

        this.gameManager.addEventListener(EventType.LowerUser_Selected, this.onUpdateFollow, this);
        this.gameManager.addEventListener(EventType.Transfer_Search, this.onUpdateSearch, this);
        this.gameManager.addEventListener(EventType.Transfer_Success, this.onUpdateSuccess, this);
    }

    private clickHandler(e: egret.TouchEvent) {

        if (this.txt_uid.text == "") {
            this.gameManager.alertManager.open(AlertType.Normal, Lang.getText(1001));
            return;
        }

        var gid: string;
        if (this.userVo.pow == Power.gm) {
            gid = this.userVo.getGameId(this.menu_game.getSelectedValue());
        }
        else {
            gid = this.userVo.gid;
        }

        switch (e.currentTarget) {
            case this.btn_search:
                this.gameManager.msgManager.transfer.searchUser(this.txt_uid.text, gid);
                break;
            case this.btn_recharge:
                this.gameManager.msgManager.transfer.sendTransfer(this.txt_uid.text, gid, this.nba_count.numb);
                break;
        }
    }

    private onUpdateSuccess(addNum: number) {
        var zong: number = Number(this.lab_card.text.split(":")[1]) + addNum;
        this.lab_card.text = "房卡:" + zong;
    }

    private onUpdateSearch(data: any) {
        this.img_portrait.source = "" + data.pic;
        this.lab_nick.text = "" + data.nick;
        this.lab_card.text = "房卡:" + data.cur;
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