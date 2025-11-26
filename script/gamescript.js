// CONSTANT DOM

const btnReturn = document.getElementById("return")
const btnRules = document.getElementById("rules")
const btnStartGame = document.getElementById("startgame")
const hGameWord = document.querySelector(".wordgame")
const inputPlayerName = document.querySelector(".input-container input")
const keyboardContainer = document.querySelector('.keyboard-container');
const imgBallon = document.querySelector(".main-container img")
const imgeye = document.querySelector(".eye-icon")
const pLanguage = document.querySelector(".input-container p")
const pWord = document.querySelector("h1");
const pPlayerName1 = document.getElementById("PlayerName1");
const pGameScore = document.getElementById("GameScore");
const pWonGames = document.getElementById("WonGames");
const pMaxScore = document.getElementById("MaxScoreGame")
const pTotalGames = document.getElementById("TotalGames");
const bodyGame = document.querySelector("body");


//VARIABLES JOC
const browserinfo = JSON.parse(sessionStorage.getItem("browserinfo"));
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const keyboardButtons = [];
var streak = 0; 
var errors = 0;
var maxErrors = 9;
let wordArray = [];    
let displayArray = [];

const playerinfo = {
    playerName:"",
    gamescore:0,
    wonGames:0,
    TotalGames:0,
    MaxScoreDay:new Date(),
    MaxScore:""
};


// EVENTS

const loadbuttons = function (){

    for (let i = 0; i < letters.length; i++) {
        const btn = document.createElement('button');
        btn.textContent = letters[i]; 
        btn.addEventListener("click", function(){
            gameLogic(btn);
        });
        keyboardContainer.appendChild(btn);
        keyboardButtons.push(btn);
     }
}

btnReturn.addEventListener("click", function(){
    window.open("index.html", "_self","width=400,height=400").focus();  
})

btnRules.addEventListener("click", function(){
    window.open("rules.html", "_blank","width=400,height=400").focus();  
})

btnStartGame.addEventListener("click",function(){
    startGame()
})

imgeye.addEventListener("click",function(){
    eyeiconLogic();
})
window.addEventListener("load", function (){
   changeLanguageText();
   changebackgroundcolor();
   getPlayerName();
   loadbuttons();
});

//FUNCTIONS 
const changeLanguageText = function(){
    pLanguage.textContent = "Idioma " + "("+ browserinfo.language + ")";
};
const changebackgroundcolor = function(){
    bodyGame.className= "";
    if(browserinfo.browsername === "Firefox"){
        bodyGame.classList.add("firefoxbackground");
    }else if(browserinfo.browsername === "Edge"){
        bodyGame.classList.add ("edgebackground");
    }else if(browserinfo.browsername === "Chrome"){
        bodyGame.classList.add("chromebackground");
    }
};
const getPlayerName = function(){
    playerinfo.playerName = getCookie("playerName");
    pPlayerName1.textContent = playerinfo.playerName;
};

const startGame = function(){
    const word = inputPlayerName.value.toUpperCase();
    if(Number(word)){
        alert("Ingrese nomes caracters no numeric")
    }else if (inputPlayerName.value === "" ){
        alert("Ingrese una paraula")
    }else if(inputPlayerName.value.length < 3){
         alert("Ingrese una paraula mes llarga que 3 lletres")
    }else{
    wordArray = word.split(""); 
    displayArray = wordArray.map(() => "_"); 
    pWord.textContent = displayArray.join("");
    playerinfo.gamescore = 0;
    pGameScore.textContent = playerinfo.gamescore;
    keyboardButtons.forEach(b => {
        b.disabled = false;
        b.style.backgroundColor = ""; 
    });


    btnStartGame.disabled = true;
    inputPlayerName.value = "";
    inputPlayerName.disabled = true;
    }
}
const eyeiconLogic = function(){
    if(imgeye.src.includes("images/eye.png")){
        inputPlayerName.type="text"
        imgeye.src="images/eyeclosed.png"
    }else{
        inputPlayerName.type="password"
        imgeye.src="images/eye.png"

    }

}
const gameLogic = function(btn){
        var letterPoints = 0;
        var letra = btn.textContent.toUpperCase(); 
        var found = false;
        var winpercentage = 0;
        const now = Date();

        for (var i = 0; i < wordArray.length; i++) {
            if (wordArray[i].toUpperCase() === letra) {
                displayArray[i] = wordArray[i]; 
                found = true;
                letterPoints++;
            }
        }
        if(found){
            streak++;
            playerinfo.gamescore+=letterPoints*streak;  
        }else{
            errors++;
            updateBallongImage();
            if(playerinfo.gamescore > 0){
                playerinfo.gamescore -= 1;
            }
            streak=0;
        }
        
        pGameScore.textContent = playerinfo.gamescore;
        pWord.textContent = displayArray.join("");
        btn.disabled = true;
        btn.style.backgroundColor = found ? "#4CAF50" : "#c82333";

        if(displayArray.join("") === wordArray.join("")){
            hGameWord.classList.add("gamewonword")
            keyboardButtons.forEach(function(b){
                b.disabled = true;
                b.style.backgroundColor = "#f0f0f0";
            });     
            if(playerinfo.gamescore > playerinfo.MaxScore){
                playerinfo.MaxScore=playerinfo.gamescore;
                pMaxScore.textContent=playerinfo.MaxScoreDay.toLocaleString() + " - " + playerinfo.gamescore + " punts";
            }     
            streak = 0;
            errors = 0;
            updateBallongImage();
            playerinfo.TotalGames+=1;
            playerinfo.wonGames+=1;
            winpercentage = (playerinfo.wonGames/playerinfo.TotalGames)*100; 
            playerinfo.gamescore = 0;
            pTotalGames.textContent = playerinfo.TotalGames;
            pWonGames.textContent = playerinfo.wonGames + "(" + winpercentage + "%)" ;
            inputPlayerName.disabled = false;
            btnStartGame.disabled = false;
            localStorage.setItem("maxscore", playerinfo.MaxScore);
            localStorage.setItem("maxscoreday", playerinfo.MaxScoreDay.toISOString());

        }
        if(errors >= maxErrors){
            hGameWord.classList.add("gamewordlost")
            keyboardButtons.forEach(function(b){
                b.disabled = true;
                b.style.backgroundColor = "#f0f0f0";
            });           
            streak = 0;
            errors=0;
            updateBallongImage();
            playerinfo.TotalGames+=1;
            playerinfo.gamescore = 0;
            winpercentage = ((playerinfo.wonGames/playerinfo.TotalGames)*100).toFixed(2); 
            pWonGames.textContent = playerinfo.wonGames + "(" + winpercentage + "%)" ;
            pTotalGames.textContent = playerinfo.TotalGames;
            inputPlayerName.disabled = false;
            btnStartGame.disabled = false; 
            pWord.textContent = wordArray.join("");
        }
};

const updateBallongImage = function() {
    if(errors <= maxErrors){
        imgBallon.src = `images/img_globus/img_${errors}.png`;
    }
}
const getCookie = function(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
