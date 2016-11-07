/**
 * AccountTransferScene
 * @Author Ace.c
 * @Create 2016-10-26 16:44
 */
var AccountTransferScene = (function (_super) {
    __extends(AccountTransferScene, _super);
    function AccountTransferScene() {
        _super.call(this);
        this.page = 1;
        this.skinName = "AccountTransferSceneSkin";
        this.id = SceneType.account_transfer;
    }
    var d = __define,c=AccountTransferScene,p=c.prototype;
    p.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.ttl_page.setScope(1, Math.ceil(this.gameManager.dataManager.transferRecordLength / core.pageLength));
        this.update();
        this.ttl_page.addEventListener(CommonEventType.CHANGED, this.onUpdateCount, this);
        this.gameManager.addEventListener(EventType.Transfer_List, this.onUpdateList, this);
    };
    p.onUpdateList = function () {
        this.ttl_page.setScope(1, Math.ceil(this.gameManager.dataManager.transferRecordLength / core.pageLength));
        this.update();
    };
    p.onUpdateCount = function () {
        this.page = this.ttl_page.page;
        if (this.gameManager.dataManager.getTransferRecordList.length < this.page * core.pageLength) {
            this.gameManager.msgManager.transfer.sendTransferRecords("", this.page, core.pageLength);
        }
    };
    p.update = function () {
        this.recordList = this.gameManager.dataManager.getTransferRecordList();
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
            this.gameManager.msgManager.transfer.sendTransferRecords("", this.page, core.pageLength);
        }
    };
    return AccountTransferScene;
}(BaseScene));
egret.registerClass(AccountTransferScene,'AccountTransferScene');
