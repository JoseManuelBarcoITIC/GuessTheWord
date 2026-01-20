const mainC = document.getElementById("maincontainer");

const browserinfo = JSON.parse(sessionStorage.getItem("browserinfo"));


const loadRender = function(valor){
     const p = document.createElement('p');
     console.log(valor)
     p.textContent = valor;
     mainC.appendChild(p)
}
const getinstructionsAwait = async function(language){
    try{
     const resposta = await fetch(`http://127.0.0.1:8000/instructions?language=${language}`);
     const jsonobject = await resposta.json();
     instructions = jsonobject.description;
     loadRender(instructions);
    }
    catch(e){
        console.log("Error")
    }
}
window.addEventListener("load", function (){
   getinstructionsAwait(browserinfo.language);
});
