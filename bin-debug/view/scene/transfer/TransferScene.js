/**
 * TransferScene
 * @Author Ace.c
 * @Create 2016-10-25 20:01
 */
var TransferScene = (function (_super) {
    __extends(TransferScene, _super);
    function TransferScene() {
        _super.call(this);
        this.count = 0;
        this.skinName = "TransferSceneSkin";
        this.id = SceneType.transfer;
    }
    var d = __define,c=TransferScene,p=c.prototype;
    p.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.userVo = this.gameManager.dataManager.userVo;
        this.txt_uid.restrict = "0-9";
        this.txt_uid.maxChars = 10;
        this.nba_count.setScope(1, 9999);
        this.btn_search.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_recharge.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.nba_count.addEventListener(CommonEventType.CHANGED, this.onUpdateCount, this);
        this.gameManager.addEventListener(EventType.LowerUser_Selected, this.onUpdateFollow, this);
        this.gameManager.addEventListener(EventType.User_Info, this.onUpdateUserInfo, this);
    };
    p.onUpdateCount = function () {
        this.count = this.nba_count.numb;
    };
    p.clickHandler = function (e) {
        switch (e.currentTarget) {
            case this.btn_search:
                var uid = "" + this.txt_uid.text;
                if (uid == "") {
                    this.gameManager.alertManager.open(AlertType.Normal, Lang.getText(1001));
                    return;
                }
                break;
            case this.btn_recharge:
                var uid = "" + this.txt_uid.text;
                if (uid == "") {
                    this.gameManager.alertManager.open(AlertType.Normal, Lang.getText(1001));
                    return;
                }
                var gid = "" + this.gameManager.dataManager.userVo.gid;
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
    };
    p.onUpdateUserInfo = function () {
    };
    p.onUpdateSearch = function () {
    };
    p.onUpdateFollow = function (data) {
        if (data) {
            this.txt_uid.text = "" + data;
        }
    };
    p.open = function () {
        _super.prototype.open.call(this);
        if (this.initComplete) {
            this.txt_uid.text = "";
            this.img_portrait.source = "img_portrait_default";
            this.lab_nick.text = "";
            this.lab_card.text = "";
            this.nba_count.setNumb(0);
        }
    };
    return TransferScene;
}(BaseScene));
egret.registerClass(TransferScene,'TransferScene');
