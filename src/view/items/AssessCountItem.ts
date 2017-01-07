/**
 * AssessCountItem
 * @Author Ace.c
 * @Create 2016-12-03 18:17
 */
class AssessCountItem extends BaseSprite {

    private lab_value1: eui.Label;
    private lab_value2: eui.Label;

    public constructor() {
        super();

        this.skinName = "AssessCountItemSkin";
    }

    public childrenCreated() {
        super.childrenCreated();
    }

    public setValues(value1: any, value2: any) {
        if (this.initComplete) {
            this.lab_value1.text = "" + value1;
            this.lab_value2.text = "" + value2;
        }
    }
}