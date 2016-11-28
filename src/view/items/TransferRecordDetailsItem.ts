/**
 * TransferRecordDetailsItem
 * @Author Ace.c
 * @Create 2016-10-31 10:39
 */
class TransferRecordDetailsItem extends GameSprite {

    private lab_order: eui.Label;
    private lab_time: eui.Label;
    private lab_card: eui.Label;
    private btn_cancel: eui.Button;

    public recordVo: TransferRecordVo;

    public constructor() {
        super();

        this.skinName = "TransferRecordDetailsItemSkin";
    }

    public childrenCreated() {
        super.childrenCreated();

        this.update(this.recordVo);

        this.btn_cancel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);

        this.gameManager.addEventListener(EventType.Transfer_Cancel, this.onUpdateCancel, this);
    }

    private clickHandler(e: egret.TouchEvent) {
        switch (e.currentTarget) {
            case this.btn_cancel:
                if ((core.svtm - this.recordVo.ctime) > 300000) {
                    this.gameManager.alertManager.open(AlertType.Normal, "订单完成5分钟内可以撤销, 现已超时,无法撤销");
                    return;
                }
                this.gameManager.msgManager.transfer.transferCancel(this.recordVo.orderno);
                break;
        }
    }

    private onUpdateCancel(order: string) {
        if (order && order == this.recordVo.orderno) {
            this.recordVo.status = 3;
            this.btn_cancel.visible = true;
            this.btn_cancel.enabled = false;
            this.btn_cancel.label = "已撤销";
        }
    }

    public update(recordVo: TransferRecordVo) {
        if (recordVo) {
            this.recordVo = recordVo;
            this.lab_order.text = "订 单 号: " + this.recordVo.orderno;
            this.lab_time.text = "交易时间: " + "" + StringUtils.getYTDByTimestamp(this.recordVo.ctime) + " " + StringUtils.getHMSByTimestamp(this.recordVo.ctime);
            this.lab_card.text = "房卡数量: " + this.recordVo.num;

            if (this.recordVo.status == 1 && (core.svtm - this.recordVo.ctime) > 300000) {
                this.btn_cancel.visible = false;
            }
            else {
                this.btn_cancel.visible = true;
                this.btn_cancel.enabled = this.recordVo.status == 1 && ((core.svtm - this.recordVo.ctime) <= 300000);
                this.btn_cancel.label = this.btn_cancel.enabled ? "撤销" : "已撤销";
            }
        }
    }
}