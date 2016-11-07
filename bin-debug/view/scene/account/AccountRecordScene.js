/**
 * AccountRecordScene
 * @Author Ace.c
 * @Create 2016-10-26 16:44
 */
var AccountRecordScene = (function (_super) {
    __extends(AccountRecordScene, _super);
    function AccountRecordScene() {
        _super.call(this);
        this.page = 1;
        this.skinName = "AccountRecordSceneSkin";
        this.id = SceneType.account_record;
    }
    var d = __define,c=AccountRecordScene,p=c.prototype;
    p.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.nba_page.setScope(1, Math.ceil(this.gameManager.dataManager.recordLength / core.pageLength));
        this.update();
        this.nba_page.addEventListener(CommonEventType.CHANGED, this.onUpdateCount, this);
        this.gameManager.addEventListener(EventType.User_Record_List, this.onUpdateList, this);
    };
    p.onUpdateList = function () {
        this.nba_page.setScope(1, Math.ceil(this.gameManager.dataManager.recordLength / core.pageLength));
        this.update();
    };
    p.onUpdateCount = function () {
        this.page = this.nba_page.page;
        if (this.gameManager.dataManager.recordList.length < this.page * core.pageLength) {
            this.gameManager.msgManager.transfer.sendTransferList("", this.page, core.pageLength);
        }
    };
    p.update = function () {
        this.recordList = this.gameManager.dataManager.recordList();
        this.itemGroup.removeChildren();
        if (this.recordList) {
            var item;
            var start = core.pageLength * (this.page - 1);
            for (var i = start; i < start + core.pageLength; i++) {
                if (i >= this.recordList.length) {
                    break;
                }
                item = new TransferRecordItem();
                item.update(this.recordList[i]);
                this.itemGroup.addChild(item);
            }
            this.scroller.viewport.scrollV = 0;
            this.scroller.validateNow();
        }
    };
    p.open = function () {
        _super.prototype.open.call(this);
        if (this.initComplete) {
            this.page = 1;
            this.gameManager.msgManager.transfer.sendTransferList("", this.page, core.pageLength);
        }
    };
    return AccountRecordScene;
}(BaseScene));
egret.registerClass(AccountRecordScene,'AccountRecordScene');
