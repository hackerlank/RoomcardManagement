/**
 * AccountTransOutScene
 * @Author Ace.c
 * @Create 2016-10-26 16:44
 */
var AccountTransOutScene = (function (_super) {
    __extends(AccountTransOutScene, _super);
    function AccountTransOutScene() {
        _super.call(this);
        this.page = 1;
        this.skinName = "AccountTransOutSceneSkin";
        this.id = SceneType.account_trans_out;
    }
    var d = __define,c=AccountTransOutScene,p=c.prototype;
    p.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.ttl_page.setScope(1, Math.ceil(this.gameManager.dataManager.transferOutRecordLength / core.pageLength));
        this.update();
        this.ttl_page.addEventListener(CommonEventType.CHANGED, this.onUpdateCount, this);
        this.gameManager.addEventListener(EventType.Transfer_Record_Out, this.onUpdateList, this);
    };
    p.onUpdateList = function () {
        this.lab_population.text = "充值人次:" + this.gameManager.dataManager.userVo.transPopulation;
        this.lab_total.text = "售卡总数:" + this.gameManager.dataManager.userVo.transCard;
        this.ttl_page.setScope(1, Math.ceil(this.gameManager.dataManager.transferOutRecordLength / core.pageLength));
        this.update();
    };
    p.onUpdateCount = function () {
        this.page = this.ttl_page.page;
        if (this.gameManager.dataManager.getTransferOutRecordList.length < this.page * core.pageLength) {
            this.gameManager.msgManager.transfer.transferOutRecord("", this.page, core.pageLength);
        }
        else {
            this.update();
        }
    };
    p.update = function () {
        this.recordList = this.gameManager.dataManager.getTransferOutRecordList();
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
            this.itemGroup.removeChildren();
            this.page = 1;
            this.gameManager.msgManager.transfer.transferOutRecord("", this.page, core.pageLength);
        }
    };
    return AccountTransOutScene;
}(BaseScene));
egret.registerClass(AccountTransOutScene,'AccountTransOutScene');
