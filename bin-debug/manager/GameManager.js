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
        this.timerManager = TimerManager.getInstance();
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
    /**
     * 获取全国省份列表
     * @returns {string[]}
     */
    p.getProvinces = function () {
        var config = RES.getRes("area_cn");
        var list = [];
        if (config && config.length) {
            var province;
            for (var i = 0; i < config.length; i++) {
                province = config[i];
                list.push(province.name);
            }
        }
        return list;
    };
    /**
     * 获取省份对应的城市列表
     * @param provinceName 省份名称
     * @returns {string[]}
     */
    p.getCitys = function (provinceName) {
        var config = RES.getRes("area_cn");
        var list = [];
        if (config && config.length) {
            var province;
            var city;
            for (var i = 0; i < config.length; i++) {
                province = config[i];
                if (province.name == provinceName) {
                    for (var j = 0; j < province.city.length; j++) {
                        city = province.city[j];
                        list.push(city.name);
                    }
                }
            }
        }
        return list;
    };
    /**
     * 获取城市对应的区域列表
     * @param provinceName 省份名称
     * @param cityName 城市名称
     * @returns {string[]}
     */
    p.getAreas = function (provinceName, cityName) {
        var config = RES.getRes("area_cn");
        var list = [];
        if (config && config.length) {
            var province;
            var city;
            var area;
            for (var i = 0; i < config.length; i++) {
                province = config[i];
                if (province.name == provinceName) {
                    for (var j = 0; j < province.city.length; j++) {
                        city = province.city[j];
                        if (city.name == cityName) {
                            for (var k = 0; k < city.area.length; k++) {
                                area = city.area[k];
                                list.push(area);
                            }
                        }
                    }
                }
            }
        }
        return list;
    };
    return GameManager;
}(CommonEvent));
egret.registerClass(GameManager,'GameManager');
