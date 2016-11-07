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
        this.txt_id.restrict = "0-9";
        this.txt_id.maxChars = 10;
        this.nba_count.setScope(1, 9999);
        this.btn_followSearch.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_confirm.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.nba_count.addEventListener(CommonEventType.CHANGED, this.onUpdateCount, this);
        this.gameManager.addEventListener(EventType.Follow_Selected, this.onUpdateFollow, this);
        this.gameManager.addEventListener(EventType.User_Info, this.onUpdateUserInfo, this);
    };
    p.onUpdateUserInfo = function () {
        this.lab_game.text = "" + core.gameManager.dataManager.getGameName(this.userVo.gid);
    };
    p.onUpdateCount = function () {
        this.count = this.nba_count.numb;
    };
    p.onUpdateFollow = function (data) {
        if (data) {
            this.txt_id.text = "" + data;
        }
    };
    p.clickHandler = function (e) {
        switch (e.currentTarget) {
            case this.btn_followSearch:
                this.gameManager.sceneManager.jumpSceneID = SceneType.transfer;
                this.gameManager.sceneManager.open(SceneType.follow_search);
                break;
            case this.btn_confirm:
                var uid = "" + this.txt_id.text;
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
                this.gameManager.msgManager.transfer.sendTransfer(this.txt_id.text, gid, this.count);
                break;
        }
    };
    p.open = function () {
        _super.prototype.open.call(this);
        if (this.initComplete) {
            this.txt_id.text = "";
        }
    };
    return TransferScene;
}(BaseScene));
egret.registerClass(TransferScene,'TransferScene');
