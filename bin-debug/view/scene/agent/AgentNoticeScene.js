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
        this.id = SceneType.agent_notice;
    }
    var d = __define,c=AgentNoticeScene,p=c.prototype;
    p.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.lab_description.text = "" +
            "1、代理购卡单价：0.6元/张，凡单笔购卡量500张及以上，即可获得200%的赠卡,（例购买500张房卡，可获得500+500*200%=1500张）。\n\n" +
            "2、下级代理返卡：A代理添加B代理成功，B代理添加了C代理,A代理将获得B代理购卡的50%返卡。例：B每购买500张房卡，A可每次获得500*50%=250。B可以获得C的50%，例：C每购买500张房卡，B可每次获得500*50%=250。另A同时可获得C级代理的30%的返卡。例：500*30%=150";
        this.lab_protocal.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
    };
    p.clickHandler = function (e) {
        this.gameManager.alertManager.open(AlertType.Protocol);
    };
    return AgentNoticeScene;
}(BaseScene));
egret.registerClass(AgentNoticeScene,'AgentNoticeScene');
