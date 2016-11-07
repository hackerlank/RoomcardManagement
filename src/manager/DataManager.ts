/**
 * DataManager
 * @Author Ace.c
 * @Create 2016-10-26 10:42
 */
class DataManager extends BaseManager {

    //用户信息
    public userVo: UserVo;

    //下线数量
    public get followLength(): number {
        return this.gameManager.msgManager.follow.followLength;
    }

    //下线列表
    public get followList(): FollowVo[] {
        return this.gameManager.msgManager.follow.followList;
    }

    //房间信息
    public get roomUsers(): FollowVo[] {
        return this.gameManager.msgManager.room.roomUsers;
    }

    //转账记录长度
    public get recordLength(): number {
        return this.gameManager.msgManager.transfer.recordLength;
    }

    //转账记录
    public recordList(uid: string = null): TransferRecordVo[] {
        return this.gameManager.msgManager.transfer.recordList(uid);
    }

    //下线贡献
    public juniorList(): JuniorVo[] {
        return this.gameManager.msgManager.junior.juniorList;
    }

    //被选中的下级
    public selectedFollow: FollowVo;

    public constructor() {
        super();

        this.initManager();
    }

    public initManager() {
        super.initManager();

        this.userVo = new UserVo();
    }

    /**
     * 获取游戏id
     * @param name
     * @returns {any}
     */
    public getGameId(name: string): string {
        var gameMap: any = this.userVo.gameMap;
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
        var gameMap: any = this.userVo.gameMap;
        var game: any;
        if (gameMap.hasOwnProperty(id)) {
            game = gameMap[id];
            return game.name;
        }
        return null;
    }
}