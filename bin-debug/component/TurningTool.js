/**
 * TurningTool
 * @Author Ace.c
 * @Create 2016-10-30 14:10
 */
var TurningTool = (function (_super) {
    __extends(TurningTool, _super);
    function TurningTool() {
        _super.call(this);
        this.mini = 1;
        this.maxi = 1;
        this.page = 1;
        this.skinName = "skins.TurningToolSkin";
    }
    var d = __define,c=TurningTool,p=c.prototype;
    p.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.leftBtnDisplay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.rightBtnDisplay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.labelDisplay.addEventListener(egret.Event.CHANGE, this.inputHandler, this);
    };
    p.clickHandler = function (e) {
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
    };
    p.inputHandler = function () {
        this.page = Number(this.labelDisplay.text);
        this.update();
        this.dispatchEventWith(CommonEventType.CHANGED);
    };
    p.update = function () {
        this.page = this.page < this.mini ? this.mini : this.page;
        this.page = this.page > this.maxi ? this.maxi : this.page;
        this.labelDisplay.text = "" + this.page + "/" + this.maxi;
    };
    p.setScope = function (mini, maxi) {
        if (mini === void 0) { mini = 0; }
        if (maxi === void 0) { maxi = 1; }
        maxi = maxi ? maxi : 1;
        maxi = maxi < mini ? mini : maxi;
        this.mini = mini;
        this.maxi = maxi;
        this.update();
    };
    p.setMaxChars = function (value) {
        this.labelDisplay.maxChars = value;
    };
    return TurningTool;
}(BaseSprite));
egret.registerClass(TurningTool,'TurningTool');
