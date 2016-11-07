/**
 * BaseMessage
 * @Author Ace.c
 * @Create 2016-10-30 11:19
 */
class BaseMessage {

    public gameManager: GameManager;

    public constructor() {

        this.gameManager = GameManager.getInstance();
    }

}