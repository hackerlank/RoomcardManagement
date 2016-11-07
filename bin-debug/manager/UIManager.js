/**
 * UIManager
 * @Author Ace.c
 * @Create 2016-10-25 19:49
 */
var UIManager = (function (_super) {
    __extends(UIManager, _super);
    function UIManager() {
        _super.call(this);
        this.initManager();
    }
    var d = __define,c=UIManager,p=c.prototype;
    p.initManager = function () {
        _super.prototype.initManager.call(this);
        this.menuUI = new MenuUI();
    };
    return UIManager;
}(BaseManager));
egret.registerClass(UIManager,'UIManager');
