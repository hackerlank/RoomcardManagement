/**
 * Created by Ace.C on 2016/4/15.
 */
class BaseScene extends GameSprite {

    public constructor() {
        super();
    }

    public open():void {
        super.show();

        if (!this.gameManager.layerScene.contains(this)) {
            this.top = this.left = this.right = 0;
            this.bottom = 80;
            this.gameManager.layerScene.addChild(this);
        }
    }

    public close():void {
        super.hide();

        if (this.gameManager.layerScene.contains(this)) {
            this.gameManager.layerScene.removeChild(this);
        }
    }
}