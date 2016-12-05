/**
 * AccountRoomScene
 * @Author Ace.c
 * @Create 2016-10-26 16:43
 */
class AccountRoomScene extends BaseScene {

    private menu_game: MenuPopup;
    private txt_roomid: eui.TextInput;
    private btn_search: eui.Button;
    private btn_dismass: eui.Button;
    private scroller: eui.Scroller;
    private itemGroup: eui.Group;

    private roomUsers: LowerUserVo[];

    private userVo: UserVo;

    public constructor() {
        super();

        this.skinName = "AccountRoomSceneSkin";
        this.id = SceneType.account_room;
    }

    public childrenCreated() {
        super.childrenCreated();

        this.txt_roomid.restrict = "0-9";

        this.userVo = this.gameManager.dataManager.userVo;
        if(Power.hasSuperManagerPower()){
            this.menu_game.enabled = true;
            this.menu_game.update(this.userVo.getGames());
        }
        else {
            this.menu_game.enabled = false;
            this.menu_game.update([this.userVo.getGameName(this.userVo.gid)]);
        }

        this.btn_search.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_dismass.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);

        this.gameManager.addEventListener(EventType.Room_User_List, this.onUpdateUsers, this);
        this.gameManager.addEventListener(EventType.Room_Dismass, this.onUpdateUsers, this);
    }

    private clickHandler(e: egret.TouchEvent) {
        if (this.txt_roomid.text == "") {
            return;
        }

        switch (e.currentTarget) {
            case this.btn_search:
                this.gameManager.msgManager.room.sendRoomSearch(this.txt_roomid.text, this.userVo.getGameId(this.menu_game.getSelectedValue()));
                break;
            case this.btn_dismass:
                var _this = this;
                this.gameManager.alertManager.open(AlertType.Normal, {
                    des: "确定要解散房间么?",
                    callback: function () {
                        _this.gameManager.msgManager.room.sendRoomDismass(_this.txt_roomid.text, _this.userVo.getGameId(_this.menu_game.getSelectedValue()));
                    }
                });
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
            this.txt_roomid.text = "";
        }
    }
}