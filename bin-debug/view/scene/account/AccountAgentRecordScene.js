/**
 * AccountAgentRecordScene
 * @Author Ace.c
 * @Create 2016-11-10 19:19
 */
var AccountAgentRecordScene = (function (_super) {
    __extends(AccountAgentRecordScene, _super);
    function AccountAgentRecordScene() {
        _super.call(this);
        this.page = 1;
        this.skinName = "AccountAgentRecordSceneSkin";
        this.id = SceneType.account_agent_record;
    }
    var d = __define,c=AccountAgentRecordScene,p=c.prototype;
    p.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.ttl_page.setScope(1, Math.ceil(this.gameManager.dataManager.recs_gm_length / core.pageLength));
        this.update();
        this.ttl_page.addEventListener(CommonEventType.CHANGED, this.onUpdateCount, this);
        this.gameManager.addEventListener(EventType.Agent_Record, this.onUpdateList, this);
    };
    p.onUpdateCount = function () {
        this.page = this.ttl_page.page;
        if (this.gameManager.dataManager.recs_gm_list.length < this.page * core.pageLength) {
            this.gameManager.msgManager.agent.record(this.page, core.pageLength);
        }
        else {
            this.update();
        }
    };
    p.onUpdateList = function () {
        this.ttl_page.setScope(1, Math.ceil(this.gameManager.dataManager.recs_gm_length / core.pageLength));
        this.update();
    };
    p.update = function () {
        this.recordList = this.gameManager.dataManager.recs_gm_list;
        this.itemGroup.removeChildren();
        if (this.recordList) {
            var item;
            var start = core.pageLength * (this.page - 1);
            for (var i = start; i < start + core.pageLength; i++) {
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
    };
    p.open = function () {
        _super.prototype.open.call(this);
        if (this.initComplete) {
            this.itemGroup.removeChildren();
            this.page = 1;
            this.gameManager.msgManager.agent.record(this.page);
        }
    };
    return AccountAgentRecordScene;
}(BaseScene));
egret.registerClass(AccountAgentRecordScene,'AccountAgentRecordScene');
