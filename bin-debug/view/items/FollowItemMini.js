/**
 * FollowItemMini
 * @Author Ace.c
 * @Create 2016-10-25 20:33
 */
var FollowItemMini = (function (_super) {
    __extends(FollowItemMini, _super);
    function FollowItemMini() {
        _super.call(this);
        this.skinName = "UserItemMiniSkin";
    }
    var d = __define,c=FollowItemMini,p=c.prototype;
    p.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.touchChildren = false;
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.gameManager.addEventListener(EventType.Follow_Update_Info, this.onUpdate, this);
    };
    p.clickHandler = function (e) {
        if (this.followVo) {
            this.gameManager.sceneManager.open(this.gameManager.sceneManager.jumpSceneID);
            this.gameManager.dispatchEvent(EventType.Follow_Selected, this.followVo.uid);
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
    };
    return FollowItemMini;
}(GameSprite));
egret.registerClass(FollowItemMini,'FollowItemMini');
