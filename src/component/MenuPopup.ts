/**
 * MenuPopup
 * @Author Ace.c
 * @Create 2016-10-26 18:08
 */
class MenuPopup extends BaseSprite {

    static CHANGE: string = "CHANGE";

    private button: eui.Group;
    private label: eui.Label;
    private icon: eui.Image;
    private popup: eui.Group;
    private background: eui.Rect;
    private scroller: eui.Scroller;
    private group: eui.Group;

    private status: Status = Status.closed;

    private selectedItems: string[] = [];
    private selectedIndex: number = 0;

    public constructor() {
        super();

        this.skinName = "MenuPopupSkin";
    }

    public childrenCreated() {
        super.childrenCreated();

        this.removeChild(this.popup);

        this.openOrClose();

        this.background.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
    }

    private clickHandler(e: egret.TouchEvent) {
        switch (e.currentTarget) {
            case this.button:
                this.status = this.status == Status.opened ? Status.closed : Status.opened;
                this.openOrClose();
                break;
            case this.background:
                this.status = Status.closed;
                this.openOrClose();
                break;
        }
    }

    public update(selectedItems: string[]) {
        this.selectedItems = selectedItems;
        this.selectedIndex = 0;
        this.label.text = "";
        this.icon.visible = false;
        this.group.removeChildren();

        if (selectedItems && selectedItems.length) {
            var groupName: string = String(FormulaUtils.getRandomBetween(0, 100000));
            var radioButton: eui.RadioButton;
            for (var i: number = 0; i < selectedItems.length; i++) {
                radioButton = new eui.RadioButton();
                radioButton.groupName = groupName;
                radioButton.value = i;
                radioButton.label = selectedItems[i];
                this.group.addChild(radioButton);

                radioButton.addEventListener(egret.Event.CHANGE, this.radioHandler, this);
            }

            this.scroller.viewport.scrollV = 0;
            this.scroller.validateNow();

            this.updateView();
        }
    }

    private radioHandler(e: egret.Event) {
        var radio: eui.RadioButton = e.target;
        this.selectedIndex = radio.value;
        this.status = Status.closed;
        this.openOrClose();
        this.updateView();
    }

    private updateView() {
        this.icon.visible = true;
        this.label.text = "" + this.selectedItems[this.selectedIndex];

        this.dispatchEventWith(MenuPopup.CHANGE, false, this);
    }

    private openOrClose() {
        switch (this.status) {
            case Status.opened:
                this.icon.source = "img_arrow_up2";
                // this.popup.left = this.popup.right = this.popup.top = this.popup.bottom = 0;
                this.popup.x = 0;
                this.popup.y = 0;
                this.popup.width = core.stage.stageWidth;
                this.popup.height = core.stage.stageHeight;
                this.stage && this.stage.addChild(this.popup);
                break;
            case Status.closed:
                this.icon.source = "img_arrow_down2";
                if (this.popup.parent && this.popup.parent.contains(this.popup)) {
                    this.popup.parent.removeChild(this.popup)
                }
                break;
        }
    }

    public getSelectedIndex(): number {
        return this.selectedIndex;
    }

    public setSelectedValue(value: string) {
        for (var i: number = 0; i < this.selectedItems.length; i++) {
            if (value == this.selectedItems[i]) {
                this.selectedIndex = i;
            }
        }
        this.updateView();
    }

    public getSelectedValue(): string {
        return this.selectedItems[this.selectedIndex];
    }
}