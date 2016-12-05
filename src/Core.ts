/**
 * Created by Ace.C on 2016/4/15.
 */
class core {

    //版本号
    static version: string = "1.4.107";
    //客户端地址
    static clientUrl: string = "http://mj.h5sd.com/gm/official/index.html";
    //服务器地址
    static serverUrl: string = "http://121.42.209.249";
    //默认每页显示长度
    static pageLength: number = 40;
    //充卡记录显示长度
    static lowerUserLength: number = 20;
    //手机验证码重置时间
    static PhoneCodeReTime: number = 60;
    //GM登录验证
    static GmCode = "cLGGRh2b4sMeRy";
    //公告1(转账)
    static Notice01: string = "http://119.29.75.66:9001/cardroom/notice.php?t=1";
    //公告2(代理)
    static Notice02: string = "http://119.29.75.66:9001/cardroom/notice.php?t=2";

    //登录类型
    static lt: any = "";
    //gm登录
    static gm: any = "";
    //登录公众号appid
    static appid: string = "wxb6349744356b5312";
    //登录公众号登录code
    static code: any = "";
    //支付公众号appid
    static appid_p: string = "wx39cf3f150220635d";
    //支付公众号支付code
    static code_p: any = "";
    //服务器分配id
    static sessionid: any;
    //语言
    static language: Language = Language.ch;
    //登录类型
    static loginType: string = "h5";
    // static loginType:string = "app";

    //游戏开通数据列表
    static gameDatas: any[] = [];
    //游戏名称列表
    static gameTpl: string[] = [];
    //舞台
    static stage: egret.Stage;
    //游戏管理
    static gameManager: GameManager;
    //是否可以播放音乐
    static isBackgroundMusic: boolean = true;
    //是否可以播放音效
    static isSoundEffect: boolean = true;
    //服务器时间
    static svtm: number;

    //初始化
    static init(stage: egret.Stage): void {
        H5Core.init(stage);
        core.stage = stage;

        core.gameManager = GameManager.getInstance();
        core.gameManager.initLayer();
        core.gameManager.initManager();

        core.gameManager.sceneManager.open(SceneType.welcom);
    }

    static wxAccess(): boolean {

        core.lt = StringUtils.getUrlParams("lt");
        switch (core.lt) {
            case "1":
                core.clientUrl = "http://mj.h5sd.com/gm/indexTest.html";
                break;
            case "2":
                core.clientUrl = "http://mj.h5sd.com/gm/indexTest.html";
                core.serverUrl = "http://192.168.2.88:8880/CardRoomManager";
                break;
        }

        core.gm = StringUtils.getUrlParams("gm");
        if (core.gm == core.GmCode) return;

        core.code_p = StringUtils.getUrlParams("pc");
        core.code = StringUtils.getUrlParams("code");

        var isAccess: boolean;

        if (core.code_p == "") {
            isAccess = true;

            if (core.code == "") {
                Weixin.getAccessCodeForPay(core.appid_p, core.clientUrl);
            }
            else {
                Weixin.getAccessCodeForLogin(core.appid, core.clientUrl, core.code);
            }
        }
        else {
            if (core.code == StorageUtils.getData("code") && core.code_p == StorageUtils.getData("pc")) {
                isAccess = true;

                Weixin.getAccessCodeForPay(core.appid_p, core.clientUrl);
            }
        }
        if (!isAccess) {
            StorageUtils.setData("code", core.code);
            StorageUtils.setData("pc", core.code_p);
        }
        return isAccess;
    }
}