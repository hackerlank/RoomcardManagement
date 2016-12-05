/**
 * AccountCheckRecordScene
 * @Author Ace.c
 * @Create 2016-12-03 18:38
 */
class AccountCheckRecordScene extends BaseScene {

    private scroller: eui.Scroller;
    private itemGroup: eui.Group;
    private ttl_page: TurningTool;

    private recordList: any[];
    private page: number = 1;

    public constructor() {
        super();

        this.skinName = "AccountCheckRecordSceneSkin";
        this.id = SceneType.account_agent_checkrecord;
    }

    public childrenCreated() {
        super.childrenCreated();

        this.ttl_page.setScope(1, 1);

        this.ttl_page.addEventListener(CommonEventType.CHANGED, this.onUpdateCount, this);

        this.gameManager.addEventListener(EventType.Agent_CheckRecord_List, this.onUpdateList, this);
    }

    private onUpdateCount() {
        this.page = this.ttl_page.page;
        if (this.gameManager.dataManager.agentCehckRecordLength < this.page * core.pageLength) {
            this.gameManager.msgManager.agent.checkCenterRecord(this.page, core.pageLength);
        }
        else {
            this.update();
        }
    }

    private onUpdateList() {
        this.ttl_page.setScope(1, Math.ceil(this.gameManager.dataManager.agentCehckRecordLength / core.pageLength));
        this.update();
    }

    private update() {
        this.recordList = this.gameManager.dataManager.getAgentCheckRecordList();

        this.itemGroup.removeChildren();

        if (this.recordList) {
            var item: CheckRecordListItem = new CheckRecordListItem();
            this.itemGroup.addChild(item);

            item.setValues("方式", "房卡数", "工资金额", "当前状态", "时间");

            var data: any;
            var start: number = core.pageLength * (this.page - 1);
            for (var i: number = start; i < start + core.pageLength; i++) {
                if (i >= this.recordList.length) {
                    break;
                }

                data = this.recordList[i];

                item = new CheckRecordListItem();
                this.itemGroup.addChild(item);

                item.setValues(data.type == 1 ? "提现" : "提卡", data.num, data.money / 100, this.getStatusDes(data.status), StringUtils.getYTDByTimestamp(data.ctime) + "\n" + StringUtils.getHMSByTimestamp(data.ctime));
            }

            this.scroller.viewport.scrollV = 0;
            this.scroller.validateNow();
        }
    }

    private getStatusDes(status: number): string {
        var des: string;
        switch (status) {
            case 1:
                des = "审核中";
                break;
            case 2:
                des = "审核通过";
                break;
            case 3:
                des = "放款中";
                break;
            case 4:
                des = "完成";
                break;
            case 5:
                des = "退回";
                break;
        }
        return des;
    }

    public open() {
        super.open();

        if (this.initComplete) {
            this.itemGroup.removeChildren();
            this.page = 1;
            this.gameManager.msgManager.agent.checkCenterRecord(this.page, core.pageLength);
        }
    }
}