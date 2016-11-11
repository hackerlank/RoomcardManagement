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
        this.id = SceneType.agent;
    }
    var d = __define,c=AgentScene,p=c.prototype;
    p.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.btn_add.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_notice.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_lv1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_lv2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.gameManager.addEventListener(EventType.LowerUser_Contribution, this.onUpdate, this);
    };
    p.clickHandler = function (e) {
        switch (e.currentTarget) {
            case this.btn_add:
                this.gameManager.sceneManager.open(SceneType.agent_append);
                break;
            case this.btn_notice:
                this.gameManager.sceneManager.open(SceneType.agent_notice);
                break;
            case this.btn_lv1:
                this.gameManager.sceneManager.open(SceneType.agent_lv1Record);
                break;
            case this.btn_lv2:
                this.gameManager.sceneManager.open(SceneType.agent_lv2Record);
                break;
        }
    };
    p.onUpdate = function () {
        this.btn_lv1.label = "一级代理返卡:" + this.gameManager.dataManager.userVo.agentLv1Reward;
        this.btn_lv2.label = "二级代理返卡:" + this.gameManager.dataManager.userVo.agentLv2Reward;
    };
    p.open = function () {
        _super.prototype.open.call(this);
        if (this.initComplete) {
            this.btn_lv1.label = "一级代理";
            this.btn_lv2.label = "二级代理";
            this.gameManager.msgManager.lowerUser.sendLowerUser_Contribution();
        }
    };
    return AgentScene;
}(BaseScene));
egret.registerClass(AgentScene,'AgentScene');
