//==本JS是加载Lodop插件或Web打印服务CLodop/Lodop7的综合示例，可直接使用，建议理解后融入自己程序==
import { MessageBox } from 'element-ui'
//用双端口加载主JS文件Lodop.js(或CLodopfuncs.js兼容老版本)以防其中某端口被占:

function setJsUrl(remoteIp = 'localhost') {
  var MainJS ="CLodopfuncs.js"
  window.URL_WS1   = "ws://" + remoteIp + ":8000/"+MainJS,                //ws用8000/18000
  window.URL_WS2   = "ws://" + remoteIp + ":18000/"+MainJS,                //ws用8000/18000
  window.URL_HTTP1 = "http://" + remoteIp + ":8000/"+MainJS,              //http用8000/18000
  window.URL_HTTP2 = "http://" + remoteIp + ":18000/"+MainJS,
  window.URL_HTTP3 = "https://" + remoteIp +  ".lodop.net:8443/"+MainJS;   //https用8000/8443
}
var CreatedOKLodopObject, CLodopIsLocal, LoadJsState;

//==判断是否需要CLodop(那些不支持插件的浏览器):==
function needCLodop() {
    try {
        var ua = navigator.userAgent;
        if (ua.match(/Windows\sPhone/i) ||
            ua.match(/iPhone|iPod|iPad/i) ||
            ua.match(/Android/i) ||
            ua.match(/Edge\D?\d+/i))
            return true;
        var verTrident = ua.match(/Trident\D?\d+/i);
        var verIE = ua.match(/MSIE\D?\d+/i);
        var verOPR = ua.match(/OPR\D?\d+/i);
        var verFF = ua.match(/Firefox\D?\d+/i);
        var x64 = ua.match(/x64/i);
        if ((!verTrident) && (!verIE) && (x64)) return true;
        else if (verFF) {
            verFF = verFF[0].match(/\d+/);
            if ((verFF[0] >= 41) || (x64)) return true;
        } else if (verOPR) {
            verOPR = verOPR[0].match(/\d+/);
            if (verOPR[0] >= 32) return true;
        } else if ((!verTrident) && (!verIE)) {
            var verChrome = ua.match(/Chrome\D?\d+/i);
            if (verChrome) {
                verChrome = verChrome[0].match(/\d+/);
                if (verChrome[0] >= 41) return true;
            }
        }
        return false;
    } catch (err) {
        return true;
    }
}

//==检查加载成功与否，如没成功则用http(s)再试==
//==低版本CLODOP6.561/Lodop7.043及前)用本方法==
function checkOrTryHttp() {
  if (window.getCLodop) {
     LoadJsState = "complete";
     return true;
  }
  if (LoadJsState == "loadingB" || LoadJsState == "complete") return;
  LoadJsState = "loadingB";
  var head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
  var JS1 = document.createElement("script")
     ,JS2 = document.createElement("script")
     ,JS3 = document.createElement("script");
  JS1.src = URL_HTTP1;
  JS1.id = 'lodop';
  JS2.src = URL_HTTP2;
  JS2.id = 'lodop';
  JS3.src = URL_HTTP3;
  JS3.id = 'lodop';
  JS1.onload = JS2.onload = JS3.onload = JS2.onerror = JS3.onerror=function(){
    LoadJsState = "complete"
  }
  JS1.onerror = function(e) {
      if (window.location.protocol !== 'https:')
          head.insertBefore(JS2, head.firstChild); else
          head.insertBefore(JS3, head.firstChild);
  }
  head.insertBefore(JS1,head.firstChild);
}
function loadCLodop(){
  if (!needCLodop()) return;
  CLodopIsLocal = !!((URL_WS1 + URL_WS2).match(/\/\/localho|\/\/127.0.0./i));
  LoadJsState = "loadingA";
  if (!window.WebSocket && window.MozWebSocket) window.WebSocket=window.MozWebSocket;
  //ws方式速度快(小于200ms)且可避免CORS错误,但要求Lodop版本足够新:
  try {
    var WSK1=new WebSocket(URL_WS1);
    WSK1.onopen = function(e) { setTimeout(checkOrTryHttp(),200); }
    WSK1.onmessage = function(e) {if (!window.getCLodop) eval(e.data);}
    WSK1.onerror = function(e) {
         var WSK2=new WebSocket(URL_WS2);
         WSK2.onopen = function(e) {setTimeout(checkOrTryHttp(),200);}
         WSK2.onmessage = function(e) {if (!window.getCLodop) eval(e.data);}
         WSK2.onerror= function(e) {checkOrTryHttp();}
    }
  } catch(e){
    checkOrTryHttp();
  }
}
//==加载Lodop对象的主过程:==
(function(){ setJsUrl(); loadCLodop() })()

