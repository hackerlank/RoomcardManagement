/**
 * BaseUI
 * @Author Ace.c
 * @Create 2016-10-25 19:48
 */
class BaseUI extends GameSprite {


    public constructor() {
        super();
    }

    public open(): void {
        super.show();

        if (!this.gameManager.layerUI.contains(this)) {
            this.gameManager.layerUI.addChild(this);
        }
    }

    public close(): void {
        super.hide();

        if (this.gameManager.layerUI.contains(this)) {
            this.gameManager.layerUI.removeChild(this);
        }
    }
}