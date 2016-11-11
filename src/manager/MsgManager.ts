/**
 * MsgManager
 * @Author Ace.c
 * @Create 2016-10-30 12:16
 */
class MsgManager extends BaseManager {

    public login: LoginMsg;
    public transfer: TransferMsg;
    public lowerUser: LowerUserMsg;
    public recharge: RechargeMsg;
    public agent: AgentMsg;
    public room: RoomMsg;
    public buyCard: BuyCardMsg;

    public constructor() {
        super();

        this.initManager();
    }

    public initManager() {
        super.initManager();

        this.login = new LoginMsg();
        this.transfer = new TransferMsg();
        this.lowerUser = new LowerUserMsg();
        this.agent = new AgentMsg();
        this.room = new RoomMsg();
        this.buyCard = new BuyCardMsg();
        this.recharge = new RechargeMsg();
    }
}