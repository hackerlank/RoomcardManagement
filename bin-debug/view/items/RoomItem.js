/**
 * RoomItem
 * @Author Ace.c
 * @Create 2016-10-27 15:31
 */
var RoomItem = (function (_super) {
    __extends(RoomItem, _super);
    function RoomItem() {
        _super.call(this);
        this.skinName = "RoomItemSkin";
    }
    var d = __define,c=RoomItem,p=c.prototype;
    p.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.touchChildren = false;
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
    };
    p.clickHandler = function () {
    };
    p.update = function (followVo) {
        this.followVo = followVo;
        this.img_portrait.source = "" + this.followVo.pic;
        this.lab_nick.text = "" + this.followVo.nick;
        this.lab_id.text = "" + this.followVo.uid;
        this.lab_online.text = "" + (this.followVo.status == "online" ? "在线" : "离线");
    };
    return RoomItem;
}(GameSprite));
egret.registerClass(RoomItem,'RoomItem');
