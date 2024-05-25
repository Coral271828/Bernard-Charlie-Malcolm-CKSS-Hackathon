function $(id) {
  return document.getElementById(id);
}

// header

function setHeader() {
  $("header").innerHTML = `
  <div id="header-inner">
  
    <h1 id="title"><span id="title1">Money</span><br>and&nbsp;<span id="title2">You</span></h1>
    <div id="page-links">
      <a href= "index.html" class="link">Home</a>
      <a href= "save-strats.html" class="link">Saving&nbsp;money</a>
      <a href= "money-calculator.html" class="link">Budget&nbsp;calculator</a>
    </div>
  </div>
  
  <div id="deco">
    <div id="deco1" class="deco"></div>
    <div id="deco2" class="deco"></div>
    <div id="deco3" class="deco"></div>
    <div id="deco4" class="deco"></div>
  </div>

<div id="rainbow">
  <span id="rainbow-label">Rainbow Mode: </span>
  <button id="switch" onclick = "rain();"></button>
  <button id="circle" onclick = "rain();"></button>
</div>
  
  `;
}

// rainbow

var count = 0;
var user;
var rainbow = false;
function rain(){
  if (rainbow){
    $("circle").style.left = "-45px";
    $("title").style.color = "#000000";
    $("title1").style.color = "var(--green)";
    $("title2").style.color = "var(--red)";
    for (var i = 0; i < document.getElementsByTagName("a").length; i++){
      document.getElementsByTagName("a")[i].style.color = "var(--dark-cyan)";
    }
    
    $("header").style.backgroundColor = "#efeee1";
  } else {
    $("circle").style.left = "-25px";
  }
  rainbow = !rainbow;
}
function loop(){
  if(rainbow){
    $("title").style.color = "hsl(" + count + ", 100%, 50%)";
    $("title1").style.color = "hsl(" + count + ", 100%, 50%)";
    $("title2").style.color = "hsl(" + count + ", 100%, 50%)";
    for (var i = 0; i < document.getElementsByTagName("a").length; i++){
      document.getElementsByTagName("a")[i].style.color = "hsl(" + count + ", 100%, 50%)";
    }
    
    $("header").style.backgroundColor = "hsl(" + (count + 180) + ", 100%, 50%)";

    count ++;
  }
}
setInterval(loop, 10);
