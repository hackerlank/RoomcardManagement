/**
 * DataManager
 * @Author Ace.c
 * @Create 2016-10-26 10:42
 */
class DataManager extends BaseManager {

    //用户信息
    public userVo: UserVo;

    //----------------下级用户----------------
    //下级用户数量
    public lowerUserCount: number = 0;
    //下级用户集合
    public lowerUserMap: any = {};
    //下线用户贡献记录
    public lowerUserContributions: LowerUserContributionVo[] = [];

    //----------------转账记录----------------
    //转账记录数量
    public transferRecordLength: number;
    //转账记录集合
    public transferRecordMap: any;

    //----------------房间用户----------------
    //房间用户集合
    public roomUserMap: any;

    //被选中的下级
    public selectedFollow: LowerUserVo;

    public constructor() {
        super();

        this.initManager();
    }

    public initManager() {
        super.initManager();

        this.userVo = new UserVo();
        this.lowerUserMap = {};
        this.transferRecordMap = {};
        this.roomUserMap = {};
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
    public getTransferRecordList(uid: string = null): TransferRecordVo[] {
        var list: TransferRecordVo[] = [];
        var records: any;
        for (var userid in this.transferRecordMap) {
            records = this.transferRecordMap[userid];

            if (uid == null || uid == userid) {
                for (var odr in records) {
                    list.push(records[odr]);
                }
            }
        }

        list.sort(function (a: TransferRecordVo, b: TransferRecordVo) {
            if (a.ctm > b.ctm) {
                return -1;
            }
            else {
                return 1;
            }
        });

        return list;
    }
}