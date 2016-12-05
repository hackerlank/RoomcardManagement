/**
 * AgentCheckCenterScene
 * @Author Ace.c
 * @Create 2016-12-03 18:09
 */
class AgentCheckCenterScene extends BaseScene {

    private container: eui.Group;
    private btn_weixin: eui.Button;
    private btn_account: eui.Button;

    private msg: any;

    public constructor() {
        super();

        this.skinName = "AgentCheckCenterSceneSkin";
        this.id = SceneType.agent_checkcenter;
    }

    public childrenCreated() {
        super.childrenCreated();

        this.btn_weixin.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_account.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);

        this.gameManager.addEventListener(EventType.Agent_Check_List, this.onUpdateList, this);
    }

    private clickHandler(e: egret.TouchEvent) {
        var _this = this;
        switch (e.currentTarget) {
            case this.btn_weixin:
                this.gameManager.alertManager.open(AlertType.Normal, {
                    des: "确定要领取当前" + (this.msg.sm / 100) + "元工资?",
                    callback: function () {
                        _this.gameManager.msgManager.agent.checkCenterToWeixin();
                    }
                });
                break;
            case this.btn_account:
                this.gameManager.alertManager.open(AlertType.Normal, {
                    des: "确定要领取" + this.msg.cd + "张房卡么?",
                    callback: function () {
                        _this.gameManager.msgManager.agent.checkCenterToAccount();
                    }
                });
                break;
        }
    }

    private onUpdateList(msg) {

        this.msg = msg;

        this.container.removeChildren();

        var item: CheckListItem = new CheckListItem();
        this.container.addChild(item);

        item.setValues("绩效档位", "绩效数量", "单价(元)", "档位工资");

        var list: any[] = msg.xq;
        list.reverse();

        var data: any;
        for (var i: number = 0; i < list.length; i++) {
            data = list[i];

            item = new CheckListItem();
            this.container.addChild(item);

            item.setValues(data.lv, data.cd, data.pe / 100, data.mm / 100);
        }

        item = new CheckListItem();
        this.container.addChild(item);

        item.setValues("合计", msg.cd, "/", msg.sm / 100);
    }

    public open() {
        super.open();

        if (this.initComplete) {
            this.gameManager.msgManager.agent.checkCenter();
        }
    }
}