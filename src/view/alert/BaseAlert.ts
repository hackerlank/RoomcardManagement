/**
 * Created by Ace.C on 2016/4/15.
 */
class BaseAlert extends GameSprite {
    public constructor() {
        super();
    }

    public update(param: any) {

    }

    public open(): void {
        super.show();

        if (!this.gameManager.layerAlert.contains(this)) {
            this.left = this.right = this.bottom = this.top = 0;
            this.gameManager.layerAlert.addChild(this);
        }
    }

    public close(): void {
        super.hide();

        if (this.gameManager.layerAlert.contains(this)) {
            this.gameManager.layerAlert.removeChild(this);
        }
    }
}