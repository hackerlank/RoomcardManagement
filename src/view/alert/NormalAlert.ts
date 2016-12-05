/**
 * NormalAlert
 * @Author Ace.c
 * @Create 2016-10-30 18:18
 */
class NormalAlert extends BaseAlert {

    private lab_description: eui.Label;
    private btn_confirm: eui.Button;
    private btn_cancel: eui.Button;

    private param: any;

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

        if (e.target == this.btn_confirm && this.currentState == "ask") {
            this.param.callback && this.param.callback();
        }
    }

    public update(param: any) {
        this.param = param;

        if (typeof (this.param) == "object") {
            this.skinState = "ask";
            this.lab_description.text = "" + this.param.des;
        }
        else {
            this.skinState = "normal";
            this.lab_description.text = "" + String(this.param);
        }
    }
}