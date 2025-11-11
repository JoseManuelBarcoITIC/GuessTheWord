
const pbrowsername = document.getElementById("browsername");
const pLanguage = document.getElementById("browserlanguage");
const pURL = document.getElementById("url");
const bodyIndex = document.querySelector("body")

const browserinfo = {
    language:"",
    browsername:"",
    number:0.00,
    url:""
}

window.addEventListener("load", function (){
   changeBrowserInfo();
   changebackgroundcolor();
});

 

 const changeBrowserName = function(){
    const userAgent = navigator.userAgent;

    if (userAgent.includes("Firefox")) {
        return "Firefox";
    } else if (userAgent.includes("Edg")) { 
        return "Edge";
    } else if (userAgent.includes("Chrome")) {
        return "Chrome";
    } else if (userAgent.includes("Safari")) {
        return "Safari";
    } else if (userAgent.includes("Opera") || userAgent.includes("OPR")) {
        return "Opera";
    } else {
        return "Desconocido";
    }
 }
 const changeBrowserInfo = function(){
    browserinfo.browsername = changeBrowserName();
    browserinfo.language = navigator.language;
    browserinfo.url = location.href;
    
    pbrowsername.textContent = browserinfo.browsername
    pLanguage.textContent = browserinfo.language
    pURL.textContent = browserinfo.url
 }
 const changebackgroundcolor = function(){
    bodyIndex.className= "";
    if(browserinfo.browsername === "Firefox"){
        bodyIndex.className = "firefoxbackground";
    }else if(browserinfo.browsername === "Edge"){
        bodyIndex.className= "edgebackground";
    }else if(browserinfo.browsername === "Chrome"){
        bodyIndex.className= "chromebackground";
    }
 }