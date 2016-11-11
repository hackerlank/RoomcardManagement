/**
 * TransferRecordVo
 * @Author Ace.c
 * @Create 2016-10-27 14:19
 */
class TransferRecordVo extends BaseVo {

    //操作者id
    public ident:string;
    //操作目标id
    public tarid:string;
    //操作目标昵称
    public tarname:string;
    //游戏id
    public gameid: string;
    //收支 (1购买 2转账 3一级代理返卡 4二级代理返卡 5销售返利)
    public opt: number;
    //状态
    public stu: number;
    //数量
    public num: number = 0;
    //订单
    public orderno: string;
    //时间
    public ctime: number;

    public constructor() {
        super();
    }
}