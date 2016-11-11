/**
 * TransferInRecordItem
 * @Author Ace.c
 * @Create 2016-11-07 12:17
 */
var TransferInRecordItem = (function (_super) {
    __extends(TransferInRecordItem, _super);
    function TransferInRecordItem() {
        _super.call(this);
        this.skinName = "TransferInRecordItemSkin";
    }
    var d = __define,c=TransferInRecordItem,p=c.prototype;
    p.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    p.update = function (recordVo) {
        if (recordVo === void 0) { recordVo = null; }
        this.recordVo = recordVo;
        if (this.recordVo) {
            this.lab_time.text = "" + StringUtils.getYTDByTimestamp(this.recordVo.ctime) + " " + StringUtils.getHMSByTimestamp(this.recordVo.ctime);
            this.lab_event.text = "" + this.getEventName(this.recordVo.opt);
            this.lab_count.text = "" + this.recordVo.num;
        }
    };
    p.getEventName = function (opt) {
        var str = "";
        switch (opt) {
            case 1:
                str = "在线购卡";
                break;
            case 3:
                str = "一级代理返卡";
                break;
            case 4:
                str = "二级代理返卡";
                break;
            case 5:
                str = "售卡奖励";
                break;
            case 6:
                str = "管理员发放";
                break;
        }
        return str;
    };
    return TransferInRecordItem;
}(GameSprite));
egret.registerClass(TransferInRecordItem,'TransferInRecordItem');
