// Configuración
const SCREENS = document.querySelectorAll('.page');
const SCREEN_EL = document.getElementById('screen');
const SLEEP_OVERLAY = document.getElementById('sleep-overlay');
let sleepTimer;

// Iniciar
document.addEventListener('DOMContentLoaded', () => {
    updateClock();
    setInterval(updateClock, 1000);
    resetSleepTimer();
    startSimulations();
});

// --- Reloj y Fecha Automática ---
function updateClock() {
    const now = new Date();
    
    // Hora
    const h = now.getHours().toString().padStart(2, '0');
    const m = now.getMinutes().toString().padStart(2, '0');
    document.getElementById('hours').textContent = h;
    document.getElementById('minutes').textContent = m;
    
    // Fecha: Día Sem / Día Mes / Mes
    // Ejemplo: JUE 12/02
    const dias = ['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB'];
    const diaSemana = dias[now.getDay()];
    const diaMes = now.getDate().toString().padStart(2, '0');
    const mes = (now.getMonth() + 1).toString().padStart(2, '0');
    
    // Actualizar etiqueta
    const fechaTexto = `${diaSemana} ${diaMes}/${mes}`;
    const dateLabel = document.querySelector('.date-label');
    if(dateLabel) dateLabel.textContent = fechaTexto;
}

// --- Navegación ---
function showScreen(id) {
    SCREENS.forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    
    // Botón atrás lógica
    const backBtn = document.getElementById('back-btn');
    if(id === 'home-screen') {
        backBtn.classList.add('hidden');
    } else {
        backBtn.classList.remove('hidden');
        backBtn.onclick = () => {
            if(id === 'menu-screen') showScreen('home-screen');
            else showScreen('menu-screen');
        };
    }
}

// Eventos
document.getElementById('home-screen').addEventListener('click', () => showScreen('menu-screen'));
document.getElementById('side-button').addEventListener('click', () => {
    if(SLEEP_OVERLAY.classList.contains('active')) wakeScreen();
    else showScreen('home-screen');
});

document.querySelectorAll('.app-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.stopPropagation();
        showScreen(item.dataset.target);
    });
});

// Simulaciones
function startSimulations() {
    // Brillo
    const slider = document.getElementById('brightness-slider');
    if(slider) {
        slider.addEventListener('input', (e) => {
            SCREEN_EL.style.opacity = e.target.value / 100;
        });
    }
    
    // Ritmo cardíaco aleatorio en la app
    setInterval(() => {
        const bpmDisplay = document.getElementById('bpm-display');
        if(bpmDisplay) bpmDisplay.textContent = Math.floor(Math.random() * (90 - 60) + 60) + " BPM";
    }, 2000);
}

// Apagado automático
function resetSleepTimer() {
    clearTimeout(sleepTimer);
    if(!SLEEP_OVERLAY.classList.contains('active')){
        sleepTimer = setTimeout(() => SLEEP_OVERLAY.classList.add('active'), 15000);
    }
}
function wakeScreen() {
    SLEEP_OVERLAY.classList.remove('active');
    resetSleepTimer();
}
SCREEN_EL.addEventListener('click', resetSleepTimer);
