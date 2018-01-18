var modLayer = document.getElementById("mod-layer");
function device(){ 
    var userAgentInfo = navigator.userAgent; 
    var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPod"); 
    var flag = true; 
    for (var v = 0; v < Agents.length; v++) { 
    if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; } 
    } 
    return flag; 
}
var f = device();
function checkDirect() {
    if(document.documentElement.clientHeight >= document.documentElement.clientWidth && !f) {
        return "portrait";
    } 
    else if(document.documentElement.clientHeight < document.documentElement.clientWidth && !f){
        return "landscape";
    }
}
function orientNotice() {
    var orient = checkDirect();
    if (orient == "portrait") {
        modLayer.style.display = "none";
    } else if(orient == "landscape"){
        modLayer.style.display = "block";
    }
}
function init() {
    orientNotice();
    window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function () {
        f = device();
        setTimeout(orientNotice, 200);
    })
}
init();