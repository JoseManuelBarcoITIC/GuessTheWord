// CONSTANT DOM

const btnReturn = document.getElementById("return")
const btnRules = document.getElementById("rules")
const btnStartGame = document.getElementById("startgame")
const hGameWord = document.querySelector(".wordgame")
const inputPlayerName = document.querySelector(".input-container input")
const imgBallon = document.querySelector(".main-container img")
const imgeye = document.querySelector(".eye-icon")
const pLanguage = document.querySelector(".input-container p")
const pWord = document.querySelector("h1");
const pTimer = document.querySelector(".timer");
const pPlayerName1 = document.getElementById("PlayerName1");
const pPlayerName2 = document.getElementById("PlayerName2");
const pGameScore = document.getElementById("GameScore");
const pGameScore2 = document.getElementById("GameScore2");
const pWonGames = document.getElementById("WonGames");
const pWonGames2 = document.getElementById("WonGames2");
const pMaxScore = document.getElementById("MaxScoreGame")
const pMaxScore2 = document.getElementById("MaxScoreGame2")
const pTotalGames = document.getElementById("TotalGames");
const pTotalGames2 = document.getElementById("TotalGames2");

const keyboardContainer = document.querySelector('.keyboard-container');
const divRightContainer = document.querySelector(".right-container");
const bodyGame = document.querySelector("body");



//VARIABLES JOC

const browserinfo = JSON.parse(sessionStorage.getItem("browserinfo"));
let letters = "";
let word = "";
let timerInterval = null;

let keyboardButtons = [];
var streak = 0; 
var errors = 0;
var maxErrors = 9;
let single;
let wordArray = [];    
let displayArray = [];
let currentPlayerIndex = 0;
let tempsTotal =120;

let playerinfo = {
    id: 0,
    playerName:"",
    gamescore:0,
    wonGames:0,
    TotalGames:0,
    MaxScoreDay:new Date(),
    MaxScore:0
};
let playerinfo2 = {
    id:0,
    playerName:"",
    gamescore:0,
    wonGames:0,
    TotalGames:0,
    MaxScoreDay:new Date(),
    MaxScore:0
};

let playerpost = {
   won_games: 0,
   total_games: 0,
   max_score_game: 0
}
let turn = [];



// EVENTS

const startTimer = function() {
    clearInterval(timerInterval); 

    tempsTotal = 120; // 2 minutos

    timerInterval = setInterval(function() {

        let minutes = Math.floor(tempsTotal / 60);
        let seconds = tempsTotal % 60;

        seconds = seconds < 10 ? "0" + seconds : seconds;

        pTimer.textContent = `${minutes}:${seconds}`;

        tempsTotal--;

        if (tempsTotal < 0) {
            clearInterval(timerInterval);
            handleLose(playerinfo); 
        }

    }, 1000);
};

const updateUserUI = function(player) {
    if (player === playerinfo) {
        pTotalGames.textContent = player.TotalGames;
        pMaxScore.textContent = player.MaxScore;
        const winpercentage = ((player.wonGames / player.TotalGames) * 100).toFixed(2);
        pWonGames.textContent = `${player.wonGames} (${winpercentage}%)`;


    } else {
        pTotalGames2.textContent = player.TotalGames;
        pWonGames2.textContent = player.wonGames;
        pMaxScore2.textContent = player.MaxScore;
    }
};

const getAlphabetAwait = async function(language){
    try{
     const resposta = await fetch(`http://127.0.0.1:8000/alphabet?language=${language}`);
     const jsonobject = await resposta.json();
     letters = jsonobject.letters;
    }
    catch(e){

    }
}

const getUser = async function(user,playerInfoObj){
    try{
        const resposta = await fetch(`http://127.0.0.1:8000/user/get/${user}`);
        console.log(resposta.json)
        const userData = await resposta.json();
        console.log(userData)
        playerInfoObj.id = userData.id;
        playerInfoObj.TotalGames = userData.total_games;
        playerInfoObj.wonGames = userData.won_games;
        playerInfoObj.MaxScore = userData.max_score_game;
        
        updateUserUI(playerInfoObj);
    }
    catch(e){
    }
}
const getRandomWord = async function(language)
        {
        try{
            const resposta = await fetch(`http://127.0.0.1:8000/words/randomwords?language=${language}`);
            const jsonobject = await resposta.json();
            word = jsonobject.word;
        }
            catch(e){
        }
}
 const postUserUpdate = async function(player){
       const playerData = {
        won_games: player.wonGames,
        total_games: player.TotalGames,
        max_score_game: player.MaxScore
    };

        console.log(playerData)
    try{
        const response = await fetch(`http://localhost:8000/users/patch/${player.playerName}`, {
        method: "PATCH",  
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(playerData)
        });
        const updatedData = await response.json()
    }catch(e){

}}
 const postGametoDB = async function(player){
       const gamedata = {
        user_id: player.id,
        points: player.points,
        errors: 0 ,
        max_score_game: player.MaxScore
    };

        console.log(playerData)
    try{
        const response = await fetch(`http://localhost:8000/users/patch`, {
        method: "POST",  
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(playerData)
        });
        const updatedData = await response.json()
        console.log("Usuario actualizado:", updatedData);
    }catch(e){

}
}
const loadUserData = function(){
    getPlayerName();
    getUser(playerinfo.playerName,playerinfo)
    if(!single){
    getUser(playerinfo2.playerName,playerinfo2)
    }    
}
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
const clearKeyboard = function() {
     for (let i = 0; i < keyboardButtons.length; i++) {
        keyboardButtons[i].remove();   
    }
    keyboardButtons = [];
};

