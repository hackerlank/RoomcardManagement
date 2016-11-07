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
    core.serverUrl = "http://192.168.2.88:8880/CardRoomManager";
    // static serverUrl: string = "http://wishstart-cs-009.chinacloudapp.cn";
    //游戏列表
    core.gameList = [];
    //每页显示长度
    core.pageLength = 20;
    //应用id
    core.appid = "wxb6349744356b5312";
    //微信授权code
    core.code = "";
    //语言
    core.language = Language.ch;
    //登录类型
    // static loginType: string = "h5";
    core.loginType = "app";
    //是否可以播放音乐
    core.isBackgroundMusic = true;
    //是否可以播放音效
    core.isSoundEffect = true;
    return core;
}());
egret.registerClass(core,'core');
