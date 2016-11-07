/**
 * MsgManager
 * @Author Ace.c
 * @Create 2016-10-30 12:16
 */
class MsgManager extends BaseManager {

    public login: LoginMessage;
    public transfer: TransferMessage;
    public follow: FollowMessage;
    public power: PowerMessage;
    public room: RoomMessage;
    public junior: JuniorMessage;
    public buyCard: BuyCardMessage;
    public recharge: RechargeMessage;

    public constructor() {
        super();

        this.initManager();
    }

    public initManager() {
        super.initManager();

        this.login = new LoginMessage();
        this.transfer = new TransferMessage();
        this.follow = new FollowMessage();
        this.power = new PowerMessage();
        this.room = new RoomMessage();
        this.junior = new JuniorMessage();
        this.buyCard = new BuyCardMessage();
        this.recharge = new RechargeMessage();
    }
}