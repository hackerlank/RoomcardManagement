/**
 * WelcomScene
 * @Author Ace.c
 * @Create 2016-11-02 19:11
 */
class WelcomScene extends BaseScene {


    public constructor() {
        super();

        this.skinName = "WelcomSceneSkin";
        this.id = SceneType.welcom;
    }

    public childrenCreated() {
        super.childrenCreated();
    }

    public open():void {
        super.open();

        this.bottom = 0;
    }
}