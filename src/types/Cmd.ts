/**
 * Cmd
 * @Author Ace.c
 * @Create 2016-10-27 18:19
 */
class Cmd {

    //登录
    public static Login: string = "/login/wxLogin.vo";

    //转账房卡
    public static Transfer: string = "/under/transfer.vo";
    //转账信息
    public static Transfer_Record_List: string = "/under/getUnderRecord.vo";

    //下级信息
    public static LowerUser_List: string = "/under/getUnderRole.vo";
    //下级贡献
    public static LowerUser_Contribution: string = "/under/getContributeInfo.vo";
    //下级贡献领取
    public static LowerUser_Contribution_Get: string = "/under/getContribute.vo";

    //购卡信息
    public static BuyCard_List: string = "/under/getBuyCardInfo.vo";
    //购卡奖励领取
    public static BuyCard_Reward_Get: string = "/under/getBuyCard.vo";

    //房间搜索
    public static Room_Search: string = "/room/getInfo.vo";
    //房间解散
    public static Room_Dismass: string = "/room/dismiss.vo";

    //添加代理人
    public static Add_Agent: string = "/admin/addUser.vo";

    //充值订单
    public static Recharge: string = "/pay/unifiedorder.vo";
    //充值同步
    public static Recharge_Synchro: string = "/login/refreshOwns.vo";

}