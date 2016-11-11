/**
 * AccountPowerScene
 * @Author Ace.c
 * @Create 2016-10-26 16:45
 */
var AccountPowerScene = (function (_super) {
    __extends(AccountPowerScene, _super);
    function AccountPowerScene() {
        _super.call(this);
        this.skinName = "AccountPowerSceneSkin";
        this.id = SceneType.account_power;
    }
    var d = __define,c=AccountPowerScene,p=c.prototype;
    p.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        // this.ttl_page.setScope(1, Math.ceil(this.gameManager.dataManager.transferOutRecordLength / core.pageLength));
        this.update();
        this.ttl_page.addEventListener(CommonEventType.CHANGED, this.onUpdateCount, this);
        this.btn_agent.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.gameManager.addEventListener(EventType.LowerUser_Selected, this.onUpdateFollow, this);
        this.gameManager.addEventListener(EventType.User_Info, this.onUpdateUserInfo, this);
    };
    p.clickHandler = function (e) {
        switch (e.currentTarget) {
            case this.btn_followSearch:
                this.gameManager.sceneManager.jumpSceneID = SceneType.account_power;
                this.gameManager.sceneManager.open(SceneType.follow_search);
                break;
            case this.btn_agent:
                var uid = "" + this.txt_id.text;
                var gid = "" + this.gameManager.dataManager.userVo.getGameId(this.ddm_games.selectedValue);
                if (uid == "") {
                    this.gameManager.alertManager.open(AlertType.Normal, Lang.getText(1001));
                    return;
                }
                if (gid == null || gid == "") {
                    this.gameManager.alertManager.open(AlertType.Normal, Lang.getText(1002));
                    return;
                }
                var pow = Power.agent;
                // this.gameManager.msgManager.agent.appent(uid, gid, pow);
                break;
        }
    };
    p.onUpdateCount = function () {
        // this.page = this.ttl_page.page;
        // if (this.gameManager.dataManager.getTransferOutRecordList.length < this.page * core.pageLength) {
        //     this.gameManager.msgManager.transfer.transferOutRecord("", this.page, core.pageLength);
        // }
    };
    p.onUpdateUserInfo = function () {
        this.ddm_games.update(core.gameList);
    };
    p.onUpdateFollow = function (data) {
        if (data) {
            this.txt_id.text = "" + data;
        }
    };
    p.update = function () {
        this.txt_id.text = "";
        this.ddm_games.update(core.gameList);
        this.itemGroup.removeChildren();
        this.scroller.viewport.scrollV = 0;
        this.scroller.validateNow();
    };
    p.open = function () {
        _super.prototype.open.call(this);
        if (this.initComplete) {
            this.update();
        }
    };
    return AccountPowerScene;
}(BaseScene));
egret.registerClass(AccountPowerScene,'AccountPowerScene');
