/**
 * AccountRewardScene
 * @Author Ace.c
 * @Create 2016-10-26 16:25
 */
var AccountRewardScene = (function (_super) {
    __extends(AccountRewardScene, _super);
    function AccountRewardScene() {
        _super.call(this);
        this.skinName = "AccountRewardSceneSkin";
        this.id = SceneType.account_reward;
    }
    var d = __define,c=AccountRewardScene,p=c.prototype;
    p.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.itemGroup.removeChildren();
        this.rewardRuleList = this.gameManager.dataManager.userVo.rewardRuleList;
        if (this.rewardRuleList) {
            var item;
            for (var i = 0; i < this.rewardRuleList.length; i++) {
                item = new RewardRuleItem();
                item.ruleVo = this.rewardRuleList[i];
                this.itemGroup.addChild(item);
            }
        }
        this.update();
        this.btn_get.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.gameManager.addEventListener(EventType.BuyCard_Info, this.onUpdateInfo, this);
    };
    p.clickHandler = function (e) {
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
    };
    p.onUpdateInfo = function () {
        this.btn_get.enabled = true;
        this.update();
    };
    p.update = function () {
        this.userVo = this.gameManager.dataManager.userVo;
        this.txt_total.text = "" + this.userVo.cardMonth + "月购卡总计:" + this.userVo.cardBuy;
        this.txt_reward.text = "进卡奖励:" + this.userVo.cardReward;
    };
    p.open = function () {
        _super.prototype.open.call(this);
        if (this.initComplete) {
            this.btn_get.enabled = false;
            this.gameManager.msgManager.buyCard.sendCard_Info();
        }
    };
    return AccountRewardScene;
}(BaseScene));
egret.registerClass(AccountRewardScene,'AccountRewardScene');
