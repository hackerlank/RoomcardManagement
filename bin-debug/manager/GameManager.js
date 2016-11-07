/**
 * Created by Ace.C on 2016/4/15.
 */
var GameManager = (function (_super) {
    __extends(GameManager, _super);
    function GameManager() {
        _super.call(this);
    }
    var d = __define,c=GameManager,p=c.prototype;
    GameManager.getInstance = function () {
        if (!this._instance) {
            this._instance = new GameManager();
        }
        return this._instance;
    };
    p.initLayer = function () {
        this.layerScene = this.getNewLayer();
        this.layerPanel = this.getNewLayer();
        this.layerUI = this.getNewLayer();
        this.layerAlert = this.getNewLayer();
        this.layerTips = this.getNewLayer();
        this.layerTop = this.getNewLayer();
    };
    p.initManager = function () {
        this.httpManager = HttpManager.getInstance();
        this.dataManager = new DataManager();
        this.msgManager = new MsgManager();
        this.alertManager = new AlertManager();
        this.panelManager = new PanelManager();
        this.uiManager = new UIManager();
        this.sceneManager = new SceneManager();
    };
    p.getNewLayer = function () {
        var layer = new eui.UILayer();
        layer.top = 0;
        layer.bottom = 0;
        layer.left = 0;
        layer.right = 0;
        layer.touchEnabled = false;
        core.stage.addChild(layer);
        return layer;
    };
    return GameManager;
}(CommonEvent));
egret.registerClass(GameManager,'GameManager');
