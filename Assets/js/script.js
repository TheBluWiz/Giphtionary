// Search Modal Selectors
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const openModalBtn = document.querySelector(".btn-open");
const closeModalBtn = document.querySelector(".btn-close");
const searchHistoryBtn = document.querySelector("#searchHistoryBtn");

// DOM Element Selectors
let wordInputEl = document.getElementById("search modal");
let wordSearchButton = document.getElementById("searchBtn");
let wordDefinition = document.getElementById("wordDefinition");
let giphDisplayEl = document.getElementById("giphs");
console.log(wordDefinition)
console.log(giphDisplayEl)

// State Variables
var searchedWord = "";
var definitionArray = "";
var giphArray = [];
let meriamWebsterURL;
let giphyURL;
let history = [];

// Updates API links
function getMeriamWebsterURL() {
  meriamWebsterURL = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${searchedWord}?key=35209bec-5678-4beb-85bc-14642a260055`;
  getAPI(meriamWebsterURL)
  return meriamWebsterURL
}

function getGiphyURL() {
  giphyURL = `https://api.giphy.com/v1/gifs/search?api_key=C46PLya5FW7iVdgTbVrt2tvX26ZgIo8w&q=${searchedWord}&limit=3&offset=0&rating=g&lang=en`
  getAPI(giphyURL)
  return giphyURL

}

// Calls APIs
function getAPI(requestUrl) {
  fetch(requestUrl)
    .then(function (response) {
      if (response.status === 200) {
        console.log("Yay")
      } else {
        console.log("Sad")
      }
      return response.json();
    })
    .then(function (data) {
      if (requestUrl === meriamWebsterURL) {
        definitionArray = data[0].shortdef
        console.log(definitionArray)
        console.log("Definitions sent to DOM")
        console.log()
        for (let i = 0; i < definitionArray.length; i++) {
          let definition = document.createElement("p");
          definition.textContent = definitionArray[i];
          wordDefinition.appendChild(definition);
        }
      }
      if (requestUrl === giphyURL) {
        console.log("Gifs sent to DOM")
        giphArray = data.data;
        console.log(giphArray)
        for (let i = 0; i < giphArray.length; i++) {
          let giph = document.createElement("iframe");
          giph.src = giphArray[i].embed_url;
          giphDisplayEl.appendChild(giph);
        }
      }
    });
}

wordSearchButton.addEventListener("click", function (event) {
  event.preventDefault();
  searchedWord = wordInputEl.value
  getMeriamWebsterURL()
  getGiphyURL()
  appendHistory(searchedWord)
});

// Opens Modal
const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};
openModalBtn.addEventListener("click", openModal);

// Close Modal
const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};
closeModalBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

// Close Modal on Key Press
// document.addEventListener("keydown");
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    modalClose();
  }
});

// Opens History Modal
const openHistoryModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};
searchHistoryBtn.addEventListener("click", openModal);

// Limits persistent storage to ten
function appendHistory() {
  if (history.length >= 10) {
    history.shift();
  }
  history.push(searchedWord);
  localStorage.setItem("history", JSON.stringify(history));
}

// Saves history
function getSearches() {
  let storedHistory = localStorage.getItem("history");
  if (storedHistory) {
    history = JSON.parse(storedHistory);
  }
  renderSearchHistory();
};

getSearches()


