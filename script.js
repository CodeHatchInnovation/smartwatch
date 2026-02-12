const watch = document.getElementById("watch");
const screens = document.querySelectorAll(".screen");

let currentScreen = "home";
let startY = 0;
let steps = 0;

// ======= RELOJ =======
function updateTime(){
  const now = new Date();
  document.getElementById("time").innerText =
    now.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
  document.getElementById("date").innerText =
    now.toLocaleDateString();
}
setInterval(updateTime,1000);
updateTime();

// ======= NAVEGACIÓN =======
function showScreen(id){
  screens.forEach(s=>s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  currentScreen=id;
}

// Swipe vertical
watch.addEventListener("touchstart",(e)=>{
  startY = e.touches[0].clientY;
});

watch.addEventListener("touchend",(e)=>{
  let diff = startY - e.changedTouches[0].clientY;

  if(diff > 50 && currentScreen==="home"){
      showScreen("menu");
  }

  if(diff < -50 && currentScreen==="menu"){
      showScreen("home");
  }
});

// Doble click alternativa
watch.addEventListener("dblclick",()=>{
  if(currentScreen==="home") showScreen("menu");
  else if(currentScreen==="menu") showScreen("home");
});

// ======= ABRIR APP =======
function openApp(name){
  const container = document.getElementById("appContainer");
  container.innerHTML = "<button class='back-btn' onclick='closeApp()'>⬅</button>";
  showScreen("appContainer");

  if(name==="heart"){
    container.innerHTML += "<h2>❤️ Ritmo Cardíaco</h2><div id='bpm'></div>";
    setInterval(()=>{
      document.getElementById("bpm").innerText =
        Math.floor(Math.random()*30+60)+" BPM";
    },2000);
  }

  if(name==="steps"){
    container.innerHTML += "<h2>👟 Pasos</h2><div id='stepsApp'></div>";
    setInterval(()=>{
      steps += Math.floor(Math.random()*10);
      document.getElementById("stepsApp").innerText = steps;
    },2000);
  }

  if(name==="weather"){
    container.innerHTML += "<h2>☀️ 26°C</h2><div>Soleado</div>";
  }

  if(name==="music"){
    container.innerHTML += "<h2>🎵 Now Playing</h2><div>Blinding Lights</div>";
  }

  if(name==="stopwatch"){
    container.innerHTML += "<h2>⏱ Cronómetro</h2><div>00:00</div>";
  }

  if(name==="timer"){
    container.innerHTML += "<h2>⏲ Temporizador</h2><div>5:00</div>";
  }

  if(name==="gps"){
    container.innerHTML += "<h2>🧭 GPS Activo</h2>";
  }
}

function closeApp(){
  showScreen("menu");
}

// ======= LLAMADA =======
function simulateCall(){
  alert("📞 Llamada entrante...");
  if(navigator.vibrate) navigator.vibrate([200,100,200]);
}

// ======= MODO DIA/NOCHE =======
let dark=true;
function toggleMode(){
  dark=!dark;
  const root=document.documentElement;

  if(dark){
    root.style.setProperty('--bg','#000');
    root.style.setProperty('--text','#fff');
  }else{
    root.style.setProperty('--bg','#f1f5f9');
    root.style.setProperty('--text','#000');
  }
}
