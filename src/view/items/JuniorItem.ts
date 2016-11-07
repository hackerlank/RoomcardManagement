/**
 * JuniorItem
 * @Author Ace.c
 * @Create 2016-10-27 15:03
 */
class JuniorItem extends GameSprite {

    private img_portrait: eui.Image;
    private lab_nick: eui.TextInput;
    private lab_id: eui.TextInput;
    private lab_buyCard: eui.TextInput;
    private lab_contribution: eui.TextInput;

    public juniorVo: JuniorVo;

    public constructor() {
        super();

        this.skinName = "JuniorItemSkin";
    }

    public childrenCreated() {
        super.childrenCreated();
    }

    public update(vo: JuniorVo) {
        this.juniorVo = vo;

        this.img_portrait.source = "" + this.juniorVo.pic;
        this.lab_nick.text = "" + this.juniorVo.nick;
        this.lab_id.text = "ID:" + this.juniorVo.uid;
        this.lab_buyCard.text = "本月购卡:" + this.juniorVo.sum;
        this.lab_contribution.text = "本月贡献:" + this.juniorVo.rew;
    }
}