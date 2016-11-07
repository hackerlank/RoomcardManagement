/**
 * AccountRecordScene
 * @Author Ace.c
 * @Create 2016-10-26 16:44
 */
class AccountRecordScene extends BaseScene {

    private scroller: eui.Scroller;
    private itemGroup: eui.Group;
    private nba_page: TurningTool;

    public recordList: TransferRecordVo[];

    public page: number = 1;

    public constructor() {
        super();

        this.skinName = "AccountRecordSceneSkin";
        this.id = SceneType.account_record;
    }

    public childrenCreated() {
        super.childrenCreated();

        this.nba_page.setScope(1, Math.ceil(this.gameManager.dataManager.recordLength / core.pageLength));

        this.update();

        this.nba_page.addEventListener(CommonEventType.CHANGED, this.onUpdateCount, this);

        this.gameManager.addEventListener(EventType.User_Record_List, this.onUpdateList, this);
    }

    private onUpdateList() {
        this.nba_page.setScope(1, Math.ceil(this.gameManager.dataManager.recordLength / core.pageLength));
        this.update();
    }

    private onUpdateCount() {
        this.page = this.nba_page.page;
        if (this.gameManager.dataManager.recordList.length < this.page * core.pageLength) {
            this.gameManager.msgManager.transfer.sendTransferList("", this.page, core.pageLength);
        }
    }

    public update() {
        this.recordList = this.gameManager.dataManager.recordList();

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
            this.gameManager.msgManager.transfer.sendTransferList("", this.page, core.pageLength);
        }
    }
}