/**
 * Created by Ace.C on 2016/4/15.
 */
class core {
    //舞台
    static stage: egret.Stage;

    //客户端地址
    static clientUrl: string = "http://mj.h5sd.com/gm/index.html";
    //服务器地址
    static serverUrl: string = "http://192.168.2.88:8880/CardRoomManager";
    // static serverUrl: string = "http://wishstart-cs-009.chinacloudapp.cn";
    //游戏列表
    static gameList: string[] = [];
    //游戏管理
    static gameManager: GameManager;
    //每页显示长度
    static pageLength: number = 20;

    //应用id
    static appid: string = "wxb6349744356b5312";
    //微信授权code
    static code: any = "";
    //服务器分配id
    static sessionid: any;
    //语言
    static language: Language = Language.ch;
    //登录类型
    static loginType: string = "h5";
    // static loginType:string = "app";


    //是否可以播放音乐
    static isBackgroundMusic: boolean = true;
    //是否可以播放音效
    static isSoundEffect: boolean = true;

    //初始化
    static init(stage: egret.Stage): void {
        H5Core.init(stage);
        core.stage = stage;

        core.gameManager = GameManager.getInstance();
        core.gameManager.initLayer();
        core.gameManager.initManager();

        core.gameManager.sceneManager.open(SceneType.welcom);
    }
}