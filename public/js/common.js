var ipUrl = window.location.protocol + '//' + window.location.host;

$(function(){
    var footer=$(".footer");
    //var fH=footer.height;
    var vw = screen.width;
    var vh = window.innerHeight;
    //console.log(vh);
    var rootH = $(".root").height(vh);
    if(vw >= 992){
        footer.addClass("toFixed");
    }else{
        footer.removeClass("toFixed");
    }
})

UrlParm = function () {
    var data, index;
    (function init() {
        data = [];
        index = {};
        var u = window.location.search.substr(1);
        if (u != '') {
            var parms = decodeURIComponent(u).split(/[?*&]/);
            for (var i = 0, len = parms.length; i < len; i++) {
                if (parms[i] != '') {
                    var p = parms[i].split("=");
                    if (p.length == 1 || (p.length == 2 && p[1] == '')) {
                        data.push(['']);
                        index[p[0]] = data.length - 1;
                    } else if (typeof(p[0]) == 'undefined' || p[0] == '') {
                        data[0] = [p[1]];
                    } else if (typeof(index[p[0]]) == 'undefined') {
                        data.push([p[1]]);
                        index[p[0]] = data.length - 1;
                    } else {// c=aaa
                        data[index[p[0]]].push(p[1]);
                    }
                }
            }
        }
    })();
    return {
        parm: function (o) {
            try {
                return (typeof(o) == 'number' ? data[o][0] : data[index[o]][0]);
            } catch (e) {
            }
        },
        parmValues: function (o) {
            try {
                return (typeof(o) == 'number' ? data[o] : data[index[o]]);
            } catch (e) {
            }
        },
        hasParm: function (parmName) {
            return typeof(parmName) == 'string' ? typeof(index[parmName]) != 'undefined' : false;
        },
        parmMap: function () {
            var map = {};
            try {
                for (var p in index) {
                    map[p] = data[index[p]];
                }
            } catch (e) {
            }
            return map;
        }
    }
}();

function evAlertBox(cont){
    var className = $(".language").attr("class");
    var evLang = {
        'en':{'title':'Tips','btn':'confirm','color':'red'},
        'zh':{'title':'提示','btn':'确认','color':'red'},
        'jp':{'title':'ヒント','btn':'確認','color':'red'},
        'de':{'title':'Tipps','btn':'bestätigen','color':'red'},
        'kr':{'title':'힌트','btn':'확인','color':'red'},
    };
    var lg = 'en';
    if (className.indexOf("language_kr") != -1) {
        lg = 'kr';
    }else if (className.indexOf("language_zh") != -1) {
        lg = 'zh';
    }else if (className.indexOf("language_jp") != -1){
        lg = 'jp';
    }else if (className.indexOf("language_de") != -1){
        lg = 'de';
    }

    PostbirdAlertBox.alert({
        'title': evLang[lg]['title'],
        'content': cont,
        'okBtn': evLang[lg]['btn'],
        'contentColor': evLang[lg]['color']
    });
}

var clipboard = new ClipboardJS('.inviteCode', {
    text: function() {
        if($(".inviteCode").text() == '--'){
            return false;
        }
        return $.trim($(".inviteCode").text());
    }
});
clipboard.on('success', function(e) {
    console.log(e);
    var className = $(".language").attr("class");
    var cnt = "";
    if (className.indexOf("language_en") != -1) {
        cnt = "Shared Code Replication Successful";
    }else if (className.indexOf("language_zh") != -1) {
        cnt = "分享码复制成功";
    }else if (className.indexOf("language_jp") != -1){
        cnt = "共有コードのコピーに成功しました。";
    }else if (className.indexOf("language_de") != -1){
        cnt = "Kopierbarkeit der gemeinsamen Codereplikation";
    }else{
        cnt = "공유 코드 복사 성공";
    }
    evAlertBox(cnt);
});
clipboard.on('error', function(e) {
    console.log(e);
    var className = $(".language").attr("class");
    var cnt = "";
    if (className.indexOf("language_en") != -1) {
        cnt = "Shared Code Replication Failed";
    }else if (className.indexOf("language_zh") != -1) {
        cnt = "分享码复制失败";
    }else if (className.indexOf("language_jp") != -1){
        cnt = "共有コードのコピーに失敗しました。";
    }else if (className.indexOf("language_de") != -1){
        cnt = "Die gemeinsame Codereplikation ist fehlgeschlagen";
    }else{
        cocntn = "공유 코드 복사 실패";
    }
    evAlertBox(cnt);
});

