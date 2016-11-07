/**
 * RewardRuleItem
 * @Author Ace.c
 * @Create 2016-10-30 17:41
 */
var RewardRuleItem = (function (_super) {
    __extends(RewardRuleItem, _super);
    function RewardRuleItem() {
        _super.call(this);
        this.skinName = "RewardRuleItemSkin";
    }
    var d = __define,c=RewardRuleItem,p=c.prototype;
    p.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        if (this.ruleVo) {
            this.lab_rule.text = "每月购卡" + this.ruleVo.min;
            this.lab_reward.text = "奖励" + (this.ruleVo.per > 0 ? this.ruleVo.per + "%" : this.ruleVo.reb);
        }
    };
    return RewardRuleItem;
}(GameSprite));
egret.registerClass(RewardRuleItem,'RewardRuleItem');
