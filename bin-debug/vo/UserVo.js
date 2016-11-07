/**
 * UserVo
 * @Author Ace.c
 * @Create 2016-10-26 10:25
 */
var UserVo = (function (_super) {
    __extends(UserVo, _super);
    function UserVo() {
        _super.call(this);
        this.code = 0;
        this.sid = 0;
        this.unionid = 0;
        //昵称
        this.nick = "";
        //头像地址
        this.pic = "";
        //拥有房卡数量
        this.cdnum = 0;
        //权限
        this.pow = 0;
        //购卡月份标识
        this.cardMonth = 0;
        //每月购卡数量
        this.cardBuy = 0;
        //每月购卡奖励
        this.cardReward = 0;
        //购卡月份标识
        this.juniorMonth = 0;
        //每月购卡奖励
        this.juniorReward = 0;
        this.gameMap = {};
    }
    var d = __define,c=UserVo,p=c.prototype;
    return UserVo;
}(BaseVo));
egret.registerClass(UserVo,'UserVo');
