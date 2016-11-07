/**
 * TransferRecordVo
 * @Author Ace.c
 * @Create 2016-10-27 14:19
 */
var TransferRecordVo = (function (_super) {
    __extends(TransferRecordVo, _super);
    function TransferRecordVo() {
        _super.call(this);
        //游戏
        this.gam = "";
        //数量
        this.num = 0;
    }
    var d = __define,c=TransferRecordVo,p=c.prototype;
    p.update = function (data) {
        _super.prototype.update.call(this, data);
        if (data.hasOwnProperty("gid")) {
            this.gam = core.gameManager.dataManager.getGameName(this.gid);
        }
        else {
            this.gam = core.gameManager.dataManager.getGameName(core.gameManager.dataManager.userVo.gid);
        }
    };
    return TransferRecordVo;
}(BaseVo));
egret.registerClass(TransferRecordVo,'TransferRecordVo');
