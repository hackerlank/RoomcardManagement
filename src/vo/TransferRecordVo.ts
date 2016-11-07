/**
 * TransferRecordVo
 * @Author Ace.c
 * @Create 2016-10-27 14:19
 */
class TransferRecordVo extends BaseVo {

    //uid
    public uid: string;
    //游戏id
    public gid: string;
    //游戏
    public gam: string = "";
    //收支 (1支出 2收入)
    public opt: number;
    //状态
    public stu: number;
    //数量
    public num: number = 0;
    //订单
    public odr: string;
    //时间
    public ctm: number;

    public constructor() {
        super();
    }

    public update(data: any) {
        super.update(data);

        if (data.hasOwnProperty("gid")) {
            this.gam = core.gameManager.dataManager.getGameName(this.gid);
        }
        else {
            this.gam = core.gameManager.dataManager.getGameName(core.gameManager.dataManager.userVo.gid);
        }
    }
}