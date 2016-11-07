/**
 * FollowMessage
 * @Author Ace.c
 * @Create 2016-10-30 11:27
 */
var FollowMessage = (function (_super) {
    __extends(FollowMessage, _super);
    function FollowMessage() {
        _super.call(this);
        this.followLength = 0;
        this.followMap = {};
    }
    var d = __define,c=FollowMessage,p=c.prototype;
    d(p, "followList"
        ,function () {
            var list = [];
            for (var uid in this.followMap) {
                list.push(this.followMap[uid]);
            }
            list.sort(function (a, b) {
                if (a.zong > b.zong) {
                    return -1;
                }
                else {
                    return 1;
                }
            });
            return list;
        }
    );
    /**
     * 下线人列表
     */
    p.sendFollowList = function (page, count) {
        if (page === void 0) { page = 0; }
        if (count === void 0) { count = 20; }
        var data = {};
        data.s = core.sessionid;
        data.p = page;
        data.n = count;
        this.gameManager.httpManager.send(core.serverUrl + Cmd.Follow_List, data, this.readFollowList, this);
    };
    /**
     * {"code":0,"roles":[{"nick":"sakula","uid":"10004","cur":0,"zong":0,"pic":"http://192.168.2.32"}]}
     * @param msg
     */
    p.readFollowList = function (msg) {
        if (msg.code != 0)
            return;
        if (msg.total) {
            this.followLength = msg.total;
        }
        var list = msg.roles;
        if (list) {
            var follows = [];
            var role;
            var followVo;
            for (var i = 0; i < list.length; i++) {
                role = list[i];
                if (this.followMap.hasOwnProperty(role.uid)) {
                    followVo = this.followMap[role.uid];
                }
                else {
                    followVo = new FollowVo();
                    this.followMap[role.uid] = followVo;
                }
                followVo.update(role);
                //TODO  测试专用
                // followVo.zong = FormulaUtils.getRandomBetween(0, 1000);
                follows.push(followVo);
            }
            follows.sort(function (a, b) {
                if (a.zong > b.zong) {
                    return -1;
                }
                else {
                    return 1;
                }
            });
            this.gameManager.dispatchEvent(EventType.Follow_Update_List, follows);
        }
    };
    return FollowMessage;
}(BaseMessage));
egret.registerClass(FollowMessage,'FollowMessage');