var clipboard1 = new ClipboardJS('.copyUrl', {
    text: function() {
        if($(".inviteCode").text() == '--'){
            return self.location.href;
        }
        return $.trim(ipUrl+'?r='+$(".inviteCode").text());
    }
});
clipboard1.on('success', function(e) {
    console.log(e);
    var className = $(".language").attr("class");
    if($(".inviteCode").text()=='--'){
        var cnt = "";
        if (className.indexOf("language_en") != -1) {
            cnt = "Queuing, no invitation code assigned";
        }else if (className.indexOf("language_zh") != -1) {
            cnt = "正在排队中，未分配邀请码";
        }else if (className.indexOf("language_jp") != -1){
            cnt = "列に並んでいますが、招待コードが割り当てられていません。";
        }else if (className.indexOf("language_de") != -1){
            cnt = "Warteschlangen, kein Einladungscode zugewiesen";
        }else{
            cnt = "정렬 중 초청 코드를 분배하지 않음";
        }
        evAlertBox(cnt);
    } else {
        var cnt = "";
        if (className.indexOf("language_en") != -1) {
            cnt = "Links have been copied. Thank you for sharing.";
        }else if (className.indexOf("language_zh") != -1) {
            cnt = "链接已复制，谢谢分享";
        }else if (className.indexOf("language_jp") != -1){
            cnt = "リンクがコピーされました。ありがとうございます。";
        }else if (className.indexOf("language_de") != -1){
            cnt = "Links wurden kopiert. Vielen Dank für die Freigabe.";
        }else{
            cnt = "링크 복사 감사합니다";
        }
        evAlertBox(cnt);
    }

});
clipboard1.on('error', function(e) {
    console.log(e);
    var className = $(".language").attr("class");
    var cnt = "";
    if (className.indexOf("language_en") != -1) {
        cnt = "copy failed";
    }else if (className.indexOf("language_zh") != -1) {
        cnt = "复制失败";
    }else if (className.indexOf("language_jp") != -1){
        cnt = "コピーに失敗しました";
    }else{
        cnt = "복사 실패";
    }
    evAlertBox(cnt);
});

var clipboard2 = new ClipboardJS('.wallet-id', {
    text: function() {
        return $.trim($(".wallet-id").html());
    }
});
clipboard2.on('success', function(e) {
    console.log(e);
    var className = $(".language").attr("class");
    var cnt = "";
    if (className.indexOf("language_en") != -1) {
        cnt = "Successful replication";
    }else if (className.indexOf("language_zh") != -1) {
        cnt = "复制成功";
    }else if (className.indexOf("language_jp") != -1){
        cnt = "コピー成功";
    }else if (className.indexOf("language_de") != -1){
        cnt = "Erfolgreiche Replikation";
    }else{
        cnt = "복사 성공";
    }
    evAlertBox(cnt);
});
clipboard2.on('error', function(e) {
    console.log(e);
    var className = $(".language").attr("class");
    var cnt = "";
    if (className.indexOf("language_en") != -1) {
        cnt = "copy failed";
    }else if (className.indexOf("language_zh") != -1) {
        cnt = "复制失败";
    }else if (className.indexOf("language_jp") != -1){
        cnt = "コピーに失敗しました";
    }else{
        cnt = "복사 실패";
    }
    evAlertBox(cnt);
});

/**
 * 时间戳转化为年 月 日 时 分 秒
 * number: 传入时间戳
 * format：返回格式，支持自定义，但参数必须与formateArr里保持一致
 */
function formatTime(number,format) {

    var formateArr  = ['Y','M','D','h','m','s'];
    var returnArr   = [];

    var date = new Date(number * 1000);
    returnArr.push(date.getFullYear());
    returnArr.push(formatNumber(date.getMonth() + 1));
    returnArr.push(formatNumber(date.getDate()));

    returnArr.push(formatNumber(date.getHours()));
    returnArr.push(formatNumber(date.getMinutes()));
    returnArr.push(formatNumber(date.getSeconds()));

    for (var i in returnArr)
    {
        format = format.replace(formateArr[i], returnArr[i]);
    }
    return format;
}

//数据转化
function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}
