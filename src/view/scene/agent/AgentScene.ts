/**
 * AgentScene
 * @Author Ace.c
 * @Create 2016-11-07 15:39
 */
class AgentScene extends BaseScene {

    private btn_add: eui.Button;
    private btn_notice: eui.Button;
    private btn_lv1: eui.Button;
    private btn_lv2: eui.Button;
    private btn_check: eui.Button;
    private scroller: eui.Scroller;
    private container: eui.Group;

    public constructor() {
        super();

        this.skinName = "AgentSceneSkin";
        this.id = SceneType.agent;
    }

    public childrenCreated() {
        super.childrenCreated();

        this.btn_check.visible = Power.hasCheckCenter();

        this.onUpdateNotice();

        this.btn_add.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_notice.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_lv1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_lv2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_check.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);

        this.gameManager.addEventListener(EventType.LowerUser_Contribution, this.onUpdate, this);
    }

    private clickHandler(e: egret.TouchEvent) {
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
            case this.btn_check:
                this.gameManager.sceneManager.open(SceneType.agent_checkcenter);
                break;
        }
    }

    private onUpdateNotice() {
        this.container.removeChildren();

        var _this = this;
        this.gameManager.httpManager.send(core.Notice02, null, function (msg: any) {
            var data: any;
            for (var id in msg) {
                if (!msg[id])continue;

                data = msg[id];

                var arr: Array<any> = [];
                var style: any = {};
                style.textAlign = data.align ? data.align : "left";
                style.fontFamily = data.font ? data.font : "微软雅黑";
                style.textColor = data.color ? data.color : 0x000000;
                style.bold = data.bold ? data.bold : false;
                style.size = data.size ? data.size : 24;
                style.lineSpacing = data.lineSpacing ? data.lineSpacing : 5;

                arr.push({
                    text: data["txt"],
                    style: style
                });

                var label: eui.Label = FactoryUtils.getLabel(style.textAlign);
                label.lineSpacing = style.lineSpacing;
                label.multiline = true;
                label.wordWrap = true;
                label.width = 550;
                label.textFlow = arr;
                _this.container.addChild(label);
            }

            _this.scroller.viewport.scrollV = 0;
            _this.scroller.validateNow();
        });
    }

    private onUpdate() {
        this.btn_lv1.label = "总监绩效:" + this.gameManager.dataManager.userVo.agentLv1Reward;
        this.btn_lv2.label = "经理绩效:" + this.gameManager.dataManager.userVo.agentLv2Reward;
    }

    public open() {
        super.open();

        if (this.initComplete) {
            this.btn_lv1.label = "总监绩效";
            this.btn_lv2.label = "经理绩效";
            this.gameManager.msgManager.lowerUser.sendLowerUser_Contribution();
        }
    }
}