/**
 * EventType
 * @Author Ace.c
 * @Create 2016-10-27 13:47
 */
var EventType = (function () {
    function EventType() {
    }
    var d = __define,c=EventType,p=c.prototype;
    //------------------用户信息--------------------
    //用户信息
    EventType.User_Info = "User_Info";
    //------------------转账--------------------
    //转账列表更新
    EventType.Transfer_List = "Transfer_List";
    //------------------下级用户--------------------
    //下级用户列表
    EventType.LowerUser_List = "LowerUser_List";
    //下级用户信息
    EventType.LowerUser_Info = "LowerUser_Info";
    //下级用户被选中
    EventType.LowerUser_Selected = "LowerUser_Selected";
    //下级用户贡献数据
    EventType.LowerUser_Contribution = "LowerUser_Contribution";
    //------------------房间管理--------------------
    //房间用户列表
    EventType.Room_User_List = "Room_User_List";
    //房间解散
    EventType.Room_Dismass = "Room_Dismass";
    //------------------购卡奖励--------------------
    //购卡信息
    EventType.BuyCard_Info = "BuyCard_Info";
    return EventType;
}());
egret.registerClass(EventType,'EventType');
