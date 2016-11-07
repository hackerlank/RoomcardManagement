/**
 * RoomMessage
 * @Author Ace.c
 * @Create 2016-10-30 11:47
 */
class RoomMessage extends BaseMessage {

    //房间用户
    public roomUserMap: any;
    //用户列表
    public get roomUsers(): FollowVo[] {
        var list: FollowVo[] = [];

        for (var uid in this.roomUserMap) {
            list.push(this.roomUserMap[uid]);
        }

        list.sort(function (a: FollowVo, b: FollowVo) {
            if (a.zong > b.zong) {
                return -1;
            }
            else {
                return 1;
            }
        });

        return list;
    }

    public constructor() {
        super();
    }

    /**
     * 房间查询
     */
    public sendRoomSearch(id: string) {
        var data: any = {};
        data.s = core.sessionid;
        data.r = id;

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
            this.roomUserMap = {};

            var role: any;
            var followVo: FollowVo;
            for (var i: number = 0; i < list.length; i++) {
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
    }

    /**
     * 房间解散
     */
    public sendRoomDismass(id: string) {
        var data: any = {};
        data.s = core.sessionid;
        data.r = id;

        this.gameManager.httpManager.send(core.serverUrl + Cmd.Room_Dismass, data, this.readRoomDismass, this);
    }

    /**
     * {"code":0}
     * @param msg
     */
    public readRoomDismass(msg: any) {
        if (msg.code != 0)return;

        this.roomUserMap = {};

        this.gameManager.dispatchEvent(EventType.Room_Dismass);
    }
}