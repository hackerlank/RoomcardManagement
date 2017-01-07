/**
 * SaleCardRewardRuleItem
 * @Author Ace.c
 * @Create 2016-10-30 17:41
 */
class SaleCardRewardRuleItem extends GameSprite {

    private lab_rule: eui.Label;
    private lab_reward: eui.Label;

    public constructor() {
        super();

        this.skinName = "SaleCardRewardRuleItemSkin";
    }

    public childrenCreated() {
        super.childrenCreated();
    }

    update(va: any) {
        if (va) {
            this.lab_rule.text = "月售卡达到" + va.min + "张";
            this.lab_reward.text = "奖励" + (va.per > 0 ? va.per + "%" : va.reb) + "张";
        }
    }
}