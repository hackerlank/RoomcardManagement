/**
 * DataManager
 * @Author Ace.c
 * @Create 2016-10-26 10:42
 */
class DataManager extends BaseManager {

    //用户信息
    public userVo: UserVo = new UserVo();

    //----------------下级用户----------------
    //下级用户数量
    public lowerUserCount: number = 0;
    //下级用户集合
    public lowerUserMap: any = {};

    //----------------转账记录----------------
    //转账记录-转出-数量
    public transferOutRecordLength: number = 0;
    //转账记录-转出-集合
    public transferOutRecordMap: any = {};
    //转账记录-转入-数量
    public transferInRecordLength: number = 0;
    //转账记录-转入-集合
    public transferInRecordMap: any = {};

    //----------------代理记录----------------
    //一级代理记录数量
    public agentLv1RecordLength: number = 0;
    //一级代理记录集合
    public agentLv1RecordMap: any = {};
    //二级代理记录数量
    public agentLv2RecordLength: number = 0;
    //二级代理记录集合
    public agentLv2RecordMap: any = {};
    //结算记录数量
    public agentCehckRecordLength: number = 0;
    //结算记录集合
    public agentCehckRecordMap: any = {};

    //----------------超管记录----------------
    //记录长度
    public recs_gm_length: number = 0;
    //记录集合
    public recs_gm_map: any = {};
    //记录队列
    public get recs_gm_list(): any[] {
        var list: any[] = [];
        var rec: any;
        for (var id in this.recs_gm_map) {
            rec = this.recs_gm_map[id];
            list.unshift(rec);
        }
        return list;
    }

    //----------------房间用户----------------
    //房间用户集合
    public roomUserMap: any = {};

    //被选中的下级
    public chooseLower: LowerUserVo;

    public constructor() {
        super();
    }

    /**
     * 获取下级用户列表
     * @returns {LowerUserVo[]}
     */
    public getLowerUserList(): LowerUserVo[] {
        var list: LowerUserVo[] = [];

        for (var uid in this.lowerUserMap) {
            list.push(this.lowerUserMap[uid]);
        }

        list.sort(function (a: LowerUserVo, b: LowerUserVo) {
            if (a.zong > b.zong) {
                return -1;
            }
            else {
                return 1;
            }
        });

        return list;
    }

    /**
     * 获取一级代理记录列表
     * @returns {LowerUserVo[]}
     */
    public getAgentLv1List(): LowerUserContributionVo[] {
        var list: LowerUserContributionVo[] = [];

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
    }

    /**
     * 获取二级代理记录列表
     * @returns {LowerUserVo[]}
     */
    public getAgentLv2List(): LowerUserContributionVo[] {
        var list: LowerUserContributionVo[] = [];

        for (var uid in this.agentLv2RecordMap) {
            list.push(this.agentLv2RecordMap[uid]);
        }

        return list;
    }

    /**
     * 获取结算记录列表
     * @returns {LowerUserVo[]}
     */
    public getAgentCheckRecordList(): any[] {
        var list: any[] = [];

        for (var key in this.agentCehckRecordMap) {
            list.push(this.agentCehckRecordMap[key]);
        }

        list.sort(function (a: any, b: any) {
            if (a.ctime > b.ctime) {
                return -1;
            }
            else {
                return 1;
            }
        });

        return list;
    }

    /**
     * 获取房间用户列表
     * @returns {LowerUserVo[]}
     */
    public getRoomUserList(): LowerUserVo[] {
        var list: LowerUserVo[] = [];

        for (var uid in this.roomUserMap) {
            list.push(this.roomUserMap[uid]);
        }

        list.sort(function (a: LowerUserVo, b: LowerUserVo) {
            if (a.zong > b.zong) {
                return -1;
            }
            else {
                return 1;
            }
        });

        return list;
    }

    /**
     * 获取转账记录列表
     * @param uid
     * @returns {TransferRecordVo[]}
     */
    public getTransferOutRecordList(uid: string = null): TransferRecordVo[] {
        var list: TransferRecordVo[] = [];
        var recordVo: TransferRecordVo;
        for (var id in this.transferOutRecordMap) {
            recordVo = this.transferOutRecordMap[id];

            if (!uid || uid == recordVo.tarid) {
                list.unshift(recordVo);
            }
        }

        return list;
    }

    /**
     * 获取获卡记录列表
     * @returns {TransferRecordVo[]}
     */
    public getTransferInRecordList(): TransferRecordVo[] {
        var list: TransferRecordVo[] = [];
        var recordVo: TransferRecordVo;
        for (var id in this.transferInRecordMap) {
            recordVo = this.transferInRecordMap[id];
            list.unshift(recordVo);
        }

        return list;
    }
}