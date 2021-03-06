/**
 * Created by Ace.C on 2016/4/15.
 */
var BaseScene = (function (_super) {
    __extends(BaseScene, _super);
    function BaseScene() {
        _super.call(this);
    }
    var d = __define,c=BaseScene,p=c.prototype;
    p.open = function () {
        _super.prototype.show.call(this);
        if (!this.gameManager.layerScene.contains(this)) {
            this.top = this.left = this.right = 0;
            this.bottom = 80;
            this.gameManager.layerScene.addChild(this);
        }
    };
    p.close = function () {
        _super.prototype.hide.call(this);
        if (this.gameManager.layerScene.contains(this)) {
            this.gameManager.layerScene.removeChild(this);
        }
    };
    return BaseScene;
}(GameSprite));
egret.registerClass(BaseScene,'BaseScene');
