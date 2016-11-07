/**
 * AgentNoticeScene
 * @Author Ace.c
 * @Create 2016-11-07 15:44
 */
var AgentNoticeScene = (function (_super) {
    __extends(AgentNoticeScene, _super);
    function AgentNoticeScene() {
        _super.call(this);
        this.skinName = "AgentNoticeSceneSkin";
        this.id = SceneType;
    }
    var d = __define,c=AgentNoticeScene,p=c.prototype;
    p.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    return AgentNoticeScene;
}(BaseScene));
egret.registerClass(AgentNoticeScene,'AgentNoticeScene');
