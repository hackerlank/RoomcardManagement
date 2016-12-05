/**
 * AgentNoticeScene
 * @Author Ace.c
 * @Create 2016-11-07 15:44
 */
class AgentNoticeScene extends BaseScene {

    private lab_description: eui.Label;
    private lab_protocal: eui.Label;

    public constructor() {
        super();

        this.skinName = "AgentNoticeSceneSkin";
        this.id = SceneType.agent_notice;
    }

    public childrenCreated() {
        super.childrenCreated();

        this.lab_description.text = "" +
            "1、员工购卡单价：0.6元/张，凡单笔购卡量500张及以上，即可获得200%的赠卡,（例购买500张房卡，可获得500+500*200%=1500张）。\n\n" +
            "2、下级员工返卡：A员工添加B员工成功，B员工添加了C员工,A员工将获得B员工购卡的50%返卡。例：B每购买500张房卡，A可每次获得500*50%=250。B可以获得C的50%，例：C每购买500张房卡，B可每次获得500*50%=250。另A同时可获得C级员工的30%的返卡。例：500*30%=150";

        this.lab_protocal.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
    }

    private clickHandler(e: egret.TouchEvent) {
        this.gameManager.alertManager.open(AlertType.Protocol);
    }
}