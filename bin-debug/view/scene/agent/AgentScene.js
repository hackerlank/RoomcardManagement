/**
 * AgentScene
 * @Author Ace.c
 * @Create 2016-11-07 15:39
 */
var AgentScene = (function (_super) {
    __extends(AgentScene, _super);
    function AgentScene() {
        _super.call(this);
        this.skinName = "AgentSceneSkin";
        this.id = SceneType;
    }
    var d = __define,c=AgentScene,p=c.prototype;
    p.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.btn_add.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_notice.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_lv1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_lv2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_get.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
    };
    p.clickHandler = function (e) {
        switch (e.currentTarget) {
            case this.btn_add:
                break;
            case this.btn_notice:
                break;
            case this.btn_lv1:
                break;
            case this.btn_lv2:
                break;
            case this.btn_get:
                break;
        }
    };
    return AgentScene;
}(BaseScene));
egret.registerClass(AgentScene,'AgentScene');
