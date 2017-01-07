/**
 * TransferMsg
 * @Author Ace.c
 * @Create 2016-10-30 11:22
 */
class TransferMsg extends BaseMsg {

    public constructor() {
        super();
    }

    /**
     * 搜索用户
     * @param uid
     * @param gid
     */
    public searchUser(uid: string, gid: string) {
        var data: any = {};
        data.s = core.sessionid;
        data.u = uid;
        data.g = gid;

        this.gameManager.httpManager.send(core.serverUrl + Cmd.Transfer_Search, data, this.searchUserHandler, this);
    }

    /**
     * {code:0, data:{pic:"", nick:"", uid:"", zong:"", cur:""}}
     * @param msg
     */
    public searchUserHandler(msg: any) {
        if (msg.code != 0) return;

        if (msg.hasOwnProperty("data")) {
            this.gameManager.dispatchEvent(EventType.Transfer_Search, msg.data);
        }
    }

    /**
     * 转账房卡
     */
    public sendTransfer(uid: string, gid: string, count: number) {
        var data: any = {};
        data.s = core.sessionid;
        data.u = uid;
        data.g = gid;
        data.n = count;

        this.gameManager.httpManager.send(core.serverUrl + Cmd.Transfer, data, this.readTransfer, this);
    }

    /**
     * {"code":0,"cdnum":"","x_uid":"","x_add":""}
     * @param msg
     */
    public readTransfer(msg: any) {
        if (msg.code != 0) return;

        this.gameManager.alertManager.open(AlertType.Normal, Lang.getText(2001));

        var userVo: UserVo = this.gameManager.dataManager.userVo;
        if (userVo) {
            userVo.cdnum = msg.cdnum;
            this.gameManager.dispatchEvent(EventType.User_Info);
        }

        if (msg.x_uid) {
            var lowerUserVo: LowerUserVo = this.gameManager.dataManager.lowerUserMap[msg.x_uid];
            if (lowerUserVo) {
                lowerUserVo.zong += msg.x_add;
                this.gameManager.dispatchEvent(EventType.LowerUser_Info, lowerUserVo);
            }
        }

        this.gameManager.dispatchEvent(EventType.Transfer_Success, msg.x_add);
    }

    /**
     * 转出记录
     */
    public transferOutRecord(uid: string = "", p: number = 1, n: number = 20) {
        var data: any = {};
        data.s = core.sessionid;
        data.p = p;
        data.n = n;
        uid != "" && (data.i = uid);

        this.gameManager.httpManager.send(core.serverUrl + Cmd.Transfer_Record_Out, data, this.transferOutRecordHandler, this);
    }

    /**
     * {"code":0,total":6542513,"cdsum":21402241448811,"data":[{"id":7,"orderno":"20161108134205502scyXtjaK2HEcBJM","ident":"1000","opt":3,"tarid":"1111","num":0,"fnum":0,"gameid":"bcmj","ctime":1478583725500,"status":1}}
     * @param msg
     */
    public transferOutRecordHandler(msg: any) {
        if (msg.code != 0)return;

        if (msg.hasOwnProperty("total")) {
            this.gameManager.dataManager.userVo.transPopulation = msg.total;
            this.gameManager.dataManager.transferOutRecordLength = msg.total;
        }

        if (msg.hasOwnProperty("cdsum")) {
            this.gameManager.dataManager.userVo.transCard = msg.cdsum;
        }

        if (msg.hasOwnProperty("svtm")) {
            core.svtm = msg.svtm;
        }

        var list: any[] = msg.data;
        if (list) {
            var map: any = this.gameManager.dataManager.transferOutRecordMap;
            var data: any;
            var recordVo: TransferRecordVo;
            for (var i: number = 0; i < list.length; i++) {
                data = list[i];

                if (map.hasOwnProperty(data.ctime)) {
                    recordVo = map[data.ctime];
                }
                else {
                    recordVo = new TransferRecordVo();
                    map[data.ctime] = recordVo;
                }

                recordVo.update(data);
            }
        }
        this.gameManager.dispatchEvent(EventType.Transfer_Record_Out);
    }

    /**
     * 转入记录
     */
    public transferInRecord(p: number = 1, n: number = 20) {
        var data: any = {};
        data.s = core.sessionid;
        data.p = p;
        data.n = n;

        this.gameManager.httpManager.send(core.serverUrl + Cmd.Transfer_Record_In, data, this.transferInRecordHandler, this);
    }

    /**
     * {"code":0,total":6542513,"data":[{"id":7,"orderno":"20161108134205502scyXtjaK2HEcBJM","ident":"1000","opt":3,"tarid":"1111","num":0,"fnum":0,"gameid":"bcmj","ctime":1478583725500,"status":1}}
     * @param msg
     */
    public transferInRecordHandler(msg: any) {
        if (msg.code != 0)return;

        if (msg.hasOwnProperty("total")) {
            this.gameManager.dataManager.transferInRecordLength = msg.total;
        }

        var list: any[] = msg.data;
        if (list) {
            var map: any = this.gameManager.dataManager.transferInRecordMap;
            var data: any;
            var recordVo: TransferRecordVo;
            for (var i: number = 0; i < list.length; i++) {
                data = list[i];

                if (map.hasOwnProperty(data.ctime)) {
                    recordVo = map[data.ctime];
                }
                else {
                    recordVo = new TransferRecordVo();
                    map[data.ctime] = recordVo;
                }

                recordVo.update(data);
            }
        }
        this.gameManager.dispatchEvent(EventType.Transfer_Record_In);
    }

    /**
     * 撤销
     */
    public transferCancel(o: string) {
        var data: any = {};
        data.s = core.sessionid;
        data.o = o;

        this.gameManager.httpManager.send(core.serverUrl + Cmd.Transfer_Cancel, data, this.transferCancelHandler, this);
    }

    /**
     * {code:0, add:10, orn:orderno}
     * @param msg
     */
    public transferCancelHandler(msg: any) {
        if (msg.code != 0)return;

        this.gameManager.dataManager.userVo.cdnum += msg.add;
        this.gameManager.dataManager.chooseLower.zong -= msg.add;

        this.gameManager.dispatchEvent(EventType.Transfer_Cancel, msg.orn);
    }

    /**
     * 评价
     */
    public assess(uid: string, gid: string, type: number) {
        var data: any = {};
        data.s = core.sessionid;
        data.u = uid;
        data.g = gid;
        data.t = type;

        this.gameManager.httpManager.send(core.serverUrl + Cmd.Transfer_Assess, data, this.assessHandler, this);
    }

    /**
     * {code:0, cai:0, zan:0, zcrused:1}
     * @param msg
     */
    public assessHandler(msg: any) {
        this.gameManager.dataManager.userVo.zcrused = msg.zcrused;

        this.gameManager.dispatchEvent(EventType.LowerUser_Assess, msg);
    }
}