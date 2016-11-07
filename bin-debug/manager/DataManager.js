/**
 * DataManager
 * @Author Ace.c
 * @Create 2016-10-26 10:42
 */
var DataManager = (function (_super) {
    __extends(DataManager, _super);
    function DataManager() {
        _super.call(this);
        this.initManager();
    }
    var d = __define,c=DataManager,p=c.prototype;
    d(p, "followLength"
        //下线数量
        ,function () {
            return this.gameManager.msgManager.follow.followLength;
        }
    );
    d(p, "followList"
        //下线列表
        ,function () {
            return this.gameManager.msgManager.follow.followList;
        }
    );
    d(p, "roomUsers"
        //房间信息
        ,function () {
            return this.gameManager.msgManager.room.roomUsers;
        }
    );
    d(p, "recordLength"
        //转账记录长度
        ,function () {
            return this.gameManager.msgManager.transfer.recordLength;
        }
    );
    //转账记录
    p.recordList = function (uid) {
        if (uid === void 0) { uid = null; }
        return this.gameManager.msgManager.transfer.recordList(uid);
    };
    //下线贡献
    p.juniorList = function () {
        return this.gameManager.msgManager.junior.juniorList;
    };
    p.initManager = function () {
        _super.prototype.initManager.call(this);
        this.userVo = new UserVo();
    };
    /**
     * 获取游戏id
     * @param name
     * @returns {any}
     */
    p.getGameId = function (name) {
        var gameMap = this.userVo.gameMap;
        var game;
        for (var key in gameMap) {
            game = gameMap[key];
            if (game.name == name) {
                return game.gameid;
            }
        }
        return null;
    };
    /**
     * 获取游戏name
     * @param id
     * @returns {any}
     */
    p.getGameName = function (id) {
        var gameMap = this.userVo.gameMap;
        var game;
        if (gameMap.hasOwnProperty(id)) {
            game = gameMap[id];
            return game.name;
        }
        return null;
    };
    return DataManager;
}(BaseManager));
egret.registerClass(DataManager,'DataManager');
