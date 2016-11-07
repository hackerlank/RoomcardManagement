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

    //下线列表
    public static Follow_List: string = "/under/getUnderRole.vo";
    //下线详细信息
    public static Follow_Info: string = "/under/getUnderRecord.vo";

    //购卡信息
    public static Card_Info: string = "/under/getBuyCardInfo.vo";
    //购卡奖励领取
    public static Card_GetReward: string = "/under/getBuyCard.vo";

    //下级贡献信息
    public static Junior_Info: string = "/under/getContributeInfo.vo";
    //下级贡献领取
    public static Junior_GetReward: string = "/under/getContribute.vo";

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