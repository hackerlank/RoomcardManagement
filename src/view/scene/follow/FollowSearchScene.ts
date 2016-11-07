/**
 * FollowSearchScene
 * @Author Ace.c
 * @Create 2016-10-25 20:02
 */
class FollowSearchScene extends BaseScene {

    private txt_search: eui.TextInput;
    private btn_search: eui.Button;
    private scroller: eui.Scroller;
    private itemGroup: eui.Group;
    private ttl_page: TurningTool;

    public followList: FollowVo[];
    public showList: FollowVo[];
    public page: number = 1;

    public constructor() {
        super();

        this.skinName = "FollowSearchSceneSkin";
        this.id = SceneType.follow_search;
    }

    public childrenCreated() {
        super.childrenCreated();

        this.ttl_page.setScope(1, Math.ceil(this.gameManager.dataManager.followLength / core.pageLength));
        this.onUpdateCount();

        this.btn_search.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.ttl_page.addEventListener(CommonEventType.CHANGED, this.onUpdateCount, this);

        this.gameManager.addEventListener(EventType.Follow_Update_List, this.onUpdateList, this);
    }

    private clickHandler(e: egret.TouchEvent) {
        switch (e.currentTarget) {
            case this.btn_search:
                // this.gameManager.msgManager.follow.sendFollowInfo(this.txt_search.text);
                break;
        }
    }

    private onUpdateCount() {
        this.page = this.ttl_page.page;
        if (this.gameManager.dataManager.followList.length < this.page * core.pageLength) {
            this.gameManager.msgManager.follow.sendFollowList(this.page, core.pageLength);
        }
        else {
            this.followList = this.gameManager.dataManager.followList;
            var list: FollowVo[] = [];
            var start: number = core.pageLength * (this.page - 1);
            for (var i: number = start; i < start + core.pageLength; i++) {
                if (this.followList[i]) {
                    list.push(this.followList[i]);
                }
            }
            this.update(list);
        }
    }

    private onUpdateList(list: FollowVo[] = []) {
        this.ttl_page.setScope(1, Math.ceil(this.gameManager.dataManager.followLength / core.pageLength));
        this.update(list);
    }

    public update(list: FollowVo[] = []) {
        this.itemGroup.removeChildren();
        if (list) {
            var item: FollowItem;
            for (var i: number = 0; i < list.length; i++) {
                item = new FollowItem();
                item.update(list[i]);
                this.itemGroup.addChild(item);
            }

            this.scroller.viewport.scrollV = 0;
            this.scroller.validateNow();

            this.showList = list;
        }
    }

    public open() {
        super.open();

        if (this.initComplete) {
            this.update(this.showList);
        }
    }
}