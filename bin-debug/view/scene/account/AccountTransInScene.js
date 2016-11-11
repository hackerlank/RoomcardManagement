/**
 * AccountTransInScene
 * @Author Ace.c
 * @Create 2016-11-07 12:22
 */
var AccountTransInScene = (function (_super) {
    __extends(AccountTransInScene, _super);
    function AccountTransInScene() {
        _super.call(this);
        this.page = 1;
        this.skinName = "AccountTransInSceneSkin";
        this.id = SceneType.account_trans_in;
    }
    var d = __define,c=AccountTransInScene,p=c.prototype;
    p.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.ttl_page.setScope(1, Math.ceil(this.gameManager.dataManager.transferInRecordLength / core.pageLength));
        this.update();
        this.ttl_page.addEventListener(CommonEventType.CHANGED, this.onUpdateCount, this);
        this.gameManager.addEventListener(EventType.Transfer_Record_In, this.onUpdateList, this);
    };
    p.onUpdateList = function () {
        this.ttl_page.setScope(1, Math.ceil(this.gameManager.dataManager.transferInRecordLength / core.pageLength));
        this.update();
    };
    p.onUpdateCount = function () {
        this.page = this.ttl_page.page;
        if (this.gameManager.dataManager.getTransferInRecordList.length < this.page * core.pageLength) {
            this.gameManager.msgManager.transfer.transferInRecord(this.page, core.pageLength);
        }
        else {
            this.update();
        }
    };
    p.update = function () {
        this.recordList = this.gameManager.dataManager.getTransferInRecordList();
        this.itemGroup.removeChildren();
        if (this.recordList) {
            var item;
            var start = core.pageLength * (this.page - 1);
            for (var i = start; i < start + core.pageLength; i++) {
                if (i >= this.recordList.length) {
                    break;
                }
                item = new TransferInRecordItem();
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
            this.itemGroup.removeChildren();
            this.page = 1;
            this.gameManager.msgManager.transfer.transferInRecord(this.page, core.pageLength);
        }
    };
    return AccountTransInScene;
}(BaseScene));
egret.registerClass(AccountTransInScene,'AccountTransInScene');
