/**
 * UserItem
 * @Author Ace.c
 * @Create 2016-10-25 20:38
 */
class UserItem extends GameSprite {

    public img_portrait: eui.Image;
    public lab_nick: eui.TextInput;
    public lab_id: eui.TextInput;
    public lab_buy: eui.TextInput;
    public btn_transfer: eui.Button;
    public btn_details: eui.Button;

    public followVo: LowerUserVo;

    public constructor() {
        super();

        this.skinName = "UserItemSkin";
    }

    public childrenCreated() {
        super.childrenCreated();

        this.img_portrait.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_transfer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_details.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);

        this.gameManager.addEventListener(EventType.LowerUser_Info, this.onUpdate, this);
    }

    private clickHandler(e: egret.TouchEvent) {
        switch (e.currentTarget) {
            case this.btn_transfer:
                if (this.followVo) {
                    this.gameManager.sceneManager.open(SceneType.transfer);
                    this.gameManager.dispatchEvent(EventType.LowerUser_Selected, this.followVo.uid);
                }
                break;
            case this.img_portrait:
            case this.btn_details:
                this.gameManager.dataManager.selectedFollow = this.followVo;
                this.gameManager.sceneManager.open(SceneType.follow_details);
                break;
        }
    }

    public onUpdate(follow: LowerUserVo) {
        if (this.followVo && follow && this.followVo.uid == follow.uid) {
            this.update(follow);
        }
    }

    public update(follow: LowerUserVo) {
        this.followVo = follow;

        this.img_portrait.source = "" + this.followVo.pic;
        this.lab_nick.text = "" + this.followVo.nick;
        this.lab_id.text = "ID:" + this.followVo.uid;
        this.lab_buy.text = "已购:" + this.followVo.zong;
    }
}