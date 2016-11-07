/**
 * ErrorScene
 * @Author Ace.c
 * @Create 2016-11-02 18:01
 */
class ErrorScene extends BaseScene {

    private lab_description: eui.Label;

    public constructor() {
        super();

        this.skinName = "ErrorSceneSkin";
        this.id = SceneType.error;
    }

    public childrenCreated() {
        super.childrenCreated();

        this.lab_description.text = "" + Lang.getText(9001);
    }

    public open():void {
        super.open();

        this.bottom = 0;
    }
}