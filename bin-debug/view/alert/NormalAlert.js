/**
 * NormalAlert
 * @Author Ace.c
 * @Create 2016-10-30 18:18
 */
var NormalAlert = (function (_super) {
    __extends(NormalAlert, _super);
    function NormalAlert() {
        _super.call(this);
        this.skinName = "NormalAlertSkin";
        this.id = AlertType.Normal;
    }
    var d = __define,c=NormalAlert,p=c.prototype;
    p.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
    };
    p.clickHandler = function (e) {
        this.gameManager.alertManager.close(this.id);
    };
    p.update = function (param) {
        this.lab_description.text = "" + param;
    };
    return NormalAlert;
}(BaseAlert));
egret.registerClass(NormalAlert,'NormalAlert');