btnReturn.addEventListener("click", function(){
    window.open("index.html", "_self","width=400,height=400").focus();  
})

btnRules.addEventListener("click", function(){
    window.open("rules.html", "_blank","width=400,height=400").focus();  
})

btnStartGame.addEventListener("click",function(){
    startGame();
})

imgeye.addEventListener("click",function(){
    eyeiconLogic();
})
window.addEventListener("load", function (){
   getAlphabetAwait(browserinfo.language);
   changeLanguageText();
   changebackgroundcolor();
   loadUserData();
   getUser();
   gamemode();
   rightcontainervisibility();
});

//FUNCTIONS OF HTML BASICS
const changeLanguageText = function(){
    pLanguage.textContent = "Idioma " + "("+ browserinfo.language + ")";
};
const changebackgroundcolor = function(){
    bodyGame.className= browserinfo.class;
};
const getPlayerName = function(){

    if(single){
    playerinfo.playerName = getCookie("playerName");
    pPlayerName1.textContent = playerinfo.playerName;

    }else{
    playerinfo.playerName = getCookie("playerName");
    playerinfo2.playerName = getCookie("playerName2");
    pPlayerName1.textContent = playerinfo.playerName;  
    pPlayerName2.textContent = playerinfo2.playerName;  
    }
    
};
const eyeiconLogic = function(){
    if(imgeye.src.includes("images/eye.png")){
        inputPlayerName.type="text"
        imgeye.src="images/eyeclosed.png"
    }else{
        inputPlayerName.type="password"
        imgeye.src="images/eye.png"

    }

}
const gamemode = function(){
    const player1Cookie = getCookie("playerName");
    const player2Cookie = getCookie("playerName2");

    if(player1Cookie && player2Cookie){
        single = false; 
        turn=[playerinfo, playerinfo2];
    } else {
        single = true;
        turn=[playerinfo];
    }
}
const rightcontainervisibility=function(){
    if(single){
        divRightContainer.style.visibility="hidden";
    }else{
        divRightContainer.style.visibility="visible";
    }
}

//FUNCTIONS GAME
const startGame =  async function(){
    updateBallongImage();
    startTimer();
    if(inputPlayerName.value === ""){
        await getRandomWord(browserinfo.language);  
        inputPlayerName.value=word;
    }
    word = inputPlayerName.value.toUpperCase();
    if(Number(word)){
        alert("Ingrese només caracters, no numèrics");
    } else if(word.length < 3){
        alert("Ingrese una paraula més llarga que 3 lletres");
    }else{
    wordArray = word.split(""); 
    displayArray = wordArray.map(() => "_"); 
    pWord.textContent = displayArray.join("");
    playerinfo.gamescore = 0;
    pGameScore.textContent = playerinfo.gamescore;
    loadbuttons();
    inputPlayerName.value="";
    inputPlayerName.disabled = true;
    btnStartGame.disabled=true;
    imgeye.disabled=true;
    }
}
 
const gameLogic = function(btn){
    const player = turn[currentPlayerIndex];
    const letter = btn.textContent.toUpperCase();
    const letterCount = checkLetter(letter);

    if (letterCount > 0) {
        handleCorrectGuess(player, letterCount);
    } else {
        if (!single) {
        currentPlayerIndex = (currentPlayerIndex + 1) % turn.length;
        updateCurrentPlayerUI();
        }
        handleIncorrectGuess(player);
    }

    btn.disabled = true;
    btn.style.backgroundColor = letterCount > 0 ? "#4CAF50" : "#c82333";

    updateUI(player);

    if (checkWin()){
        handleWin(player)} ;
    if (checkLose()) {
        handleLose(player);}};


