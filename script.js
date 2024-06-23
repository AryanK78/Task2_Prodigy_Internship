let startTime = 0;
let updatedTime = 0;
let difference = 0;
let tInterval;
let running = false;
let paused = false;
const display = document.getElementById('display');
const lapTimes = document.getElementById('lapTimes');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');

startButton.addEventListener('click', start);
pauseButton.addEventListener('click', pauseResume);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);

function start() {
    if (!running) {
        startTime = new Date().getTime() - difference;
        tInterval = setInterval(update, 1000);
        running = true;
        paused = false;
        startButton.disabled = true;
        pauseButton.innerText = 'Pause';
        pauseButton.disabled = false;
    }
}

function pauseResume() {
    if (!paused) {
        clearInterval(tInterval);
        difference = new Date().getTime() - startTime;
        paused = true;
        running = false;
        pauseButton.innerText = 'Resume';
    } else {
        startTime = new Date().getTime() - difference;
        tInterval = setInterval(update, 1000);
        running = true;
        paused = false;
        pauseButton.innerText = 'Pause';
    }
}

function reset() {
    clearInterval(tInterval);
    running = false;
    paused = false;
    difference = 0;
    display.innerHTML = "00:00:00";
    lapTimes.innerHTML = "";
    startButton.disabled = false;
    pauseButton.innerText = 'Pause';
    pauseButton.disabled = true;
}

function lap() {
    if (running || paused) {
        const lapTime = document.createElement('li');
        lapTime.textContent = display.innerHTML;
        lapTimes.appendChild(lapTime);
    }
}

function update() {
    updatedTime = new Date().getTime() - startTime;
    const hours = Math.floor(updatedTime / (1000 * 60 * 60));
    const minutes = Math.floor((updatedTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((updatedTime % (1000 * 60)) / 1000);
    display.innerHTML = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(num) {
    return num < 10 ? "0" + num : num;
}
