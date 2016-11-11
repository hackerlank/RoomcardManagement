/**
 * TransferInRecordItem
 * @Author Ace.c
 * @Create 2016-11-07 12:17
 */
class TransferInRecordItem extends GameSprite {

    private lab_time: eui.Label;
    private lab_event: eui.Label;
    private lab_count: eui.Label;

    public recordVo: TransferRecordVo;

    public constructor() {
        super();

        this.skinName = "TransferInRecordItemSkin";
    }

    public childrenCreated() {
        super.childrenCreated();
    }

    public update(recordVo: TransferRecordVo = null) {
        this.recordVo = recordVo;

        if (this.recordVo) {
            this.lab_time.text = "" + StringUtils.getYTDByTimestamp(this.recordVo.ctime) + " " + StringUtils.getHMSByTimestamp(this.recordVo.ctime);
            this.lab_event.text = "" + this.getEventName(this.recordVo.opt);
            this.lab_count.text = "" + this.recordVo.num;
        }
    }

    public getEventName(opt: number) {
        var str: string = "";
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
    }
}