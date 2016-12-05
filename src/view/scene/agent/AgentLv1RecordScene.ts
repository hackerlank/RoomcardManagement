/**
 * AgentLv1RecordScene
 * @Author Ace.c
 * @Create 2016-11-08 14:16
 */
class AgentLv1RecordScene extends BaseScene {

    private scroller: eui.Scroller;
    private itemGroup: eui.Group;
    private ttl_page: TurningTool;

    private page: number = 1;

    public contributionVoList: LowerUserContributionVo[];
    public contributionVoShowList: LowerUserContributionVo[];

    public constructor() {
        super();

        this.skinName = "AgentLv1RecordSceneSkin";
        this.id = SceneType.agent_lv1Record;
    }

    public childrenCreated() {
        super.childrenCreated();

        this.ttl_page.setScope(1, Math.ceil(this.gameManager.dataManager.agentLv1RecordLength / core.pageLength));
        this.onUpdateCount();

        this.ttl_page.addEventListener(CommonEventType.CHANGED, this.onUpdateCount, this);

        this.gameManager.addEventListener(EventType.LowerUser_Contribution_List, this.onUpdateList, this);
    }

    private onUpdateCount() {
        this.page = this.ttl_page.page;
        if (this.gameManager.dataManager.getAgentLv1List.length < this.page * core.pageLength) {
            this.gameManager.msgManager.lowerUser.sendLowerUser_Contribution_Get(3, this.page, core.pageLength);
        }
        else {
            this.contributionVoList = this.gameManager.dataManager.getAgentLv1List();
            var list: LowerUserContributionVo[] = [];
            var start: number = core.pageLength * (this.page - 1);
            for (var i: number = start; i < start + core.pageLength; i++) {
                if (this.contributionVoList[i]) {
                    list.push(this.contributionVoList[i]);
                }
            }
            this.update(list);
        }
    }

    private onUpdateList(data: any) {
        if (data.type == 3) {
            this.ttl_page.setScope(1, Math.ceil(this.gameManager.dataManager.agentLv1RecordLength / core.pageLength));
            this.update(data.list);
        }
    }

    public update(list: LowerUserContributionVo[] = []) {
        this.itemGroup.removeChildren();
        if (list) {
            var item: LowerUserContributionItem;
            for (var i: number = 0; i < list.length; i++) {
                item = new LowerUserContributionItem();
                item.update(list[i]);
                this.itemGroup.addChild(item);
            }

            this.scroller.viewport.scrollV = 0;
            this.scroller.validateNow();

            this.contributionVoShowList = list;
        }
    }

    public open() {
        super.open();

        if (this.initComplete) {
            this.gameManager.msgManager.lowerUser.sendLowerUser_Contribution_Get(3, this.page, core.pageLength);
        }
    }
}