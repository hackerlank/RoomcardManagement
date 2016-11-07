/**
 * DataManager
 * @Author Ace.c
 * @Create 2016-10-26 10:42
 */
var DataManager = (function (_super) {
    __extends(DataManager, _super);
    function DataManager() {
        _super.call(this);
        //----------------下级用户----------------
        //下级用户数量
        this.lowerUserCount = 0;
        //下级用户集合
        this.lowerUserMap = {};
        //下线用户贡献记录
        this.lowerUserContributions = [];
        this.initManager();
    }
    var d = __define,c=DataManager,p=c.prototype;
    p.initManager = function () {
        _super.prototype.initManager.call(this);
        this.userVo = new UserVo();
        this.lowerUserMap = {};
        this.transferRecordMap = {};
        this.roomUserMap = {};
    };
    /**
     * 获取下级用户列表
     * @returns {LowerUserVo[]}
     */
    p.getLowerUserList = function () {
        var list = [];
        for (var uid in this.lowerUserMap) {
            list.push(this.lowerUserMap[uid]);
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
    };
    /**
     * 获取房间用户列表
     * @returns {LowerUserVo[]}
     */
    p.getRoomUserList = function () {
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
    };
    /**
     * 获取转账记录列表
     * @param uid
     * @returns {TransferRecordVo[]}
     */
    p.getTransferRecordList = function (uid) {
        if (uid === void 0) { uid = null; }
        var list = [];
        var records;
        for (var userid in this.transferRecordMap) {
            records = this.transferRecordMap[userid];
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
    return DataManager;
}(BaseManager));
egret.registerClass(DataManager,'DataManager');
