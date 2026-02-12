const screens=document.querySelectorAll(".screen");
const watch=document.getElementById("watch");
let currentScreen="home";
let sleepTimer;
let activeIntervals=[];

// TIME
function updateTime(){
  const now=new Date();
  document.getElementById("time").innerText=
    now.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});
  document.getElementById("date").innerText=
    now.toLocaleDateString();
}
setInterval(updateTime,1000);
updateTime();

// CLEAR INTERVALS
function clearAppIntervals(){
  activeIntervals.forEach(i=>clearInterval(i));
  activeIntervals=[];
}

// SCREEN SWITCH
function showScreen(id){
  clearAppIntervals();
  screens.forEach(s=>s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  currentScreen=id;
  wakeScreen();
}

// WAKE / SLEEP
function wakeScreen(){
  watch.style.opacity="1";
  clearTimeout(sleepTimer);
  sleepTimer=setTimeout(()=>{
    watch.style.opacity=".5";
  },15000);
}
watch.addEventListener("click",wakeScreen);

// SWIPE
let startY=0;
watch.addEventListener("touchstart",e=>{
  startY=e.touches[0].clientY;
});
watch.addEventListener("touchend",e=>{
  let diff=startY-e.changedTouches[0].clientY;
  if(diff>60 && currentScreen==="home") showScreen("menu");
  if(diff<-60 && currentScreen==="menu") showScreen("home");
});

// OPEN APP
function openApp(name){
  clearAppIntervals();
  const container=document.getElementById("appContainer");
  container.innerHTML="<button class='back-btn' onclick='showScreen(\"menu\")'>⬅</button>";
  showScreen("appContainer");

  if(name==="heart"){
    container.innerHTML+=`
      <div style="position:relative;">
        <div class="wave"></div>
        <div class="heart">❤️</div>
      </div>
      <div id="bpm" style="margin-top:20px;font-size:22px;"></div>
    `;
    let interval=setInterval(()=>{
      document.getElementById("bpm").innerText=
        Math.floor(Math.random()*30+60)+" BPM";
    },1500);
    activeIntervals.push(interval);
  }

  if(name==="music"){
    container.innerHTML+=`
      <div>🎵 Blinding Lights</div>
      <div class="progress-bar">
        <div class="progress" id="musicBar"></div>
      </div>
    `;
    let progress=0;
    let interval=setInterval(()=>{
      progress+=2;
      if(progress>100) progress=0;
      document.getElementById("musicBar").style.width=progress+"%";
    },200);
    activeIntervals.push(interval);
  }

  if(name==="weather"){
    container.innerHTML+=`
      <div class="sun">☀️</div>
      <div style="margin-top:20px;">26°C - Soleado</div>
    `;
  }

  if(name==="steps"){
    container.innerHTML+=`
      <div style="font-size:60px;">👟</div>
      <div style="margin-top:20px;font-size:22px;">
        ${Math.floor(Math.random()*4000+4000)} pasos
      </div>
    `;
  }

  if(name==="battery"){
    container.innerHTML+=`
      <div style="font-size:60px;">🔋</div>
      <div style="margin-top:20px;font-size:22px;">
        ${Math.floor(Math.random()*40+60)}%
      </div>
    `;
  }

  if(name==="settings"){
    container.innerHTML+=`
      <div style="font-size:50px;">⚙️</div>
      <div style="margin-top:20px;">
        Modo oscuro activado
      </div>
    `;
  }
}

