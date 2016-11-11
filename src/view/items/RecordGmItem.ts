/**
 * RecordGmItem
 * @Author Ace.c
 * @Create 2016-11-10 19:39
 */
class RecordGmItem extends GameSprite {

    private lab_description: eui.Label;

    public constructor() {
        super();

        this.skinName = "RecordGmItemSkin";
    }

    public childrenCreated() {
        super.childrenCreated();
    }

    public update(data: any) {
        var ytd: string = StringUtils.getYTDByTimestamp(data.ctime);
        var hms: string = StringUtils.getHMSByTimestamp(data.ctime);
        var des: string;

        switch (data.opt) {
            case 1://增加
                des = "将" + data.taruid + "设置成代理";
                break;
            case 2://转账
                des = "给" + data.taruid + "充值" + data.num + "张房卡";
                break;
            case 3://扣卡
                des = "扣除" + data.taruid + "的房卡共" + data.num + "张";
                break;
            case 4://卡关代理 num(2开 0关)
                des = data.num == 0 ? "取消" + data.taruid + "的代理资格" : "将" + data.taruid + "设置成代理";
                break;
        }

        this.lab_description.text = ytd + " " + hms + " " + des;
    }
}