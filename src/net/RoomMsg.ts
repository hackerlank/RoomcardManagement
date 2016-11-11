/**
 * RoomMsg
 * @Author Ace.c
 * @Create 2016-10-30 11:47
 */
class RoomMsg extends BaseMsg {

    public constructor() {
        super();
    }

    /**
     * 房间查询
     */
    public sendRoomSearch(id: string, gid) {
        var data: any = {};
        data.s = core.sessionid;
        data.r = id;
        data.g = gid;

        this.gameManager.httpManager.send(core.serverUrl + Cmd.Room_Search, data, this.readRoomSearch, this);
    }

    /**
     * {"code":0,"roles":[{"nick":"sakula","uid":"10009","code":"test1009","channel":"other","pic":"http://192.168.2.32"}]}
     * @param msg
     */
    public readRoomSearch(msg: any) {
        if (msg.code != 0)return;

        var list: any = msg.roles;
        if (list) {
            var roomUserMap = this.gameManager.dataManager.roomUserMap;

            var role: any;
            var followVo: LowerUserVo;
            for (var i: number = 0; i < list.length; i++) {
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
    }

    /**
     * 房间解散
     */
    public sendRoomDismass(id: string, gid) {
        var data: any = {};
        data.s = core.sessionid;
        data.r = id;
        data.g = gid;

        this.gameManager.httpManager.send(core.serverUrl + Cmd.Room_Dismass, data, this.readRoomDismass, this);
    }

    /**
     * {"code":0}
     * @param msg
     */
    public readRoomDismass(msg: any) {
        if (msg.code != 0)return;

        this.gameManager.dataManager.roomUserMap = {};

        this.gameManager.dispatchEvent(EventType.Room_Dismass);
    }
}