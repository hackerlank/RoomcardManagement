/**
 * RoomItem
 * @Author Ace.c
 * @Create 2016-10-27 15:31
 */
class RoomItem extends GameSprite {

    private img_portrait: eui.Image;
    private lab_nick: eui.TextInput;
    private lab_id: eui.TextInput;
    private lab_online: eui.TextInput;

    public followVo: FollowVo;

    public constructor() {
        super();

        this.skinName = "RoomItemSkin";
    }

    public childrenCreated() {
        super.childrenCreated();

        this.touchChildren = false;
        this.touchEnabled = true;

        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
    }

    private clickHandler() {
    }

    public update(followVo: FollowVo) {
        this.followVo = followVo;

        this.img_portrait.source = "" + this.followVo.pic;
        this.lab_nick.text = "" + this.followVo.nick;
        this.lab_id.text = "" + this.followVo.uid;
        this.lab_online.text = "" + (this.followVo.status == "online" ? "在线" : "离线");
    }
}