/**
 * Created by Ace.C on 2016/4/15.
 */
var core = (function () {
    function core() {
    }
    var d = __define,c=core,p=c.prototype;
    //初始化
    core.init = function (stage) {
        H5Core.init(stage);
        core.stage = stage;
        core.gameManager = GameManager.getInstance();
        core.gameManager.initLayer();
        core.gameManager.initManager();
        core.gameManager.sceneManager.open(SceneType.welcom);
    };
    //客户端地址
    core.clientUrl = "http://mj.h5sd.com/gm/index.html";
    //服务器地址
    // static serverUrl: string = "http://192.168.2.88:8880/CardRoomManager";
    core.serverUrl = "http://121.42.209.249";
    //每页显示长度
    core.pageLength = 40;
    //手机验证码重置时间
    core.PhoneCodeReTime = 60;
    //GM登录验证
    core.GmCode = "cLGGRh2b4sMeRy";
    //公告1(转账)
    core.Notice01 = "http://119.29.75.66:9001/cardroom/notice.php?t=1";
    //公告2(代理)
    core.Notice02 = "http://119.29.75.66:9001/cardroom/notice.php?t=2";
    //gm登录
    core.gm = "";
    //登录公众号appid
    core.appid = "wxb6349744356b5312";
    //登录公众号登录code
    core.code = "";
    //支付公众号appid
    core.appid_p = "wx39cf3f150220635d";
    //支付公众号支付code
    core.code_p = "";
    //语言
    core.language = Language.ch;
    //登录类型
    core.loginType = "h5";
    // static loginType:string = "app";
    //游戏列表
    core.gameList = [];
    //是否可以播放音乐
    core.isBackgroundMusic = true;
    //是否可以播放音效
    core.isSoundEffect = true;
    return core;
}());
egret.registerClass(core,'core');
