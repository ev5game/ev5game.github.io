/**
 * change langusge
 * @param {Object} type
 */
if (window.sessionStorage) {
    var language = sessionStorage.getItem("language");
    var lanItem = sessionStorage.getItem("lanItem");
    if (language != null && lanItem != null) {
        $(".language").attr("class", language);
        $(".language").next().remove();
        languages(Number(lanItem));
    } else {
        $(".language").attr("class", "language language_en");
        $(".language").next().remove();
        languages(2);
    }
} else {
    $(".language").attr("class", "language language_en");
    $(".language").next().remove();
    languages(2);
}
$(".language").click(function () {
    var className = $(this).attr("class");
    if (this.parentNode.children.length > 1) {
        $(".language").next().remove();
        return;
    }
    var msg = "";
    if (className.indexOf("language_kr") != -1) {
        msg = "<div class=\"select_language\"><div class=\"option_en\" onclick='changeLanguage(this)'></div>" +
            "<div class=\"option_zh\" onclick='changeLanguage(this)'></div>" +
            "<div class=\"option_de\" onclick='changeLanguage(this)'></div>" +
            "<div class=\"option_jp\" onclick='changeLanguage(this)'></div></div>";
    } else if (className.indexOf("language_zh") != -1) {
        msg = "<div class=\"select_language\"><div class=\"option_en\" onclick='changeLanguage(this)'></div>" +
            "<div class=\"option_de\" onclick='changeLanguage(this)'></div>" +
            "<div class=\"option_kr\" onclick='changeLanguage(this)'></div>" +
            "<div class=\"option_jp\" onclick='changeLanguage(this)'></div></div>";
    } else if (className.indexOf("language_de") != -1) {
        msg = "<div class=\"select_language\"><div class=\"option_en\" onclick='changeLanguage(this)'></div>" +
            "<div class=\"option_zh\" onclick='changeLanguage(this)'></div>" +
            "<div class=\"option_kr\" onclick='changeLanguage(this)'></div>" +
            "<div class=\"option_jp\" onclick='changeLanguage(this)'></div></div>";
    } else if (className.indexOf("language_jp") != -1) {
        msg = "<div class=\"select_language\"><div class=\"option_en\" onclick='changeLanguage(this)'></div>" +
            "<div class=\"option_zh\" onclick='changeLanguage(this)'></div>" +
            "<div class=\"option_de\" onclick='changeLanguage(this)'></div>" +
            "<div class=\"option_kr\" onclick='changeLanguage(this)'></div></div>";
    } else {
        msg = "<div class=\"select_language\"><div class=\"option_zh\" onclick='changeLanguage(this)'></div>" +
            "<div class=\"option_de\" onclick='changeLanguage(this)'></div>" +
            "<div class=\"option_kr\" onclick='changeLanguage(this)'></div>" +
            "<div class=\"option_jp\" onclick='changeLanguage(this)'></div></div>"
    }
    $(this).after(msg);
});
//get lang name
var langName;

function changeLanguage(o) {
    var className = $(o).attr("class");
    var type = 0;
    if (className.indexOf("option_zh") != -1) {
        className = "language language_zh";
        type = 1;
    } else if (className.indexOf("option_en") != -1) {
        className = "language language_en";
        type = 2;
    } else if (className.indexOf("option_jp") != -1) {
        className = "language language_jp";
        type = 3;
    } else if (className.indexOf("option_kr") != -1) {
        className = "language language_kr";
        type = 4;
    } else {
        className = "language language_de";
        type = 5;
    }
    $(".language").attr("class", className);
    $(".language").next().remove();
    getLang();
    languages(type);
    sessionStorage.setItem("language", className);
    sessionStorage.setItem("lanItem", type);
}

function getLang() {
    var className = $(".language").attr("class");
    if (className.indexOf("language_kr") != -1) {
        langName = 'kr';
    } else if (className.indexOf("language_zh") != -1) {
        langName = 'zh';
    } else if (className.indexOf("language_jp") != -1) {
        langName = 'jp';
    } else if (className.indexOf("language_de") != -1) {
        langName = 'de';
    } else {
        langName = 'en';
    }
}

