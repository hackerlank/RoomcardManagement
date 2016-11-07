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
    //转账房卡
    Cmd.Transfer = "/under/transfer.vo";
    //转账信息
    Cmd.Transfer_Record_List = "/under/getUnderRecord.vo";
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
    //添加代理人
    Cmd.Add_Agent = "/admin/addUser.vo";
    //充值订单
    Cmd.Recharge = "/pay/unifiedorder.vo";
    //充值同步
    Cmd.Recharge_Synchro = "/login/refreshOwns.vo";
    return Cmd;
}());
egret.registerClass(Cmd,'Cmd');
