/**
 * FollowMessage
 * @Author Ace.c
 * @Create 2016-10-30 11:27
 */
class FollowMessage extends BaseMessage {

    public followLength: number = 0;
    public followMap: any;

    public get followList(): FollowVo[] {
        var list: FollowVo[] = [];

        for (var uid in this.followMap) {
            list.push(this.followMap[uid]);
        }

        list.sort(function (a: FollowVo, b: FollowVo) {
            if (a.zong > b.zong) {
                return -1;
            }
            else {
                return 1;
            }
        });

        return list;
    }

    public constructor() {
        super();

        this.followMap = {};
    }

    /**
     * 下线人列表
     */
    public sendFollowList(page: number = 0, count: number = 20) {
        var data: any = {};
        data.s = core.sessionid;
        data.p = page;
        data.n = count;

        this.gameManager.httpManager.send(core.serverUrl + Cmd.Follow_List, data, this.readFollowList, this);
    }

    /**
     * {"code":0,"roles":[{"nick":"sakula","uid":"10004","cur":0,"zong":0,"pic":"http://192.168.2.32"}]}
     * @param msg
     */
    public readFollowList(msg: any) {
        if (msg.code != 0)return;

        if (msg.total) {
            this.followLength = msg.total;
        }

        var list: any[] = msg.roles;
        if (list) {
            var follows: FollowVo[] = [];
            var role: any;
            var followVo: FollowVo;
            for (var i: number = 0; i < list.length; i++) {
                role = list[i];

                if (this.followMap.hasOwnProperty(role.uid)) {
                    followVo = this.followMap[role.uid];
                }
                else {
                    followVo = new FollowVo();
                    this.followMap[role.uid] = followVo;
                }

                followVo.update(role);

                //TODO  测试专用
                // followVo.zong = FormulaUtils.getRandomBetween(0, 1000);

                follows.push(followVo);
            }

            follows.sort(function (a: FollowVo, b: FollowVo) {
                if (a.zong > b.zong) {
                    return -1;
                }
                else {
                    return 1;
                }
            });

            this.gameManager.dispatchEvent(EventType.Follow_Update_List, follows);
        }
    }
}