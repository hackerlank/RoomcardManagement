/**
 * AccountBuyCardScene
 * @Author Ace.c
 * @Create 2016-11-07 12:22
 */
var AccountBuyCardScene = (function (_super) {
    __extends(AccountBuyCardScene, _super);
    function AccountBuyCardScene() {
        _super.call(this);
        this.skinName = "AccountBuyCardSceneSkin";
        this.id = SceneType;
    }
    var d = __define,c=AccountBuyCardScene,p=c.prototype;
    p.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    return AccountBuyCardScene;
}(BaseScene));
egret.registerClass(AccountBuyCardScene,'AccountBuyCardScene');
