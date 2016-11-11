/**
 * AgentAppendScene
 * @Author Ace.c
 * @Create 2016-11-08 10:11
 */
var AgentAppendScene = (function (_super) {
    __extends(AgentAppendScene, _super);
    function AgentAppendScene() {
        _super.call(this);
        this.lastTime = 0;
        this.skinName = "AgentAppendSceneSkin";
        this.id = SceneType.agent_append;
    }
    var d = __define,c=AgentAppendScene,p=c.prototype;
    p.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.lab_uid.restrict = "0-9";
        // this.lab_phone.restrict = "^[1][358][0-9]{9}$";
        this.lab_phone.restrict = "0-9";
        this.lab_server.maxChars = 10;
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
        this.timerHandler();
        this.menu_province.addEventListener(MenuPopup.CHANGE, this.onUpdateMenu, this);
        this.menu_city.addEventListener(MenuPopup.CHANGE, this.onUpdateMenu, this);
        this.menu_area.addEventListener(MenuPopup.CHANGE, this.onUpdateMenu, this);
        this.btn_code.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_confirm.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.gameManager.addEventListener(EventType.Agent_Success, this.clear, this);
        this.gameManager.timerManager.addEventListener(TimerManager.Second, this.timerHandler, this);
    };
    p.timerHandler = function () {
        this.lastTime--;
        this.btn_code.label = this.lastTime <= 0 ? "获取验证码" : StringUtils.getTimeStr2(this.lastTime) + "后重新获取";
        this.btn_code.enabled = this.lastTime <= 0;
        this.btn_code.width = this.lastTime <= 0 ? 160 : 300;
    };
    p.onUpdateMenu = function (e) {
        switch (e.data) {
            case this.menu_province:
                this.menu_city.update(this.gameManager.getCitys(this.menu_province.getSelectedValue()));
                this.menu_area.update(this.gameManager.getAreas(this.menu_province.getSelectedValue(), this.menu_city.getSelectedValue()));
                break;
            case this.menu_city:
                this.menu_area.update(this.gameManager.getAreas(this.menu_province.getSelectedValue(), this.menu_city.getSelectedValue()));
                break;
        }
    };
    p.clickHandler = function (e) {
        switch (e.currentTarget) {
            case this.btn_code:
                if (!this.lab_phone.text || this.lab_phone.text == "") {
                    this.gameManager.alertManager.open(AlertType.Normal, "请填写手机号码");
                    return true;
                }
                this.lastTime = core.PhoneCodeReTime;
                this.gameManager.msgManager.agent.getPhoneCode(Number(this.lab_phone.text));
                break;
            case this.btn_confirm:
                if (this.checkNull(this.lab_uid.text) ||
                    this.checkNull(this.menu_game.getSelectedValue()) ||
                    this.checkNull(this.lab_weixin.text) ||
                    this.checkNull(this.lab_phone.text) ||
                    this.checkNull(this.lab_code.text) ||
                    this.checkNull(this.menu_province.getSelectedValue()) ||
                    this.checkNull(this.menu_city.getSelectedValue()) ||
                    this.checkNull(this.menu_area.getSelectedValue()) ||
                    this.checkNull(this.lab_server.text)) {
                    return;
                }
                this.gameManager.msgManager.agent.appent(this.lab_uid.text, this.gameManager.dataManager.userVo.getGameId(this.menu_game.getSelectedValue()), this.lab_weixin.text, this.lab_phone.text, this.lab_code.text, this.menu_province.getSelectedValue(), this.menu_city.getSelectedValue(), this.menu_area.getSelectedValue(), this.lab_server.text);
                break;
        }
    };
    p.open = function () {
        _super.prototype.open.call(this);
        if (this.initComplete) {
            this.menu_province.update(this.gameManager.getProvinces());
        }
    };
    p.clear = function () {
        this.lab_uid.text = "";
        this.lab_weixin.text = "";
        this.lab_phone.text = "";
        this.lab_code.text = "";
        this.lab_server.text = "";
        this.menu_province.update(this.gameManager.getProvinces());
    };
    /**
     * 检测空值
     * @param str
     */
    p.checkNull = function (str) {
        if (!str || str == "") {
            this.gameManager.alertManager.open(AlertType.Normal, "所有项均为必填项,请确认");
            return true;
        }
        return false;
    };
    return AgentAppendScene;
}(BaseScene));
egret.registerClass(AgentAppendScene,'AgentAppendScene');
