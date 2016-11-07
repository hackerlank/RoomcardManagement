/**
 * BaseMsg
 * @Author Ace.c
 * @Create 2016-10-30 11:19
 */
class BaseMsg {
    public gameManager: GameManager;

    public constructor() {
        this.gameManager = GameManager.getInstance();
    }
}