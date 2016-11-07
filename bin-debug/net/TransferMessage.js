/**
 * TransferMessage
 * @Author Ace.c
 * @Create 2016-10-30 11:22
 */
var TransferMessage = (function (_super) {
    __extends(TransferMessage, _super);
    function TransferMessage() {
        _super.call(this);
        this.recordMap = {};
    }
    var d = __define,c=TransferMessage,p=c.prototype;
    p.recordList = function (uid) {
        if (uid === void 0) { uid = null; }
        var list = [];
        var records;
        for (var userid in this.recordMap) {
            records = this.recordMap[userid];
            if (uid == null || uid == userid) {
                for (var odr in records) {
                    list.push(records[odr]);
                }
            }
        }
        list.sort(function (a, b) {
            if (a.ctm > b.ctm) {
                return -1;
            }
            else {
                return 1;
            }
        });
        return list;
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
        this.userVo = this.gameManager.dataManager.userVo;
        this.userVo.cdnum = msg.cdnum;
        if (msg.x_uid) {
            var follow = this.gameManager.msgManager.follow.followMap[msg.x_uid];
            follow && (follow.zong += msg.x_add);
            this.gameManager.dispatchEvent(EventType.Follow_Update_Info, follow);
        }
        this.gameManager.dispatchEvent(EventType.Follow_Update_Info);
    };
    /**
     * 转账详情列表
     */
    p.sendTransferList = function (uid, p, n) {
        if (uid === void 0) { uid = ""; }
        if (p === void 0) { p = 1; }
        if (n === void 0) { n = 20; }
        var data = {};
        data.s = core.sessionid;
        data.p = p;
        data.n = n;
        // data.g = core.gameid;
        uid != "" && (data.i = uid);
        this.gameManager.httpManager.send(core.serverUrl + Cmd.Follow_Info, data, this.readTransferList, this);
    };
    /**
     * {"code":0,"rs":[{"uid":"10004","opt":2,"stu":1,"num":150,"odr":"20161028161915355Gix0T6oUPUBCSRb","ctm":"2016-10-28 16:19:15:353"}]}
     * @param msg
     */
    p.readTransferList = function (msg) {
        if (msg.code != 0)
            return;
        if (msg.total) {
            this.recordLength = msg.total;
        }
        var list = msg.rs;
        if (list) {
            var data;
            var records;
            var recordVo;
            for (var i = 0; i < list.length; i++) {
                data = list[i];
                if (!this.recordMap.hasOwnProperty(data.uid)) {
                    records = {};
                    this.recordMap[data.uid] = records;
                }
                else {
                    records = this.recordMap[data.uid];
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
            this.gameManager.dispatchEvent(EventType.User_Record_List);
        }
    };
    return TransferMessage;
}(BaseMessage));
egret.registerClass(TransferMessage,'TransferMessage');
