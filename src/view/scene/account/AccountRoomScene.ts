/**
 * AccountRoomScene
 * @Author Ace.c
 * @Create 2016-10-26 16:43
 */
class AccountRoomScene extends BaseScene {

    private txt_search: eui.TextInput;
    private btn_search: eui.Button;
    private btn_dismass: eui.Button;
    private scroller: eui.Scroller;
    private itemGroup: eui.Group;

    public roomUsers: LowerUserVo[];

    public constructor() {
        super();

        this.skinName = "AccountRoomSceneSkin";
        this.id = SceneType.account_room;
    }

    public childrenCreated() {
        super.childrenCreated();

        this.txt_search.restrict = "0-9";

        this.btn_search.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_dismass.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);

        this.gameManager.addEventListener(EventType.Room_User_List, this.onUpdateUsers, this);
        this.gameManager.addEventListener(EventType.Room_Dismass, this.onUpdateUsers, this);
    }

    private clickHandler(e: egret.TouchEvent) {
        if (this.txt_search.text == "") {
            return;
        }

        switch (e.currentTarget) {
            case this.btn_search:
                this.gameManager.msgManager.room.sendRoomSearch(this.txt_search.text);
                break;
            case this.btn_dismass:
                this.gameManager.msgManager.room.sendRoomDismass(this.txt_search.text);
                break;
        }
    }

    public onUpdateUsers() {
        this.roomUsers = this.gameManager.dataManager.getRoomUserList();

        this.itemGroup.removeChildren();

        var item: RoomUserItem;
        for (var i: number = 0; i < this.roomUsers.length; i++) {
            item = new RoomUserItem();
            item.update(this.roomUsers[i]);
            this.itemGroup.addChild(item);
        }

        this.scroller.viewport.scrollV = 0;
        this.scroller.validateNow();
    }

    public open() {
        super.open();

        if (this.initComplete) {
            this.itemGroup.removeChildren();
        }
    }
}