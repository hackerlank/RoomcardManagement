/**
 * MenuDropDown
 * @Author Ace.c
 * @Create 2016-10-26 18:08
 */
class MenuDropDown extends BaseSprite {

    private button: eui.Group;
    private label: eui.Label;
    private icon: eui.Image;
    private list: eui.List;

    private isShowList: boolean = false;
    public selectedItems: string[] = [];
    public selectedIndex: number = 0;

    public constructor() {
        super();

        this.skinName = "MenuDropDownSkin";
    }

    public childrenCreated() {
        super.childrenCreated();

        this.removeChild(this.list);

        this.updateList();

        this.list.addEventListener(egret.TouchEvent.TOUCH_TAP, this.listHandler, this);
        this.button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.dropdownHandler, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.stageHandler, this);
    }

    private listHandler(e: egret.TouchEvent) {
        e.stopImmediatePropagation();
        e.stopPropagation();
        this.selectedIndex = this.list.selectedIndex;
        this.label.text = "" + this.selectedItems[this.selectedIndex];
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
            this.list.dataProvider = new eui.ArrayCollection(this.selectedItems);

            this.selectedIndex = 0;
            this.label.text = "" + this.selectedItems[this.selectedIndex];
            this.icon.visible = true;
        }
        else {
            this.list.removeChildren();
            this.label.text = "";
            this.icon.visible = false;
        }
    }

    private updateList() {
        if (this.isShowList) {
            this.icon.source = "img_arrow_up2";
            this.list.x = this.localToGlobal(this.button.x, this.button.y).x;
            this.list.y = this.localToGlobal(this.button.x, this.button.y).y + this.button.height;
            this.list.width = this.button.width;
            this.stage.addChild(this.list);
        }
        else {
            this.icon.source = "img_arrow_down2";
            if (this.list.parent && this.list.parent.contains(this.list)) {
                this.list.parent.removeChild(this.list)
            }
        }
    }

    public get selectedValue(): string {
        return this.selectedItems[this.selectedIndex];
    }
}