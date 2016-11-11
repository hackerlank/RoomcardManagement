/**
 * AccountRechargeScene
 * @Author Ace.c
 * @Create 2016-10-26 16:38
 */
class AccountRechargeScene extends BaseScene {

    public itemGroup: eui.Group;

    public rechargeList: RechargeVo[];

    public constructor() {
        super();

        this.skinName = "AccountRechargeSceneSkin";
        this.id = SceneType.account_recharge;
    }

    public childrenCreated() {
        super.childrenCreated();

        this.update();
    }

    public update() {
        this.rechargeList = this.gameManager.dataManager.userVo.rechargeList;

        this.itemGroup.removeChildren();

        if (this.rechargeList) {
            var rechargeVo: RechargeVo;
            var btn: eui.Button;
            for (var i: number = 0; i < this.rechargeList.length; i++) {
                rechargeVo = this.rechargeList[i];

                btn = new eui.Button();
                btn.skinName = "skins.Button_GreenSkin";
                btn.width = 600;
                btn.height = 60;
                btn.label = "充值" + rechargeVo.card + "房卡";
                btn.label = rechargeVo.card + "房卡+赠送" + rechargeVo.rebate + "房卡=" + (rechargeVo.pay / 100) + "元";
                this.itemGroup.addChild(btn);

                btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buttonHandler, this);
            }
        }
    }

    private buttonHandler(e: egret.TouchEvent) {
        var index: number = this.itemGroup.getChildIndex(e.currentTarget);
        var rechargeVo: RechargeVo = this.rechargeList[index];
        if (rechargeVo) {
            this.gameManager.msgManager.recharge.sendOrder(rechargeVo.id);
        }
    }
}