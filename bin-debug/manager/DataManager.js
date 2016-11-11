/**
 * DataManager
 * @Author Ace.c
 * @Create 2016-10-26 10:42
 */
var DataManager = (function (_super) {
    __extends(DataManager, _super);
    function DataManager() {
        _super.call(this);
        //用户信息
        this.userVo = new UserVo();
        //----------------下级用户----------------
        //下级用户数量
        this.lowerUserCount = 0;
        //下级用户集合
        this.lowerUserMap = {};
        //----------------转账记录----------------
        //转账记录-转出-数量
        this.transferOutRecordLength = 0;
        //转账记录-转出-集合
        this.transferOutRecordMap = {};
        //转账记录-转入-数量
        this.transferInRecordLength = 0;
        //转账记录-转入-集合
        this.transferInRecordMap = {};
        //----------------代理记录----------------
        //一级代理记录数量
        this.agentLv1RecordLength = 0;
        //一级代理记录集合
        this.agentLv1RecordMap = {};
        //二级代理记录数量
        this.agentLv2RecordLength = 0;
        //二级代理记录集合
        this.agentLv2RecordMap = {};
        //----------------超管记录----------------
        //记录长度
        this.recs_gm_length = 0;
        //记录集合
        this.recs_gm_map = {};
        //----------------房间用户----------------
        //房间用户集合
        this.roomUserMap = {};
    }
    var d = __define,c=DataManager,p=c.prototype;
    d(p, "recs_gm_list"
        //记录队列
        ,function () {
            var list = [];
            var rec;
            for (var id in this.recs_gm_map) {
                rec = this.recs_gm_map[id];
                list.unshift(rec);
            }
            return list;
        }
    );
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
     * 获取一级代理记录列表
     * @returns {LowerUserVo[]}
     */
    p.getAgentLv1List = function () {
        var list = [];
        for (var uid in this.agentLv1RecordMap) {
            list.push(this.agentLv1RecordMap[uid]);
        }
        // list.sort(function (a: LowerUserContributionVo, b: LowerUserContributionVo) {
        //     if (a.zong > b.zong) {
        //         return -1;
        //     }
        //     else {
        //         return 1;
        //     }
        // });
        return list;
    };
    /**
     * 获取二级代理记录列表
     * @returns {LowerUserVo[]}
     */
    p.getAgentLv2List = function () {
        var list = [];
        for (var uid in this.agentLv1RecordMap) {
            list.push(this.agentLv1RecordMap[uid]);
        }
        // list.sort(function (a: LowerUserContributionVo, b: LowerUserContributionVo) {
        //     if (a.zong > b.zong) {
        //         return -1;
        //     }
        //     else {
        //         return 1;
        //     }
        // });
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
    p.getTransferOutRecordList = function (uid) {
        if (uid === void 0) { uid = null; }
        var list = [];
        var recordVo;
        for (var id in this.transferOutRecordMap) {
            recordVo = this.transferOutRecordMap[id];
            if (!uid || uid == recordVo.tarid) {
                list.unshift(recordVo);
            }
        }
        return list;
    };
    /**
     * 获取获卡记录列表
     * @returns {TransferRecordVo[]}
     */
    p.getTransferInRecordList = function () {
        var list = [];
        var recordVo;
        for (var id in this.transferInRecordMap) {
            recordVo = this.transferInRecordMap[id];
            list.unshift(recordVo);
        }
        return list;
    };
    return DataManager;
}(BaseManager));
egret.registerClass(DataManager,'DataManager');
