/**
 * Power
 * @Author Ace.c
 * @Create 2016-12-05 11:25
 */
class Power {
    static supermanager = 1;
    static agent_professional = 4;
    static agent_normal = 2;
    static agent_new = 3;

    /**
     * 获取显示权限-超管
     * @returns {boolean}
     */
    static hasSuperManagerPower() {
        return core.gameManager.dataManager.userVo.pow == Power.supermanager;
    }

    /**
     * 获取显示权限-底部UI
     * @returns {boolean}
     */
    static hasMenuUI() {
        return core.gameManager.dataManager.userVo.pow != Power.agent_new;
    }

    /**
     * 获取显示权限-结算中心
     * @returns {boolean}
     */
    static hasCheckCenter() {
        return core.gameManager.dataManager.userVo.pow == Power.agent_professional;
    }

}