/**
 * ErrorScene
 * @Author Ace.c
 * @Create 2016-11-02 18:01
 */
var ErrorScene = (function (_super) {
    __extends(ErrorScene, _super);
    function ErrorScene() {
        _super.call(this);
        this.skinName = "ErrorSceneSkin";
        this.id = SceneType.error;
    }
    var d = __define,c=ErrorScene,p=c.prototype;
    p.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.lab_description.text = "" + Lang.getText(9001);
    };
    p.open = function () {
        _super.prototype.open.call(this);
        this.bottom = 0;
    };
    return ErrorScene;
}(BaseScene));
egret.registerClass(ErrorScene,'ErrorScene');
