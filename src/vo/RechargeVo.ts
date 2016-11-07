/**
 * RechargeVo
 * @Author Ace.c
 * @Create 2016-10-26 17:32
 */
class RechargeVo extends BaseVo {
    //充值id
    public id:number;
    //支付货币数量
    public pay:number;
    //获得房卡数量
    public card:number;
    //返利
    public rebate:number;

    public constructor() {
        super();
    }
}