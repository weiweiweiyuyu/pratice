/**
 * version: 1.0.7
 */
function __jrJsBridge(global) {
    function Promise() {
        this.tasks = [];
        this.state = 'pending';
        this.data = null;
    }
    Promise.prototype = {
        constructor: Promise,
        resolve: function (data) {
            this.state = 'resolved';
            data && (this.data = data);

            var i = 0,
                tasks = this.tasks,
                len = tasks.length;

            while (tasks.length > 0) {
                tasks.shift().call(this.data, this.data);
            }

            // for (; i < len; i++) {
            //   tasks[i].call(this.data, this.data);
            //   tasks.shift();
            // }
        },
        then: function (fn) {
            if (typeof fn === 'function') {
                this.tasks.push(fn);
                if (this.state === 'resolved')
                    this.resolve();
            }
            return this;
        }
    };

    var responseCallbackt = null;
    var USR_AGENT = global.navigator.userAgent;
    var REG_APPLE_SETS = /(iPhone|iPad|iPod)/i;
    var REG_JDAPP_SETS = /(jdapp)/i;
    var BridgeLiving = null;
    if (!REG_APPLE_SETS.test(USR_AGENT)) {
        global.goToGetres = function (data) {
            try {
                responseCallbackt(data);
            } catch (error) {
                console.log(error);
            }
        };
    }

    if (REG_JDAPP_SETS.test(USR_AGENT)) {
        global.goToJDAppGetres = function (data) {
            responseCallbackt(data);
        };
    }

    return (function () {
        var iosWebView = null,
            iosWebExtend = null,
            iosWebViewNaviBar = null,
            iosWeiXinCot = null,
            iosComment = null,
            iosResponse = null,
            iosJDPaySDK = null,
            iosSendRecord = null,
            iosJDJRWebStat = null,
            iosCloseXview = null,
            iosXviewPageStatusCallBack = null,
            iosEtcH5InvokeNative = null;
        var orginConfig = {
            appId: '',
            img: window.location.protocol + '//m.jr.jd.com/statics/logo.jpg',
            link: window.location.protocol + '//m.jr.jd.com/',
            desc: '\u6700\u5177\u5168\u9762\u7684\u7406\u8d22\u8f6f\u4ef6',
            title: '\u6b22\u8fce\u4f7f\u7528\u4eac\u4e1c\u91d1\u878d\u0061\u0070\u0070',
            friendesc: '\u6b22\u8fce\u4f7f\u7528\u4eac\u4e1c\u91d1\u878d\u0061\u0070\u0070',
            btnTextS: '\u5206\u4eab',
            btnTextJ: '\u8df3\u8f6c',
            btnTextN: '\u91d1\u878d'
        };

        function isOurApp() {
            var navUsAg = USR_AGENT.toLowerCase();
            var navUsAgDate = {};
            var isOur = /jdjr-app/.test(navUsAg);
            navUsAgDate.isOur = isOur;
            if (isOur) {
                navUsAgDate.isIos = /clienttype=ios/.test(navUsAg);
                navUsAgDate.isAnd = /jdjr-app-android/.test(navUsAg);
            }
            return navUsAgDate;
        }

        function formateDate(str) {
            (typeof str == 'string') && (str = str.replace(/\"/g, "'"));
            return str;
        }

        function formateArray(arr) {
            var arrt = '';
            if (arr instanceof Array) {
                for (var i = 0, j = arr.length; i < j; i++) {
                    if (typeof arr[i] === 'object') {
                        arrt += getAndJson(arr[i]) + ','
                    } else {
                        arrt += '"' + arr[i] + '",'
                    }
                }
                return arrt.substring(0, arrt.length - 1);
            }
        }

        function getAndJson(option) {
            var _option = '{';
            for (let key in option) {
                if (typeof option[key] === 'object') {
                    if (option[key] instanceof Array) {
                        _option += '"' + key + '":[' + formateArray(option[key]) + '],';
                    } else {
                        _option += '"' + key + '":' + getAndJson(option[key]) + ',';
                    }
                } else {
                    _option += '"' + key + '":"' + formateDate(option[key]) + '",';
                }
            }
            _option = _option.substring(0, _option.length - 1);
            _option += '}';
            return _option;
        }

        /*
         * config share channel
         * 
         * 
         */


        // shareDataNew: {     //以上是老版分享内容配置，这个字段是新版分享内容配置
        //     "isLogin":"0",
        //      "id":"5",
        //      "linkSubtitle":"嘉实优质企业混合型证券投资基金,最新净值,1.3920",
        //      "imageUrl":"https://m.jr.jd.com/statics/logo.jpg",
        //      "link":[
        //          "https://mlicai.jd.com/product/100487",   //协议头必须是https开头
        //          "https://mlicai.jd.com/product/100487", //协议头必须是https开头
        //          "https://mlicai.jd.com/product/100487"], //协议头必须是https开头
        //      "linkTitle":"我很看好京东金融这款安全高收益的理财产品,推荐你购买哦~",
        //      "channels":["0","1","2"], //分享渠道，0-微信朋友圈，1-微信好友，2-新浪微博，3-短信，4-QQ好友，5-QQ空间
        //      "productName":"jijin_xiangqing",
        //      "productId":"100487"
        //      }

        // 默认分享渠道配置
        var defaultChannel = ["0", "1", "4", "5", "3"] //分享渠道，0-微信朋友圈，1-微信好友，2-新浪微博，3-短信，4-QQ好友，5-QQ空间
        //是否强制使用默认分享渠道 ，false不强制，true强制
        var isSure = false;

        var deleteChannel = true;

        function checkChannel(channels, links) {
            try {
                var newChannel = defaultChannel;
                if (channels && channels.length > 0) {

                    if (!isSure) {
                        var tmplChannel = [];
                        for (var i = 0; i < channels.length; i++) {
                            if (parseInt(channels[i]) == 2) {
                                channels.splice(i, 1);
                            }
                        }
                        newChannel = channels;
                    }
                    // if (newChannel.indexOf("2") == -1 && channels.indexOf("2") != -1) {
                    // newChannel.push('2');
                    // }
                }

                if (links.length > 0) {
                    // for (var i = 0; i < links.length; i++) {
                    if (links.toString().indexOf("open.weixin.qq.com") != -1) {
                        newChannel = ["0", "1"];
                    }
                    // }
                }
                // console.log(hasweixin);
                return newChannel;
            } catch (error) {

            }
        }

        function checkUrl(links, url) {
            try {
                var newArrUrl = [];
                if (!links) {
                    for (var i = 0; i < defaultChannel.length; i++) {
                        newArrUrl.push(url);
                    }
                } else {
                    for (var i = 0; i < 6; i++) {
                        newArrUrl.push(links[i] || url);
                    }
                }
                return newArrUrl;
            } catch (error) {

            }
        }

        function configShareChannel(optionNew, option) {
            try {
                var newOption = {
                    "isLogin": optionNew.isLogin || "0",
                    "id": optionNew.id || "5",
                    "linkSubtitle": optionNew.linkSubtitle || option.desc,
                    "imageUrl": optionNew.imageUrl || option.img,
                    "link": checkUrl(optionNew.link, option.link),
                    "linkTitle": optionNew.linkTitle || option.title,
                    "channels": checkChannel(optionNew.channels, checkUrl(optionNew.link, option.link)),
                    "productName": optionNew.productName || "",
                    "productId": optionNew.productId || ""
                }

                return newOption;
            } catch (error) {

            }
        }


        function bridgeToNative(option) {
            try {
                if (REG_APPLE_SETS.test(USR_AGENT)) {
                    iosWebView && iosWebView(option);
                } else {
                    if (typeof option == 'object') {
                        global.jd.closeAndWebView(getAndJson(option));
                    } else {
                        global.jd.closeWebView(option);
                    }
                }
            } catch (e) {
                console.log('error')
            }
        }

        function bridgeWeiXin(option) {
            try {
                var _option = {};
                var defaultShareDate = function (a) {
                    var c = {},
                        b = {
                            appId: orginConfig.appId,
                            img: orginConfig.img,
                            link: orginConfig.link,
                            desc: orginConfig.desc,
                            title: orginConfig.title,
                            friendesc: orginConfig.friendesc
                        };
                    (typeof a != 'object') && (a = b);
                    for (let k in b) {
                        if (k == 'img' || k == 'link') {
                            //c[k] = ((/http:|https:/i).test(a[k])?a[k]:window.location.protocol+a[k])||b[k];
                            c[k] = (a[k].length <= 0 ?
                                b[k] :
                                ((/http:|https:/i).test(a[k]) ?
                                    a[k] :
                                    window.location.protocol + a[k]));
                        } else {
                            c[k] = a[k] || b[k];
                        }
                    }
                    return c;
                };
                switch (option.optionType) {
                    case 1:
                        _option.isShow = option.isShow;
                        _option.optionType = 1;
                        _option.btnText = option.btnText || orginConfig.btnTextS;
                        _option.shareDate = defaultShareDate(option.shareDate);
                        _option.shareDataNew = configShareChannel(option.shareDataNew || {}, option.shareDate);
                        // (option.shareDataNew
                        //     ? _option.shareDataNew = configShareChannel(option.shareDataNew, option.shareDate)
                        //     : false);
                        (option.shareDate.type) && (_option.shareDate.type = option.shareDate.type);
                        break;
                    case 2:
                        _option.isShow = option.isShow;
                        _option.optionType = 2;
                        _option.btnText = option.btnText || orginConfig.btnTextJ;
                        _option.jumpLiDate = option.jumpLiDate;
                        break;
                    case 3:
                        _option.isShow = option.isShow;
                        _option.optionType = 3;
                        _option.btnText = option.btnText || orginConfig.btnTextN;
                        _option.jumpNaDate = option.jumpNaDate;
                        break;
                    case 4:
                        _option.isShow = option.isShow;
                        _option.optionType = 4;
                        _option.btnText = option.btnText || orginConfig.btnTextN;
                        _option.showData = option.showData;
                        break;
                    default:
                        _option.isShow = option.isShow;
                        _option.optionType = 1;
                        _option.btnText = option.btnText;
                        _option.shareDate = defaultShareDate(option.shareDate);
                        _option.shareDataNew = configShareChannel(option.shareDataNew || {}, option.shareDate);
                        // (option.shareDataNew
                        //     ? _option.shareDataNew = configShareChannel(option.shareDataNew, option.shareDate)
                        //     : false);
                        (option.shareDate.type) && (_option.shareDate.type = option.shareDate.type);
                        break;
                }

                if (REG_APPLE_SETS.test(USR_AGENT)) {
                    console.log("_option---", _option);
                    iosWeiXinCot && iosWeiXinCot(_option);
                } else {
                    global.jd.sendWeiXinCot(getAndJson(_option));
                }
            } catch (e) {
                console.log('error', e)
            }
        }

        function bridgeComment() {
            try {
                if (REG_APPLE_SETS.test(USR_AGENT))
                    iosComment && iosComment();
                else
                    global.jd.goToComment();
            } catch (e) {
                console.log('error')
            }
        }

        function responseData(option) {
            try {
                if (REG_APPLE_SETS.test(USR_AGENT))
                    iosResponse && iosResponse(option);
                else
                    global.jd.getResponse(getAndJson(option));
            } catch (e) {
                console.log('error')
            }
        }

        function jdPayReq(option) {
            try {
                if (REG_JDAPP_SETS.test(USR_AGENT.toLowerCase())) {
                    if (REG_APPLE_SETS.test(USR_AGENT)) {
                        window.location.href = 'native://pay?type=' + option.type + '&appId=' + option.appId + '&payParam=' + option.payParam + '&bizParam=' + option.bizParam + '&callback=goToJDAppGetres';
                    } else if (global.JDPaySdk) {
                        global.JDPaySdk.pay(option.type, option.appId, option.payParam, option.bizParam, 'goToJDAppGetres');
                    }
                } else {
                    if (REG_APPLE_SETS.test(USR_AGENT)) {
                        iosJDPaySDK && iosJDPaySDK(option);
                    } else {
                        global.jd.JDPaySDK(getAndJson(option));
                    }
                }
            } catch (e) {
                console.log('error')
            }

        }

        function openNewWebView(option) {
            try {
                if (REG_APPLE_SETS.test(USR_AGENT)) {
                    iosWebExtend && iosWebExtend(option);
                } else {
                    var optiont = {};
                    optiont.productId = option.productId;
                    optiont.forward = option;
                    optiont.isclose = option.isclose;
                    optiont.isShowTitle = option.isShowTitle;
                    if (typeof optiont == 'object') {
                        global.jd.closeWebViewExtend(getAndJson(optiont));
                    } else {
                        global.jd.closeWebViewExtend(optiont);
                    }
                }
            } catch (e) {
                console.log('error')
            }
        }

        /*
         */
        function setNaviBarData(option) {
            try {
                if (REG_APPLE_SETS.test(USR_AGENT)) {
                    iosWebViewNaviBar && iosWebViewNaviBar(option);
                } else {
                    if (typeof option == 'object') {
                        global.jd.WebViewNaviBar(getAndJson(option));
                    } else {
                        global.jd.WebViewNaviBar(option);
                    }
                }
            } catch (e) {
                console.log('error')
            }
        }
        /*
              浏览记录
         * */
        function setJRWebStat(option) {
            try {
                if (REG_APPLE_SETS.test(USR_AGENT)) {
                    iosJDJRWebStat && iosJDJRWebStat(option);
                } else {
                    if (typeof option == 'object') {
                        global.jd.JDJRWebStat(getAndJson(option));
                    } else {
                        global.jd.JDJRWebStat(option);
                    }
                }
            } catch (e) {
                console.log('error+' + e)
            }
        }

        function sendRecordDate(option) {

            try {
                if (REG_APPLE_SETS.test(USR_AGENT))
                    iosSendRecord && iosSendRecord(option);
                else
                    global.jd.sendRecord(getAndJson(option));
            } catch (e) {
                console.log('error')
            }

        }

        function jsToNative(option) {
            if (option != '' && typeof option == 'object')
                bridgeToNative(option);
        }

        function jsToNaClose() {
            bridgeToNative();
        }

        function jsToNaWeiXin(option) {
            if (option != '' && typeof option == 'object')
                bridgeWeiXin(option);
        }

        function jsToComment() {
            bridgeComment();
        }

        function jsToNaMsg() {
            return isOurApp();
        }

        function jsToGetResp(responseCallback, option) {
            responseCallbackt = responseCallback;
            if (option !== '' && typeof option === 'object') {
                if (option.type && parseInt(option.type) == 4) {
                    // alert(JSON.stringify(option.shareDataNew))
                    option.shareDataNew = configShareChannel(option.shareDataNew || {}, option.shareDate || {})
                }
                responseData(option);
            }
        }

        function jsSendRecord(option) {
            if (option != '' && typeof option == 'object')
                sendRecordDate(option);
        }

        function jsOpenWeb(option) {
            if (option != '' && typeof option == 'object')
                openNewWebView(option);
        }

        function jsCloseXview(option) {
            if (option != '' && typeof option == 'object') {
                try {
                    if (REG_APPLE_SETS.test(USR_AGENT))
                        iosCloseXview && iosCloseXview(option);
                    else
                        global.jd.closeXview(getAndJson(option));
                } catch (e) {
                    console.log('error')
                }
            }
        }

        function jsXviewPageStatusCallBack(option) {
            if (option != '' && typeof option == 'object') {
                try {
                    if (REG_APPLE_SETS.test(USR_AGENT))
                        iosXviewPageStatusCallBack && iosXviewPageStatusCallBack(option);
                    else
                        global.jd.pageStatusCallBack(getAndJson(option));
                } catch (e) {
                    console.log('error')
                }
            }
        }

        function jsEtcH5InvokeNative(option) {
            if (option != '' && typeof option == 'object') {
                try {
                    if (REG_APPLE_SETS.test(USR_AGENT))
                        iosEtcH5InvokeNative && iosEtcH5InvokeNative(option);
                    else
                        global.jd.etcH5InvokeNative(getAndJson(option));
                } catch (e) {
                    console.log('error')
                }
            }
        }
        //setNaviBar
        function setNaviBar(option) {
            if (option != '' && typeof option == 'object')
                setNaviBarData(option);
        }
        //jdpay
        function jdPaySdk(responseCallback, option) {
            responseCallbackt = responseCallback;
            if (option !== '' && typeof option === 'object')
                jdPayReq(option);
        }

        function connectWebViewJavascriptBridge(callback) {
            if (global.WebViewJavascriptBridge)
                callback(WebViewJavascriptBridge);
            else
                global.document.addEventListener('WebViewJavascriptBridgeReady', function () {
                    callback(WebViewJavascriptBridge)
                }, false);
        }

        function onReady(readyCallback) {
            var deffer = new Promise();
            var Api = this;
            var onBridgeReady = function (bridge) {
                iosWebView = function (option) {
                    bridge.callHandler('closeWebView', option, function (response) {});
                };
                iosWebExtend = function (option) {
                    bridge.callHandler('closeWebViewExtend', option, function (response) {});
                }
                iosWebViewNaviBar = function (option) {
                    bridge.callHandler('WebViewNaviBar', option, function (response) {});
                }
                iosWeiXinCot = function (option) {
                    bridge.callHandler('sendWeiXinCot', option, function (response) {});
                };
                iosComment = function (option) {
                    bridge.callHandler('goToComment', option, function (response) {});
                };
                iosResponse = function (option) {
                    bridge.callHandler('getResponse', option, function (response) {});
                };
                iosJDPaySDK = function (option) {
                    bridge.callHandler('JDPaySDK', option, function (response) {});
                };
                iosSendRecord = function (option) {
                    bridge.callHandler('sendRecord', option, function (response) {});
                };
                iosJDJRWebStat = function (option) {
                    bridge.callHandler('JDJRWebStat', option, function (response) {});
                }
                iosCloseXview = function (option) {
                    bridge.callHandler('closeXview', option, function (response) {});
                }
                iosXviewPageStatusCallBack = function (option) {
                    bridge.callHandler("pageStatusCallBack", option, function (response) {})
                };
                iosEtcH5InvokeNative = function (option) {
                    bridge.callHandler("etcH5InvokeNative", option, function (response) {})
                };
                if (REG_APPLE_SETS.test(USR_AGENT) && !WebViewJavascriptBridge._messageHandler) {
                    bridge.init(function (message, responseCallback) {
                        responseCallbackt(message);
                    });
                }
                if (readyCallback && typeof readyCallback === 'function')
                    readyCallback.call(Api, Api);
                deffer.resolve(Api);
            };
            if (global.WebViewJavascriptBridge) {
                onBridgeReady(WebViewJavascriptBridge);
            } else if (global.document.attachEvent) {
                onBridgeReady(WebViewJavascriptBridge);
            } else if (REG_JDAPP_SETS.test(USR_AGENT.toLowerCase())) {
                if (readyCallback && typeof readyCallback === 'function') {
                    readyCallback.call(Api, Api);
                }
                deffer.resolve(Api);
            } else {
                global.document.addEventListener('WebViewJavascriptBridgeReady', function () {
                    onBridgeReady(WebViewJavascriptBridge)
                }, false);
                if (!REG_APPLE_SETS.test(USR_AGENT)) {
                    if (readyCallback && typeof readyCallback === 'function')
                        readyCallback.call(Api, Api);
                    deffer.resolve(Api);
                }
            }
            return deffer;
        }

        function popDeffer(callback) {
            if (!window.isBridgeOnReady || BridgeLiving === null) {
                window.isBridgeOnReady = true;
                BridgeLiving = onReady.call(this, callback);
            }
            return BridgeLiving;
        }
        return {
            onReady: popDeffer,
            jsToNative: jsToNative,
            jsToNaClose: jsToNaClose,
            jsToNaWeiXin: jsToNaWeiXin,
            jsToComment: jsToComment,
            jsToNaMsg: jsToNaMsg,
            jsToGetResp: jsToGetResp,
            jdPay: jdPaySdk,
            jsSendRecord: jsSendRecord,
            jsOpenWeb: jsOpenWeb,
            jsCloseXview: jsCloseXview,
            jsXviewPageStatusCallBack: jsXviewPageStatusCallBack,
            jsEtcH5InvokeNative: jsEtcH5InvokeNative,
            setNaviBar: setNaviBar,
            setJRWebStat: setJRWebStat
        };
    })();
}

export default __jrJsBridge(typeof window !== 'undefined' ? window : this);