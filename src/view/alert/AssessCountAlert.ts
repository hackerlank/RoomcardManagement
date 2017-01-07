/**
 * assessCountAlert
 * @Author Ace.c
 * @Create 2016-11-08 16:07
 */
class AssessCountAlert extends BaseAlert {

    private btn_close: eui.Rect;
    private scroller: eui.Scroller;
    private group: eui.Group;
    private btn_confirm: eui.Button;

    private user: UserVo;

    public constructor() {
        super();

        this.skinName = "AssessCountAlertSkin";
        this.id = AlertType.AssessCount;
    }

    public childrenCreated() {
        super.childrenCreated();

        this.user = this.gameManager.dataManager.userVo;

        this.updateView();

        this.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_confirm.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
    }

    private clickHandler(e: egret.TouchEvent) {
        switch (e.currentTarget) {
            case this.btn_close:
            case this.btn_confirm:
                this.gameManager.alertManager.close(AlertType.AssessCount);
                break;
        }
    }

    private updateView() {
        if (this.user.assessRule) {

            this.group.removeChildren();

            var item: AssessCountItem;
            var data: any;
            for (var i: number = 0; i < this.user.assessRule.length; i++) {
                data = this.user.assessRule[i];

                item = new AssessCountItem();
                this.group.addChild(item);

                item.setValues(Math.floor(data.min / 100), data.cou);
            }
        }
    }
}