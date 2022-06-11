"use strict";

import i18Obj from "./translate.js";

let lang = 'en';
let theme = 'light';
window.addEventListener('beforeunload', () => setLocalStorageTheme(theme))
window.addEventListener('DOMContentLoaded', getLocalStorageTheme)



const translate = () => {
  const languageItem = document.querySelectorAll('.language-item');
  const ruLang = document.querySelector(".ru");
  const enLang = document.querySelector(".en");

  function getTranslate(lang) {
    document.querySelectorAll("[data-i18]").forEach((el) => {
      el.textContent = i18Obj[lang][el.dataset.i18];
      if (el.placeholder) {
        el.placeholder = i18Obj[lang][el.dataset.i18];
        el.textContent = '';
      }
    });
    languageItem.forEach((item) => item.classList.remove('active'))
    document.querySelector(`.${lang}`).classList.add('active');
  }

  ruLang.addEventListener("click", () => {
    getTranslate("ru");
    lang = 'ru';
  });

  enLang.addEventListener("click", () => {
    getTranslate("en");
    lang = 'en';
  });

  function setLocalStorage() {
    localStorage.setItem('lang', lang);
  }
  window.addEventListener('beforeunload', () => setLocalStorage(lang))

  function getLocalStorage() {
    if (localStorage.getItem('lang')) {
      const lang = localStorage.getItem('lang');
      getTranslate(lang);
    }
  }
  window.addEventListener('DOMContentLoaded', getLocalStorage)
};

const menuBurger = () => {
  const menuBurger = document.querySelector(".navigation-burger");
  const iconBurger = document.querySelector(".menu-icon");
  const background = document.querySelector(".background");
  const linksBurger = document.querySelectorAll(".nav-links");

  if (iconBurger) {
    iconBurger.addEventListener("click", function (e) {
      document.body.classList.toggle("lock");
      iconBurger.classList.toggle("active");
      menuBurger.classList.toggle("active");
      background.classList.toggle("active");
    });
  }

  background.addEventListener("click", function (e) {
    closeMenu();
  });

  linksBurger.forEach(function (item) {
    item.addEventListener("click", function (e) {
      closeMenu();
    });
  });

  function closeMenu() {
    iconBurger.classList.remove("active");
    menuBurger.classList.remove("active");
    background.classList.remove("active");
    document.body.classList.remove("lock");
  }
};

const switchImgPortfolio = () => {
  const portfolioBtn = document.querySelectorAll(".portfolio-btn");
  const portfolioImg = document.querySelectorAll(".portfolio-img");

  let season = "";

  portfolioBtn.forEach(function (item) {
    item.addEventListener("click", function (e) {
      portfolioBtn.forEach(function (e) {
        e.classList.remove("active");
      });
      item.classList.add("active");
      season = item.dataset.season;
      changeImage();
    });
  });

  function changeImage() {
    portfolioImg.forEach(
      (img, index) => (img.src = `./assets/${season}/${index + 1}.jpg`)
    );
  }
};

const preloadImages = () => {
  const seasons = ["winter", "spring", "summer", "autumn"];

  seasons.forEach(function (season) {
    for (let i = 1; i <= 6; i++) {
      const img = new Image();
      img.src = `./assets/${season}/${i}.jpg`;
    }
  });
};

const initThemeSwitcher = () => {
  const themeBtnLight = document.querySelector(".white-th");
  const themeBtnDark = document.querySelector(".dark-th");


  themeBtnLight.addEventListener('click', () => {
    theme = 'light';
    setLocalStorageTheme(theme)
    switchTheme();
  })

  themeBtnDark.addEventListener('click', () => {
    theme = 'dark';
    setLocalStorageTheme(theme);
    switchTheme();
  })
}

function switchTheme() {
  const themeBtnLight = document.querySelector(".white-th");
  const themeBtnDark = document.querySelector(".dark-th");

  if (theme === 'light') {
    document.querySelector('.hero').classList.add('white-theme');
    document.querySelector('.header').classList.add('white-theme');
    document.querySelector('.contacts').classList.add('white-theme');
    document.querySelector('.logo').classList.add('white-theme');
    document.querySelector('.social-list').classList.toggle('white-theme');
    document.body.classList.add('white-theme');

    themeBtnLight.classList.remove('active');
    themeBtnDark.classList.add('active');
  } else {
    document.querySelector('.hero').classList.remove('white-theme');
    document.querySelector('.header').classList.remove('white-theme');
    document.querySelector('.contacts').classList.remove('white-theme');
    document.querySelector('.logo').classList.remove('white-theme');
    document.querySelector('.social-list').classList.remove('white-theme');
    document.body.classList.remove('white-theme');

    themeBtnLight.classList.add('active');
    themeBtnDark.classList.remove('active');
  }
}

function getLocalStorageTheme() {
  if (localStorage.getItem('theme')) {
    theme = localStorage.getItem('theme');
    switchTheme();
  }
}

function setLocalStorageTheme(theme) {
  localStorage.setItem('theme', theme);
}

preloadImages();
menuBurger();
switchImgPortfolio();
translate();
initThemeSwitcher();

console.log(`1) Вёрстка +10
- вёрстка видеоплеера: есть само видео, в панели управления есть кнопка Play/Pause, прогресс-бар, кнопка Volume/Mute, регулятор громкости звука +5
 - в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, [логотип курса](https://rs.school/images/rs_school_js.svg) со [ссылкой на курс](https://rs.school/js-stage0/) +5
2) Кнопка Play/Pause на панели управления +10
- при клике по кнопке Play/Pause запускается или останавливается проигрывание видео +5
 - внешний вид и функционал кнопки изменяется в зависимости от того, проигрывается ли видео в данный момент +5
3) Прогресс-бар отображает прогресс проигрывания видео. При перемещении ползунка прогресс-бара вручную меняется текущее время проигрывания видео. Разный цвет прогресс-бара до и после ползунка +10
4) При перемещении ползунка регулятора громкости звука можно сделать звук громче или тише. Разный цвет регулятора громкости звука до и после ползунка +10
5) При клике по кнопке Volume/Mute можно включить или отключить звук. Одновременно с включением/выключением звука меняется внешний вид кнопки. Также внешний вид кнопки меняется, если звук включают или выключают перетягиванием регулятора громкости звука от нуля или до нуля +10
6) Кнопка Play/Pause в центре видео +10
 - есть кнопка Play/Pause в центре видео при клике по которой запускается видео и отображается панель управления +5
 - когда видео проигрывается, кнопка Play/Pause в центре видео скрывается, когда видео останавливается, кнопка снова отображается +5
7) Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10
 - высокое качество оформления приложения предполагает собственное оригинальное оформление равное или отличающееся в лучшую сторону по сравнению с демо`)