var HttpManager = (function (_super) {
    __extends(HttpManager, _super);
    function HttpManager() {
        _super.call(this);
    }
    var d = __define,c=HttpManager,p=c.prototype;
    HttpManager.getInstance = function () {
        if (!this._instance) {
            this._instance = new HttpManager();
        }
        return this._instance;
    };
    p.send = function (url, param, callback, thisObj, method) {
        if (callback === void 0) { callback = null; }
        if (thisObj === void 0) { thisObj = null; }
        if (method === void 0) { method = egret.HttpMethod.POST; }
        if (!url || url == "") {
            return;
        }
        console.log("SendUrl ===> " + url);
        console.log("SendData ===> " + JSON.stringify(param));
        var variables = new egret.URLVariables();
        variables.variables = param;
        var request = new egret.URLRequest(url);
        request.method = method;
        request.data = variables;
        var loader = new egret.URLLoader();
        loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        loader.load(request);
        loader.addEventListener(egret.Event.COMPLETE, function (event) {
            var loader = event.target;
            console.log("ReadData <=== " + loader.data);
            var data = JSON.parse(loader.data.toString());
            if (data && data.hasOwnProperty("code") && data.code > 0) {
                switch (data.code) {
                    case 1999:
                        core.gameManager.sceneManager.open(SceneType.error);
                        break;
                    default:
                        core.gameManager.alertManager.open(AlertType.Normal, data.msg);
                        break;
                }
                return;
            }
            if (callback) {
                if (thisObj) {
                    callback.call(thisObj, data);
                }
                else {
                    callback(data);
                }
            }
        }, this);
    };
    return HttpManager;
}(CommonEvent));
egret.registerClass(HttpManager,'HttpManager');
