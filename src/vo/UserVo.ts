/**
 * UserVo
 * @Author Ace.c
 * @Create 2016-10-26 10:25
 */
class UserVo extends BaseVo {

    public api_appid: string;
    public api_timestamp: number;
    public api_noncestr: string;
    public api_sign: string;

    public code: number = 0;
    public sid: number = 0;
    public uid: string;
    public gid: string;
    public unionid: number = 0;
    //昵称
    public nick: string = "";
    //头像地址
    public pic: string = "";
    //拥有房卡数量
    public cdnum: number = 0;
    //权限
    public pow: number = 0;

    //转账人次
    public transPopulation:number = 0;
    //转账卡数
    public transCard:number = 0;

    //购卡月份标识
    public cardMonth: number = 0;
    //每月购卡数量
    public cardBuy: number = 0;
    //每月购卡奖励
    public cardReward: number = 0;

    //购卡月份标识
    public juniorMonth: number = 0;
    //每月购卡奖励
    public juniorReward: number = 0;

    //1级代理奖励
    public agentLv1Reward:number = 0;
    //2级代理奖励
    public agentLv2Reward:number = 0;

    //游戏
    public gameMap: any;
    //充值档位列表
    public rechargeList: RechargeVo[];
    //充值奖励规则列表
    public rewardRuleList: RewardRuleVo[];

    public constructor() {
        super();

        this.gameMap = {};
    }

    /**
     * 获取全部游戏
     * @returns {string[]}
     */
    public getGames(): string[] {
        var list: string[] = [];
        for (var key in this.gameMap) {
            list.push(this.gameMap[key].name);
        }
        return list;
    }

    /**
     * 获取游戏id
     * @param name
     * @returns {any}
     */
    public getGameId(name: string): string {
        var gameMap: any = this.gameMap;
        var game: any;
        for (var key in gameMap) {
            game = gameMap[key];
            if (game.name == name) {
                return game.gameid;
            }
        }
        return null;
    }

    /**
     * 获取游戏name
     * @param id
     * @returns {any}
     */
    public getGameName(id: string): string {
        var gameMap: any = this.gameMap;
        var game: any;
        if (gameMap.hasOwnProperty(id)) {
            game = gameMap[id];
            return game.name;
        }
        return null;
    }
}