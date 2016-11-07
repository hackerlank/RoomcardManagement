/**
 * EventType
 * @Author Ace.c
 * @Create 2016-10-27 13:47
 */
class EventType {

    //------------------用户信息--------------------
    //用户信息
    static User_Info: string = "User_Info";

    //------------------转账--------------------
    //转账列表更新
    static Transfer_List: string = "Transfer_List";

    //------------------下级用户--------------------
    //下级用户列表
    static LowerUser_List: string = "LowerUser_List";
    //下级用户信息
    static LowerUser_Info: string = "LowerUser_Info";
    //下级用户被选中
    static LowerUser_Selected: string = "LowerUser_Selected";
    //下级用户贡献数据
    static LowerUser_Contribution: string = "LowerUser_Contribution";

    //------------------房间管理--------------------
    //房间用户列表
    static Room_User_List: string = "Room_User_List";
    //房间解散
    static Room_Dismass: string = "Room_Dismass";

    //------------------购卡奖励--------------------
    //购卡信息
    static BuyCard_Info: string = "BuyCard_Info";

}