const checkLetter = function(letter) {
    let count = 0;
    for (let i = 0; i < wordArray.length; i++) {
        if (wordArray[i].toUpperCase() === letter) {
            displayArray[i] = wordArray[i];
            count++;
        }
    }
    return count;
}
const handleCorrectGuess = function(player, letterCount) {
    streak++;
    player.gamescore += letterCount * streak;
}
const handleIncorrectGuess = function(player) {
    errors++;
    updateBallongImage();
    if (player.gamescore > 0) {
        player.gamescore -= 2;
    }
    streak = 0;
}
const checkWin = function() {
    return displayArray.join("") === wordArray.join("");
}
const checkLose = function() {
    return errors >= maxErrors;
}
const handleWin = function(player) {

    addGameToBothPlayers(player);
    player.wonGames++;

    updatePlayerRecord(playerinfo, pMaxScore);
    updatePlayerPercentage(playerinfo, pTotalGames, pWonGames);
    postUserUpdate(playerinfo);
    
    if (!single) {
    postUserUpdate(playerinfo2);
    updatePlayerPercentage(playerinfo2, pTotalGames2, pWonGames2);
    updatePlayerRecord(playerinfo2, pMaxScore2)
    }

    player.gamescore = 0;
    streak = 0;
    errors = 0;
    clearKeyboard();
    

    hGameWord.classList.remove("gamewordlost")
    hGameWord.classList.add("gamewonword");
    inputPlayerName.disabled = false;
    btnStartGame.disabled = false;
}
const handleLose = function(player) {
    hGameWord.classList.remove("gamewonword");
    hGameWord.classList.add("gamewordlost");
    player.TotalGames++;
    player.gamescore = 0;
    streak = 0;
    errors = 0;

    if (player === playerinfo) {
    updatePlayerRecord(playerinfo, pMaxScore);
    updatePlayerPercentage(playerinfo, pTotalGames, pWonGames);
    postUserUpdate(playerinfo);
    }else {
    updatePlayerPercentage(playerinfo2, pTotalGames2, pWonGames2);
    updatePlayerRecord(playerinfo2, pMaxScore2);
    }
    clearKeyboard();
    pTotalGames.textContent = player.TotalGames;

    inputPlayerName.disabled = false;
    btnStartGame.disabled = false;    
}

const updateUI = function(player) {
    if(errors >= maxErrors) {
        pWord.textContent = wordArray.join("");
        return;
    }
    if(player === playerinfo) {
        pGameScore.textContent = player.gamescore;
        pWord.textContent = displayArray.join("");
    }else if((player === playerinfo2)){
        pGameScore2.textContent = player.gamescore;
        pWord.textContent = displayArray.join("");
    }
}

const updateGlobalRecord = function(player) {

    let storedMax = Number(localStorage.getItem("globalMaxScore")) || 0;

    if (player.MaxScore > storedMax) {

        localStorage.setItem("globalMaxScore", player.MaxScore);
        localStorage.setItem("globalMaxScoreDay", player.MaxScoreDay.toLocaleDateString());
        localStorage.setItem("globalMaxScorePlayer", player.playerName);
    }
};
const updatePlayerRecord = function(player, maxScoreElement) {

    if (player.gamescore > player.MaxScore) {
        player.MaxScore = player.gamescore;
        player.MaxScoreDay = new Date();
        playerpost.max_score_game = player.MaxScore;
        playerpost.total_games = player.TotalGames;
        playerpost.won_games = player.wonGames;


        maxScoreElement.textContent =
            `${player.MaxScoreDay.toLocaleDateString()} - ${player.MaxScore} pts`;
    }
};

const addGameToBothPlayers = function(winnerOrLoser) {

    if (single) {
        winnerOrLoser.TotalGames++;
        return;
    }

    playerinfo.TotalGames++;
    playerinfo2.TotalGames++;
};
const updatePlayerPercentage = function(player, totalEl, wonEl) {
    const total = player.TotalGames;
    const won = player.wonGames;

    const percentage = total > 0 ? ((won / total) * 100).toFixed(2) : 0;

    totalEl.textContent = total;
    wonEl.textContent = `${won} (${percentage}%)`;
};

const updateBallongImage = function() {
    if(errors <= maxErrors){
        imgBallon.src = `images/img_globus/img_${errors}.png`;
    }
}
const updateCurrentPlayerUI = () => {
    pPlayerName1.style.fontWeight = currentPlayerIndex === 0 ? "bold" : "normal";
    pPlayerName2.style.fontWeight = currentPlayerIndex === 1 ? "bold" : "normal";
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


