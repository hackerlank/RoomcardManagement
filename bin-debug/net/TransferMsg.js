/**
 * TransferMsg
 * @Author Ace.c
 * @Create 2016-10-30 11:22
 */
var TransferMsg = (function (_super) {
    __extends(TransferMsg, _super);
    function TransferMsg() {
        _super.call(this);
    }
    var d = __define,c=TransferMsg,p=c.prototype;
    /**
     * 搜索用户
     * @param uid
     * @param gid
     */
    p.searchUser = function (uid, gid) {
        var data = {};
        data.s = core.sessionid;
        data.u = uid;
        data.g = gid;
        this.gameManager.httpManager.send(core.serverUrl + Cmd.Transfer_Search, data, this.searchUserHandler, this);
    };
    /**
     * {code:0, data:{pic:"", nick:"", uid:"", zong:"", cur:""}}
     * @param msg
     */
    p.searchUserHandler = function (msg) {
        if (msg.code != 0)
            return;
        if (msg.hasOwnProperty("data")) {
            this.gameManager.dispatchEvent(EventType.Transfer_Search, msg.data);
        }
    };
    /**
     * 转账房卡
     */
    p.sendTransfer = function (uid, gid, count) {
        var data = {};
        data.s = core.sessionid;
        data.u = uid;
        data.g = gid;
        data.n = count;
        this.gameManager.httpManager.send(core.serverUrl + Cmd.Transfer, data, this.readTransfer, this);
    };
    /**
     * {"code":0,"cdnum":"","x_uid":"","x_add":""}
     * @param msg
     */
    p.readTransfer = function (msg) {
        if (msg.code != 0)
            return;
        this.gameManager.alertManager.open(AlertType.Normal, Lang.getText(2001));
        var userVo = this.gameManager.dataManager.userVo;
        if (userVo) {
            userVo.cdnum = msg.cdnum;
            this.gameManager.dispatchEvent(EventType.User_Info);
        }
        if (msg.x_uid) {
            var lowerUserVo = this.gameManager.dataManager.lowerUserMap[msg.x_uid];
            if (lowerUserVo) {
                lowerUserVo.zong += msg.x_add;
                this.gameManager.dispatchEvent(EventType.LowerUser_Info, lowerUserVo);
            }
        }
        this.gameManager.dispatchEvent(EventType.Transfer_Success, msg.x_add);
    };
    /**
     * 转账记录
     */
    p.transferOutRecord = function (uid, p, n) {
        if (uid === void 0) { uid = ""; }
        if (p === void 0) { p = 1; }
        if (n === void 0) { n = 20; }
        var data = {};
        data.s = core.sessionid;
        data.p = p;
        data.n = n;
        uid != "" && (data.i = uid);
        this.gameManager.httpManager.send(core.serverUrl + Cmd.Transfer_Record_Out, data, this.transferOutRecordHandler, this);
    };
    /**
     * {"code":0,total":6542513,"cdsum":21402241448811,"data":[{"id":7,"orderno":"20161108134205502scyXtjaK2HEcBJM","ident":"1000","opt":3,"tarid":"1111","num":0,"fnum":0,"gameid":"bcmj","ctime":1478583725500,"status":1}}
     * @param msg
     */
    p.transferOutRecordHandler = function (msg) {
        if (msg.code != 0)
            return;
        if (msg.hasOwnProperty("total")) {
            this.gameManager.dataManager.userVo.transPopulation = msg.total;
            this.gameManager.dataManager.transferOutRecordLength = msg.total;
        }
        if (msg.hasOwnProperty("cdsum")) {
            this.gameManager.dataManager.userVo.transCard = msg.cdsum;
        }
        var list = msg.data;
        if (list) {
            var map = this.gameManager.dataManager.transferOutRecordMap;
            var data;
            var recordVo;
            for (var i = 0; i < list.length; i++) {
                data = list[i];
                if (map.hasOwnProperty(data.id)) {
                    recordVo = map[data.id];
                }
                else {
                    recordVo = new TransferRecordVo();
                    map[data.id] = recordVo;
                }
                recordVo.update(data);
            }
        }
        this.gameManager.dispatchEvent(EventType.Transfer_Record_Out);
    };
    /**
     * 转账记录
     */
    p.transferInRecord = function (p, n) {
        if (p === void 0) { p = 1; }
        if (n === void 0) { n = 20; }
        var data = {};
        data.s = core.sessionid;
        data.p = p;
        data.n = n;
        this.gameManager.httpManager.send(core.serverUrl + Cmd.Transfer_Record_In, data, this.transferInRecordHandler, this);
    };
    /**
     * {"code":0,total":6542513,"data":[{"id":7,"orderno":"20161108134205502scyXtjaK2HEcBJM","ident":"1000","opt":3,"tarid":"1111","num":0,"fnum":0,"gameid":"bcmj","ctime":1478583725500,"status":1}}
     * @param msg
     */
    p.transferInRecordHandler = function (msg) {
        if (msg.code != 0)
            return;
        if (msg.hasOwnProperty("total")) {
            this.gameManager.dataManager.transferInRecordLength = msg.total;
        }
        var list = msg.data;
        if (list) {
            var map = this.gameManager.dataManager.transferInRecordMap;
            var data;
            var recordVo;
            for (var i = 0; i < list.length; i++) {
                data = list[i];
                if (map.hasOwnProperty(data.id)) {
                    recordVo = map[data.id];
                }
                else {
                    recordVo = new TransferRecordVo();
                    map[data.id] = recordVo;
                }
                recordVo.update(data);
            }
        }
        this.gameManager.dispatchEvent(EventType.Transfer_Record_In);
    };
    return TransferMsg;
}(BaseMsg));
egret.registerClass(TransferMsg,'TransferMsg');
