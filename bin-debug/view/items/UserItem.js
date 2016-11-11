/**
 * UserItem
 * @Author Ace.c
 * @Create 2016-10-25 20:38
 */
var UserItem = (function (_super) {
    __extends(UserItem, _super);
    function UserItem() {
        _super.call(this);
        this.skinName = "UserItemSkin";
    }
    var d = __define,c=UserItem,p=c.prototype;
    p.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.img_portrait.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_transfer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.gameManager.addEventListener(EventType.LowerUser_Info, this.onUpdate, this);
    };
    p.clickHandler = function (e) {
        switch (e.currentTarget) {
            case this.btn_transfer:
                if (this.followVo) {
                    this.gameManager.sceneManager.open(SceneType.transfer);
                    this.gameManager.dispatchEvent(EventType.LowerUser_Selected, this.followVo.uid);
                }
                break;
            case this.img_portrait:
                this.gameManager.dataManager.chooseLower = this.followVo;
                this.gameManager.sceneManager.open(SceneType.follow_details);
                break;
        }
    };
    p.onUpdate = function (follow) {
        if (this.followVo && follow && this.followVo.uid == follow.uid) {
            this.update(follow);
        }
    };
    p.update = function (follow) {
        this.followVo = follow;
        this.img_portrait.source = "" + this.followVo.pic;
        this.lab_nick.text = "" + this.followVo.nick;
        this.lab_id.text = "ID:" + this.followVo.uid;
        this.lab_buy.text = "已购:" + this.followVo.zong;
    };
    return UserItem;
}(GameSprite));
egret.registerClass(UserItem,'UserItem');
