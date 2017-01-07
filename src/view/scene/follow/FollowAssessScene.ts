/**
 * FollowAssessScene
 * @Author Ace.c
 * @Create 2016-10-25 20:01
 */
class FollowAssessScene extends BaseScene {

    private txt_uid: eui.TextInput;
    private btn_search: eui.Button;
    private img_portrait: eui.Image;
    private bar_assess: AssessBar;
    private lab_nick: eui.TextInput;
    private lab_zan: eui.Label;
    private lab_cai: eui.Label;
    private lab_count_max: eui.Label;
    private lab_count_cur: eui.Label;
    private btn_zan: eui.Button;
    private btn_cai: eui.Button;
    private scroller: eui.Scroller;
    private container: eui.Group;
    private lab_title: eui.Label;
    private lab_rule: eui.Label;

    private userVo: UserVo;
    private zan: number = 0;
    private cai: number = 0;

    public constructor() {
        super();

        this.skinName = "FollowAssessSceneSkin";
        this.id = SceneType.follow_assess;
    }

    public childrenCreated() {
        super.childrenCreated();

        this.userVo = this.gameManager.dataManager.userVo;

        this.txt_uid.restrict = "0-9";
        this.txt_uid.maxChars = 10;

        this.lab_title.textFlow = <Array<egret.ITextElement>>[
            {text: "评价功能说明", style: {size: 28}}
        ];

        this.lab_rule.lineSpacing = 10;
        this.lab_rule.textFlow = <Array<egret.ITextElement>>[
            {
                text: "1、根据上一个月充值额度，每月月初会赠送代理一定数量的评价机会。",
                style: {size: 24}
            },
            {
                text: "查看\n",
                style: {size: 24, textColor: 0x19FF00, underline: true, href: "event:check"}
            },
            {
                text: "" +
                "2、代理每踩或赞一次玩家，会消耗1次评价机会。\n" +
                "3、每次踩（赞）会将该玩家3个好评（差评）修改为差评（好评）。\n" +
                "4、评价次数每月月初重置，本月未使用的次数不会累加到下月。",
                style: {size: 24}
            }
        ];

        this.lab_rule.addEventListener(egret.TextEvent.LINK, this.textHandler, this);

        this.btn_search.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_zan.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_cai.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);

        this.gameManager.addEventListener(EventType.Transfer_Search, this.onUpdateSearch, this);
        this.gameManager.addEventListener(EventType.LowerUser_Assess, this.onUpdateSearch, this);
    }

    private textHandler(e: egret.TextEvent) {
        if (e.text == "check") {
            this.gameManager.alertManager.open(AlertType.AssessCount);
        }
    }

    private clickHandler(e: egret.TouchEvent) {
        if (this.txt_uid.text == "") {
            this.gameManager.alertManager.open(AlertType.Normal, Lang.getText(1001));
            return;
        }

        var _this = this;

        switch (e.currentTarget) {
            case this.btn_search:
                this.gameManager.msgManager.transfer.searchUser(this.txt_uid.text, this.userVo.gid);
                break;
            case this.btn_cai:
                if (this.zan <= 0) {
                    this.gameManager.alertManager.open(AlertType.Normal, "差评已满，不能再踩了。");
                    return;
                }
                this.gameManager.alertManager.open(AlertType.Normal, {
                    des: "您确定要踩ta一次么?", callback: function () {
                        _this.gameManager.msgManager.transfer.assess(_this.txt_uid.text, _this.userVo.gid, 1);
                    }
                });
                break;
            case this.btn_zan:
                if (this.cai <= 0) {
                    this.gameManager.alertManager.open(AlertType.Normal, "好评已满，不能再赞了。");
                    return;
                }
                this.gameManager.alertManager.open(AlertType.Normal, {
                    des: "您确定要赞ta一次么?", callback: function () {
                        _this.gameManager.msgManager.transfer.assess(_this.txt_uid.text, _this.userVo.gid, 2);
                    }
                });
                break;
        }
    }

    private onUpdateSearch(data: any) {
        this.lab_count_max.text = "本月奖励次数:" + this.userVo.zcrtotal;
        this.lab_count_cur.text = "本月剩余次数:" + this.userVo.zcrused;

        if (data.hasOwnProperty("pic")) {
            this.img_portrait.source = "" + data.pic;
        }

        if (data.hasOwnProperty("nick")) {
            this.lab_nick.text = "" + data.nick;
        }

        if (data.hasOwnProperty("zan")) {
            this.zan = Number(data.zan);
            this.lab_zan.text = "" + data.zan;
        }

        if (data.hasOwnProperty("cai")) {
            this.cai = Number(data.cai);
            this.lab_cai.text = "" + data.cai;
        }

        this.bar_assess.update(this.cai, this.zan);

        this.btn_zan.enabled = this.cai > 0;
        this.btn_cai.enabled = this.zan > 0;
    }

    public open() {
        super.open();

        if (this.initComplete) {
            this.txt_uid.text = "";
            this.img_portrait.source = "img_portrait_default";
            this.lab_nick.text = "";
            this.lab_zan.text = "";
            this.lab_cai.text = "";
            this.zan = 0;
            this.cai = 0;
            this.bar_assess.update();
            this.btn_zan.enabled = false;
            this.btn_cai.enabled = false;
        }
    }
}