/**
 * RewardRuleItem
 * @Author Ace.c
 * @Create 2016-10-30 17:41
 */
class RewardRuleItem extends GameSprite {

    private lab_rule: eui.Label;
    private lab_reward: eui.Label;

    public ruleVo: RewardRuleVo;

    public constructor() {
        super();

        this.skinName = "RewardRuleItemSkin";
    }

    public childrenCreated() {
        super.childrenCreated();

        if (this.ruleVo) {
            this.lab_rule.text = "每月购卡" + this.ruleVo.min;
            this.lab_reward.text = "奖励" + (this.ruleVo.per > 0 ? this.ruleVo.per + "%" : this.ruleVo.reb);
        }
    }
}