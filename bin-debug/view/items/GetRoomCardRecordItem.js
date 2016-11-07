/**
 * GetRoomCardRecordItem
 * @Author Ace.c
 * @Create 2016-11-07 12:17
 */
var GetRoomCardRecordItem = (function (_super) {
    __extends(GetRoomCardRecordItem, _super);
    function GetRoomCardRecordItem() {
        _super.call(this);
        this.skinName = "GetRoomCardRecordItemSkin";
    }
    var d = __define,c=GetRoomCardRecordItem,p=c.prototype;
    p.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    return GetRoomCardRecordItem;
}(GameSprite));
egret.registerClass(GetRoomCardRecordItem,'BuyCardAndRewardRecordItem');
