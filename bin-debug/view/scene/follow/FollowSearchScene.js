/**
 * FollowSearchScene
 * @Author Ace.c
 * @Create 2016-10-25 20:02
 */
var FollowSearchScene = (function (_super) {
    __extends(FollowSearchScene, _super);
    function FollowSearchScene() {
        _super.call(this);
        this.page = 1;
        this.skinName = "FollowSearchSceneSkin";
        this.id = SceneType.follow_search;
    }
    var d = __define,c=FollowSearchScene,p=c.prototype;
    p.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.ttl_page.setScope(1, Math.ceil(this.gameManager.dataManager.followLength / core.pageLength));
        this.onUpdateCount();
        this.btn_search.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.ttl_page.addEventListener(CommonEventType.CHANGED, this.onUpdateCount, this);
        this.gameManager.addEventListener(EventType.Follow_Update_List, this.onUpdateList, this);
    };
    p.clickHandler = function (e) {
        switch (e.currentTarget) {
            case this.btn_search:
                // this.gameManager.msgManager.follow.sendFollowInfo(this.txt_search.text);
                break;
        }
    };
    p.onUpdateCount = function () {
        this.page = this.ttl_page.page;
        if (this.gameManager.dataManager.followList.length < this.page * core.pageLength) {
            this.gameManager.msgManager.follow.sendFollowList(this.page, core.pageLength);
        }
        else {
            this.followList = this.gameManager.dataManager.followList;
            var list = [];
            var start = core.pageLength * (this.page - 1);
            for (var i = start; i < start + core.pageLength; i++) {
                if (this.followList[i]) {
                    list.push(this.followList[i]);
                }
            }
            this.update(list);
        }
    };
    p.onUpdateList = function (list) {
        if (list === void 0) { list = []; }
        this.ttl_page.setScope(1, Math.ceil(this.gameManager.dataManager.followLength / core.pageLength));
        this.update(list);
    };
    p.update = function (list) {
        if (list === void 0) { list = []; }
        this.itemGroup.removeChildren();
        if (list) {
            var item;
            for (var i = 0; i < list.length; i++) {
                item = new FollowItem();
                item.update(list[i]);
                this.itemGroup.addChild(item);
            }
            this.scroller.viewport.scrollV = 0;
            this.scroller.validateNow();
            this.showList = list;
        }
    };
    p.open = function () {
        _super.prototype.open.call(this);
        if (this.initComplete) {
            this.update(this.showList);
        }
    };
    return FollowSearchScene;
}(BaseScene));
egret.registerClass(FollowSearchScene,'FollowSearchScene');
