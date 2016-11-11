/**
 * MsgManager
 * @Author Ace.c
 * @Create 2016-10-30 12:16
 */
var MsgManager = (function (_super) {
    __extends(MsgManager, _super);
    function MsgManager() {
        _super.call(this);
        this.initManager();
    }
    var d = __define,c=MsgManager,p=c.prototype;
    p.initManager = function () {
        _super.prototype.initManager.call(this);
        this.login = new LoginMsg();
        this.transfer = new TransferMsg();
        this.lowerUser = new LowerUserMsg();
        this.agent = new AgentMsg();
        this.room = new RoomMsg();
        this.buyCard = new BuyCardMsg();
        this.recharge = new RechargeMsg();
    };
    return MsgManager;
}(BaseManager));
egret.registerClass(MsgManager,'MsgManager');
