/**
 * TransferRecordItem
 * @Author Ace.c
 * @Create 2016-10-27 14:18
 */
var TransferRecordItem = (function (_super) {
    __extends(TransferRecordItem, _super);
    function TransferRecordItem() {
        _super.call(this);
        this.skinName = "TransferRecordItemSkin";
    }
    var d = __define,c=TransferRecordItem,p=c.prototype;
    p.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    p.update = function (recordVo) {
        if (recordVo === void 0) { recordVo = null; }
        this.recordVo = recordVo;
        var userVo = this.gameManager.dataManager.userVo;
        if (this.recordVo) {
            this.lab_id.text = "" + this.recordVo.uid;
            this.lab_name.text = "" + userVo.getGameName(this.recordVo.gid);
            this.lab_count.text = "" + this.recordVo.num;
            this.lab_time.text = "" + StringUtils.getYTDByTimestamp(this.recordVo.ctm) + "\n" + StringUtils.getHMSByTimestamp(this.recordVo.ctm);
        }
    };
    return TransferRecordItem;
}(GameSprite));
egret.registerClass(TransferRecordItem,'TransferRecordItem');
