/**
 * Created by Ace.C on 2016/4/15.
 */
class GameManager extends CommonEvent {

    private static _instance: GameManager;

    public static getInstance(): GameManager {
        if (!this._instance) {
            this._instance = new GameManager();
        }
        return this._instance;
    }

    public timerManager: TimerManager;
    public httpManager: HttpManager;
    public dataManager: DataManager;
    public msgManager: MsgManager;

    public sceneManager: SceneManager;
    public panelManager: PanelManager;
    public uiManager: UIManager;
    public alertManager: AlertManager;

    public layerScene: eui.UILayer;
    public layerPanel: eui.UILayer;
    public layerUI: eui.UILayer;
    public layerAlert: eui.UILayer;
    public layerTips: eui.UILayer;
    public layerTop: eui.UILayer;

    public constructor() {
        super();
    }

    public initLayer(): void {
        this.layerScene = this.getNewLayer();
        this.layerPanel = this.getNewLayer();
        this.layerUI = this.getNewLayer();
        this.layerAlert = this.getNewLayer();
        this.layerTips = this.getNewLayer();
        this.layerTop = this.getNewLayer();
    }

    public initManager(): void {
        this.timerManager = TimerManager.getInstance();
        this.httpManager = HttpManager.getInstance();
        this.dataManager = new DataManager();
        this.msgManager = new MsgManager();

        this.alertManager = new AlertManager();
        this.panelManager = new PanelManager();
        this.uiManager = new UIManager();
        this.sceneManager = new SceneManager();
    }

    public getNewLayer() {
        var layer: eui.UILayer = new eui.UILayer();
        layer.top = 0;
        layer.bottom = 0;
        layer.left = 0;
        layer.right = 0;
        layer.touchEnabled = false;
        core.stage.addChild(layer);
        return layer;
    }

    /**
     * 获取全国省份列表
     * @returns {string[]}
     */
    public getProvinces(): string[] {
        var config: any[] = RES.getRes("area_cn");
        var list: string[] = [];
        if (config && config.length) {
            var province: any;
            for (var i: number = 0; i < config.length; i++) {
                province = config[i];
                list.push(province.name);
            }
        }
        return list;
    }

    /**
     * 获取省份对应的城市列表
     * @param provinceName 省份名称
     * @returns {string[]}
     */
    public getCitys(provinceName: string): string[] {
        var config: any[] = RES.getRes("area_cn");
        var list: string[] = [];
        if (config && config.length) {
            var province: any;
            var city: any;
            for (var i: number = 0; i < config.length; i++) {
                province = config[i];
                if (province.name == provinceName) {
                    for (var j: number = 0; j < province.city.length; j++) {
                        city = province.city[j];
                        list.push(city.name);
                    }
                }
            }
        }
        return list;
    }

    /**
     * 获取城市对应的区域列表
     * @param provinceName 省份名称
     * @param cityName 城市名称
     * @returns {string[]}
     */
    public getAreas(provinceName: string, cityName: string): string[] {
        var config: any[] = RES.getRes("area_cn");
        var list: string[] = [];
        if (config && config.length) {
            var province: any;
            var city: any;
            var area: string;
            for (var i: number = 0; i < config.length; i++) {
                province = config[i];
                if (province.name == provinceName) {
                    for (var j: number = 0; j < province.city.length; j++) {
                        city = province.city[j];
                        if (city.name == cityName) {
                            for (var k: number = 0; k < city.area.length; k++) {
                                area = city.area[k];
                                list.push(area);
                            }
                        }
                    }
                }
            }
        }
        return list;
    }
}