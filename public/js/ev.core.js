//account address
var address;
//contract
var contract = null;
var contract_address = "";
//web3 setting
var isWeb3 = false;
var isWebLogin = false;
//Amount
var valiableAmount = 0;
var haveInAmount = 0;
var waitAmount = 0;
var inAmount = 0;
//pCode and code
var pCode;
var defalutCode = "";
var ips;

//page in loading init
function pageLoading() {
    if (window.location.href.lastIndexOf("www") >= 0) {
        ipUrl = window.location.protocol + '//' + window.location.host;
    }
    getLang();
    ips = returnCitySN;
}

//invite code
function setInvitors(_pCode, _defaultCode, _code = '') {
    $(".inviteCode").html('--');
    $(".inviteCount").html(0);
    $(".default_code").html("DefaultCode Is " + _defaultCode);
    if (typeof _pCode != 'undefined' && _pCode != "" && _pCode != null) {
        $(".invitors").val(_pCode).attr("disabled", "disabled");
    } else {
        $(".invitors").val(_defaultCode).removeAttr("disabled");
    }
    if (_code != "" && _code != '' && _code != null) {
        $(".inviteCode").html(_code);
        //getInviteCount(_code);
    }
}



var counter = 1;//counte times
function getChangeByAccount() {
    setInterval(function () {
        if (web3.eth.accounts[0] !== address) {
            counter = 2;
            address = web3.eth.accounts[0];
            initAccount(web3);
        }
    }, 100);
}

window.addEventListener('load', function () {
    pageLoading();
    contract_address = "0x6e452121B2cEcb231ab95756f2bb034D8D07F5c2";
    //console.info(contract_address);
    pCode = UrlParm.parm("r");
    defalutCode = 'Q7T8WG';
    //init pcode
    setInvitors(pCode, defalutCode);

    //对接ETH
    if (typeof web3 !== 'undefined') {
        getChangeByAccount();
        isWeb3 = true;
        if (window.ethereum) {
            ethereum.enable();
        }
        //Initialization contract
        console.info(generateCode(true, 6, 6));
        initContract(web3);
        // Use the browser's ethereum provider
        var coinbase = web3.eth.coinbase;
        if (coinbase == null || coinbase == 'null') {
            if (web3.currentProvider.isMetaMask == true) {
                window.evAlertBox(errMetaWallet[langName]);
            }
            if (web3.currentProvider.isMathWallet == true) {
                window.evAlertBox(errWallet[langName]);
            } else {
                if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
                    window.evAlertBox(errWallet[langName]);
                }
            }
        }
    } else {
        window.evAlertBox(errAvailableWallet[langName]);
        $(".web3-required").show();
        $(".getWallet").show();
        $(".toInvest").hide();
        isWeb3 = false;
        console.log('No web3? You should consider trying MetaMask!')
    }
});


// init MetaMask Wallet
function initAccount(web3) {
    isTestNetwork(web3);
    //get account
    web3.eth.getAccounts(function (err, accounts) {
        //alert(JSON.stringify(accounts));
        if (accounts != null && accounts.length > 0) {
            address = accounts[0].toString();
            if (counter != 1) {
                evAlertBox(curAccountMsg[langName] + address);
            }
            $('.wallet-id').html(address);
            isWebLogin = true;
            var balance = 0;
            $(".balance").html(balance);
            //init address balance(异步调用）
            //console.info(address);
            web3.eth.getBalance(address, function (err, result) {
                //console.info(result);
                $(".balance").html(toEth(result));
            });
            getUserInfo(address);
            getPlatformInfo();
        } else {
            isWebLogin = false;
            evAlertBox(curNoAccountMsg[langName]);
        }
    });
}

//Total amount of income
function getUserInfo(userAddress) {
    var level = 0;
    var inLevel = 0;
    var waitToSend = 0;
    var allIncome = 0;
    var earnedCount = 0;
    var rewardCount = 0;
    $(".allIncome").html(allIncome + "<small> E</small>");
    $(".earnedCount").html(earnedCount + "<small> E</small>");
    $(".rewardCount").html(rewardCount + "<small> E</small>");
    $(".level").html(level);

    //getUserByAddr
    contract.getUserInfo(userAddress, function (error, result) {
        if (!error) {
            result = replaceValue(result);
            console.info(result);
            code = result[1];
            pCode = result[2];
            setInvitors(pCode,defalutCode,code);

            level = result[3];
            inLevel = result[4];

            haveInAmount = inAmount = toEth(parseInt(result[5]));
            valiableAmount = inWithDraw = toEth(result[6]);
            $(".inAmount").html(inAmount);
            $(".inWithDraw").html(inWithDraw + "<small> E</small>");
            $(".level").html("V" + level);
            $(".queueLevel").html("V" + inLevel);
            $(".inviteCount").html(result[11]);

            $(".withdraw").attr("disabled", "disabled");
            $(".toReplay").css('display', 'none').attr("disabled", "disabled");
            if (inWithDraw > 0) {
                $(".withdraw").removeAttr("disabled");
                $(".toReplay").css('display', 'block').removeAttr("disabled");
            }

            waitAmount = waitToSend = toEth(parseInt(result[8]));
            allIncome = toEth(parseInt(result[9]) + parseInt(result[10]));
            earnedCount = toEth(parseInt(result[9]));
            rewardCount = toEth(parseInt(result[10]));

            if(waitToSend > 0.1){
                $(".ToSend").removeAttr("disabled");
            }

            $(".allIncome").html(allIncome + "<small> E</small>");
            $(".earnedCount").html(earnedCount + "<small> E</small>");
            $(".rewardCount").html(rewardCount + "<small> E</small>");
            $(".waitToSend").html(waitToSend + "<small> E</small>");
        }
    });
}

