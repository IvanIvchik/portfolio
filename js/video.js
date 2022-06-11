const player = document.querySelector('.video-player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress[name="progress"]');
const volumeValue = player.querySelector('.volume[name="volume"]');
const play = player.querySelector('.play');
const toggle = player.querySelectorAll('.toggle');
const stopBtn = player.querySelector('.stop-btn');
const soundBtn = player.querySelector('.sound-btn');
const muteBtn = player.querySelector('.mute-btn');
const fullBtn = player.querySelector('.full-btn');
const smallBtn = player.querySelector('.small-btn');
const ranges = player.querySelectorAll('.player-slides');
const poster = player.querySelector('.poster');
const beckFull = document.querySelector('.background-full');
const controls = player.querySelector('.controls');
const scrimBtn = [fullBtn, smallBtn];
const scrimValue = [beckFull, player, progress, controls, video, poster];

function switchScrim() {
    scrimValue.forEach(e => {
        e.classList.toggle('full-scrim');
    });
    scrimBtn.forEach(e => {
        e.classList.toggle('active');
    });
    document.body.classList.toggle('lock');
}

function returnNormalScrim() {
    scrimValue.forEach(e => {
        e.classList.remove('full-scrim');
    });
    fullBtn.classList.add('active');
    smallBtn.classList.remove('active');
    document.body.classList.remove('lock');
}

function hideProgress() {
    controls.classList.add('hide');
}

function showProgress() {
    controls.classList.remove('hide');
    debounce(hideProgress, 2000);
}

const dedFun = debounce(hideProgress, 2000);


function debounce(callback, delay) {
    let timeout;
    return function () {
        clearTimeout(timeout);
        timeout = setTimeout(callback, delay);
    }
}

let isMouseDown = false;
let volume;

function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}

function updateButton() {
    toggle.forEach(e => {
        e.classList.toggle('active');
    });
}

function muteSound() {
    muteBtn.classList.add('active');
    soundBtn.classList.remove('active');
    video.volume = 0;
}

function turnOnSound() {
    muteBtn.classList.remove('active');
    soundBtn.classList.add('active');
    video.volume = volumeValue.value / 100;
}

function stopVideo() {
    video.pause();
    video.currentTime = 0;
    poster.classList.add('active');
    returnNormalScrim();
}

function handleVolumeUpdate() {
    volume = this.value;
    video.volume = volume / 100;
    this.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${volume}%, #c8c8c8 ${volume}%, #c8c8c8 100%)`
    if (video.volume == 0) {
        muteBtn.classList.add('active');
        soundBtn.classList.remove('active');
    } else {
        muteBtn.classList.remove('active');
        soundBtn.classList.add('active');
    }
}

function progressUpdate(time = video.currentTime) {
    const percent = (time / video.duration) * 100;
    progress.value = percent;
    progress.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${percent}%, #c8c8c8 ${percent}%, #c8c8c8 100%)`
}

function scrubMouse(e) {
    const scrubTime = getMouseScrubTime(e);
    video.currentTime = scrubTime;
}


function getMouseScrubTime(e) {
    return ((e.offsetX / progress.offsetWidth) * video.duration);
}

function onMouseMove(e) {
    if (!isMouseDown) return;
    const scrubTime = getMouseScrubTime(e);
    progressUpdate(scrubTime)
}

function scrubTouch(e) {
    const scrubTime = getTouchScrubTime(e);
    video.currentTime = scrubTime;
}


function getTouchScrubTime(e) {
    return ((((e.targetTouches[0].clientX) / progress.offsetWidth) * video.duration) - 13.902921305144492 - 8.547458673359333);
}

let touchEvent = null;
let isTouched = false;
function onTouchStart(e) {
    touchEvent = e;
    isTouched = true;

}
function onTouchMove(e) {
    touchEvent = e
    const scrubTime = getTouchScrubTime(e);
    progressUpdate(scrubTime);
}

function onTouchEnd(e) {
    scrubTouch(touchEvent);
    touchEvent = null;
    isTouched = false;
}

video.addEventListener('click', togglePlay);
toggle.forEach(e => {
    e.addEventListener("click", togglePlay);
});
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
stopBtn.addEventListener('click', stopVideo);
volumeValue.addEventListener('input', handleVolumeUpdate);
video.addEventListener('timeupdate', (e) => { !(isMouseDown || isTouched) && progressUpdate() });
progress.addEventListener('click', scrubMouse);
progress.addEventListener('touchstart', onTouchStart);
progress.addEventListener('touchmove', onTouchMove);
progress.addEventListener('touchend', onTouchEnd);
progress.addEventListener('mousedown', () => isMouseDown = true);
progress.addEventListener('mouseup', () => isMouseDown = false);
progress.addEventListener('mousemove', onMouseMove);
soundBtn.addEventListener('click', muteSound);
muteBtn.addEventListener('click', turnOnSound);
play.addEventListener("click", () => poster.classList.remove('active'));
scrimBtn.forEach(e => {
    e.addEventListener('click', switchScrim);
});
video.addEventListener('dblclick', switchScrim);
fullBtn.addEventListener('click', hideProgress);
smallBtn.addEventListener('click', showProgress);
video.addEventListener('mousemove', showProgress);
video.addEventListener('mousemove', dedFun);
controls.addEventListener('mousemove', showProgress);
video.addEventListener('touchstart', showProgress);
video.addEventListener('touchend', hideProgress);






