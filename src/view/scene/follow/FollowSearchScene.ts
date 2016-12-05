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

    public followList: LowerUserVo[];
    public showList: LowerUserVo[];
    public page: number = 1;

    public constructor() {
        super();

        this.skinName = "FollowSearchSceneSkin";
        this.id = SceneType.follow_search;
    }

    public childrenCreated() {
        super.childrenCreated();

        this.ttl_page.setScope(1, Math.ceil(this.gameManager.dataManager.lowerUserCount / core.lowerUserLength));
        this.onUpdateCount();

        this.btn_search.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.ttl_page.addEventListener(CommonEventType.CHANGED, this.onUpdateCount, this);

        this.gameManager.addEventListener(EventType.LowerUser_List, this.onUpdateList, this);
    }

    private clickHandler(e: egret.TouchEvent) {
        switch (e.currentTarget) {
            case this.btn_search:
                // this.gameManager.msgManager.lowerUser.sendFollowInfo(this.txt_search.text);
                break;
        }
    }

    private onUpdateCount() {
        this.page = this.ttl_page.page;
        if (this.gameManager.dataManager.getLowerUserList.length < this.page * core.lowerUserLength) {
            this.gameManager.msgManager.lowerUser.sendLowerUser_List(this.page, core.lowerUserLength);
        }
        else {
            this.followList = this.gameManager.dataManager.getLowerUserList();
            var list: LowerUserVo[] = [];
            var start: number = core.lowerUserLength * (this.page - 1);
            for (var i: number = start; i < start + core.lowerUserLength; i++) {
                if (this.followList[i]) {
                    list.push(this.followList[i]);
                }
            }
            this.update(list);
        }
    }

    private onUpdateList(list: LowerUserVo[] = []) {
        this.ttl_page.setScope(1, Math.ceil(this.gameManager.dataManager.lowerUserCount / core.lowerUserLength));
        this.update(list);
    }

    public update(list: LowerUserVo[] = []) {
        this.itemGroup.removeChildren();
        if (list) {
            var item: UserItem;
            for (var i: number = 0; i < list.length; i++) {
                item = new UserItem();
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