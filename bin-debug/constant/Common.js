/**
* 语言
*/
var Language;
(function (Language) {
    Language[Language["ch"] = 0] = "ch";
    Language[Language["en"] = 1] = "en";
})(Language || (Language = {}));
/**
* 状态
*/
var Status;
(function (Status) {
    Status[Status["closed"] = 0] = "closed";
    Status[Status["opened"] = 1] = "opened";
})(Status || (Status = {}));
/**
 * 权限
 */
var Power;
(function (Power) {
    Power[Power["gm"] = 1] = "gm";
    Power[Power["agent"] = 2] = "agent";
    Power[Power["agent_new"] = 3] = "agent_new";
})(Power || (Power = {}));
