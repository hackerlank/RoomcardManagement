/**
 * CheckListItem
 * @Author Ace.c
 * @Create 2016-12-03 18:17
 */
class CheckListItem extends BaseSprite {

    private lab_value1: eui.Label;
    private lab_value2: eui.Label;
    private lab_value3: eui.Label;
    private lab_value4: eui.Label;

    public constructor() {
        super();

        this.skinName = "CheckListItemSkin";
    }

    public childrenCreated() {
        super.childrenCreated();
    }

    public setValues(value1: any, value2: any, value3: any, value4: any) {
        if (this.initComplete) {
            this.lab_value1.text = "" + value1;
            this.lab_value2.text = "" + value2;
            this.lab_value3.text = "" + value3;
            this.lab_value4.text = "" + value4;
        }
    }
}