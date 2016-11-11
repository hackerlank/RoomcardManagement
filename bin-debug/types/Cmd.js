/**
 * Cmd
 * @Author Ace.c
 * @Create 2016-10-27 18:19
 */
var Cmd = (function () {
    function Cmd() {
    }
    var d = __define,c=Cmd,p=c.prototype;
    //登录
    Cmd.Login = "/login/wxLogin.vo";
    //登录gm
    Cmd.Login_gm = "/login/admLogin.vo";
    //转账-对象查询
    Cmd.Transfer_Search = "/under/searchUser.vo";
    //转账
    Cmd.Transfer = "/under/transfer.vo";
    //转账-转出记录
    Cmd.Transfer_Record_Out = "/under/getShellRecord.vo";
    //转账-转入记录
    Cmd.Transfer_Record_In = "/under/getBuyRecord.vo";
    //下级信息
    Cmd.LowerUser_List = "/under/getUnderRole.vo";
    //下级贡献
    Cmd.LowerUser_Contribution = "/under/getContributeInfo.vo";
    //下级贡献领取
    Cmd.LowerUser_Contribution_Get = "/under/getContribute.vo";
    //购卡信息
    Cmd.BuyCard_List = "/under/getBuyCardInfo.vo";
    //购卡奖励领取
    Cmd.BuyCard_Reward_Get = "/under/getBuyCard.vo";
    //房间搜索
    Cmd.Room_Search = "/room/getInfo.vo";
    //房间解散
    Cmd.Room_Dismass = "/room/dismiss.vo";
    //代理-获取验证码
    Cmd.Agent_GetPhoneCode = "/admin/getVerCode.vo";
    //代理添加
    Cmd.Agent_Append = "/admin/addUser.vo";
    //查找代理
    Cmd.Agent_Search = "/admin/searchUser.vo";
    //代理充值
    Cmd.Agent_Recharge = "/admin/transfer.vo";
    //代理扣卡
    Cmd.Agent_Deduct = "/admin/reduceCard.vo";
    //代理开关
    Cmd.Agent_OffOn = "/admin/agentOnOff.vo";
    //操作记录
    Cmd.Agent_Record = "/admin/getOpRecord.vo";
    //充值订单
    Cmd.Recharge = "/pay/unifiedorder.vo";
    //充值同步
    Cmd.Recharge_Synchro = "/login/refreshOwns.vo";
    return Cmd;
}());
egret.registerClass(Cmd,'Cmd');
