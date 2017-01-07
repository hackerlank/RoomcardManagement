/**
 * AccountSaleScene
 * @Author Ace.c
 * @Create 2016-10-26 16:25
 */
class AccountSaleScene extends BaseScene {

    private txt_total: eui.TextInput;
    private txt_reward: eui.TextInput;
    private btn_get: eui.Button;
    private itemGroup: eui.Group;
    private lab_none: eui.Label;

    public userVo: UserVo;
    public rewardRule: any;

    public constructor() {
        super();

        this.skinName = "AccountSaleSceneSkin";
        this.id = SceneType.account_sale;
    }

    public childrenCreated() {
        super.childrenCreated();

        this.update();

        this.btn_get.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);

        this.gameManager.addEventListener(EventType.BuyCard_Info, this.onUpdateInfo, this);
    }

    private clickHandler(e: egret.TouchEvent) {
        switch (e.currentTarget) {
            case this.btn_get:
                if (this.userVo && this.userVo.cardReward > 0) {
                    this.gameManager.msgManager.buyCard.sendCard_GetReward();
                }
                else {
                    this.gameManager.alertManager.open(AlertType.Normal, Lang.getText(1003));
                }
                break;
        }
    }

    private onUpdateInfo() {
        this.btn_get.enabled = true;
        this.update();
    }

    public update() {
        this.userVo = this.gameManager.dataManager.userVo;

        this.txt_total.text = this.userVo.cardMonth + "月售卡总计:" + this.userVo.cardBuy;
        this.txt_reward.text = this.userVo.cardMonth + "月售卡奖励:" + this.userVo.cardReward;

        this.itemGroup.removeChildren();
        this.rewardRule = this.gameManager.dataManager.userVo.rewardRule;

        if (this.rewardRule) {
            var list: any[] = this.rewardRule["" + this.userVo.cardMonth];
            if (!list || !list.length)return;
            list.sort(function (a, b) {
                if (a.min > b.min) {
                    return 1;
                }
                else {
                    return -1;
                }
            });

            var item: SaleCardRewardRuleItem;
            var rule: any;
            for (var i: number = 0; i < list.length; i++) {
                rule = list[i];
                if (rule.per == 0 && rule.reb == 0) {
                    this.lab_none.visible = true;
                    return;
                }

                item = new SaleCardRewardRuleItem();
                this.itemGroup.addChild(item);

                item.update(rule);
            }

            this.lab_none.visible = false;
        }
    }

    public open() {
        super.open();

        if (this.initComplete) {
            this.btn_get.enabled = false;
            this.gameManager.msgManager.buyCard.sendCard_Info();
        }
    }
}