// Configuración Global
const SCREENS = document.querySelectorAll('.page');
const SCREEN_EL = document.getElementById('screen');
const BACK_BTN = document.getElementById('back-btn');
const SLEEP_OVERLAY = document.getElementById('sleep-overlay');
let currentScreenId = 'home-screen';
let sleepTimer;

// --- Inicialización ---
document.addEventListener('DOMContentLoaded', () => {
    updateClock();
    setInterval(updateClock, 1000);
    resetSleepTimer();
    
    // Iniciar simulación de ritmo cardíaco
    startHeartRateSim();
});

// --- 1. Reloj y Fecha (Lógica del Punto 1) ---
function updateClock() {
    const now = new Date();
    // Hora real
    document.getElementById('hours').textContent = now.getHours().toString().padStart(2, '0');
    document.getElementById('minutes').textContent = now.getMinutes().toString().padStart(2, '0');
    
    // NOTA: La fecha está "hardcoded" visualmente en el HTML como "SÁB 22 FEB" 
    // para cumplir con tu requerimiento específico de Nicolás Romero, 22 de Febrero.
    // Si quisieras fecha real automática, descomenta esto:
    /*
    const days = ['DOM','LUN','MAR','MIE','JUE','VIE','SAB'];
    const months = ['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC'];
    const dateStr = `${days[now.getDay()]} ${now.getDate()} ${months[now.getMonth()]}`;
    document.querySelector('.date-display').textContent = dateStr;
    */
}

// --- 2. Sistema de Navegación ---
function navigateTo(screenId) {
    SCREENS.forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
    currentScreenId = screenId;

    // Manejo botón atrás
    if (screenId === 'home-screen') {
        BACK_BTN.classList.add('hidden');
    } else if (screenId === 'menu-screen') {
        BACK_BTN.classList.remove('hidden');
        BACK_BTN.onclick = () => navigateTo('home-screen');
    } else {
        // Estamos en una app interna
        BACK_BTN.classList.remove('hidden');
        BACK_BTN.onclick = () => navigateTo('menu-screen');
    }
}

// --- 3. Control de Brillo (Requerimiento Específico) ---
const brightnessSlider = document.getElementById('brightness-slider');
brightnessSlider.addEventListener('input', (e) => {
    const value = e.target.value; // 20 a 100
    const decimal = value / 100;
    
    // Aplicamos la variable CSS al contenedor principal
    SCREEN_EL.style.setProperty('--screen-brightness', decimal);
});

// --- 4. Interacción Táctil y Eventos ---

// Click en Apps del Menú
document.querySelectorAll('.app-item').forEach(item => {
    item.addEventListener('click', () => {
        const target = item.dataset.target;
        navigateTo(target);
    });
});

// Click en la esfera para ir al menú
document.getElementById('home-screen').addEventListener('click', () => {
    navigateTo('menu-screen');
});

// Botón Físico Lateral (Home / Wake / Back)
document.getElementById('side-button').addEventListener('click', () => {
    if (SLEEP_OVERLAY.classList.contains('active')) {
        wakeScreen();
    } else {
        navigateTo('home-screen');
    }
});

// --- 5. Simulaciones ---

// Ritmo Cardíaco
function startHeartRateSim() {
    const bpmHome = document.getElementById('home-bpm');
    const bpmDetail = document.getElementById('bpm-detail');
    
    setInterval(() => {
        const val = Math.floor(Math.random() * (95 - 70) + 70);
        bpmHome.textContent = val;
        bpmDetail.innerHTML = `${val} <span style="font-size:1rem">BPM</span>`;
    }, 2000);
}

// --- 6. Sistema de Energía (Sleep Mode) ---
function resetSleepTimer() {
    clearTimeout(sleepTimer);
    if (!SLEEP_OVERLAY.classList.contains('active')) {
        sleepTimer = setTimeout(() => {
            SLEEP_OVERLAY.classList.add('active');
        }, 15000); // 15 seg apagado
    }
}

function wakeScreen() {
    SLEEP_OVERLAY.classList.remove('active');
    resetSleepTimer();
}

// Cualquier toque reinicia el temporizador
SCREEN_EL.addEventListener('click', resetSleepTimer);
SCREEN_EL.addEventListener('touchstart', resetSleepTimer);
