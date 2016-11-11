/**
 * AccountTransInScene
 * @Author Ace.c
 * @Create 2016-11-07 12:22
 */
class AccountTransInScene extends BaseScene {

    private scroller: eui.Scroller;
    private itemGroup: eui.Group;
    private ttl_page: TurningTool;

    private recordList: TransferRecordVo[];
    private page: number = 1;

    public constructor() {
        super();

        this.skinName = "AccountTransInSceneSkin";
        this.id = SceneType.account_trans_in;
    }

    public childrenCreated() {
        super.childrenCreated();

        this.ttl_page.setScope(1, Math.ceil(this.gameManager.dataManager.transferInRecordLength / core.pageLength));

        this.update();

        this.ttl_page.addEventListener(CommonEventType.CHANGED, this.onUpdateCount, this);

        this.gameManager.addEventListener(EventType.Transfer_Record_In, this.onUpdateList, this);
    }

    private onUpdateList() {
        this.ttl_page.setScope(1, Math.ceil(this.gameManager.dataManager.transferInRecordLength / core.pageLength));
        this.update();
    }

    private onUpdateCount() {
        this.page = this.ttl_page.page;
        if (this.gameManager.dataManager.getTransferInRecordList.length < this.page * core.pageLength) {
            this.gameManager.msgManager.transfer.transferInRecord(this.page, core.pageLength);
        }
        else {
            this.update();
        }
    }

    private update() {
        this.recordList = this.gameManager.dataManager.getTransferInRecordList();

        this.itemGroup.removeChildren();

        if (this.recordList) {
            var item: TransferInRecordItem;
            var start: number = core.pageLength * (this.page - 1);
            for (var i: number = start; i < start + core.pageLength; i++) {
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
    }

    public open() {
        super.open();

        if (this.initComplete) {

            this.itemGroup.removeChildren();
            this.page = 1;
            this.gameManager.msgManager.transfer.transferInRecord(this.page, core.pageLength);
        }
    }
}