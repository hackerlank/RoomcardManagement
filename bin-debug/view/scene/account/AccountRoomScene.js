/**
 * AccountRoomScene
 * @Author Ace.c
 * @Create 2016-10-26 16:43
 */
var AccountRoomScene = (function (_super) {
    __extends(AccountRoomScene, _super);
    function AccountRoomScene() {
        _super.call(this);
        this.skinName = "AccountRoomSceneSkin";
        this.id = SceneType.account_room;
    }
    var d = __define,c=AccountRoomScene,p=c.prototype;
    p.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.txt_search.restrict = "0-9";
        this.btn_search.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_dismass.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.gameManager.addEventListener(EventType.Room_Update_Users, this.onUpdateUsers, this);
        this.gameManager.addEventListener(EventType.Room_Dismass, this.onUpdateUsers, this);
    };
    p.clickHandler = function (e) {
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
    };
    p.onUpdateUsers = function () {
        this.roomUsers = this.gameManager.dataManager.roomUsers;
        this.itemGroup.removeChildren();
        var item;
        for (var i = 0; i < this.roomUsers.length; i++) {
            item = new RoomItem();
            item.update(this.roomUsers[i]);
            this.itemGroup.addChild(item);
        }
        this.scroller.viewport.scrollV = 0;
        this.scroller.validateNow();
    };
    p.open = function () {
        _super.prototype.open.call(this);
        if (this.initComplete) {
            this.itemGroup.removeChildren();
        }
    };
    return AccountRoomScene;
}(BaseScene));
egret.registerClass(AccountRoomScene,'AccountRoomScene');
