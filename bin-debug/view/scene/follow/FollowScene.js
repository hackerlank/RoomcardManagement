/**
 * FollowScene
 * @Author Ace.c
 * @Create 2016-10-25 20:02
 */
var FollowScene = (function (_super) {
    __extends(FollowScene, _super);
    function FollowScene() {
        _super.call(this);
        this.page = 1;
        this.skinName = "FollowSceneSkin";
        this.id = SceneType.follow;
    }
    var d = __define,c=FollowScene,p=c.prototype;
    p.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.ttl_page.setScope(1, Math.ceil(this.gameManager.dataManager.lowerUserCount / core.pageLength));
        this.onUpdateCount();
        this.btn_search.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.ttl_page.addEventListener(CommonEventType.CHANGED, this.onUpdateCount, this);
        this.gameManager.addEventListener(EventType.LowerUser_List, this.onUpdateList, this);
    };
    p.clickHandler = function (e) {
        switch (e.currentTarget) {
            case this.btn_search:
                // this.gameManager.msgManager.lowerUser.sendFollowInfo(this.txt_search.text);
                break;
        }
    };
    p.onUpdateCount = function () {
        this.page = this.ttl_page.page;
        if (this.gameManager.dataManager.getLowerUserList.length < this.page * core.pageLength) {
            this.gameManager.msgManager.lowerUser.sendLowerUser_List(this.page, core.pageLength);
        }
        else {
            this.followList = this.gameManager.dataManager.getLowerUserList();
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
        this.ttl_page.setScope(1, Math.ceil(this.gameManager.dataManager.lowerUserCount / core.pageLength));
        this.update(list);
    };
    p.update = function (list) {
        if (list === void 0) { list = []; }
        this.itemGroup.removeChildren();
        if (list) {
            var item;
            for (var i = 0; i < list.length; i++) {
                item = new UserItem();
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
    return FollowScene;
}(BaseScene));
egret.registerClass(FollowScene,'FollowScene');
