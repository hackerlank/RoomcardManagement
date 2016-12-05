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

    public userVo: UserVo;
    public rewardRuleList: RewardRuleVo[];

    public constructor() {
        super();

        this.skinName = "AccountSaleSceneSkin";
        this.id = SceneType.account_sale;
    }

    public childrenCreated() {
        super.childrenCreated();

        this.itemGroup.removeChildren();

        this.rewardRuleList = this.gameManager.dataManager.userVo.rewardRuleList;
        if (this.rewardRuleList) {
            var item: SaleCardRewardRuleItem;
            for (var i: number = 0; i < this.rewardRuleList.length; i++) {
                item = new SaleCardRewardRuleItem();
                item.ruleVo = this.rewardRuleList[i];
                this.itemGroup.addChild(item);
            }
        }

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
        // this.txt_total.text = "售卡总计:" + this.userVo.cardBuy;
        this.txt_reward.text = this.userVo.cardMonth + "月售卡奖励:" + this.userVo.cardReward;
        // this.txt_reward.text = "售卡奖励:" + this.userVo.cardReward;
    }

    public open() {
        super.open();

        if (this.initComplete) {
            this.btn_get.enabled = false;
            this.gameManager.msgManager.buyCard.sendCard_Info();
        }
    }
}