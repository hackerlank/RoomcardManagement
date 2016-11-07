/**
 * TransferRecordItem
 * @Author Ace.c
 * @Create 2016-10-27 14:18
 */
class TransferRecordItem extends GameSprite {

    public lab_id: eui.Label;
    public lab_name: eui.Label;
    public lab_count: eui.Label;
    public lab_time: eui.Label;

    public recordVo: TransferRecordVo;

    public constructor() {
        super();

        this.skinName = "TransferRecordItemSkin";
    }

    public childrenCreated() {
        super.childrenCreated();
    }

    public update(recordVo: TransferRecordVo = null) {
        this.recordVo = recordVo;

        var userVo: UserVo = this.gameManager.dataManager.userVo;

        if (this.recordVo) {
            this.lab_id.text = "" + this.recordVo.uid;
            this.lab_name.text = "" + userVo.getGameName(this.recordVo.gid);
            this.lab_count.text = "" + this.recordVo.num;
            this.lab_time.text = "" + StringUtils.getYTDByTimestamp(this.recordVo.ctm) + "\n" + StringUtils.getHMSByTimestamp(this.recordVo.ctm);
        }
    }
}