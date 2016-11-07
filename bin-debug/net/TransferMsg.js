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
    };
    /**
     * 转账记录
     */
    p.sendTransferRecords = function (uid, p, n) {
        if (uid === void 0) { uid = ""; }
        if (p === void 0) { p = 1; }
        if (n === void 0) { n = 20; }
        var data = {};
        data.s = core.sessionid;
        data.p = p;
        data.n = n;
        // data.g = core.gameid;
        uid != "" && (data.i = uid);
        this.gameManager.httpManager.send(core.serverUrl + Cmd.Transfer_Record_List, data, this.readTransferRecords, this);
    };
    /**
     * {"code":0,"rs":[{"uid":"10004","opt":2,"stu":1,"num":150,"odr":"20161028161915355Gix0T6oUPUBCSRb","ctm":"2016-10-28 16:19:15:353"}]}
     * @param msg
     */
    p.readTransferRecords = function (msg) {
        if (msg.code != 0)
            return;
        if (msg.total) {
            this.gameManager.dataManager.transferRecordLength = msg.total;
        }
        var list = msg.rs;
        if (list) {
            var map = this.gameManager.dataManager.transferRecordMap;
            var data;
            var records;
            var recordVo;
            for (var i = 0; i < list.length; i++) {
                data = list[i];
                if (!map.hasOwnProperty(data.uid)) {
                    records = {};
                    map[data.uid] = records;
                }
                else {
                    records = map[data.uid];
                }
                if (records.hasOwnProperty(data.odr)) {
                    recordVo = records[data.odr];
                }
                else {
                    recordVo = new TransferRecordVo();
                    records[data.odr] = recordVo;
                }
                recordVo.update(data);
            }
            this.gameManager.dispatchEvent(EventType.Transfer_List);
        }
    };
    return TransferMsg;
}(BaseMsg));
egret.registerClass(TransferMsg,'TransferMsg');
