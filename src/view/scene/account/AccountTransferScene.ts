/**
 * AccountTransferScene
 * @Author Ace.c
 * @Create 2016-10-26 16:44
 */
class AccountTransferScene extends BaseScene {

    private lab_population: eui.TextInput;
    private lab_total: eui.TextInput;
    private scroller: eui.Scroller;
    private itemGroup: eui.Group;
    private ttl_page: TurningTool;

    public recordList: TransferRecordVo[];

    public page: number = 1;

    public constructor() {
        super();

        this.skinName = "AccountTransferSceneSkin";
        this.id = SceneType.account_transfer;
    }

    public childrenCreated() {
        super.childrenCreated();

        this.ttl_page.setScope(1, Math.ceil(this.gameManager.dataManager.transferRecordLength / core.pageLength));

        this.update();

        this.ttl_page.addEventListener(CommonEventType.CHANGED, this.onUpdateCount, this);

        this.gameManager.addEventListener(EventType.Transfer_List, this.onUpdateList, this);
    }

    private onUpdateList() {
        this.ttl_page.setScope(1, Math.ceil(this.gameManager.dataManager.transferRecordLength / core.pageLength));
        this.update();
    }

    private onUpdateCount() {
        this.page = this.ttl_page.page;
        if (this.gameManager.dataManager.getTransferRecordList.length < this.page * core.pageLength) {
            this.gameManager.msgManager.transfer.sendTransferRecords("", this.page, core.pageLength);
        }
    }

    public update() {
        this.recordList = this.gameManager.dataManager.getTransferRecordList();

        this.itemGroup.removeChildren();

        if (this.recordList) {
            var item: TransferRecordItem;
            var start: number = core.pageLength * (this.page - 1);
            for (var i: number = start; i < start + core.pageLength; i++) {
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
    }

    public open() {
        super.open();

        if (this.initComplete) {
            this.page = 1;
            this.gameManager.msgManager.transfer.sendTransferRecords("", this.page, core.pageLength);
        }
    }
}