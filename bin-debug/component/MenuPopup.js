/**
 * MenuPopup
 * @Author Ace.c
 * @Create 2016-10-26 18:08
 */
var MenuPopup = (function (_super) {
    __extends(MenuPopup, _super);
    function MenuPopup() {
        _super.call(this);
        this.status = Status.closed;
        this.selectedItems = [];
        this.selectedIndex = 0;
        this.skinName = "MenuPopupSkin";
    }
    var d = __define,c=MenuPopup,p=c.prototype;
    p.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.removeChild(this.popup);
        this.openOrClose();
        this.background.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
    };
    p.clickHandler = function (e) {
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
    };
    p.update = function (selectedItems) {
        this.selectedItems = selectedItems;
        this.selectedIndex = 0;
        this.label.text = "";
        this.icon.visible = false;
        this.group.removeChildren();
        if (selectedItems && selectedItems.length) {
            var groupName = String(FormulaUtils.getRandomBetween(0, 100000));
            var radioButton;
            for (var i = 0; i < selectedItems.length; i++) {
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
    };
    p.radioHandler = function (e) {
        var radio = e.target;
        this.selectedIndex = radio.value;
        this.status = Status.closed;
        this.openOrClose();
        this.updateView();
    };
    p.updateView = function () {
        this.icon.visible = true;
        this.label.text = "" + this.selectedItems[this.selectedIndex];
        this.dispatchEventWith(MenuPopup.CHANGE, false, this);
    };
    p.openOrClose = function () {
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
                    this.popup.parent.removeChild(this.popup);
                }
                break;
        }
    };
    p.getSelectedIndex = function () {
        return this.selectedIndex;
    };
    p.setSelectedValue = function (value) {
        for (var i = 0; i < this.selectedItems.length; i++) {
            if (value == this.selectedItems[i]) {
                this.selectedIndex = i;
            }
        }
        this.updateView();
    };
    p.getSelectedValue = function () {
        return this.selectedItems[this.selectedIndex];
    };
    MenuPopup.CHANGE = "CHANGE";
    return MenuPopup;
}(BaseSprite));
egret.registerClass(MenuPopup,'MenuPopup');
