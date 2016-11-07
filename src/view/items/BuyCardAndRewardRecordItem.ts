/**
 * BuyCardAndRewardRecordItem
 * @Author Ace.c
 * @Create 2016-11-07 12:17
 */
class BuyCardAndRewardRecordItem extends GameSprite {

    private lab_time: eui.Label;
    private lab_event: eui.Label;
    private lab_count: eui.Label;

    public constructor() {
        super();

        this.skinName = "BuyCardAndRewardRecordItemSkin";
    }

    public childrenCreated() {
        super.childrenCreated();
    }
}