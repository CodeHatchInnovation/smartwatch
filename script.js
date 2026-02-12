let currentScreen = 'home-screen';
let sleepTimer;
let bpmInterval;
const SLEEP_DELAY = 15000;

const screen = document.getElementById('screen');
const pages = document.querySelectorAll('.page');
const sleepOverlay = document.getElementById('sleep-overlay');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const dateEl = document.querySelector('.day-date');
const backBtn = document.getElementById('back-btn');
const sideBtn = document.getElementById('side-button');

document.addEventListener('DOMContentLoaded', () => {
    updateTime();
    setInterval(updateTime, 1000);
    simulateSteps();
});

function updateTime() {
    const now = new Date();
    const days = ['dom','lun','mar','mié','jue','vie','sáb'];

    hoursEl.textContent = now.getHours().toString().padStart(2, '0');
    minutesEl.textContent = now.getMinutes().toString().padStart(2, '0');

    dateEl.textContent =
        `${days[now.getDay()]} ${now.getDate()}/${(now.getMonth()+1)
        .toString().padStart(2,'0')}/${now.getFullYear()}`;
}

function showScreen(id) {
    pages.forEach(p => p.classList.remove('active'));
    document.getElementById(id).classList.add('active');

    if (id === 'home-screen') backBtn.classList.add('hidden');
    else backBtn.classList.remove('hidden');

    backBtn.onclick = () => showScreen(id === 'menu-screen' ? 'home-screen' : 'menu-screen');
}

document.getElementById('home-screen').onclick = () => showScreen('menu-screen');

document.querySelectorAll('.app-icon[data-target]').forEach(icon => {
    icon.onclick = e => {
        e.stopPropagation();
        showScreen(icon.dataset.target);
    };
});

document.querySelectorAll('.bt-icon, .wifi-icon, .dnd-icon, .gps-icon')
.forEach(icon => {
    icon.onclick = e => {
        e.stopPropagation();
        icon.classList.toggle('active');
    };
});

function simulateSteps() {
    let steps = 1000;
    const el = document.getElementById('steps-counter');

    setInterval(() => {
        steps += Math.floor(Math.random() * 5);
        el.textContent = steps;
    }, 2000);
}
