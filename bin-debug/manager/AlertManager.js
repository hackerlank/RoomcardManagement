/**
 * Created by Ace.C on 2016/4/15.
 */
var AlertManager = (function (_super) {
    __extends(AlertManager, _super);
    function AlertManager() {
        _super.call(this);
        this.gather = {};
        this.initManager();
    }
    var d = __define,c=AlertManager,p=c.prototype;
    p.initManager = function () {
        _super.prototype.initManager.call(this);
        this.normal = new NormalAlert();
        this.gather[this.normal.id] = this.normal;
    };
    /**
     * 打开
     * @param id
     */
    p.open = function (id, param) {
        var baseAlert = this.gather[id];
        if (baseAlert) {
            this.curAlert = baseAlert;
            this.curAlert.open();
            this.curAlert.update(param);
        }
    };
    /**
     * 关闭
     * @param id
     */
    p.close = function (id) {
        var baseAlert = this.gather[id];
        baseAlert.close();
    };
    /**
     * 关闭全部
     */
    p.closeAll = function () {
        var baseAlert;
        for (var id in this.gather) {
            baseAlert = this.gather[id];
            baseAlert.close();
        }
    };
    return AlertManager;
}(BaseManager));
egret.registerClass(AlertManager,'AlertManager');
