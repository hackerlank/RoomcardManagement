/**
 * EventType
 * @Author Ace.c
 * @Create 2016-10-27 13:47
 */
var EventType = (function () {
    function EventType() {
    }
    var d = __define,c=EventType,p=c.prototype;
    //------------------个人信息--------------------
    //信息
    EventType.User_Info = "User_Info";
    //用户转账列表
    EventType.User_Record_List = "User_Record_List";
    //------------------下线用户--------------------
    //更新列表
    EventType.Follow_Update_List = "Follow_Update_List";
    //更新信息
    EventType.Follow_Update_Info = "Follow_Update_Info";
    //选择一个下线用户
    EventType.Follow_Selected = "Follow_Selected";
    //------------------房间管理--------------------
    //更新用户
    EventType.Room_Update_Users = "Room_Update_Users";
    //解散
    EventType.Room_Dismass = "Room_Dismass";
    //------------------下级贡献--------------------
    //下级贡献数据
    EventType.Junior_Info = "Junior_Info";
    //------------------购卡奖励--------------------
    //信息
    EventType.BuyCard_Info = "BuyCard_Info";
    return EventType;
}());
egret.registerClass(EventType,'EventType');
