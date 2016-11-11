/**
 * EventType
 * @Author Ace.c
 * @Create 2016-10-27 13:47
 */
var EventType = (function () {
    function EventType() {
    }
    var d = __define,c=EventType,p=c.prototype;
    //------------------用户数据--------------------
    //用户数据-信息
    EventType.User_Info = "User_Info";
    //------------------转账--------------------
    //转账-ID查询结果
    EventType.Transfer_Search = "Transfer_Search";
    //转账-成功
    EventType.Transfer_Success = "Transfer_Success";
    //转账-转出记录
    EventType.Transfer_Record_Out = "Transfer_Record_Out";
    //转账-转入记录
    EventType.Transfer_Record_In = "Transfer_Record_In";
    //------------------下级用户--------------------
    //下级用户-列表
    EventType.LowerUser_List = "LowerUser_List";
    //下级用户-信息
    EventType.LowerUser_Info = "LowerUser_Info";
    //下级用户-被选中用户
    EventType.LowerUser_Selected = "LowerUser_Selected";
    //下级用户-贡献数据
    EventType.LowerUser_Contribution = "LowerUser_Contribution";
    //下级用户-贡献数据列表
    EventType.LowerUser_Contribution_List = "LowerUser_Contribution_List";
    //------------------房间管理--------------------
    //房间管理-用户列表
    EventType.Room_User_List = "Room_User_List";
    //房间管理-解散房间
    EventType.Room_Dismass = "Room_Dismass";
    //------------------购卡奖励--------------------
    //购卡奖励-信息
    EventType.BuyCard_Info = "BuyCard_Info";
    //------------------代理管理--------------------
    //代理管理-成功添加
    EventType.Agent_Success = "Agent_Success";
    //代理管理-更新数据
    EventType.Agent_Update = "Agent_Recharge";
    //代理管理-记录
    EventType.Agent_Record = "Agent_Record";
    return EventType;
}());
egret.registerClass(EventType,'EventType');
