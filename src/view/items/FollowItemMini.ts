/**
 * FollowItemMini
 * @Author Ace.c
 * @Create 2016-10-25 20:33
 */
class FollowItemMini extends GameSprite {

    private img_portrait: eui.Image;
    private lab_nick: eui.TextInput;
    private lab_id: eui.TextInput;

    public followVo: FollowVo;

    public constructor() {
        super();

        this.skinName = "UserItemMiniSkin";
    }

    public childrenCreated() {
        super.childrenCreated();

        this.touchChildren = false;
        this.touchEnabled = true;

        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);

        this.gameManager.addEventListener(EventType.Follow_Update_Info, this.onUpdate, this);
    }

    private clickHandler(e: egret.TouchEvent) {
        if (this.followVo) {
            this.gameManager.sceneManager.open(this.gameManager.sceneManager.jumpSceneID);
            this.gameManager.dispatchEvent(EventType.Follow_Selected, this.followVo.uid);
        }
    }

    public onUpdate(follow: FollowVo) {
        if (this.followVo && follow && this.followVo.uid == follow.uid) {
            this.update(follow);
        }
    }

    public update(follow: FollowVo) {
        this.followVo = follow;

        this.img_portrait.source = "" + this.followVo.pic;
        this.lab_nick.text = "" + this.followVo.nick;
        this.lab_id.text = "ID:" + this.followVo.uid;
    }
}