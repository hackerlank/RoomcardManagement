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
}