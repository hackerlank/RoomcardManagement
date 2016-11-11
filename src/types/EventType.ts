/**
 * EventType
 * @Author Ace.c
 * @Create 2016-10-27 13:47
 */
class EventType {

    //------------------用户数据--------------------
    //用户数据-信息
    static User_Info: string = "User_Info";

    //------------------转账--------------------
    //转账-ID查询结果
    static Transfer_Search: string = "Transfer_Search";
    //转账-成功
    static Transfer_Success:string = "Transfer_Success";
    //转账-转出记录
    static Transfer_Record_Out: string = "Transfer_Record_Out";
    //转账-转入记录
    static Transfer_Record_In: string = "Transfer_Record_In";

    //------------------下级用户--------------------
    //下级用户-列表
    static LowerUser_List: string = "LowerUser_List";
    //下级用户-信息
    static LowerUser_Info: string = "LowerUser_Info";
    //下级用户-被选中用户
    static LowerUser_Selected: string = "LowerUser_Selected";
    //下级用户-贡献数据
    static LowerUser_Contribution: string = "LowerUser_Contribution";
    //下级用户-贡献数据列表
    static LowerUser_Contribution_List: string = "LowerUser_Contribution_List";

    //------------------房间管理--------------------
    //房间管理-用户列表
    static Room_User_List: string = "Room_User_List";
    //房间管理-解散房间
    static Room_Dismass: string = "Room_Dismass";

    //------------------购卡奖励--------------------
    //购卡奖励-信息
    static BuyCard_Info: string = "BuyCard_Info";

    //------------------代理管理--------------------
    //代理管理-成功添加
    static Agent_Success: string = "Agent_Success";
    //代理管理-更新数据
    static Agent_Update: string = "Agent_Recharge";
    //代理管理-记录
    static Agent_Record: string = "Agent_Record";

}