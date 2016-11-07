/**
 * WelcomScene
 * @Author Ace.c
 * @Create 2016-11-02 19:11
 */
var WelcomScene = (function (_super) {
    __extends(WelcomScene, _super);
    function WelcomScene() {
        _super.call(this);
        this.skinName = "WelcomSceneSkin";
        this.id = SceneType.welcom;
    }
    var d = __define,c=WelcomScene,p=c.prototype;
    p.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    p.open = function () {
        _super.prototype.open.call(this);
        this.bottom = 0;
    };
    return WelcomScene;
}(BaseScene));
egret.registerClass(WelcomScene,'WelcomScene');
