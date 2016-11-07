/**
 * SaleCardRewardRuleItem
 * @Author Ace.c
 * @Create 2016-10-30 17:41
 */
var SaleCardRewardRuleItem = (function (_super) {
    __extends(SaleCardRewardRuleItem, _super);
    function SaleCardRewardRuleItem() {
        _super.call(this);
        this.skinName = "SaleCardRewardRuleItemSkin";
    }
    var d = __define,c=SaleCardRewardRuleItem,p=c.prototype;
    p.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        if (this.ruleVo) {
            this.lab_rule.text = "每月售卡达到" + this.ruleVo.min + "张";
            this.lab_reward.text = "奖励" + (this.ruleVo.per > 0 ? this.ruleVo.per + "%" : this.ruleVo.reb) + "张";
        }
    };
    return SaleCardRewardRuleItem;
}(GameSprite));
egret.registerClass(SaleCardRewardRuleItem,'SaleCardRewardRuleItem');
