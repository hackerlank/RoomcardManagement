/**
 * BaseUI
 * @Author Ace.c
 * @Create 2016-10-25 19:48
 */
var BaseUI = (function (_super) {
    __extends(BaseUI, _super);
    function BaseUI() {
        _super.call(this);
    }
    var d = __define,c=BaseUI,p=c.prototype;
    p.open = function () {
        _super.prototype.show.call(this);
        if (!this.gameManager.layerUI.contains(this)) {
            this.gameManager.layerUI.addChild(this);
        }
    };
    p.close = function () {
        _super.prototype.hide.call(this);
        if (this.gameManager.layerUI.contains(this)) {
            this.gameManager.layerUI.removeChild(this);
        }
    };
    return BaseUI;
}(GameSprite));
egret.registerClass(BaseUI,'BaseUI');
