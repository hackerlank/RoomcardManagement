/**
 * SceneType
 * @Author Ace.c
 * @Create 2016-10-25 19:57
 */
var SceneType = (function () {
    function SceneType() {
    }
    var d = __define,c=SceneType,p=c.prototype;
    SceneType.welcom = "1000";
    SceneType.transfer = "1001";
    SceneType.follow = "2001";
    SceneType.follow_search = "2002";
    SceneType.follow_details = "2003";
    SceneType.account = "3001";
    SceneType.account_record = "3002";
    SceneType.account_reward = "3003";
    SceneType.account_junior = "3004";
    SceneType.account_room = "3005";
    SceneType.account_recharge = "3006";
    SceneType.account_power = "3007";
    SceneType.error = "9999";
    return SceneType;
}());
egret.registerClass(SceneType,'SceneType');
