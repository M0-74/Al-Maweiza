/*********************************************************/
/********************** Header ***************************/
/*********************************************************/

let fixedNav = document.querySelector(".header");
let btnScroll = document.querySelector(".scroll");
window.addEventListener("scroll", () => {
  window.scrollY > 100
    ? fixedNav.classList.add("active")
    : fixedNav.classList.remove("active");
  window.scrollY > 500
    ? btnScroll.classList.add("active")
    : btnScroll.classList.remove("active");
});

btnScroll.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/*********************************************************/
/********************** Scroll ***************************/
/*********************************************************/
let startBtn = document.querySelector(".title .btn"),
  hadithSection = document.querySelector(".hadith");

startBtn.addEventListener("click", () => {
  hadithSection.scrollIntoView({
    behavior: "smooth",
  });
});
/*****************************************************/
let sections = document.querySelectorAll("section");
let links = document.querySelectorAll(".header ul li");
links.forEach((element) => {
  element.addEventListener("click", () => {
    document.querySelector(".header ul li.active").classList.remove("active");
    element.classList.add("active");
    let pageTarget = element.dataset.filter;
    sections.forEach((ele) => {
      if (ele.classList.contains(pageTarget)) {
        ele.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});

/*********************************************************/
/********************* Hadiths ***************************/
/*********************************************************/

let hadith = document.querySelector(".hadith-content");
let nextDiv = document.querySelector(".button .next");
let prevDiv = document.querySelector(".button .prev");
let numDiv = document.querySelector(".button .number");
let hadithIndex = 0;
HadithChange();
function HadithChange() {
  fetch("https://api.hadith.gading.dev/books/muslim?range=1-300")
    .then((response) => response.json())
    .then((data) => {
      let Hadiths = data.data.hadiths;

      changeHadith();

      nextDiv.addEventListener("click", () => {
        hadithIndex == 299 ? (hadithIndex = 0) : hadithIndex++;
        changeHadith();
      });
      prevDiv.addEventListener("click", () => {
        hadithIndex == 0 ? (hadithIndex = 299) : hadithIndex--;
        changeHadith();
      });

      function changeHadith() {
        hadith.innerText = Hadiths[hadithIndex].arab;
        numDiv.innerText = `300-${hadithIndex + 1}`;
      }
    });
}

/*********************************************************/
/*********************** Surah ***************************/
/*********************************************************/

let surahPlace = document.querySelector(".surahs-cont");
getSurah();
function getSurah() {
  fetch("http://api.alquran.cloud/v1/meta").then((response) => {
    response.json().then((data) => {
      let Surah = data.data.surahs.references;
      let indexOfSurah = 114;
      surahPlace.innerHTML = "";
      for (let i = 0; i < indexOfSurah; i++) {
        surahPlace.innerHTML += `
                     <div class="surah">
                        <p>${Surah[i].name}</p>
                        <p>${Surah[i].englishName}</p>
                     </div>
        `;
      }
      let surahTitle = document.querySelectorAll(".surah");
      let popUp = document.querySelector(".surah-popup");
      let ayatCont = document.querySelector(".ayaat");
      surahTitle.forEach((title, index) => {
        title.addEventListener("click", () => {
          fetch(`http://api.alquran.cloud/v1/surah/${index + 1}`)
            .then((response) => response.json())
            .then((data) => {
              ayatCont.innerHTML = "";
              let Aya = data.data.ayahs;
              Aya.forEach((aya) => {
                popUp.classList.add("active");
                ayatCont.innerHTML += `
                <p>{${aya.numberInSurah} - ${aya.text}}</p>
                `;
              });
            });
        });
      });

      let closePopUp = document.querySelector(".close-popup");
      closePopUp.addEventListener("click", () => {
        popUp.classList.remove("active");
      });
    });
  });
}
/*********************************************************/
/********************* pray Time *************************/
/*********************************************************/

let cardsCont = document.querySelector(".cards");
getPrayTime();
function getPrayTime() {
  fetch(
    "https://api.aladhan.com/v1/timingsByCity/10-09-2023?city=cairo&country=egypt&method=8"
  )
    .then((response) => response.json())
    .then((data) => {
      let Times = data.data.timings;
      cardsCont.innerHTML = "";
      for (let time in Times) {
        cardsCont.innerHTML += `
        <div class="card">
          <div class="circle">
              <svg>
                  <circle cx="100" cy="100" r="100"></circle>
              </svg>
              <div class="praytime">${Times[time]}</div>
          </div>
          <p>${time}</p>
        </div>`;
      }
    });
}
/*********************************************************/
/************************* Bars **************************/
/*********************************************************/

let bars = document.querySelector(".bar");
let sideBar = document.querySelector(".header ul");
bars.addEventListener("click", () => {
  sideBar.classList.toggle("active");
});
