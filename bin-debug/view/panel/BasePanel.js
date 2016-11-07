/**
 * Created by Ace.C on 2016/4/15.
 */
var BasePanel = (function (_super) {
    __extends(BasePanel, _super);
    function BasePanel() {
        _super.call(this);
    }
    var d = __define,c=BasePanel,p=c.prototype;
    p.open = function () {
        _super.prototype.show.call(this);
        if (!this.gameManager.layerPanel.contains(this)) {
            this.gameManager.layerPanel.addChild(this);
        }
    };
    p.close = function () {
        _super.prototype.hide.call(this);
        if (this.gameManager.layerPanel.contains(this)) {
            this.gameManager.layerPanel.removeChild(this);
        }
    };
    return BasePanel;
}(GameSprite));
egret.registerClass(BasePanel,'BasePanel');
