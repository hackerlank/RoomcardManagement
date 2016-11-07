/**
 * AccountJuniorScene
 * @Author Ace.c
 * @Create 2016-10-26 16:33
 */
class AccountJuniorScene extends BaseScene {

    private lab_total: eui.TextInput;
    private btn_get: eui.Button;
    private scroller: eui.Scroller;
    private itemGroup: eui.Group;

    public userVo: UserVo;
    public juniorList: JuniorVo[];

    public constructor() {
        super();

        this.skinName = "AccountJuniorSceneSkin";
        this.id = SceneType.account_junior;
    }

    public childrenCreated() {
        super.childrenCreated();

        this.update();

        this.btn_get.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);

        this.gameManager.addEventListener(EventType.Junior_Info, this.onUpdateInfo, this);
    }

    private clickHandler(e: egret.TouchEvent) {
        switch (e.currentTarget) {
            case this.btn_get:
                this.gameManager.msgManager.junior.sendGetReward();
                break;
        }
    }

    private onUpdateInfo() {
        this.update();
    }

    public update() {
        this.userVo = this.gameManager.dataManager.userVo;
        this.lab_total.text = "" + this.userVo.juniorMonth + "月总贡献:" + this.userVo.juniorReward;

        this.juniorList = this.gameManager.dataManager.juniorList();
        this.itemGroup.removeChildren();

        if (this.juniorList && this.juniorList.length) {
            var item: JuniorItem;
            for (var i: number = 0; i < this.juniorList.length; i++) {
                item = new JuniorItem();
                item.update(this.juniorList[i]);
                this.itemGroup.addChild(item);
            }

            this.scroller.viewport.scrollV = 0;
            this.scroller.validateNow();
        }
    }

    public open() {
        super.open();

        if (this.initComplete) {
            this.gameManager.msgManager.junior.sendGetInfo();
        }
    }
}