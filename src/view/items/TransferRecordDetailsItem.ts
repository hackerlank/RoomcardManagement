/**
 * TransferRecordDetailsItem
 * @Author Ace.c
 * @Create 2016-10-31 10:39
 */
class TransferRecordDetailsItem extends GameSprite {

    private lab_order: eui.Label;
    private lab_time: eui.Label;
    private lab_card: eui.Label;

    public recordVo: TransferRecordVo;

    public constructor() {
        super();

        this.skinName = "TransferRecordDetailsItemSkin";
    }

    public childrenCreated() {
        super.childrenCreated();

        this.update(this.recordVo);
    }

    public update(recordVo: TransferRecordVo) {
        if (recordVo) {
            this.recordVo = recordVo;
            this.lab_order.text = "订 单 号: " + this.recordVo.orderno;
            this.lab_time.text  = "交易时间: " + "" + StringUtils.getYTDByTimestamp(this.recordVo.ctime) + " " + StringUtils.getHMSByTimestamp(this.recordVo.ctime);
            this.lab_card.text  = "房卡数量: " + this.recordVo.num;
        }
    }
}