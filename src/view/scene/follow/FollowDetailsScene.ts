/**
 * FollowDetailsScene
 * @Author Ace.c
 * @Create 2016-10-26 15:35
 */
class FollowDetailsScene extends BaseScene {

    private img_portrait: eui.Image;
    private lab_nick: eui.TextInput;
    private lab_id: eui.TextInput;
    private lab_buy: eui.TextInput;
    private btn_transfer: eui.Button;
    private lab_phone: eui.TextInput;
    private scroller: eui.Scroller;
    private itemGroup: eui.Group;
    private ttl_page: TurningTool;

    public followVo: LowerUserVo;
    public recordList: TransferRecordVo[];
    public page: number = 1;

    public constructor() {
        super();

        this.skinName = "FollowDetailsSceneSkin";
        this.id = SceneType.follow_details;
    }

    public childrenCreated() {
        super.childrenCreated();

        this.ttl_page.setScope(1, Math.ceil(this.gameManager.dataManager.transferRecordLength / core.pageLength));

        this.ttl_page.addEventListener(CommonEventType.CHANGED, this.onUpdateCount, this);

        this.update();

        this.btn_transfer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);

        this.gameManager.addEventListener(EventType.Transfer_List, this.onUpdateInfo, this);
    }

    private clickHandler(e: egret.TouchEvent) {
        switch (e.currentTarget) {
            case this.btn_transfer:
                if (this.followVo) {
                    this.gameManager.sceneManager.open(SceneType.transfer);
                    this.gameManager.dispatchEvent(EventType.LowerUser_Selected, this.followVo.uid);
                }
                break;
        }
    }

    private onUpdateCount() {
        this.page = this.ttl_page.page;
        if (this.gameManager.dataManager.getTransferRecordList.length < this.page * core.pageLength) {
            this.gameManager.msgManager.transfer.sendTransferRecords("", this.page, core.pageLength);
        }
    }

    private onUpdateInfo() {
        this.ttl_page.setScope(1, Math.ceil(this.gameManager.dataManager.transferRecordLength / core.pageLength));
        this.update();
    }

    public update() {
        this.itemGroup.removeChildren();

        this.followVo = this.gameManager.dataManager.selectedFollow;
        if (this.followVo) {
            this.lab_nick.text = this.followVo.nick;
            this.lab_id.text = "ID:" + this.followVo.uid;
            this.lab_buy.text = "已购:" + this.followVo.zong;

            this.recordList = this.gameManager.dataManager.getTransferRecordList(this.followVo.uid);
            if (this.recordList) {
                var item: TransferRecordDetailsItem;
                var start: number = core.pageLength * (this.page - 1);
                for (var i: number = start; i < start + core.pageLength; i++) {
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
    }

    public open() {
        super.open();

        if (this.initComplete) {
            this.followVo = this.gameManager.dataManager.selectedFollow;
            this.page = 1;
            this.gameManager.msgManager.transfer.sendTransferRecords(this.followVo.uid, this.page, core.pageLength);
        }
    }
}