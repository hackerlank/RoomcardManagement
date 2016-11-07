/**
 * RoomMessage
 * @Author Ace.c
 * @Create 2016-10-30 11:47
 */
var RoomMessage = (function (_super) {
    __extends(RoomMessage, _super);
    function RoomMessage() {
        _super.call(this);
    }
    var d = __define,c=RoomMessage,p=c.prototype;
    d(p, "roomUsers"
        //用户列表
        ,function () {
            var list = [];
            for (var uid in this.roomUserMap) {
                list.push(this.roomUserMap[uid]);
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
     * 房间查询
     */
    p.sendRoomSearch = function (id) {
        var data = {};
        data.s = core.sessionid;
        data.r = id;
        this.gameManager.httpManager.send(core.serverUrl + Cmd.Room_Search, data, this.readRoomSearch, this);
    };
    /**
     * {"code":0,"roles":[{"nick":"sakula","uid":"10009","code":"test1009","channel":"other","pic":"http://192.168.2.32"}]}
     * @param msg
     */
    p.readRoomSearch = function (msg) {
        if (msg.code != 0)
            return;
        var list = msg.roles;
        if (list) {
            this.roomUserMap = {};
            var role;
            var followVo;
            for (var i = 0; i < list.length; i++) {
                role = list[i];
                if (this.roomUserMap.hasOwnProperty(role.uid)) {
                    followVo = this.roomUserMap[role.uid];
                }
                else {
                    followVo = new FollowVo();
                    this.roomUserMap[role.uid] = followVo;
                }
                followVo.update(role);
            }
            this.gameManager.dispatchEvent(EventType.Room_Update_Users);
        }
    };
    /**
     * 房间解散
     */
    p.sendRoomDismass = function (id) {
        var data = {};
        data.s = core.sessionid;
        data.r = id;
        this.gameManager.httpManager.send(core.serverUrl + Cmd.Room_Dismass, data, this.readRoomDismass, this);
    };
    /**
     * {"code":0}
     * @param msg
     */
    p.readRoomDismass = function (msg) {
        if (msg.code != 0)
            return;
        this.roomUserMap = {};
        this.gameManager.dispatchEvent(EventType.Room_Dismass);
    };
    return RoomMessage;
}(BaseMessage));
egret.registerClass(RoomMessage,'RoomMessage');
