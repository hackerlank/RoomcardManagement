/**
 * FollowDetailsScene
 * @Author Ace.c
 * @Create 2016-10-26 15:35
 */
var FollowDetailsScene = (function (_super) {
    __extends(FollowDetailsScene, _super);
    function FollowDetailsScene() {
        _super.call(this);
        this.page = 1;
        this.skinName = "FollowDetailsSceneSkin";
        this.id = SceneType.follow_details;
    }
    var d = __define,c=FollowDetailsScene,p=c.prototype;
    p.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.ttl_page.setScope(1, Math.ceil(this.gameManager.dataManager.transferRecordLength / core.pageLength));
        this.ttl_page.addEventListener(CommonEventType.CHANGED, this.onUpdateCount, this);
        this.update();
        this.btn_transfer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.gameManager.addEventListener(EventType.Transfer_List, this.onUpdateInfo, this);
    };
    p.clickHandler = function (e) {
        switch (e.currentTarget) {
            case this.btn_transfer:
                if (this.followVo) {
                    this.gameManager.sceneManager.open(SceneType.transfer);
                    this.gameManager.dispatchEvent(EventType.LowerUser_Selected, this.followVo.uid);
                }
                break;
        }
    };
    p.onUpdateCount = function () {
        this.page = this.ttl_page.page;
        if (this.gameManager.dataManager.getTransferRecordList.length < this.page * core.pageLength) {
            this.gameManager.msgManager.transfer.sendTransferRecords("", this.page, core.pageLength);
        }
    };
    p.onUpdateInfo = function () {
        this.ttl_page.setScope(1, Math.ceil(this.gameManager.dataManager.transferRecordLength / core.pageLength));
        this.update();
    };
    p.update = function () {
        this.itemGroup.removeChildren();
        this.followVo = this.gameManager.dataManager.selectedFollow;
        if (this.followVo) {
            this.lab_nick.text = this.followVo.nick;
            this.lab_id.text = "ID:" + this.followVo.uid;
            this.lab_buy.text = "已购:" + this.followVo.zong;
            this.recordList = this.gameManager.dataManager.getTransferRecordList(this.followVo.uid);
            if (this.recordList) {
                var item;
                var start = core.pageLength * (this.page - 1);
                for (var i = start; i < start + core.pageLength; i++) {
                    if (i >= this.recordList.length) {
                        break;
                    }
                    item = new TransferRecordDetailsItem();
                    item.update(this.recordList[i]);
                    this.itemGroup.addChild(item);
                }
                this.scroller.viewport.scrollV = 0;
                this.scroller.validateNow();
            }
        }
    };
    p.open = function () {
        _super.prototype.open.call(this);
        if (this.initComplete) {
            this.followVo = this.gameManager.dataManager.selectedFollow;
            this.page = 1;
            this.gameManager.msgManager.transfer.sendTransferRecords(this.followVo.uid, this.page, core.pageLength);
        }
    };
    return FollowDetailsScene;
}(BaseScene));
egret.registerClass(FollowDetailsScene,'FollowDetailsScene');
