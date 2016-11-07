/**
 * Created by Ace.C on 2016/4/15.
 */
var BaseAlert = (function (_super) {
    __extends(BaseAlert, _super);
    function BaseAlert() {
        _super.call(this);
    }
    var d = __define,c=BaseAlert,p=c.prototype;
    p.update = function (param) {
    };
    p.open = function () {
        _super.prototype.show.call(this);
        if (!this.gameManager.layerAlert.contains(this)) {
            this.left = this.right = this.bottom = this.top = 0;
            this.gameManager.layerAlert.addChild(this);
        }
    };
    p.close = function () {
        _super.prototype.hide.call(this);
        if (this.gameManager.layerAlert.contains(this)) {
            this.gameManager.layerAlert.removeChild(this);
        }
    };
    return BaseAlert;
}(GameSprite));
egret.registerClass(BaseAlert,'BaseAlert');
