/**
 * RecordGmItem
 * @Author Ace.c
 * @Create 2016-11-10 19:39
 */
var RecordGmItem = (function (_super) {
    __extends(RecordGmItem, _super);
    function RecordGmItem() {
        _super.call(this);
        this.skinName = "RecordGmItemSkin";
    }
    var d = __define,c=RecordGmItem,p=c.prototype;
    p.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    p.update = function (data) {
        var ytd = StringUtils.getYTDByTimestamp(data.ctime);
        var hms = StringUtils.getHMSByTimestamp(data.ctime);
        var des;
        switch (data.opt) {
            case 1:
                des = "将" + data.taruid + "设置成代理";
                break;
            case 2:
                des = "给" + data.taruid + "充值" + data.num + "张房卡";
                break;
            case 3:
                des = "扣除" + data.taruid + "的房卡共" + data.num + "张";
                break;
            case 4:
                des = data.num == 0 ? "取消" + data.taruid + "的代理资格" : "将" + data.taruid + "设置成代理";
                break;
        }
        this.lab_description.text = ytd + " " + hms + " " + des;
    };
    return RecordGmItem;
}(GameSprite));
egret.registerClass(RecordGmItem,'RecordGmItem');
