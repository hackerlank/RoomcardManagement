/**
 * PowerMsg
 * @Author Ace.c
 * @Create 2016-10-30 12:00
 */
class PowerMsg extends BaseMsg {

    public constructor() {
        super();
    }

    /**
     * 添加代理人
     */
    public sendAddAgent(uid: string, gid: string, pow:number) {
        var data: any = {};
        data.s = core.sessionid;
        data.u = uid;
        gid && (data.g = gid);
        data.p = pow;

        this.gameManager.httpManager.send(core.serverUrl + Cmd.Add_Agent, data, this.readAddAgent, this);
    }

    public readAddAgent(data: any) {
        if (data.code != 0)return;

        this.gameManager.alertManager.open(AlertType.Normal, Lang.getText(2002));
    }
}