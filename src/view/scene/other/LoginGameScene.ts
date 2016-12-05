/**
 * LoginGameScene
 * @Author Ace.c
 * @Create 2016-11-09 15:40
 */
class LoginGameScene extends BaseScene {

    private areaScroller: eui.Scroller;
    private areaGroup: eui.Group;
    private gameScroller: eui.Scroller;
    private gameGroup: eui.Group;

    private opened: string = "已开通";

    private areaList: string[];
    private gameList: string[];

    private selectArea: eui.Button;

    public constructor() {
        super();

        this.skinName = "LoginGameSceneSkin";
        this.id = SceneType.loginGame;
    }

    public childrenCreated() {
        super.childrenCreated();

        this.update();
    }

    private update() {
        this.flushArea();
        this.flushGame(this.opened);
    }

    private flushArea() {
        this.areaList = this.getAreas();

        this.areaGroup.removeChildren();

        var button: eui.Button = new eui.Button();
        button.skinName = "skins.Button_WhiteSkin";
        button.label = this.opened;
        this.areaGroup.addChild(button);

        button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.areaButtonHandler, this);

        for (var i: number = 0; i < this.areaList.length; i++) {
            button = new eui.Button();
            button.skinName = "skins.Button_WhiteSkin";
            button.label = this.areaList[i];
            this.areaGroup.addChild(button);

            button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.areaButtonHandler, this);
        }
    }

    private areaButtonHandler(e: egret.TouchEvent) {
        this.selectArea && (this.selectArea.enabled = true);
        this.selectArea = e.currentTarget;
        this.selectArea.enabled = false;
        this.flushGame(this.selectArea.label);
    }

    private flushGame(area: string) {
        this.gameList = this.getAreaGames(area);

        this.gameGroup.removeChildren();

        var game: any;
        var button: eui.Button;

        for (var i: number = 0; i < this.gameList.length; i++) {
            game = this.gameList[i];

            button = new eui.Button();
            button.height = 60;
            switch (game.open) {
                case 0:
                    button.skinName = "skins.ButtonGray01Skin";
                    break;
                case 1:
                    button.skinName = "skins.ButtonGreen01Skin";
                    break;
                case 2:
                    button.skinName = "skins.ButtonRed01Skin";
                    break;
            }
            button.label = game.name;
            this.gameGroup.addChild(button);

            button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gameButtonHandler, this);
        }
    }

    private gameButtonHandler(e: egret.TouchEvent) {
        var game: any;
        for (var i: number = 0; i < this.gameList.length; i++) {
            game = this.gameList[i];
            if (game.name == e.currentTarget.label) {
                this.gameManager.msgManager.login.sendLoginGame(game.gid);
                return;
            }
        }
    }

    public open(): void {
        super.open();

        this.bottom = 0;

        this.areaScroller.viewport.scrollV = 0;
        this.areaScroller.validateNow();
        this.gameScroller.viewport.scrollV = 0;
        this.gameScroller.validateNow();

        this.update();
    }

    private getAreas() {
        var areas: any[] = [];
        var game: any;
        for (var i: number = 0; i < core.gameDatas.length; i++) {
            game = core.gameDatas[i];
            if (areas.indexOf(game.area) == -1) {
                areas.push(game.area);
            }
        }
        return areas;
    }

    private getAreaGames(area: string) {
        var games: any[] = [];
        var game: any;
        for (var i: number = 0; i < core.gameDatas.length; i++) {
            game = core.gameDatas[i];
            if (game) {
                if (game.area == area || (area == this.opened && game.open == 1)) {
                    games.push(game);
                }
            }
        }
        return games;
    }
}