//==获取LODOP对象主过程,判断是否安装、需否升级:==
function getLodop2(oOBJECT, oEMBED) {
    var strFontTag = "<br><font color='#FF00FF'>打印控件";
    var strLodopInstall = strFontTag + "未安装!点击这里<a href='install_lodop32.exe' target='_self'>执行安装</a>";
    var strLodopUpdate = strFontTag + "需要升级!点击这里<a href='install_lodop32.exe' target='_self'>执行升级</a>";
    var strLodop64Install = strFontTag + "未安装!点击这里<a href='install_lodop64.exe' target='_self'>执行安装</a>";
    var strLodop64Update = strFontTag + "需要升级!点击这里<a href='install_lodop64.exe' target='_self'>执行升级</a>";
    var strCLodopInstallA = "<font color='#FF00FF'>Web打印服务CLodop未安装启动，点击这里<a href='https://www.lodop.net/download/CLodop_Setup_for_Win64NT_6.577EN.zip' target='_self'>下载执行安装</a>";
    var strCLodopInstallB = "<br>（若此前已安装过，可<a href='CLodop.protocol:setup' target='_self'>点这里直接再次启动</a>）";
    var strCLodopUpdate = "<br><font color='#FF00FF'>Web打印服务CLodop需升级!点击这里<a href='CLodop_Setup_for_Win32NT.exe' target='_self'>执行升级</a>";
    var strLodop7FontTag = "<br><font color='#FF00FF'>Web打印服务Lodop7";
    var strLodop7HrefX86 = "点击这里<a href='Lodop7_Linux_X86_64.tar.gz' target='_self'>下载安装</a>(下载后解压，点击lodop文件开始执行)";
    var strLodop7HrefARM = "点击这里<a href='Lodop7_Linux_ARM64.tar.gz'  target='_self'>下载安装</a>(下载后解压，点击lodop文件开始执行)";
    var strLodop7Install_X86 = strLodop7FontTag + "未安装启动，" + strLodop7HrefX86;
    var strLodop7Install_ARM = strLodop7FontTag + "未安装启动，" + strLodop7HrefARM;
    var strLodop7Update_X86 = strLodop7FontTag + "需升级，" + strLodop7HrefX86;
    var strLodop7Update_ARM = strLodop7FontTag + "需升级，" + strLodop7HrefARM;
    var strInstallOK = "，成功后请刷新本页面或重启浏览器。</font>";
    var LODOP;
    try {
        var isWinIE = (/MSIE/i.test(navigator.userAgent)) || (/Trident/i.test(navigator.userAgent));
        var isWinIE64 = isWinIE && (/x64/i.test(navigator.userAgent));
        var isLinuxX86 = (/Linux/i.test(navigator.platform)) && (/x86/i.test(navigator.platform));
        var isLinuxARM = (/Linux/i.test(navigator.platform)) && (/aarch/i.test(navigator.platform));

        if (needCLodop() || isLinuxX86 || isLinuxARM) {
            try {
                LODOP = window.getCLodop();
            } catch (err) {}
            if (!LODOP && LoadJsState !== "complete") {
                if (!LoadJsState) {
                  // alert("未曾加载Lodop主JS文件，请先调用loadCLodop过程.")
                  MessageBox.alert('未曾加载Lodop主JS文件，请先调用loadCLodop过程', '提示', { type: 'error' })
                } else {
                  // alert("网页还没下载完毕，请稍等一下再操作.");
                  MessageBox.alert('网页还没下载完毕，请稍等一下再操作', '提示', { type: 'error' })
                }
                return;
            }
            var strAlertMessage;
            if (!LODOP) {
                if (isLinuxX86)
                    strAlertMessage = strLodop7Install_X86;
                else if (isLinuxARM)
                    strAlertMessage = strLodop7Install_ARM;
                else
                    strAlertMessage = strCLodopInstallA + (CLodopIsLocal ? strCLodopInstallB : "");
                    MessageBox.alert(strAlertMessage + strInstallOK, '提示', { dangerouslyUseHTMLString: true })
                // document.body.innerHTML = strAlertMessage + strInstallOK + document.body.innerHTML;
                return;
            } else {
                if (isLinuxX86 && LODOP.CVERSION < "7.0.4.3")
                    strAlertMessage = strLodop7Update_X86;
                else if (isLinuxARM && LODOP.CVERSION < "7.0.4.3")
                    strAlertMessage = strLodop7Update_ARM;
                else if (CLODOP.CVERSION < "6.5.7.7")
                    strAlertMessage = strCLodopUpdate;

                if (strAlertMessage) {
                  MessageBox.alert(strAlertMessage + strInstallOK, '提示', { dangerouslyUseHTMLString: true })
                  // document.body.innerHTML = strAlertMessage + strInstallOK + document.body.innerHTML;
                }
            }
        } else {
            //==如果页面有Lodop插件就直接使用,否则新建:==
            if (oOBJECT || oEMBED) {
                if (isWinIE)
                    LODOP = oOBJECT;
                else
                    LODOP = oEMBED;
            } else if (!CreatedOKLodopObject) {
                LODOP = document.createElement("object");
                LODOP.setAttribute("width", 0);
                LODOP.setAttribute("height", 0);
                LODOP.setAttribute("style", "position:absolute;left:0px;top:-100px;width:0px;height:0px;");
                if (isWinIE)
                    LODOP.setAttribute("classid", "clsid:2105C259-1E0C-4534-8141-A753534CB4CA");
                else
                    LODOP.setAttribute("type", "application/x-print-lodop");
                document.documentElement.appendChild(LODOP);
                CreatedOKLodopObject = LODOP;
            } else
                LODOP = CreatedOKLodopObject;
            //==Lodop插件未安装时提示下载地址:==
            if ((!LODOP) || (!LODOP.VERSION)) {
                MessageBox.alert((isWinIE64 ? strLodop64Install : strLodopInstall) + strInstallOK, '提示', { dangerouslyUseHTMLString: true })
                // document.body.innerHTML = (isWinIE64 ? strLodop64Install : strLodopInstall) + strInstallOK + document.body.innerHTML;
                return LODOP;
            }
            if (LODOP.VERSION < "6.2.2.6") {
                MessageBox.alert((isWinIE64 ? strLodop64Update : strLodopUpdate) + strInstallOK, '提示', { dangerouslyUseHTMLString: true })
                // document.body.innerHTML = (isWinIE64 ? strLodop64Update : strLodopUpdate) + strInstallOK + document.body.innerHTML;
            }
        }
        //===如下空白位置适合调用统一功能(如注册语句、语言选择等):=======================


        //===============================================================================
        return LODOP;
    } catch (err) {
        alert("getLodop出错:" + err);
    }
}
function lodopExample(ip) {
 return new Promise((resolve, reject) => {
  if (ip) {
    const dom = document.getElementById('lodop')
    if (dom) {
      dom.remove()
    }
    window.LoadJsState = ''
    window.getCLodop = null
    setJsUrl(ip)
    loadCLodop()
  }
  if (LoadJsState == "complete") {
    if(window.getCLodop) {
      resolve(getCLodop())
    } else {
      getLodop2()
      reject('Web打印服务CLodop未安装启动')
    }
  } else {
    var counter = 0;
    var maxNum = 5000;
    function myFunc() {
      counter++;
      if (LoadJsState == "complete") {
        clearInterval(intervalId)
        if(window.getCLodop) {
          resolve(getCLodop())
        } else {
          getLodop2()
          reject('Web打印服务CLodop未安装启动')
        }
      } else {
        if (counter == maxNum) {
          clearInterval(intervalId)
          getLodop2()
          reject('超过最大尝试次数，请刷新页面重试')
        }
      }
    }
    var intervalId = setInterval(myFunc, 20);
  }
 })
}

export default lodopExample
