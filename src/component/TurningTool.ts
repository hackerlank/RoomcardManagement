/**
 * TurningTool
 * @Author Ace.c
 * @Create 2016-10-30 14:10
 */
class TurningTool extends BaseSprite {
    private labelDisplay: eui.Label;
    private leftBtnDisplay: eui.Button;
    private rightBtnDisplay: eui.Button;

    public mini: number = 1;
    public maxi: number = 1;
    public page: number = 1;

    public constructor() {
        super();

        this.skinName = "skins.TurningToolSkin";
    }

    public childrenCreated() {
        super.childrenCreated();

        this.leftBtnDisplay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.rightBtnDisplay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);

        this.labelDisplay.addEventListener(egret.Event.CHANGE, this.inputHandler, this);
    }

    private clickHandler(e: egret.TouchEvent) {
        switch (e.currentTarget) {
            case this.rightBtnDisplay:
                if (this.page < this.maxi) {
                    this.page++;
                    this.update();

                    this.dispatchEventWith(CommonEventType.CHANGED);
                }
                break;
            case this.leftBtnDisplay:
                if (this.page > this.mini) {
                    this.page--;
                    this.update();

                    this.dispatchEventWith(CommonEventType.CHANGED);
                }
                break;
        }
    }

    private inputHandler() {
        this.page = Number(this.labelDisplay.text);
        this.update();

        this.dispatchEventWith(CommonEventType.CHANGED);
    }

    private update() {
        this.page = this.page < this.mini ? this.mini : this.page;
        this.page = this.page > this.maxi ? this.maxi : this.page;

        this.labelDisplay.text = "" + this.page + "/" + this.maxi;
    }

    public setScope(mini: number = 0, maxi: number = 1) {
        maxi = maxi ? maxi : 1;
        maxi = maxi < mini ? mini : maxi;

        this.mini = mini;
        this.maxi = maxi;

        this.update();
    }

    public setMaxChars(value: number) {
        this.labelDisplay.maxChars = value;
    }
}