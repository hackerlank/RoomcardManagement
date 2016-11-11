/**
 * AccountTransOutScene
 * @Author Ace.c
 * @Create 2016-10-26 16:44
 */
class AccountTransOutScene extends BaseScene {

    private lab_population: eui.TextInput;
    private lab_total: eui.TextInput;
    private scroller: eui.Scroller;
    private itemGroup: eui.Group;
    private ttl_page: TurningTool;

    private recordList: TransferRecordVo[];
    private page: number = 1;

    public constructor() {
        super();

        this.skinName = "AccountTransOutSceneSkin";
        this.id = SceneType.account_trans_out;
    }

    public childrenCreated() {
        super.childrenCreated();

        this.ttl_page.setScope(1, Math.ceil(this.gameManager.dataManager.transferOutRecordLength / core.pageLength));

        this.update();

        this.ttl_page.addEventListener(CommonEventType.CHANGED, this.onUpdateCount, this);

        this.gameManager.addEventListener(EventType.Transfer_Record_Out, this.onUpdateList, this);
    }

    private onUpdateList() {
        this.lab_population.text = "充值人次:" + this.gameManager.dataManager.userVo.transPopulation;
        this.lab_total.text = "售卡总数:" + this.gameManager.dataManager.userVo.transCard;
        this.ttl_page.setScope(1, Math.ceil(this.gameManager.dataManager.transferOutRecordLength / core.pageLength));
        this.update();
    }

    private onUpdateCount() {
        this.page = this.ttl_page.page;
        if (this.gameManager.dataManager.getTransferOutRecordList.length < this.page * core.pageLength) {
            this.gameManager.msgManager.transfer.transferOutRecord("", this.page, core.pageLength);
        }
        else {
            this.update();
        }
    }

    private update() {
        this.recordList = this.gameManager.dataManager.getTransferOutRecordList();

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

            this.itemGroup.removeChildren();
            this.page = 1;
            this.gameManager.msgManager.transfer.transferOutRecord("", this.page, core.pageLength);
        }
    }
}