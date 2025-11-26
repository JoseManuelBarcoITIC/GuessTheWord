const pbrowsername = document.getElementById("browsername");
const pLanguage = document.getElementById("browserlanguage");
const pURL = document.getElementById("url");
const pMaxScore = document.getElementById("maxscorep")
const btnStartGame = document.getElementById("btnstartgame");
const btnEraseScore = document.getElementById("erasescore")
const bodyIndex = document.querySelector("body");
const inputPlayerName = document.querySelector(".input-container input")
const inputPlayerName2 = document.getElementById("playername2");

const maxscoreday = localStorage.getItem("maxscoreday");
const maxscore = localStorage.getItem("maxscore");

const browserinfo = {
    language:"",
    browsername:"",
    url:""
};


function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

window.addEventListener("load", function (){
   changeBrowserInfo();
   changebackgroundcolor();
   loadMaxScore();
});

btnStartGame.addEventListener("click" ,function (e){
    if (inputPlayerName.value === "") {
        alert("Ingrese un nom. Sis Plau");
        return;
    }
    sessionStorage.setItem("browserinfo", JSON.stringify(browserinfo));

    if (inputPlayerName2.value === "") {
        const playerName1 = inputPlayerName.value.trim();
        setCookie("playerName", playerName1, 7);
        window.open("game.html", "_self").focus();
    } else {
        const playerName1 = inputPlayerName.value.trim();
        const playerName2 = inputPlayerName2.value.trim();
        setCookie("playerName", playerName1, 7);
        setCookie("playerName2", playerName2, 7);
        window.open("game.html", "_self").focus();
    }
})

btnEraseScore.addEventListener("click" ,function (e){
    let text = "Estàs segur que vols eliminar la informació de la puntuació?"
   if(confirm(text)){
    localStorage.removeItem("maxscore");
    pMaxScore.textContent="No hi ha puntuacio actual"
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
        bodyIndex.classList.add("firefoxbackground");
    }else if(browserinfo.browsername === "Edge"){
        bodyIndex.classList.add ("edgebackground");
    }else if(browserinfo.browsername === "Chrome"){
        bodyIndex.classList.add("chromebackground");
    }
 };
 const loadMaxScore = function(){
    pMaxScore.textContent = maxscoreday + " - " + maxscore + " punts"

 }
 