//the platform info
function getPlatformInfo() {
    //getPlatformInfo
    contract.getPlatforms(function (error, result) {
        if (!error) {
            result = replaceValue(result);
            console.info(result);
            var amountStr = Number(result[1]).toLocaleString().replace(/\$|\,/g, '');
            var amountStr1 = Number(result[2]).toLocaleString().replace(/\$|\,/g, '');

            $(".poolCoin").html(Number(amountStr.substring(0, amountStr.length - 18)) + " ETH");// +
            $(".trustCoin").html(Number(amountStr1.substring(0, amountStr1.length - 18)) + 218 + " ETH");//result[1]
        } else {
            evAlertBox(errorInfoMsg[langName]);
            //console.info(error);
        }
    });
}

function getInvitors() {
    var code;
    var pCode;
    code = generateCode(true, 6, 6);
    pCode = $(".invitors").val();
    if ($(".invitors").prop("disabled") && $(".inviteCode").html() != '--'){
        code = $(".inviteCode").html();
    }
    if(pCode == "" || pCode ==null){
        pCode = defalutCode;
    }
    pCode = pCode.trim();
    var pattern = new RegExp("[`~!@+#$^&*()=|{}':;',\\[\\].<>《》/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
    if (pCode.length != 6 || pattern.test(pCode)) {
        evAlertBox(errorCodeMsg[langName]);
        return false;
    }
    return [pCode, code];
}

//invest
function invest() {
    if (isWeb3 == false) {
        evAlertBox(errAvailableWallet[langName]);
        return;
    }
    if (isWebLogin == false) {
        evAlertBox(errWallet[langName]);
        return;
    }
    var rv = getInvitors();
    if (!rv) {
        return;
    } else {
        var pCode = rv[0];
        var code = rv[1];
    }
    //if(pCode != '000000' && (!e.result || !e.status)){pCode == defalutCode;}
    contract.getUserByCode(pCode.toUpperCase(), function (error, result) {
        if (!error) {
            if(result || pCode == '000000') {
                contract.getUserByCode(code.toUpperCase(), function (error, result) {
                    if (!error) {
                        if (result && !$(".invitors").prop("disabled")) {
                            code = generateCode(true, 6, 6);
                            console.info("邀请码已存在，重新生成" + code);
                        }
                        //invest
                        var investAmount = $(".investAmount").val();

                        if (!(investAmount % 1 === 0 && (investAmount >= 1 && investAmount <= 30))) {
                            evAlertBox(errorNumMsg[langName]);
                            return;
                        }
                        var errOverMsg = {
                            'en': "Up to " + (30 - haveInAmount) + "ETH can be invested in this time.",
                            'zh': "本次最多可入股" + (30 - haveInAmount) + "个ETH",
                            'jp': "今回は最大" + (30 - haveInAmount) + "つのETHを出資することができます",
                            'kr': "이번 최대 " + (30 - haveInAmount) + "개 ETH",
                            'de': "Die maximale Anzahl der Aktien dieses Mal verfügbar" + (30 - haveInAmount) + "Eine ETH"
                        };
                        var rr = errOverMsg[langName];
                        if ((parseInt(haveInAmount) + parseInt(investAmount)) > 30) {
                            evAlertBox(rr);
                            return;
                        }

                        var etherValue = web3.toWei(investAmount, 'ether');

                        contract.invest(code.toUpperCase(), pCode.toUpperCase(),ips.cip, {
                            from: address,
                            value: etherValue
                        }, function (error, result) {
                            if (!error) {
                                //console.log(JSON.stringify(result));
                                evAlertBox(infoFinishMsg[langName]);
                            } else {
                                //cancel error
                                evAlertBox(errorCancelMsg[langName]);
                            }
                        });
                    } else {
                        //query error
                        evAlertBox(errorQueryMsg[langName]);
                        return;
                    }
                });
            }else{
                evAlertBox(errorExistMsg[langName]);
                //console.info(e);
                return;
            }
        } else {
            evAlertBox(errorQueryMsg[langName]);
            //console.info(e);
            return;
        }
    });
}
