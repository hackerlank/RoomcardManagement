
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/eui/eui.js",
	"libs/modules/res/res.js",
	"libs/modules/tween/tween.js",
	"libs/modules/game/game.js",
	"libs/modules/game/game.native.js",
	"libs/modules/weixinapi/weixinapi.js",
	"bin-debug/api/Weixin.js",
	"bin-debug/AssetAdapter.js",
	"bin-debug/cheng/h5_egret/component/BaseSprite.js",
	"bin-debug/cheng/h5_egret/component/HashMap.js",
	"bin-debug/cheng/h5_egret/component/KeyValue.js",
	"bin-debug/cheng/h5_egret/constant/CommonConst.js",
	"bin-debug/cheng/h5_egret/constant/CommonKey.js",
	"bin-debug/cheng/h5_egret/constant/CommonType.js",
	"bin-debug/cheng/h5_egret/event/CommonEvent.js",
	"bin-debug/cheng/h5_egret/event/CommonEventType.js",
	"bin-debug/cheng/h5_egret/H5Core.js",
	"bin-debug/cheng/h5_egret/manager/HttpManager.js",
	"bin-debug/manager/BaseManager.js",
	"bin-debug/cheng/h5_egret/manager/TimerManager.js",
	"bin-debug/cheng/h5_egret/utils/CommonUtils.js",
	"bin-debug/cheng/h5_egret/utils/CountUtils.js",
	"bin-debug/cheng/h5_egret/utils/DirtyWordUtils.js",
	"bin-debug/cheng/h5_egret/utils/EffectsUtils.js",
	"bin-debug/cheng/h5_egret/utils/FactoryUtils.js",
	"bin-debug/cheng/h5_egret/utils/FormulaUtils.js",
	"bin-debug/cheng/h5_egret/utils/LogUtils.js",
	"bin-debug/cheng/h5_egret/utils/StorageUtils.js",
	"bin-debug/cheng/h5_egret/utils/StringUtils.js",
	"bin-debug/cheng/h5_egret/utils/TestUtils.js",
	"bin-debug/cheng/h5_egret/utils/TextEffectsUtils.js",
	"bin-debug/cheng/h5_egret/vo/BaseVo.js",
	"bin-debug/cheng/h5_egret/vo/BaseCharVo.js",
	"bin-debug/component/MenuDropDown.js",
	"bin-debug/component/MenuPopup.js",
	"bin-debug/component/NumberAdder.js",
	"bin-debug/component/TurningTool.js",
	"bin-debug/constant/Common.js",
	"bin-debug/constant/Lang_CH.js",
	"bin-debug/constant/Lang_EN.js",
	"bin-debug/Core.js",
	"bin-debug/Main.js",
	"bin-debug/manager/AlertManager.js",
	"bin-debug/manager/DataManager.js",
	"bin-debug/manager/GameManager.js",
	"bin-debug/manager/MsgManager.js",
	"bin-debug/manager/PanelManager.js",
	"bin-debug/manager/SceneManager.js",
	"bin-debug/manager/UIManager.js",
	"bin-debug/net/BaseMsg.js",
	"bin-debug/net/AgentMsg.js",
	"bin-debug/net/BuyCardMsg.js",
	"bin-debug/net/LoginMsg.js",
	"bin-debug/net/LowerUserMsg.js",
	"bin-debug/net/RechargeMsg.js",
	"bin-debug/net/RoomMsg.js",
	"bin-debug/net/TransferMsg.js",
	"bin-debug/ThemeAdapter.js",
	"bin-debug/types/AlertType.js",
	"bin-debug/types/Cmd.js",
	"bin-debug/types/EventType.js",
	"bin-debug/types/Lang.js",
	"bin-debug/types/PanelType.js",
	"bin-debug/types/SceneType.js",
	"bin-debug/view/GameSprite.js",
	"bin-debug/view/alert/BaseAlert.js",
	"bin-debug/view/alert/NormalAlert.js",
	"bin-debug/view/alert/ProtocolAlert.js",
	"bin-debug/view/items/CheckListItem.js",
	"bin-debug/view/items/CheckRecordListItem.js",
	"bin-debug/view/items/LowerUserContributionItem.js",
	"bin-debug/view/items/RecordGmItem.js",
	"bin-debug/view/items/RoomUserItem.js",
	"bin-debug/view/items/SaleCardRewardRuleItem.js",
	"bin-debug/view/items/TransferInRecordItem.js",
	"bin-debug/view/items/TransferRecordDetailsItem.js",
	"bin-debug/view/items/TransferRecordItem.js",
	"bin-debug/view/items/UserItem.js",
	"bin-debug/view/items/UserItemMini.js",
	"bin-debug/view/loading/LoadingUI.js",
	"bin-debug/view/panel/BasePanel.js",
	"bin-debug/view/scene/BaseScene.js",
	"bin-debug/view/scene/account/AccountAgentRecordScene.js",
	"bin-debug/view/scene/account/AccountAgentScene.js",
	"bin-debug/view/scene/account/AccountCheckRecordScene.js",
	"bin-debug/view/scene/account/AccountPowerScene.js",
	"bin-debug/view/scene/account/AccountRechargeScene.js",
	"bin-debug/view/scene/account/AccountRoomScene.js",
	"bin-debug/view/scene/account/AccountSaleScene.js",
	"bin-debug/view/scene/account/AccountScene.js",
	"bin-debug/view/scene/account/AccountTransInScene.js",
	"bin-debug/view/scene/account/AccountTransOutScene.js",
	"bin-debug/view/scene/agent/AgentAppendScene.js",
	"bin-debug/view/scene/agent/AgentCheckCenterScene.js",
	"bin-debug/view/scene/agent/AgentLv1RecordScene.js",
	"bin-debug/view/scene/agent/AgentLv2RecordScene.js",
	"bin-debug/view/scene/agent/AgentNoticeScene.js",
	"bin-debug/view/scene/agent/AgentScene.js",
	"bin-debug/view/scene/follow/FollowDetailsScene.js",
	"bin-debug/view/scene/follow/FollowScene.js",
	"bin-debug/view/scene/follow/FollowSearchScene.js",
	"bin-debug/view/scene/other/ErrorScene.js",
	"bin-debug/view/scene/other/LoginGameScene.js",
	"bin-debug/view/scene/other/LoginScene.js",
	"bin-debug/view/scene/other/WelcomScene.js",
	"bin-debug/view/scene/transfer/TransferScene.js",
	"bin-debug/view/ui/BaseUI.js",
	"bin-debug/view/ui/MenuUI.js",
	"bin-debug/vo/LowerUserContributionVo.js",
	"bin-debug/vo/LowerUserVo.js",
	"bin-debug/vo/RechargeVo.js",
	"bin-debug/vo/RewardRuleVo.js",
	"bin-debug/vo/TransferRecordVo.js",
	"bin-debug/vo/UserVo.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    egret_native.requireFiles();
    egret.TextField.default_fontFamily = "/system/fonts/DroidSansFallback.ttf";
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 30,
		scaleMode: "fixedWidth",
		contentWidth: 640,
		contentHeight: 960,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel(egret.TextField.default_fontFamily, 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};