var errMetaWallet = {
    'en': 'Please login to MetaMask Wallet first',
    'zh': '请先登录MetaMask钱包',
    'jp': '先にMetaMask財布に登録してください。',
    'kr': 'Metask 지갑 로그인해주세요.',
    'de': 'Bitte melden Sie sich zuerst bei MetaMask Wallet an'
};
var errWallet = {
    'en': 'Please login to Wallet first',
    'zh': '请先登录钱包',
    'jp': '先に財布に登録してください。',
    'kr': '지갑을 먼저 등록해 주세요.',
    'de': 'Bitte melden Sie sich zuerst in Ihrer Brieftasche an'
};
var errAvailableWallet = {
    'en': 'Available ETH wallet was not detected',
    'zh': '未检测到可用ETH钱包',
    'jp': '利用可能なETHウォレットが検出されませんでした。',
    'kr': 'ETH 지갑을 찾을 수 없음',
    'de': 'Die verfügbare ETH -Brieftasche wurde nicht erkannt'
};
var curAccountMsg = {
    'en': 'Current account',
    'zh': '当前账户',
    'jp': '現在のアカウント',
    'kr': '현재 계정',
    'de': 'Laufende Rechnung'
};
var curNoAccountMsg = {
    'en': 'no account',
    'zh': '无可用账户',
    'jp': '利用可能なアカウントがありません',
    'kr': '사용 가능한 계정 없음',
    'de': 'Kein Konto verfügbar'
};
var errorInfoMsg = {
    'en': 'getting information failure',
    'zh': '获取信息失败',
    'jp': '情報の取得に失敗しました',
    'kr': '정보 가져오기 실패',
    'de': 'Fehler bei der Information'
};
var errorExistMsg = {
    'en': 'The invitation code does not exist',
    'zh': '该邀请码不存在!',
    'jp': 'この招待コードは存在しません',
    'kr': '이 초대장 부호 없음',
    'de': 'Der Einladungscode existiert nicht'
};
var errorQueryMsg = {
    'en': 'Query error, please try again later',
    'zh': '查询出错,请稍后再试',
    'jp': 'クエリでエラーが発生しました。後で試してみてください。',
    'kr': '오류를 조회하여 잠시 후에 다시 시도해 주십시오',
    'de': 'Fehler bei der Abfrage, bitte versuchen Sie es später erneut'
};
var errorCodeMsg = {
    'en': 'Non-standard invitation code',
    'zh': '不规范的邀请码',
    'jp': '不正な招待コード',
    'kr': '불규칙한 초대 코드',
    'de': 'Nicht -Standard -Einladungscode'
};
var errorNumMsg = {
    'en': 'Please enter an integer of 1-15',
    'zh': '请输入1-15的整数',
    'jp': 'せいすうを  にゅうりょく入力 ',
    'kr': '1 -15의 정수를 입력하십시오.',
    'de': 'Bitte geben Sie eine ganze Zahl von 1 -15 ein'
};

var yReplayMsg = {
    'en': 'Successful Replay',
    'zh': '复投成功,^_^',
    'jp': 'リバウンド成功',
    'kr': '다시 성공을 투하하다.',
    'de': 'Erfolgreiche Rückkehr'
};
var nReplayMsg = {
    'en': 'Replay failure',
    'zh': '复投失败!',
    'jp': '復投失敗',
    'kr': '추출 실패',
    'de': 'Nichterfüllung der Investitionen'
};
var yWithDrawMsg = {
    'en': 'Successful withdrawal, please note the change of account funds',
    'zh': '提取成功，请注意账户资金变动',
    'jp': '引き出しが成功しました。口座資金の変動に注意してください。',
    'kr': '성공을 추출하면 계좌 자금 변동 에 주의해 주십시오',
    'de': 'Erfolgreiche Rücknahme, bitte beachten Sie die Änderung der Kontofonds'
};
var nWithDrawMsg = {
    'en': 'Extraction failure',
    'zh': '提取失败',
    'jp': '抽出に失敗しました',
    'kr': '추출 실패',
    'de': 'Ausfall der Extraktion'
};
var errorCancelMsg = {
    'en': 'User Cancel Operation',
    'zh': '用户取消操作',
    'jp': 'ユーザキャンセル操作',
    'kr': '사용자 취소 조작',
    'de': 'Operation abbrechen'
};
var infoInvestMsg ={
    'en': 'Betting',
    'zh': '投 注',
    'jp': '投書する',
    'kr': '주석',
    'de': 'Wetten'
};
var infoFinishMsg ={
    'en': 'Successful betting',
    'zh': '投注成功',
    'jp': '投注確認',
    'kr': '주주를 성공시키다.',
    'de': 'Erfolgreiche Wetten'
};

