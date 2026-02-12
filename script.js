// --- Estado del Sistema ---
let currentScreen = 'home-screen';
let sleepTimer;
let bpmInterval;
const SLEEP_DELAY = 15000; // 15 segundos para apagar

// --- Elementos del DOM ---
const screen = document.getElementById('screen');
const pages = document.querySelectorAll('.page');
const sleepOverlay = document.getElementById('sleep-overlay');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const backBtn = document.getElementById('back-btn');
const sideBtn = document.getElementById('side-button');

// --- Inicialización ---
document.addEventListener('DOMContentLoaded', () => {
    updateTime();
    setInterval(updateTime, 1000);
    resetSleepTimer();
    simulateSteps();
});

// --- Manejo del Tiempo ---
function updateTime() {
    const now = new Date();
    const h = now.getHours().toString().padStart(2, '0');
    const m = now.getMinutes().toString().padStart(2, '0');
    hoursEl.textContent = h;
    minutesEl.textContent = m;
}

// --- Navegación ---
function showScreen(screenId) {
    // Ocultar todas
    pages.forEach(page => page.classList.remove('active'));
    
    // Mostrar objetivo
    const target = document.getElementById(screenId);
    if(target) target.classList.add('active');
    
    currentScreen = screenId;
    
    // Gestión del botón "Atrás"
    if (screenId === 'home-screen') {
        backBtn.classList.add('hidden');
    } else if (screenId === 'menu-screen') {
        backBtn.classList.remove('hidden');
        backBtn.onclick = () => showScreen('home-screen');
    } else {
        // Estamos en una App
        backBtn.classList.remove('hidden');
        backBtn.onclick = () => showScreen('menu-screen');
    }

    // Gestionar simulaciones específicas
    handleAppSimulations(screenId);
}

// --- Lógica de Apps Simuladas ---
function handleAppSimulations(screenId) {
    // Limpiar intervalos anteriores
    if (bpmInterval) clearInterval(bpmInterval);

    // Activar lógica específica
    if (screenId === 'app-heart') {
        const bpmEl = document.getElementById('bpm');
        bpmInterval = setInterval(() => {
            // Generar BPM aleatorio entre 65 y 95
            const val = Math.floor(Math.random() * (95 - 65 + 1) + 65);
            bpmEl.textContent = val;
        }, 1500);
    }
}

function simulateSteps() {
    // Generar pasos al azar al cargar
    const steps = Math.floor(Math.random() * (8000 - 1000 + 1) + 1000);
    document.getElementById('steps-counter').textContent = steps;
}

// --- Eventos de Interacción ---

// 1. Click en la pantalla Home para ir al menú
document.getElementById('home-screen').addEventListener('click', () => {
    showScreen('menu-screen');
});

// 2. Clicks en Iconos de Apps
document.querySelectorAll('.app-icon').forEach(icon => {
    icon.addEventListener('click', (e) => {
        e.stopPropagation(); // Evitar propagación
        const targetApp = icon.dataset.target;
        showScreen(targetApp);
    });
});

// 3. Botón Físico Lateral (Home / Wake)
sideBtn.addEventListener('click', () => {
    if (sleepOverlay.classList.contains('active')) {
        wakeScreen();
    } else {
        showScreen('home-screen');
    }
    resetSleepTimer();
});

// --- Sistema de Apagado Automático (Sleep Mode) ---
function resetSleepTimer() {
    clearTimeout(sleepTimer);
    if (sleepOverlay.classList.contains('active')) return; // Si ya está dormido, no reiniciar timer
    
    sleepTimer = setTimeout(() => {
        sleepOverlay.classList.add('active'); // Oscurecer
    }, SLEEP_DELAY);
}

function wakeScreen() {
    sleepOverlay.classList.remove('active');
    resetSleepTimer();
}

// Detectar cualquier toque en la pantalla para mantener despierto
screen.addEventListener('click', () => {
    if (sleepOverlay.classList.contains('active')) {
        wakeScreen();
    } else {
        resetSleepTimer();
    }
});
