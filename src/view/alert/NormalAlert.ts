/**
 * NormalAlert
 * @Author Ace.c
 * @Create 2016-10-30 18:18
 */
class NormalAlert extends BaseAlert {

    private lab_description: eui.Label;
    private btn_confirm: eui.Button;

    public constructor() {
        super();

        this.skinName = "NormalAlertSkin";
        this.id = AlertType.Normal;
    }

    public childrenCreated() {
        super.childrenCreated();

        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
    }

    private clickHandler(e: egret.TouchEvent) {
        this.gameManager.alertManager.close(this.id);
    }

    public update(param: any) {
        this.lab_description.text = "" + param;
    }
}