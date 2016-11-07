/**
 * Lang
 * @Author Ace.c
 * @Create 2016-11-01 10:21
 */
var Lang = (function () {
    function Lang() {
    }
    var d = __define,c=Lang,p=c.prototype;
    Lang.getText = function (id) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        var text = "";
        if (id) {
            switch (core.language) {
                case Language.ch:
                    text = Lang_CH[id.toString()];
                    break;
                case Language.en:
                    text = Lang_EN[id.toString()];
                    break;
            }
        }
        return text;
    };
    return Lang;
}());
egret.registerClass(Lang,'Lang');
