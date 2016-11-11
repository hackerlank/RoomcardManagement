/**
 * AgentLv1RecordScene
 * @Author Ace.c
 * @Create 2016-11-08 14:16
 */
var AgentLv1RecordScene = (function (_super) {
    __extends(AgentLv1RecordScene, _super);
    function AgentLv1RecordScene() {
        _super.call(this);
        this.page = 1;
        this.skinName = "AgentLv1RecordSceneSkin";
        this.id = SceneType.agent_lv1Record;
    }
    var d = __define,c=AgentLv1RecordScene,p=c.prototype;
    p.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.ttl_page.setScope(1, Math.ceil(this.gameManager.dataManager.agentLv1RecordLength / core.pageLength));
        this.onUpdateCount();
        this.ttl_page.addEventListener(CommonEventType.CHANGED, this.onUpdateCount, this);
        this.gameManager.addEventListener(EventType.LowerUser_Contribution_List, this.onUpdateList, this);
    };
    p.onUpdateCount = function () {
        this.page = this.ttl_page.page;
        if (this.gameManager.dataManager.getAgentLv1List.length < this.page * core.pageLength) {
            this.gameManager.msgManager.lowerUser.sendLowerUser_Contribution_Get(3, this.page, core.pageLength);
        }
        else {
            this.contributionVoList = this.gameManager.dataManager.getAgentLv1List();
            var list = [];
            var start = core.pageLength * (this.page - 1);
            for (var i = start; i < start + core.pageLength; i++) {
                if (this.contributionVoList[i]) {
                    list.push(this.contributionVoList[i]);
                }
            }
            this.update(list);
        }
    };
    p.onUpdateList = function (data) {
        if (data.type == 3) {
            this.ttl_page.setScope(1, Math.ceil(this.gameManager.dataManager.agentLv1RecordLength / core.pageLength));
            this.update(data.list);
        }
    };
    p.update = function (list) {
        if (list === void 0) { list = []; }
        this.itemGroup.removeChildren();
        if (list) {
            var item;
            for (var i = 0; i < list.length; i++) {
                item = new LowerUserContributionItem();
                item.update(list[i]);
                this.itemGroup.addChild(item);
            }
            this.scroller.viewport.scrollV = 0;
            this.scroller.validateNow();
            this.contributionVoShowList = list;
        }
    };
    p.open = function () {
        _super.prototype.open.call(this);
        if (this.initComplete) {
            this.update(this.contributionVoShowList);
        }
    };
    return AgentLv1RecordScene;
}(BaseScene));
egret.registerClass(AgentLv1RecordScene,'AgentLv1RecordScene');
