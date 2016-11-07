/**
 * MenuDropDown
 * @Author Ace.c
 * @Create 2016-10-26 18:08
 */
class MenuDropDown extends BaseSprite {

    private dropdown: eui.Group;
    private labelDisplay: eui.Label;
    private iconDisplay: eui.Image;
    private listDisplay: eui.List;

    private isShowList: boolean = false;
    public selectedItems: string[] = [];
    public selectedIndex: number = 0;

    public constructor() {
        super();

        this.skinName = "MenuDropDownSkin";
    }

    public childrenCreated() {
        super.childrenCreated();

        this.removeChild(this.listDisplay);

        this.updateList();

        this.listDisplay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.listHandler, this);
        this.dropdown.addEventListener(egret.TouchEvent.TOUCH_TAP, this.dropdownHandler, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.stageHandler, this);
    }

    private listHandler(e: egret.TouchEvent) {
        e.stopImmediatePropagation();
        e.stopPropagation();
        this.selectedIndex = this.listDisplay.selectedIndex;
        this.labelDisplay.text = "" + this.selectedItems[this.selectedIndex];
        this.isShowList = false;
        this.updateList();
    }

    private dropdownHandler(e: egret.TouchEvent) {
        e.stopImmediatePropagation();
        e.stopPropagation();
        this.isShowList = !this.isShowList;
        this.updateList();
    }

    private stageHandler(e: egret.TouchEvent) {
        this.isShowList = false;
        this.updateList();
    }

    public update(list: string[]) {
        this.selectedItems = list;

        if (list && list.length) {
            this.listDisplay.dataProvider = new eui.ArrayCollection(this.selectedItems);

            this.selectedIndex = 0;
            this.labelDisplay.text = "" + this.selectedItems[this.selectedIndex];
            this.iconDisplay.visible = true;
        }
        else {
            this.listDisplay.removeChildren();
            this.labelDisplay.text = "";
            this.iconDisplay.visible = false;
        }
    }

    private updateList() {
        if (this.isShowList) {
            this.iconDisplay.source = "img_arrow_up2";
            this.listDisplay.x = this.localToGlobal(this.dropdown.x, this.dropdown.y).x;
            this.listDisplay.y = this.localToGlobal(this.dropdown.x, this.dropdown.y).y + this.dropdown.height;
            this.listDisplay.width = this.dropdown.width;
            this.stage.addChild(this.listDisplay);
        }
        else {
            this.iconDisplay.source = "img_arrow_down2";
            if (this.listDisplay.parent && this.listDisplay.parent.contains(this.listDisplay)) {
                this.listDisplay.parent.removeChild(this.listDisplay)
            }
        }
    }

    public get selectedValue(): string {
        return this.selectedItems[this.selectedIndex];
    }
}