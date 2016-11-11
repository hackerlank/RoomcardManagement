/**
 * TimerManager
 * @Author Ace.c
 * @Create 2016-11-08 16:52
 */
var TimerManager = (function (_super) {
    __extends(TimerManager, _super);
    function TimerManager() {
        _super.call(this);
        this.timer = new egret.Timer(1000);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimerHandler, this);
        this.timer.start();
    }
    var d = __define,c=TimerManager,p=c.prototype;
    TimerManager.getInstance = function () {
        if (!this._instance) {
            this._instance = new TimerManager();
        }
        return this._instance;
    };
    p.onTimerHandler = function () {
        this.dispatchEvent(TimerManager.Second);
    };
    TimerManager.Second = "Second";
    return TimerManager;
}(BaseManager));
egret.registerClass(TimerManager,'TimerManager');
