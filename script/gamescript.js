const btnReturn = document.getElementById("return")

btnReturn.addEventListener("click", function(){
    window.open("index.html", "_self").focus();
    window.close;  
})