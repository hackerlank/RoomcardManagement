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
     * 不可访问
     * @returns {boolean}
     */
    static get noAccess() {
        return core.gameManager.dataManager.userVo.pow == 0;
    }

    /**
     * 等同权限3
     * @returns {boolean}
     */
    static get likePow3() {
        return core.gameManager.dataManager.userVo.cdnum == 0;
    }

    /**
     * 获取显示权限-超管
     * @returns {boolean}
     */
    static hasSuperManagerPower() {
        if (this.noAccess || this.likePow3) {
            return false;
        }

        return core.gameManager.dataManager.userVo.pow == Power.supermanager;
    }

    /**
     * 获取显示权限-底部UI
     * @returns {boolean}
     */
    static hasMenuUI() {
        if (this.noAccess || this.likePow3) {
            return false;
        }

        return core.gameManager.dataManager.userVo.pow != Power.agent_new;
    }

    /**
     * 获取显示权限-结算中心
     * @returns {boolean}
     */
    static hasCheckCenter() {
        if (this.noAccess || this.likePow3) {
            return false;
        }
        return core.gameManager.dataManager.userVo.pow == Power.agent_professional;
    }
}