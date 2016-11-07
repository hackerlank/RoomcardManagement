/**
 * BaseMessage
 * @Author Ace.c
 * @Create 2016-10-30 11:19
 */
var BaseMessage = (function () {
    function BaseMessage() {
        this.gameManager = GameManager.getInstance();
    }
    var d = __define,c=BaseMessage,p=c.prototype;
    return BaseMessage;
}());
egret.registerClass(BaseMessage,'BaseMessage');
