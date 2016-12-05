/**
 * AccountAgentScene
 * @Author Ace.c
 * @Create 2016-11-09 15:07
 */
class AccountAgentScene extends BaseScene {

    private lab_phone: eui.TextInput;
    private btn_search: eui.Button;
    private menu_game: MenuPopup;
    private img_portrait: eui.Image;
    private lab_nick: eui.TextInput;
    private lab_card: eui.TextInput;
    private lab_game: eui.TextInput;
    private nba_count: NumberAdder;
    private btn_recharge: eui.Button;
    private btn_deduct: eui.Button;
    private btn_agent_on: eui.Button;
    private btn_agent_off: eui.Button;
    private btn_checkcenter_on: eui.Button;
    private btn_checkcenter_off: eui.Button;
    private btn_record: eui.Button;

    private userVo: UserVo;
    private searchUserGid: any;

    public constructor() {
        super();

        this.skinName = "AccountAgentSceneSkin";
        this.id = SceneType.account_agent;
    }

    public childrenCreated() {
        super.childrenCreated();

        this.userVo = this.gameManager.dataManager.userVo;

        this.menu_game.enabled = true;
        this.menu_game.update(this.userVo.getGames());

        this.nba_count.setMaxChars(6);

        this.btn_search.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_recharge.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_deduct.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_agent_on.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_agent_off.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_checkcenter_on.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_checkcenter_off.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_record.addEventListener(egret.TouchEvent.TOUCH_TAP, this.recordHandler, this);

        this.gameManager.addEventListener(EventType.Agent_Update, this.onUpdateInfo, this);
    }

    private recordHandler(e: egret.TouchEvent) {
        this.gameManager.sceneManager.open(SceneType.account_agent_record);
    }

    private clickHandler(e: egret.TouchEvent) {
        var phone: string = "" + this.lab_phone.text;
        if (phone == "") {
            this.gameManager.alertManager.open(AlertType.Normal, "请填写手机号码");
            return;
        }

        switch (e.currentTarget) {
            case this.btn_search:
                //TODO 查询房卡
                this.searchUserGid = null;
                this.gameManager.msgManager.agent.search(phone, this.userVo.getGameId(this.menu_game.getSelectedValue()));
                break;
            case this.btn_recharge:
                //TODO 充值房卡
                if (this.searchUserGid) {
                    this.gameManager.msgManager.agent.recharge(phone, this.nba_count.numb, this.searchUserGid);
                }
                break;
            case this.btn_deduct:
                //TODO 扣除房卡
                if (this.searchUserGid) {
                    this.gameManager.msgManager.agent.deduct(phone, this.nba_count.numb, this.searchUserGid);
                }
                break;
            case this.btn_agent_on:
                //TODO 开启代理
                if (this.searchUserGid) {
                    this.gameManager.msgManager.agent.offOn(phone, 1, this.searchUserGid);
                }
                break;
            case this.btn_agent_off:
                //TODO 取消代理
                if (this.searchUserGid) {
                    this.gameManager.msgManager.agent.offOn(phone, 0, this.searchUserGid);
                }
                break;
            case this.btn_checkcenter_on:
                //TODO 开启结算
                if (this.searchUserGid) {
                    this.gameManager.msgManager.agent.checkcenter_OffOn(phone, 1, this.searchUserGid);
                }
                break;
            case this.btn_checkcenter_off:
                //TODO 关闭结算
                if (this.searchUserGid) {
                    this.gameManager.msgManager.agent.checkcenter_OffOn(phone, 0, this.searchUserGid);
                }
                break;
        }
    }

    private onUpdateInfo(data: any) {

        if (data.hasOwnProperty("gid")) {
            this.searchUserGid = data.gid;
        }

        if (data.hasOwnProperty("pic")) {
            this.img_portrait.source = "" + data.pic;
        }
        if (data.hasOwnProperty("nick")) {
            this.lab_nick.text = "" + data.nick;
        }
        if (data.hasOwnProperty("gid")) {
            this.lab_game.text = "" + this.userVo.getGameName(data.gid);
        }
        if (data.hasOwnProperty("cdnum")) {
            this.lab_card.text = "房卡:" + data.cdnum;
        }
    }
}