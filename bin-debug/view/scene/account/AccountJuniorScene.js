/**
 * AccountJuniorScene
 * @Author Ace.c
 * @Create 2016-10-26 16:33
 */
var AccountJuniorScene = (function (_super) {
    __extends(AccountJuniorScene, _super);
    function AccountJuniorScene() {
        _super.call(this);
        this.skinName = "AccountJuniorSceneSkin";
        this.id = SceneType.account_junior;
    }
    var d = __define,c=AccountJuniorScene,p=c.prototype;
    p.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.update();
        this.btn_get.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.gameManager.addEventListener(EventType.Junior_Info, this.onUpdateInfo, this);
    };
    p.clickHandler = function (e) {
        switch (e.currentTarget) {
            case this.btn_get:
                this.gameManager.msgManager.junior.sendGetReward();
                break;
        }
    };
    p.onUpdateInfo = function () {
        this.update();
    };
    p.update = function () {
        this.userVo = this.gameManager.dataManager.userVo;
        this.lab_total.text = "" + this.userVo.juniorMonth + "月总贡献:" + this.userVo.juniorReward;
        this.juniorList = this.gameManager.dataManager.juniorList();
        this.itemGroup.removeChildren();
        if (this.juniorList && this.juniorList.length) {
            var item;
            for (var i = 0; i < this.juniorList.length; i++) {
                item = new JuniorItem();
                item.update(this.juniorList[i]);
                this.itemGroup.addChild(item);
            }
            this.scroller.viewport.scrollV = 0;
            this.scroller.validateNow();
        }
    };
    p.open = function () {
        _super.prototype.open.call(this);
        if (this.initComplete) {
            this.gameManager.msgManager.junior.sendGetInfo();
        }
    };
    return AccountJuniorScene;
}(BaseScene));
egret.registerClass(AccountJuniorScene,'AccountJuniorScene');
