/**
 * AccountBuyCardScene
 * @Author Ace.c
 * @Create 2016-11-07 12:22
 */
class AccountBuyCardScene extends BaseScene {

    private scroller: eui.Scroller;
    private itemGroup: eui.Group;
    private ttl_page: TurningTool;

    public constructor() {
        super();

        this.skinName = "AccountBuyCardSceneSkin";
        this.id = SceneType;
    }

    public childrenCreated() {
        super.childrenCreated();
    }
}