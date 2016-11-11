/**
 * Cmd
 * @Author Ace.c
 * @Create 2016-10-27 18:19
 */
class Cmd {

    //登录
    static Login: string = "/login/wxLogin.vo";
    //登录gm
    static Login_gm: string = "/login/admLogin.vo";

    //转账-对象查询
    static Transfer_Search: string = "/under/searchUser.vo";
    //转账
    static Transfer: string = "/under/transfer.vo";
    //转账-转出记录
    static Transfer_Record_Out: string = "/under/getShellRecord.vo";
    //转账-转入记录
    static Transfer_Record_In: string = "/under/getBuyRecord.vo";

    //下级信息
    static LowerUser_List: string = "/under/getUnderRole.vo";
    //下级贡献
    static LowerUser_Contribution: string = "/under/getContributeInfo.vo";
    //下级贡献领取
    static LowerUser_Contribution_Get: string = "/under/getContribute.vo";

    //购卡信息
    static BuyCard_List: string = "/under/getBuyCardInfo.vo";
    //购卡奖励领取
    static BuyCard_Reward_Get: string = "/under/getBuyCard.vo";

    //房间搜索
    static Room_Search: string = "/room/getInfo.vo";
    //房间解散
    static Room_Dismass: string = "/room/dismiss.vo";

    //代理-获取验证码
    static Agent_GetPhoneCode: string = "/admin/getVerCode.vo";
    //代理添加
    static Agent_Append: string = "/admin/addUser.vo";
    //查找代理
    static Agent_Search: string = "/admin/searchUser.vo";
    //代理充值
    static Agent_Recharge: string = "/admin/transfer.vo";
    //代理扣卡
    static Agent_Deduct: string = "/admin/reduceCard.vo";
    //代理开关
    static Agent_OffOn: string = "/admin/agentOnOff.vo";
    //操作记录
    static Agent_Record: string = "/admin/getOpRecord.vo";

    //充值订单
    static Recharge: string = "/pay/unifiedorder.vo";
    //充值同步
    static Recharge_Synchro: string = "/login/refreshOwns.vo";


}