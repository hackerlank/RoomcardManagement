/**
 * MenuDropDown
 * @Author Ace.c
 * @Create 2016-10-26 18:08
 */
var MenuDropDown = (function (_super) {
    __extends(MenuDropDown, _super);
    function MenuDropDown() {
        _super.call(this);
        this.isShowList = false;
        this.selectedItems = [];
        this.selectedIndex = 0;
        this.skinName = "MenuDropDownSkin";
    }
    var d = __define,c=MenuDropDown,p=c.prototype;
    p.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.removeChild(this.listDisplay);
        this.updateList();
        this.listDisplay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.listHandler, this);
        this.dropdown.addEventListener(egret.TouchEvent.TOUCH_TAP, this.dropdownHandler, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.stageHandler, this);
    };
    p.listHandler = function (e) {
        e.stopImmediatePropagation();
        e.stopPropagation();
        this.selectedIndex = this.listDisplay.selectedIndex;
        this.labelDisplay.text = "" + this.selectedItems[this.selectedIndex];
        this.isShowList = false;
        this.updateList();
    };
    p.dropdownHandler = function (e) {
        e.stopImmediatePropagation();
        e.stopPropagation();
        this.isShowList = !this.isShowList;
        this.updateList();
    };
    p.stageHandler = function (e) {
        this.isShowList = false;
        this.updateList();
    };
    p.update = function (list) {
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
    };
    p.updateList = function () {
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
                this.listDisplay.parent.removeChild(this.listDisplay);
            }
        }
    };
    d(p, "selectedValue"
        ,function () {
            return this.selectedItems[this.selectedIndex];
        }
    );
    return MenuDropDown;
}(BaseSprite));
egret.registerClass(MenuDropDown,'MenuDropDown');
