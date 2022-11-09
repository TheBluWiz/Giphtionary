var searchedWord = "development";
var definitionArray = "";
var giphArray = [];

// Search Modal Selectors
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const openModalBtn = document.querySelector(".btn-open");
const closeModalBtn = document.querySelector(".btn-close");
const searchHistoryBtn = document.querySelector("#searchHistoryBtn");


let wordInputEl = document.getElementById("search modal");
let wordSearchButton = document.getElementById("searchBtn");
let wordDefinition = document.getElementById("word-definition");
let giphDisplayEl = document.getElementById("giphs");

let meriamWebsterURL;
let giphyURL;

function getMeriamWebsterURL() {
  meriamWebsterURL = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${searchedWord}?key=35209bec-5678-4beb-85bc-14642a260055`;
  console.log(meriamWebsterURL)
  return meriamWebsterURL
}

function getGiphyURL() {
  giphyURL = `https://api.giphy.com/v1/gifs/search?api_key=C46PLya5FW7iVdgTbVrt2tvX26ZgIo8w&q=${searchedWord}&limit=3&offset=0&rating=g&lang=en`
  console.log(giphyURL)
  return giphyURL
}

// link for search history 
function getWord(event) {
  event.preventDefault();
  searchedWord = wordInputEl.textContent
}
// wordSearchButton.addEventListener("click", getWord);

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
      console.log(requestUrl)
      console.log(meriamWebsterURL)
      console.log(giphyURL)
      if (requestUrl === meriamWebsterURL) {
        definitionArray = data[0].shortdef
        console.log(definitionArray)
        for (let i = 0; i < definitionArray; i++) {
          let definition = document.createElement("p")
          definition.textContent = definitionArray[i]
          wordDefinition.appendChild(definition)
        }
      }else {
        console.log("Sad dictionary")
      }
      if (requestUrl === giphyURL) {
        giphArray = data.data;
        console.log(giphArray)
        for (let i = 0; i < giphArray; i++) {
          let giph = document.createElement("iframe");
          giph.src = giphArray[i].url;
          giphDisplayEl.appendChild(giph)
        }
      }else {
        console.log("no gifs for you")
      }
    });
}

wordSearchButton.addEventListener("click", function (event) {
  event.preventDefault();
  searchedWord = wordInputEl.value
  console.log(searchedWord)
  getMeriamWebsterURL()
  getGiphyURL()
  getAPI(giphyURL)
  getAPI(meriamWebsterURL)
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
// const openHistoryModal = function () {
//   modal.classList.remove("hidden");
//   overlay.classList.remove("hidden");
// };
// searchHistoryBtn.addEventListener("click", openModal);

