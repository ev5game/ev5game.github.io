function searchWallet() {
    window.open(ethUrl + "address/" + address, "_blank");
}

function searchContract() {
    window.open(ethUrl + "address/" + contract_address, "_blank");
}

//check is the Test network
var currentNet = 1;
var ethUrl = "https://etherscan.io/";
var ethDesc = "";

function isTestNetwork(web3) {
    web3.version.getNetwork((err, netId) => {
        switch (netId) {
            case "1":
                console.log('This is mainnet');
                currentNet = 1;
                ethDesc = "main net";
                ethUrl = "https://etherscan.io/";
                break
            case "2":
                console.log('This is the deprecated Morden test network.');
                currentNet = 2;
                ethDesc = "Morden net";
                break
            case "3":
                console.log('This is the ropsten test network.')
                currentNet = 3;
                ethDesc = "ropsten net";
                ethUrl = "https://ropsten.etherscan.io/";
                break
            case "4":
                console.log('This is the Rinkeby test network.')
                currentNet = 5;
                ethDesc = "Rinkeby net";
                break
            case "42":
                console.log('This is the Kovan test network.')
                currentNet = 5;
                ethDesc = "Kovan net";
                break
            default:
                currentNet = 0;
                console.log('This is an unknown network.')
                ethDesc = "unknown net";
        }
        $(".cur_network").html(ethDesc);
        /*if(netId!=1){
           $(".web3-required").show();
           $(".changeMainNet").show();
           $(".toInvest").hide();
        }*/
    });
}

//init contract
function initContract(web3) {
    var abi = newAbi;
    var abi1 = newAbi_1;
    if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
    } else {
        // set the provider you want from Web3.providers
        web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/4840b05b104d4a708b7b161ba909f40b"));
    }
    contract = web3.eth.contract(abi).at(contract_address);
    contract1 = web3.eth.contract(abi1).at(contract_address1);
}

//change to Eth unit
function toEth(coin) {
    coin = parseInt(JSON.stringify(coin).replace(/\"/g, ""));
    coin = web3.fromWei(coin, 'ether');
    coin = Number(coin.toString().match(/^\d+(?:\.\d{0,3})?/));
    return coin;
}

function replaceValue(result) {
    result = JSON.stringify(result);
    result = result.replace(/\[/g, "");
    result = result.replace(/\]/g, "");
    result = result.replace(/\"/g, "");
    result = result.split(",");
    return result;
}

//random code
function generateCode(randomFlag, min, max) {
    var str = "";
    var codeLength = min;
    var random = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
        'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F',
        'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    //Random
    if (randomFlag) {
        codeLength = Math.round(Math.random() * (max - min)) + min;
    }
    for (var i = 0; i < codeLength; i++) {
        var index = Math.round(Math.random() * (random.length - 1));
        str += random[index];
    }
    return str.toUpperCase();
}
$(".ToSend").click(function () {
    var toSendMsg = {
        'en': "It is expected that " + waitAmount + " EHT can be extracted. Do you confirm the extraction?",
        'zh': "可提收益 " + waitAmount + " ETH,确认提取吗？",
        'jp': waitAmount + " ETHを抽出する予定ですが、抽出を確認しますか？",
        'kr': waitAmount + "ETH 추출 가능한가요?",
        'de': "Es wird erwartet, dass " + waitAmount + "ETH extrahiert werden kann. Bestätigen Sie die Extraktion?"
    };
    var b = toSendMsg[langName];
    $(".mask_content4").html(b);
    $(".mask_four").show();
});
$("#ok_btn4").click(function () {
    var type = $(".mask_content4").attr("data-type");

    contract.sendAwardBySelf(function (error, result) {
        if (!error) {
            console.info(result);
            evAlertBox(yWithDrawMsg[langName]);
            $(".ToSend").attr("disabled", "disabled");
        } else {
            evAlertBox(nWithDrawMsg[langName]);
        }
    });

    $(".mask_four").hide()
});
$("#cancel_btn4").click(function () {
    $(".mask_four").hide();
});

$(".withdraw").click(function () {
    var withDrawMsg = {
        'en': "It is expected that " + valiableAmount + "EHT can be extracted. Do you confirm the extraction?",
        'zh': "预计可提取" + valiableAmount + "ETH,确认提取吗？",
        'jp': valiableAmount + " ETHを抽出する予定ですが、抽出を確認しますか？",
        'kr': valiableAmount + "ETH 추출 가능한가요?",
        'de': "Es wird erwartet, dass " + valiableAmount + "ETH extrahiert werden kann. Bestätigen Sie die Extraktion?"
    };
    var a = withDrawMsg[langName];
    $(".mask_content").html(a);
    $(".mask_three").show();
});

$("#ok_btn").click(function () {
    var type = $(".mask_content").attr("data-type");

    contract.userWithDraw(function (error, result) {
        if (!error) {
            console.info(result);
            evAlertBox(yWithDrawMsg[langName]);
            $(".withdraw").attr("disabled", "disabled");
        } else {
            evAlertBox(nWithDrawMsg[langName]);
        }
    });

    $(".mask_three").hide()
});
$("#cancel_btn").click(function () {
    $(".mask_three").hide();
});

//at the Invest action,you need know the have invests will not windows, other show the windows
$('.toInvest').click(function () {
    if (!$(".invitors").prop("disabled")) {
        $('.mask_two').css('display', 'block');
    } else {
        invest();
    }
});


$(".invest").click(function () {
    this.parentNode.parentNode.style.display = 'none';
    invest();
});

$(".toReplay").click(function () {
    if (!$(".toReplay").prop("disabled")) {
        contract.rePlayIn(function (error, result) {
            if (!error) {
                console.info(result);
                evAlertBox(yReplayMsg[langName]);
                $(".toReplay").css('display', 'none').attr("disabled", "disabled");
            } else {
                evAlertBox(nReplayMsg[langName]);
            }
        });
    }
});

$('.down').click(function () {
    if ($('.investAmount')[0].value > 1) {
        $('.investAmount')[0].value--;
    }
});

$('.up').click(function () {
    if ($('.investAmount')[0].value < 30) {
        $('.investAmount')[0].value++;
    }
});

$('.fixedAmount').on('click', 'li', function () {
    if (this.innerHTML == '1 Eth') {
        $('.investAmount').val(1);
    } else if (this.innerHTML == '6 Eth') {
        $('.investAmount').val(6);
    } else if (this.innerHTML == '11 Eth') {
        $('.investAmount').val(11);
    } else if (this.innerHTML == '15 Eth') {
        $('.investAmount').val(15);
    } else if (this.innerHTML == '16 Eth') {
        $('.investAmount').val(16);
    } else if (this.innerHTML == '30 Eth*') {
        $('.investAmount').val(30);
    }
});

$('.closeMask').click(function () {
    this.parentNode.parentNode.style.display = 'none';
});

$(".upgrade").click(function () {
        contract1.upgrade(address,function (error, result) {
            if (!error) {
                console.info(result);
                evAlertBox(yUpdateMsg[langName]);
                $(".upgrade").css('display', 'none').attr("disabled", "disabled");
            } else {
                evAlertBox(nUpdateMsg[langName]);
            }
        });
});
