
const pbrowsername = document.getElementById("browsername");
const pLanguage = document.getElementById("browserlanguage");
const pURL = document.getElementById("url");
const btnStartGame = document.getElementById("btstartgame");
const bodyIndex = document.querySelector("body");
const inputPlayerName = document.querySelector(".input-container input")

const browserinfo = {
    language:"",
    browsername:"",
    url:""
};

window.addEventListener("load", function (){
   changeBrowserInfo();
   changebackgroundcolor();
});

btnStartGame.addEventListener("click" ,function (e){
    if(inputPlayerName.value !==  ""){
    sessionStorage.setItem("browsername",JSON.stringify(browserinfo))
    window.open("game.html", "_self").focus();
    window.close;  
    }else{
        alert("Ingrese un nom. Sis Plau")
    }
   
})

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
 };
 const changeBrowserInfo = function(){
    browserinfo.browsername = changeBrowserName();
    browserinfo.language = navigator.language;
    browserinfo.url = location.href;
    
    pbrowsername.textContent = browserinfo.browsername
    pLanguage.textContent = browserinfo.language
    pURL.textContent = location.origin
 };
 
 const changebackgroundcolor = function(){
    bodyIndex.className= "";
    if(browserinfo.browsername === "Firefox"){
        bodyIndex.classList.add(firefoxbackground);
    }else if(browserinfo.browsername === "Edge"){
        bodyIndex.classList.add ("edgebackground");
    }else if(browserinfo.browsername === "Chrome"){
        bodyIndex.classList.add("chromebackground");
    }
 };