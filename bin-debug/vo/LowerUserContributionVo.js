/**
 * LowerUserContributionVo
 * @Author Ace.c
 * @Create 2016-10-27 15:08
 */
var LowerUserContributionVo = (function (_super) {
    __extends(LowerUserContributionVo, _super);
    function LowerUserContributionVo() {
        _super.call(this);
    }
    var d = __define,c=LowerUserContributionVo,p=c.prototype;
    p.update = function (data) {
        _super.prototype.update.call(this, data);
        this.sum = data.cur;
        this.rew = data.zong;
    };
    return LowerUserContributionVo;
}(BaseVo));
egret.registerClass(LowerUserContributionVo,'LowerUserContributionVo');
