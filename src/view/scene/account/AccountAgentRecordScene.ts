/**
 * AccountAgentRecordScene
 * @Author Ace.c
 * @Create 2016-11-10 19:19
 */
class AccountAgentRecordScene extends BaseScene {

    private scroller: eui.Scroller;
    private itemGroup: eui.Group;
    private ttl_page: TurningTool;

    private recordList: any[];
    private page: number = 1;

    public constructor() {
        super();

        this.skinName = "AccountAgentRecordSceneSkin";
        this.id = SceneType.account_agent_record;
    }

    public childrenCreated() {
        super.childrenCreated();

        this.ttl_page.setScope(1, Math.ceil(this.gameManager.dataManager.recs_gm_length / core.pageLength));

        this.update();

        this.ttl_page.addEventListener(CommonEventType.CHANGED, this.onUpdateCount, this);

        this.gameManager.addEventListener(EventType.Agent_Record, this.onUpdateList, this);
    }

    private onUpdateCount() {
        this.page = this.ttl_page.page;
        if (this.gameManager.dataManager.recs_gm_list.length < this.page * core.pageLength) {
            this.gameManager.msgManager.agent.record(this.page, core.pageLength);
        }
        else {
            this.update();
        }
    }

    private onUpdateList() {
        this.ttl_page.setScope(1, Math.ceil(this.gameManager.dataManager.recs_gm_length / core.pageLength));
        this.update();
    }

    private update() {
        this.recordList = this.gameManager.dataManager.recs_gm_list;

        this.itemGroup.removeChildren();

        if (this.recordList) {
            var item: RecordGmItem;
            var start: number = core.pageLength * (this.page - 1);
            for (var i: number = start; i < start + core.pageLength; i++) {
                if (i >= this.recordList.length) {
                    break;
                }

                item = new RecordGmItem();
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
            this.gameManager.msgManager.agent.record(this.page);
        }
    }
}