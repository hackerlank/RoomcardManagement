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
        this.removeChild(this.list);
        this.updateList();
        this.list.addEventListener(egret.TouchEvent.TOUCH_TAP, this.listHandler, this);
        this.button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.dropdownHandler, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.stageHandler, this);
    };
    p.listHandler = function (e) {
        e.stopImmediatePropagation();
        e.stopPropagation();
        this.selectedIndex = this.list.selectedIndex;
        this.label.text = "" + this.selectedItems[this.selectedIndex];
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
    };
    p.updateList = function () {
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
                this.list.parent.removeChild(this.list);
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
