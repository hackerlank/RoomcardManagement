/**
 * NumberAdder
 * @Author Ace.c
 * @Create 2016-10-30 14:10
 */
var NumberAdder = (function (_super) {
    __extends(NumberAdder, _super);
    function NumberAdder() {
        _super.call(this);
        this.mini = 0;
        this.maxi = -1;
        this.numb = 0;
        this.skinName = "skins.NumberAdderSkin";
    }
    var d = __define,c=NumberAdder,p=c.prototype;
    p.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.txt_count.restrict = "0-9";
        this.btn_cut.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_add.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.txt_count.addEventListener(egret.Event.CHANGE, this.inputHandler, this);
    };
    p.clickHandler = function (e) {
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
    };
    p.inputHandler = function () {
        this.numb = Number(this.txt_count.text);
        this.update();
        this.dispatchEventWith(CommonEventType.CHANGED);
    };
    p.update = function () {
        if (this.maxi != -1) {
            this.numb = this.numb > this.maxi ? this.maxi : this.numb;
        }
        this.numb = this.numb < this.mini ? this.mini : this.numb;
        this.txt_count.text = "" + this.numb;
    };
    p.setScope = function (mini, maxi) {
        if (mini === void 0) { mini = 0; }
        if (maxi === void 0) { maxi = -1; }
        this.mini = mini;
        this.maxi = maxi;
        this.numb = mini;
        this.update();
    };
    p.setMaxChars = function (value) {
        this.txt_count.maxChars = value;
    };
    p.setNumb = function (value) {
        this.numb = value;
        this.update();
    };
    return NumberAdder;
}(BaseSprite));
egret.registerClass(NumberAdder,'NumberAdder');