var yUpdateMsg = {
    'en': 'Successful',
    'zh': '升级成功,^_^',
    'jp': 'Successful',
    'kr': 'Successful',
    'de': 'Successful'
};
var nUpdateMsg = {
    'en': 'failure',
    'zh': '升级失败!',
    'jp': 'failure',
    'kr': 'failure',
    'de': 'failure'
};

function languages(type) {
    var list = document.getElementsByClassName("list");
    var listContent = $(".detailPanel").children().find("li");
    var listFootSec = $(".footerWrap").find('section');
    var listPanel = $(".panel-o").find('p');
    switch (type) {
        case 1:
            $('.block_name').text("全球股权分红游戏");
            $(".copyUrl").text("复制链接");
            $(".theTitle").text('总收益');
            $($(list[0]).children()[0]).text("分享码");
            $($(list[1]).children()[0]).text("分红累计");
            $($(list[2]).children()[0]).text("奖励累计");
            $(".titleWrap").find('span').text("基于智能合约的公平公正游戏");
            $(".titleWrap").find('small').text("真开源、可溯源、可证明");
            $($(".msgWrap")[0]).find(".title").text("股权池");
            $($(".msgWrap")[1]).find(".title").text("公信池");
            $($(".getWallet")[0]).find("span").text("安装MetaMask");
            $($(".getWallet")[1]).find("span").text("需要兼容Web3的钱包开启游戏");
            $($(".getWallet")[2]).find("span").text("获取MetaMask");
            $(".toNew").text("+ 新点");
            $(".toInvest").text("投 注");
            $(".displayinfo").text("EV5排队中，您的投注额：");
            $(".moneyRecord").text("结算记录");
            $(".titleOfTime").text("时间");
            $(".titleOfReward").text("奖赏");
            $(".awardMoney").text("金额");
            $(".awardTime").text("时间");
            $(".til").text("您的推荐码");
            $(".invest").text("决 定");
            $($(listContent[0])).find('.label').text("入股总额");
            $($(listContent[1])).find('.label').text("节点数");
            $($(listContent[2])).find('.label').text("分红V");
            $($(listContent[3])).find('.label').text("奖励V");
            $($(listContent[4])).find('.label').text("钱包余额");
            $($(listPanel[0])).text("待提收益");
            $($(listPanel[1])).text("复投金");
            $('.panelOneWrap .caption').text("待提收益");
            $('.panelOneWrap .theTips').text("至少0.1ETH");
            $('.panelTwoWrap .caption').text("股本金");
            $('.panelTwoWrap .theTips').text("小额投资");
            $(".turnout").text("转 出");
            $(".withdraw").text("提 现");
            $($(listFootSec[0]).find("a")[0]).text("EV5通证");
            $($(listFootSec[0]).find("a")[1]).find('.ethDesc').text("网络:");
            $($(listFootSec[1]).find("a")).text("邮箱");
            $($(listFootSec[2]).find("a")[0]).text("游戏规则");
            $($(listFootSec[2]).find("a")[1]).text("智能合约");
            $($('.changeToMainNet').find('div')[0]).text('切换到ETH主网');
            $($('.changeToMainNet').find('div')[1]).text('游戏仅在主网上运行 - 请通过钱包切换');
            break;
        case 2:
            $('.block_name').text("Global Equity Dividend Game");
            $(".copyUrl").text("Copy links");
            $(".theTitle").text('Total income');
            $($(list[0]).children()[0]).text("Sharing Code");
            $($(list[1]).children()[0]).text("Cumulative dividend");
            $($(list[2]).children()[0]).text("Accumulation of rewards");
            $(".titleWrap").find('span').text("Fair Game Based on Intelligent Contract");
            $(".titleWrap").find('small').text("True Open Source, Traceable and Provable");
            $($(".msgWrap")[0]).find(".title").text("Equity pool");
            $($(".msgWrap")[1]).find(".title").text("trust pool");
            $($(".getWallet")[0]).find("span").text("Install MetaMask");
            $($(".getWallet")[1]).find("span").text("Web 3-compatible Wallet Open Game");
            $($(".getWallet")[2]).find("span").text("Get MetaMask");
            $(".toNew").text("+ New");
            $(".toInvest").text("Betting");
            $(".displayinfo").text("In the EV5 queue, your betting amount:");
            $(".moneyRecord").text("Settlement Records");
            $(".titleOfTime").text("time");
            $(".titleOfReward").text("reward");
            $(".awardMoney").text("Amount of money");
            $(".awardTime").text("time");
            $(".til").text("Recommend Code");
            $(".invest").text("Determine");
            $($(listContent[0])).find('.label').text("Total equity");
            $($(listContent[1])).find('.label').text("Queuing amount");
            //$($(listContent[1])).find('.label').text("Grade of Shareholding");
            $($(listContent[2])).find('.label').text("Number of nodes");
            $($(listContent[3])).find('.label').text("Dividend/Node Level");
            $($(listContent[4])).find('.label').text("Wallet balance");
            $($(listPanel[0])).text("Ready for gains");
            $($(listPanel[1])).text("Duplicate payment");
            $('.panelOneWrap .caption').text("Standby earnings");
            $('.panelOneWrap .theTips').text("At least 0.1 ETH");
            $('.panelTwoWrap .caption').text("Capital stock");
            $('.panelTwoWrap .theTips').text("Microinvestment");
            $(".turnout").text("Turn out");
            $(".withdraw").text("withdraw");
            $($(listFootSec[0]).find("a")[0]).text("EV5 Token");
            $($(listFootSec[0]).find("a")[1]).find('.ethDesc').text("net:");
            $($(listFootSec[1]).find("a")).text("email");
            $($(listFootSec[2]).find("a")[0]).text("Rules of the game");
            $($(listFootSec[2]).find("a")[1]).text("Intelligent contract");
            $($('.changeToMainNet').find('div')[0]).text('Switch to ETH Main Network');
            $($('.changeToMainNet').find('div')[1]).text('Game only runs on the Main Network - Please switch through your wallet');
            break;
        case 3:
            $('.block_name').text("グローバル株式配当ゲーム");
            $(".copyUrl").text("リンクをコピー");
            $(".theTitle").text('総収益');
            $($(list[0]).children()[0]).text("共有コード");
            $($(list[1]).children()[0]).text("配当累計");
            $($(list[2]).children()[0]).text("ボーナス累計");
            $(".titleWrap").find('span').text("スマート契約に基づく公正ゲーム");
            $(".titleWrap").find('small').text("本当に源を尋ねることができます。証明できます。");
            $($(".msgWrap")[0]).find(".title").text("持ち株プール");
            $($(".msgWrap")[1]).find(".title").text("公信池");
            $($(".getWallet")[0]).find("span").text("MetaMaskのインストール");
            $($(".getWallet")[1]).find("span").text("Web 3対応のウォレットオープンが必要です。");
            $($(".getWallet")[2]).find("span").text("MetaMaskを取得");
            $(".toNew").text("+ 新規");
            $(".toInvest").text("投書する");
            $(".displayinfo").text("EV 5の列の中で、あなたの投資額:");
            $(".moneyRecord").text("決済記録");
            $(".titleOfTime").text("時間");
            $(".titleOfReward").text("ほうびを与える");
            $(".awardMoney").text("金額");
            $(".awardTime").text("時間");
            $(".til").text("あなたのオススメコード");
            $(".invest").text("決定する");
            $($(listContent[0])).find('.label').text("出資総額");
            $($(listContent[1])).find('.label').text("列の金額");
            //$($(listContent[1])).find('.label').text("株式の等級に入る");
            $($(listContent[2])).find('.label').text("ノード数");
            $($(listContent[3])).find('.label').text("デポジット");
            $($(listContent[4])).find('.label').text("財布の残高");
            $($(listPanel[0])).text("未発利益");
            $($(listPanel[1])).text("復投金");
            $('.panelOneWrap .caption').text("未発利益");
            $('.panelOneWrap .theTips').text("少なくとも0.1 ETH");
            $('.panelTwoWrap .caption').text("資本金");
            $('.panelTwoWrap .theTips').text("小口投資");
            $(".turnout").text("転出する");
            $(".withdraw").text("現金で出す");
            $($(listFootSec[0]).find("a")[0]).text("EV5 通証");
            $($(listFootSec[0]).find("a")[1]).find('.ethDesc').text("ネットワーク:");
            $($(listFootSec[1]).find("a")).text("メールボックス");
            $($(listFootSec[2]).find("a")[0]).text("ゲームのルール");
            $($(listFootSec[2]).find("a")[1]).text("インテリジェント契約");
            $($('.changeToMainNet').find('div')[0]).text('ETHホームネットワークに切り替え');
            $($('.changeToMainNet').find('div')[1]).text('ゲームはホームネットワークのみで実行します。ウォレットで切り替えてください。');
            break;
        case 4:
            $('.block_name').text("글로벌 지분 배당 게임");
            $(".copyUrl").text("링크 복사");
            $(".theTitle").text('총수익');
            $($(list[0]).children()[0]).text("공유 코드");
            $($(list[1]).children()[0]).text("배당 누계");
            $($(list[2]).children()[0]).text("장려 누계");
            $(".titleWrap").find('span').text("지능 계약 기반 공정 게임");
            $(".titleWrap").find('small').text("진개원, 소급가능, 증명 가능");
            $($(".msgWrap")[0]).find(".title").text("주권지");
            $($(".msgWrap")[1]).find(".title").text("공신지");
            $($(".getWallet")[0]).find("span").text("메타마크 설치");
            $($(".getWallet")[1]).find("span").text("Web3 지갑을 호환해야 합니다.");
            $($(".getWallet")[2]).find("span").text("메타마크 가져오기");
            $(".toNew").text("+ 새로");
            $(".toInvest").text("주석");
            $(".displayinfo").text("EV5 줄서기 중, 당신의 투자액:");
            $(".moneyRecord").text("결산 기록");
            $(".titleOfTime").text("시간");
            $(".titleOfReward").text("상");
            $(".awardMoney").text("금액");
            $(".awardTime").text("시간");
            $(".til").text("추천 코드");
            $(".invest").text("결정");
            $($(listContent[0])).find('.label').text("주식 총액");
            $($(listContent[1])).find('.label').text("정렬 금액");
            //$($(listContent[1])).find('.label').text("입주 등급");
            $($(listContent[2])).find('.label').text("노드 수");
            $($(listContent[3])).find('.label').text("배당 /노드");
            $($(listContent[4])).find('.label').text("지갑 잔액");
            $($(listPanel[0])).text("지급 수익");
            $($(listPanel[1])).text("재투금");
            $('.panelOneWrap .caption').text("지급 수익");
            $('.panelOneWrap .theTips').text("최소한 0.1ETH");
            $('.panelTwoWrap .caption').text("자본금");
            $('.panelTwoWrap .theTips').text("소액 투자");
            $(".turnout").text("전출");
            $(".withdraw").text("현금을 제시하다");
            $($(listFootSec[0]).find("a")[0]).text("EV5 통증");
            $($(listFootSec[0]).find("a")[1]).find('.ethDesc').text("인터넷:");
            $($(listFootSec[1]).find("a")).text("메일박스");
            $($(listFootSec[2]).find("a")).text("게임 규칙");
            $($(listFootSec[2]).find("a")[0]).text("게임 규칙");
            $($(listFootSec[2]).find("a")[1]).text("지능 계약");
            $($('.changeToMainNet').find('div')[0]).text('ETH 홈페이지로 전환');
            $($('.changeToMainNet').find('div')[1]).text('게임은 홈페이지에서만 실행됩니다. - 지갑을 통해서 바꾸세요.');
            break;
        default:
            $('.block_name').text("Global Equity Dividend Game");
            $(".copyUrl").text("Links kopieren");
            $(".theTitle").text('Gesamte Einnahmen');
            $($(list[0]).children()[0]).text("Code teilen");
            $($(list[1]).children()[0]).text("Kumulierte Dividende");
            $($(list[2]).children()[0]).text("Kumulation von Belohnungen");
            $(".titleWrap").find('span').text("Faires und gerechtes Spiel auf der Grundlage eines intelligenten Vertrags");
            $(".titleWrap").find('small').text("True Open Source, Traceable und Proble");
            $($(".msgWrap")[0]).find(".title").text("Equity Pool");
            $($(".msgWrap")[1]).find(".title").text("Öffentlicher Vertrauenspool");
            $($(".getWallet")[0]).find("span").text("Installieren Sie MetaMask");
            $($(".getWallet")[1]).find("span").text("Web 3 -kompatibles Offenes Spiel");
            $($(".getWallet")[2]).find("span").text("Get MetaMask");
            $(".toNew").text("+ neu");
            $(".toInvest").text("Wetten");
            $(".displayinfo").text("In der EV5 Queue, Ihr Einsatzbetrag:");
            $(".moneyRecord").text("Aufzeichnungen der Abrechnung");
            $(".titleOfTime").text("Zeit");
            $(".titleOfReward").text("Belohnung");
            $(".awardMoney").text("Betrag des Geldes");
            $(".awardTime").text("Zeit");
            $(".til").text("Ihr Empfehlungscode");
            $(".invest").text("Entscheidung");
            $($(listContent[0])).find('.label').text("Eigenkapital insgesamt");
            $($(listContent[1])).find('.label').text("Betrag der Warteschlange");
            //$($(listContent[1])).find('.label').text("Grad der Beteiligung");
            $($(listContent[2])).find('.label').text("Anzahl der Knoten");
            $($(listContent[3])).find('.label').text("Dividende /Knoten");
            $($(listContent[4])).find('.label').text("Saldo der Brieftasche");
            $($(listPanel[0])).text("Bereit zum Gewinn");
            $($(listPanel[1])).text("Doppelte Zahlung");
            $('.panelOneWrap .caption').text("Ergebnis der Standby");
            $('.panelOneWrap .theTips').text("Mindestens 0.1 ETH");
            $('.panelTwoWrap .caption').text("Kapitalstock (I)");
            $('.panelTwoWrap .theTips').text("Mikroinvestitionen");
            $(".turnout").text("Drehen Sie sich");
            $(".withdraw").text("Auszahlung der Mittel");
            $($(listFootSec[0]).find("a")[0]).text("EV5 Token");
            $($(listFootSec[0]).find("a")[1]).find('.ethDesc').text("Netzwerk:");
            $($(listFootSec[1]).find("a")).text("Briefkasten");
            $($(listFootSec[2]).find("a")[0]).text("Regeln des Spiels");
            $($(listFootSec[2]).find("a")[1]).text("Intelligenter Vertrag");
            $($('.changeToMainNet').find('div')[0]).text('Auf ETH Main Network umschalten');
            $($('.changeToMainNet').find('div')[1]).text('Das Spiel läuft nur auf dem Hauptnetz - Bitte schalten Sie durch Ihre Brieftasche');
    }
}
