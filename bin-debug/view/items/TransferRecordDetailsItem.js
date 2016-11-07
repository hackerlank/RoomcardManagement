/**
 * TransferRecordDetailsItem
 * @Author Ace.c
 * @Create 2016-10-31 10:39
 */
var TransferRecordDetailsItem = (function (_super) {
    __extends(TransferRecordDetailsItem, _super);
    function TransferRecordDetailsItem() {
        _super.call(this);
        this.skinName = "TransferRecordDetailsItemSkin";
    }
    var d = __define,c=TransferRecordDetailsItem,p=c.prototype;
    p.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.update(this.recordVo);
    };
    p.update = function (recordVo) {
        if (recordVo) {
            this.recordVo = recordVo;
            this.lab_order.text = "订 单 号: " + this.recordVo.odr;
            this.lab_time.text = "交易时间: " + "" + StringUtils.getYTDByTimestamp(this.recordVo.ctm) + " " + StringUtils.getHMSByTimestamp(this.recordVo.ctm);
            this.lab_card.text = "房卡数量: " + this.recordVo.num;
        }
    };
    return TransferRecordDetailsItem;
}(GameSprite));
egret.registerClass(TransferRecordDetailsItem,'TransferRecordDetailsItem');
