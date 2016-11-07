/**
 * JuniorMessage
 * @Author Ace.c
 * @Create 2016-11-01 15:03
 */
class JuniorMessage extends BaseMessage {

    private userVo: UserVo;
    public juniorList: JuniorVo[];

    public constructor() {
        super();
    }

    /**
     * 下级贡献信息
     */
    public sendGetInfo() {
        var data: any = {};
        data.s = core.sessionid;

        this.gameManager.httpManager.send(core.serverUrl + Cmd.Junior_Info, data, this.readJuniorInfo, this);
    }

    /**
     * 领取下级贡献
     */
    public sendGetReward() {
        var data: any = {};
        data.s = core.sessionid;

        this.gameManager.httpManager.send(core.serverUrl + Cmd.Junior_GetReward, data, this.readJuniorInfo, this);
    }

    public readJuniorInfo(msg: any) {
        if (msg.code != 0)return;

        this.userVo = this.gameManager.dataManager.userVo;

        if (msg.hasOwnProperty("month")) {
            this.userVo.juniorMonth = msg.month;
        }

        if (msg.hasOwnProperty("rew")) {
            this.userVo.juniorReward = msg.rew;
        }

        if (msg.hasOwnProperty("cdnum")) {
            this.userVo.cdnum = msg.cdnum;
        }

        if (msg.hasOwnProperty("ros")) {
            this.juniorList = [];
            var junior: JuniorVo;
            for (var i: number = 0; i < msg.ros.length; i++) {
                junior = new JuniorVo();
                junior.update(msg.ros[i]);
                this.juniorList.push(junior);
            }

            this.juniorList.sort(function (a: JuniorVo, b: JuniorVo) {
                if (a.rew > b.rew) {
                    return -1;
                }
                else {
                    return 1;
                }
            });
        }

        this.gameManager.dispatchEvent(EventType.Junior_Info);
    }
}