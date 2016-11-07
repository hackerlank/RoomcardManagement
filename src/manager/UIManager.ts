/**
 * UIManager
 * @Author Ace.c
 * @Create 2016-10-25 19:49
 */
class UIManager extends BaseManager {

    //游戏管理器
    public gameManager: GameManager;

    public menuUI: MenuUI;

    public constructor() {
        super();

        this.initManager();
    }

    public initManager() {
        super.initManager();

        this.menuUI = new MenuUI();
    }
}