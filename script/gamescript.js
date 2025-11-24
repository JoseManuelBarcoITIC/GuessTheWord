const btnReturn = document.getElementById("return")
const btnRules = document.getElementById("rules")
const btnStartGame = document.getElementById("startgame")
const inputPlayerName = document.querySelector(".input-container input")
const keyboardContainer = document.querySelector('.keyboard-container');
const imgBallon = document.querySelector("img")
const pLanguage = document.querySelector(".input-container p")
const pWord = document.querySelector("h1");
const pPlayerName1 = document.getElementById("PlayerName1");
const pGameScore = document.getElementById("GameScore");
const pWonGames = document.getElementById("WonGames");
const pTotalGames = document.getElementById("TotalGames");
const bodyGame = document.querySelector("body");
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
    MaxScore:""
};


    for (let i = 0; i < letters.length; i++) {
         const btn = document.createElement('button');
          btn.textContent = letters[i]; 
          keyboardContainer.appendChild(btn)
           keyboardButtons.push(btn);
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
keyboardButtons.forEach(function(btn, index) {
    btn.addEventListener("click", function() {
        var letterPoints = 0;
        var letra = btn.textContent.toUpperCase(); 

        if (wordArray.length === 0) return;

        var found = false;
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
            
            keyboardButtons.forEach(function(b){
                b.disabled = false;
                b.style.backgroundColor = "#f0f0f0";
            });           
            streak = 0;
            playerinfo.TotalGames+=1;
            playerinfo.wonGames+=1;
            playerinfo.gamescore = 0;
            pTotalGames.textContent = playerinfo.TotalGames;
            pWonGames.textContent = playerinfo.wonGames;
            inputPlayerName.disabled = false;
            btnStartGame.disabled = false;
      }
    });
});

window.addEventListener("load", function (){
   changeLanguageText();
   changebackgroundcolor();
   getPlayerName();
   generateButtonLetters();
});

const changeLanguageText = function(){
    pLanguage.textContent = "Idioma " + "("+ browserinfo.language + ")";
 };
function changebackgroundcolor(){
    bodyGame.className= "";
    if(browserinfo.browsername === "Firefox"){
        bodyGame.classList.add("firefoxbackground");
    }else if(browserinfo.browsername === "Edge"){
        bodyGame.classList.add ("edgebackground");
    }else if(browserinfo.browsername === "Chrome"){
        bodyGame.classList.add("chromebackground");
    }
};
function getPlayerName(){
    playerinfo.playerName = getCookie("playerName");
    pPlayerName1.textContent = playerinfo.playerName;
};
function generateButtonLetters(){
}
function startGame(){
    const word = inputPlayerName.value.toUpperCase();
    if(Number(word)){
        alert("Ingrese nomes caracters no numeric")
    }else{
    wordArray = word.split(""); 
    displayArray = wordArray.map(() => "_"); 
    pWord.textContent = displayArray.join("");
    playerinfo.gamescore = 0;
    pGameScore.textContent = playerinfo.gamescore;
    btnStartGame.disabled = true;
    inputPlayerName.disabled = true;
    }
}

function updateBallongImage() {
    if(errors <= maxErrors){
        imgBallon.src = `images/img_globus/img_${errors}.png`;
    }
}
function getCookie(cname) {
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
