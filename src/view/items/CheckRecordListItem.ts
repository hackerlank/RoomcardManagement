/**
 * CheckRecordListItem
 * @Author Ace.c
 * @Create 2016-12-03 18:17
 */
class CheckRecordListItem extends BaseSprite {

    private lab_value1: eui.Label;
    private lab_value2: eui.Label;
    private lab_value3: eui.Label;
    private lab_value4: eui.Label;
    private lab_value5: eui.Label;

    public constructor() {
        super();

        this.skinName = "CheckRecordListItemSkin";
    }

    public childrenCreated() {
        super.childrenCreated();
    }

    public setValues(value1: any, value2: any, value3: any, value4: any, value5: any) {
        if (this.initComplete) {
            this.lab_value1.text = "" + value1;
            this.lab_value2.text = "" + value2;
            this.lab_value3.text = "" + value3;
            this.lab_value4.text = "" + value4;
            this.lab_value5.text = "" + value5;
        }
    }
}