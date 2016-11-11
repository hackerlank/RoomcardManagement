/**
 * LoginScene
 * @Author Ace.c
 * @Create 2016-11-09 15:40
 */
var LoginScene = (function (_super) {
    __extends(LoginScene, _super);
    function LoginScene() {
        _super.call(this);
        this.lastTime = 0;
        this.skinName = "LoginSceneSkin";
        this.id = SceneType.login;
    }
    var d = __define,c=LoginScene,p=c.prototype;
    p.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.lab_phone.text = "15801595550";
        this.lab_phoneCode.text = "x.8088";
        this.btn_phoneCode.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btn_login.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.gameManager.timerManager.addEventListener(TimerManager.Second, this.timerHandler, this);
    };
    p.timerHandler = function () {
        this.lastTime--;
        this.btn_phoneCode.label = this.lastTime <= 0 ? "获取验证码" : StringUtils.getTimeStr2(this.lastTime) + "";
        this.btn_phoneCode.enabled = this.lastTime <= 0;
    };
    p.clickHandler = function (e) {
        switch (e.currentTarget) {
            case this.btn_phoneCode:
                if (!this.lab_phone.text || this.lab_phone.text == "") {
                    this.gameManager.alertManager.open(AlertType.Normal, "请填写手机号码");
                    return true;
                }
                this.lastTime = core.PhoneCodeReTime;
                this.gameManager.msgManager.agent.getPhoneCode(this.lab_phone.text, 1);
                break;
            case this.btn_login:
                if (!this.lab_phone.text || this.lab_phone.text == "") {
                    this.gameManager.alertManager.open(AlertType.Normal, "请填写手机号码");
                    return true;
                }
                if (!this.lab_phoneCode.text || this.lab_phoneCode.text == "") {
                    this.gameManager.alertManager.open(AlertType.Normal, "请填写验证码");
                    return true;
                }
                //TODO 登录
                this.gameManager.msgManager.login.loginGm(this.lab_phone.text, this.lab_phoneCode.text);
                break;
        }
    };
    p.open = function () {
        _super.prototype.open.call(this);
        this.bottom = 0;
    };
    return LoginScene;
}(BaseScene));
egret.registerClass(LoginScene,'LoginScene');
