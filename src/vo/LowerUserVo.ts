/**
 * LowerUserVo
 * @Author Ace.c
 * @Create 2016-10-27 13:26
 */
class LowerUserVo extends BaseVo {

    public uid: string;
    public nick: string;
    public pic: string;
    public cur: number = 0;
    public zong: number = 0;
    public status: string;

    public constructor() {
        super();
    }
}