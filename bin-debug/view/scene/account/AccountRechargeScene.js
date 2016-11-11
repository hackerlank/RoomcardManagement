/**
 * AccountRechargeScene
 * @Author Ace.c
 * @Create 2016-10-26 16:38
 */
var AccountRechargeScene = (function (_super) {
    __extends(AccountRechargeScene, _super);
    function AccountRechargeScene() {
        _super.call(this);
        this.skinName = "AccountRechargeSceneSkin";
        this.id = SceneType.account_recharge;
    }
    var d = __define,c=AccountRechargeScene,p=c.prototype;
    p.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.update();
    };
    p.update = function () {
        this.rechargeList = this.gameManager.dataManager.userVo.rechargeList;
        this.itemGroup.removeChildren();
        if (this.rechargeList) {
            var rechargeVo;
            var btn;
            for (var i = 0; i < this.rechargeList.length; i++) {
                rechargeVo = this.rechargeList[i];
                btn = new eui.Button();
                btn.skinName = "skins.Button_GreenSkin";
                btn.width = 600;
                btn.height = 60;
                btn.label = "充值" + rechargeVo.card + "房卡";
                btn.label = rechargeVo.card + "房卡+赠送" + rechargeVo.rebate + "房卡=" + (rechargeVo.pay / 100) + "元";
                this.itemGroup.addChild(btn);
                btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buttonHandler, this);
            }
        }
    };
    p.buttonHandler = function (e) {
        var index = this.itemGroup.getChildIndex(e.currentTarget);
        var rechargeVo = this.rechargeList[index];
        if (rechargeVo) {
            this.gameManager.msgManager.recharge.sendOrder(rechargeVo.id);
        }
    };
    return AccountRechargeScene;
}(BaseScene));
egret.registerClass(AccountRechargeScene,'AccountRechargeScene');
