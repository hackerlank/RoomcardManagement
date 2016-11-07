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
        this.login = new LoginMessage();
        this.transfer = new TransferMessage();
        this.follow = new FollowMessage();
        this.power = new PowerMessage();
        this.room = new RoomMessage();
        this.junior = new JuniorMessage();
        this.buyCard = new BuyCardMessage();
        this.recharge = new RechargeMessage();
    };
    return MsgManager;
}(BaseManager));
egret.registerClass(MsgManager,'MsgManager');
