/**
 * NumberAdder
 * @Author Ace.c
 * @Create 2016-10-30 14:10
 */
class NumberAdder extends BaseSprite {
    private btn_cut: eui.Button;
    private txt_count: eui.EditableText;
    private btn_add: eui.Button;

    public mini: number = 0;
    public maxi: number = -1;
    public numb: number = 0;

    public constructor() {
        super();

        this.skinName = "skins.NumberAdderSkin";
    }

    public childrenCreated() {
        super.childrenCreated();

        this.txt_count.restrict = "0-9";

        this.btn_cut.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_add.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);

        this.txt_count.addEventListener(egret.Event.CHANGE, this.inputHandler, this);
    }

    private clickHandler(e: egret.TouchEvent) {
        switch (e.currentTarget) {
            case this.btn_add:
                if (this.maxi == 0 || this.numb < this.maxi) {
                    this.numb++;
                    this.update();

                    this.dispatchEventWith(CommonEventType.CHANGED);
                }
                break;
            case this.btn_cut:
                if (this.numb > this.mini) {
                    this.numb--;
                    this.update();

                    this.dispatchEventWith(CommonEventType.CHANGED);
                }
                break;
        }
    }

    private inputHandler() {
        this.numb = Number(this.txt_count.text);
        this.update();

        this.dispatchEventWith(CommonEventType.CHANGED);
    }

    private update() {
        if (this.maxi != -1) {
            this.numb = this.numb > this.maxi ? this.maxi : this.numb;
        }

        this.numb = this.numb < this.mini ? this.mini : this.numb;

        this.txt_count.text = "" + this.numb;
    }

    public setScope(mini: number = 0, maxi: number = -1) {
        this.mini = mini;
        this.maxi = maxi;
        this.numb = mini;

        this.update();
    }

    public setMaxChars(value: number) {
        this.txt_count.maxChars = value;
    }

    public setNumb(value: number) {
        this.numb = value;
        this.update();
    }
}