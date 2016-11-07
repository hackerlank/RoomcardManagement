/**
 * LowerUserContributionItem
 * @Author Ace.c
 * @Create 2016-10-27 15:03
 */
var LowerUserContributionItem = (function (_super) {
    __extends(LowerUserContributionItem, _super);
    function LowerUserContributionItem() {
        _super.call(this);
        this.skinName = "LowerUserContributionItemSkin";
    }
    var d = __define,c=LowerUserContributionItem,p=c.prototype;
    p.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    p.update = function (vo) {
        this.juniorVo = vo;
        this.img_portrait.source = "" + this.juniorVo.pic;
        this.lab_nick.text = "" + this.juniorVo.nick;
        this.lab_id.text = "ID:" + this.juniorVo.uid;
        this.lab_buyCard.text = "本月购卡:" + this.juniorVo.sum;
        this.lab_contribution.text = "本月贡献:" + this.juniorVo.rew;
    };
    return LowerUserContributionItem;
}(GameSprite));
egret.registerClass(LowerUserContributionItem,'LowerUserContributionItem');
