/**
 * LowerUserContributionVo
 * @Author Ace.c
 * @Create 2016-10-27 15:08
 */
class LowerUserContributionVo extends BaseVo {

    public nick: string;
    public pic: string;
    public uid: string;
    public sum: number;
    public rew: number;

    public constructor() {
        super();
    }

    public update(data: any): void {
        super.update(data);

        this.sum = data.cur;
        this.rew = data.zong;
    }
}