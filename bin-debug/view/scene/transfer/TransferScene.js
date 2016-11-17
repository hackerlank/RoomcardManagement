/**
 * TransferScene
 * @Author Ace.c
 * @Create 2016-10-25 20:01
 */
var TransferScene = (function (_super) {
    __extends(TransferScene, _super);
    function TransferScene() {
        _super.call(this);
        this.skinName = "TransferSceneSkin";
        this.id = SceneType.transfer;
    }
    var d = __define,c=TransferScene,p=c.prototype;
    p.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.onUpdateNotice();
        this.txt_uid.restrict = "0-9";
        this.txt_uid.maxChars = 10;
        this.userVo = this.gameManager.dataManager.userVo;
        switch (this.userVo.pow) {
            case Power.gm:
                this.menu_game.enabled = true;
                this.menu_game.update(this.userVo.getGames());
                break;
            case Power.agent:
            case Power.agent_new:
                this.menu_game.enabled = false;
                this.menu_game.update([this.userVo.getGameName(this.userVo.gid)]);
                break;
        }
        this.nba_count.setMaxChars(6);
        this.btn_search.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_recharge.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.gameManager.addEventListener(EventType.LowerUser_Selected, this.onUpdateFollow, this);
        this.gameManager.addEventListener(EventType.Transfer_Search, this.onUpdateSearch, this);
        this.gameManager.addEventListener(EventType.Transfer_Success, this.onUpdateSuccess, this);
    };
    p.clickHandler = function (e) {
        if (this.txt_uid.text == "") {
            this.gameManager.alertManager.open(AlertType.Normal, Lang.getText(1001));
            return;
        }
        var gid;
        if (this.userVo.pow == Power.gm) {
            gid = this.userVo.getGameId(this.menu_game.getSelectedValue());
        }
        else {
            gid = this.userVo.gid;
        }
        switch (e.currentTarget) {
            case this.btn_search:
                this.gameManager.msgManager.transfer.searchUser(this.txt_uid.text, gid);
                break;
            case this.btn_recharge:
                this.gameManager.msgManager.transfer.sendTransfer(this.txt_uid.text, gid, this.nba_count.numb);
                break;
        }
    };
    p.onUpdateSuccess = function (addNum) {
        var zong = Number(this.lab_card.text.split(":")[1]) + addNum;
        this.lab_card.text = "房卡:" + zong;
    };
    p.onUpdateSearch = function (data) {
        this.img_portrait.source = "" + data.pic;
        this.lab_nick.text = "" + data.nick;
        this.lab_card.text = "房卡:" + data.cur;
    };
    p.onUpdateFollow = function (data) {
        if (data) {
            this.txt_uid.text = "" + data;
        }
    };
    p.onUpdateNotice = function () {
        this.container.removeChildren();
        var _this = this;
        this.gameManager.httpManager.send(core.Notice01, null, function (msg) {
            var data;
            for (var id in msg) {
                if (!msg[id])
                    continue;
                data = msg[id];
                var arr = [];
                var style = {};
                style.textAlign = data.align ? data.align : "left";
                style.fontFamily = data.font ? data.font : "微软雅黑";
                style.textColor = data.color ? data.color : 0x000000;
                style.bold = data.bold ? data.bold : false;
                style.size = data.size ? data.size : 24;
                style.lineSpacing = data.lineSpacing ? data.lineSpacing : 5;
                arr.push({
                    text: data["txt"],
                    style: style
                });
                var label = FactoryUtils.getLabel(style.textAlign);
                label.lineSpacing = style.lineSpacing;
                label.multiline = true;
                label.wordWrap = true;
                label.width = 550;
                label.textFlow = arr;
                _this.container.addChild(label);
            }
            _this.scroller.viewport.scrollV = 0;
            _this.scroller.validateNow();
        });
    };
    p.open = function () {
        _super.prototype.open.call(this);
        if (this.initComplete) {
            this.txt_uid.text = "";
            this.img_portrait.source = "img_portrait_default";
            this.lab_nick.text = "";
            this.lab_card.text = "";
            this.nba_count.setNumb(0);
        }
    };
    return TransferScene;
}(BaseScene));
egret.registerClass(TransferScene,'TransferScene');
