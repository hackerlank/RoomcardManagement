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
    SceneType.login = "1001";
    SceneType.transfer = "1101";
    SceneType.follow = "2001";
    SceneType.follow_search = "2002";
    SceneType.follow_details = "2003";
    SceneType.agent = "4001";
    SceneType.agent_append = "4002";
    SceneType.agent_notice = "4003";
    SceneType.agent_lv1Record = "4004";
    SceneType.agent_lv2Record = "4005";
    SceneType.account = "3001";
    SceneType.account_recharge = "3002";
    SceneType.account_power = "3003";
    SceneType.account_room = "3004";
    SceneType.account_sale = "3005";
    SceneType.account_trans_out = "3006";
    SceneType.account_trans_in = "3007";
    SceneType.account_agent = "3008";
    SceneType.account_agent_record = "3009";
    SceneType.error = "9999";
    return SceneType;
}());
egret.registerClass(SceneType,'SceneType');
