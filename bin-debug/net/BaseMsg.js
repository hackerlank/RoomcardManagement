/**
 * BaseMsg
 * @Author Ace.c
 * @Create 2016-10-30 11:19
 */
var BaseMsg = (function () {
    function BaseMsg() {
        this.gameManager = GameManager.getInstance();
    }
    var d = __define,c=BaseMsg,p=c.prototype;
    return BaseMsg;
}());
egret.registerClass(BaseMsg,'BaseMsg');
