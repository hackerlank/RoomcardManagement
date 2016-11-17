/**
 * RoomMsg
 * @Author Ace.c
 * @Create 2016-10-30 11:47
 */
var RoomMsg = (function (_super) {
    __extends(RoomMsg, _super);
    function RoomMsg() {
        _super.call(this);
    }
    var d = __define,c=RoomMsg,p=c.prototype;
    /**
     * 房间查询
     */
    p.sendRoomSearch = function (id, gid) {
        var data = {};
        data.s = core.sessionid;
        data.r = id;
        data.g = gid;
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
            var roomUserMap = this.gameManager.dataManager.roomUserMap;
            var role;
            var followVo;
            for (var i = 0; i < list.length; i++) {
                role = list[i];
                if (roomUserMap.hasOwnProperty(role.uid)) {
                    followVo = roomUserMap[role.uid];
                }
                else {
                    followVo = new LowerUserVo();
                    roomUserMap[role.uid] = followVo;
                }
                followVo.update(role);
            }
            this.gameManager.dispatchEvent(EventType.Room_User_List);
        }
    };
    /**
     * 房间解散
     */
    p.sendRoomDismass = function (id, gid) {
        var data = {};
        data.s = core.sessionid;
        data.r = id;
        data.g = gid;
        this.gameManager.httpManager.send(core.serverUrl + Cmd.Room_Dismass, data, this.readRoomDismass, this);
    };
    /**
     * {"code":0}
     * @param msg
     */
    p.readRoomDismass = function (msg) {
        if (msg.code != 0)
            return;
        this.gameManager.alertManager.open(AlertType.Normal, "解散房间成功");
        this.gameManager.dataManager.roomUserMap = {};
        this.gameManager.dispatchEvent(EventType.Room_Dismass);
    };
    return RoomMsg;
}(BaseMsg));
egret.registerClass(RoomMsg,'RoomMsg');
