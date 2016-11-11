/**
 * LowerUserMsg
 * @Author Ace.c
 * @Create 2016-10-30 11:27
 */
class LowerUserMsg extends BaseMsg {

    public constructor() {
        super();
    }

    /**
     * 下线人列表
     */
    public sendLowerUser_List(page: number = 0, count: number = 20) {
        var data: any = {};
        data.s = core.sessionid;
        data.p = page;
        data.n = count;

        this.gameManager.httpManager.send(core.serverUrl + Cmd.LowerUser_List, data, this.readLowerUser_List, this);
    }

    /**
     * {"code":0,"roles":[{"nick":"sakula","uid":"10004","cur":0,"zong":0,"pic":"http://192.168.2.32"}]}
     * @param msg
     */
    private readLowerUser_List(msg: any) {
        if (msg.code != 0)return;

        if (msg.total) {
            this.gameManager.dataManager.lowerUserCount = msg.total;
        }

        var map: any = this.gameManager.dataManager.lowerUserMap;

        var list: any[] = msg.roles;
        if (list) {
            var follows: LowerUserVo[] = [];
            var role: any;
            var followVo: LowerUserVo;
            for (var i: number = 0; i < list.length; i++) {
                role = list[i];

                if (map.hasOwnProperty(role.uid)) {
                    followVo = map[role.uid];
                }
                else {
                    followVo = new LowerUserVo();
                    map[role.uid] = followVo;
                }

                followVo.update(role);

                //TODO  测试专用
                // followVo.zong = FormulaUtils.getRandomBetween(0, 1000);

                follows.push(followVo);
            }

            follows.sort(function (a: LowerUserVo, b: LowerUserVo) {
                if (a.zong > b.zong) {
                    return -1;
                }
                else {
                    return 1;
                }
            });

            this.gameManager.dispatchEvent(EventType.LowerUser_List, follows);
        }
    }

    /**
     * 下级贡献
     */
    public sendLowerUser_Contribution() {
        var data: any = {};
        data.s = core.sessionid;

        this.gameManager.httpManager.send(core.serverUrl + Cmd.LowerUser_Contribution, data, this.readLowerUser_Contribution, this);
    }

    /**
     * 下级贡献领取
     * @param type
     * @param page
     * @param count
     */
    public sendLowerUser_Contribution_Get(type: number, page: number, count: number) {
        var data: any = {};
        data.s = core.sessionid;
        data.t = type;
        data.p = page;
        data.n = count;

        this.gameManager.httpManager.send(core.serverUrl + Cmd.LowerUser_Contribution_Get, data, this.readLowerUser_Contribution, this);
    }

    private readLowerUser_Contribution(msg: any) {
        if (msg.code != 0)return;

        var userVo: UserVo = this.gameManager.dataManager.userVo;

        if (msg.hasOwnProperty("month")) {
            userVo.juniorMonth = msg.month;
        }

        if (msg.hasOwnProperty("rew")) {
            userVo.juniorReward = msg.rew;
        }

        if (msg.hasOwnProperty("cdnum")) {
            userVo.cdnum = msg.cdnum;
        }

        if (msg.hasOwnProperty("st")) {
            userVo.agentLv1Reward = msg.st;
        }

        if (msg.hasOwnProperty("sst")) {
            userVo.agentLv2Reward = msg.sst;
        }

        this.gameManager.dispatchEvent(EventType.LowerUser_Contribution);

        if (msg.hasOwnProperty("t")) {
            var map: any;
            switch (msg.t) {
                case 3:
                    map = this.gameManager.dataManager.agentLv1RecordMap;
                    this.gameManager.dataManager.agentLv1RecordLength = msg.total;
                    break;
                case 4:
                    map = this.gameManager.dataManager.agentLv2RecordMap;
                    this.gameManager.dataManager.agentLv2RecordLength = msg.total;
                    break;
            }

            var list: LowerUserContributionVo[] = [];
            if (msg.hasOwnProperty("roles")) {
                var data: any;
                var contributionVo: LowerUserContributionVo;
                for (var i: number = 0; i < msg.roles.length; i++) {
                    data = msg.roles[i];

                    contributionVo = new LowerUserContributionVo();
                    contributionVo.update(data);

                    list.push(contributionVo);
                    map[data.uid] = contributionVo;
                }

                list.sort(function (a: LowerUserContributionVo, b: LowerUserContributionVo) {
                    if (a.sum > b.sum) {
                        return -1;
                    }
                    else {
                        return 1;
                    }
                });
            }
            this.gameManager.dispatchEvent(EventType.LowerUser_Contribution_List, {type: msg.t, list: list});
        }
    }
}