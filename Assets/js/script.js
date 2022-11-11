// Search Modal Selectors
const overlay = document.querySelectorAll(".overlay");
const openModalBtn = document.querySelectorAll(".btn-open");
const closeModalBtn = document.querySelectorAll(".btn-close");

// DOM Element Selectors
let wordInputEl = document.getElementById("search-modal");
let wordSearchButton = document.getElementById("searchBtn");
let wordDefinition = document.getElementById("wordDefinition");
let giphDisplayEl = document.getElementById("giphs");
let searchModalEl = document.getElementById("searchModal")
let recentSearchesEl = document.getElementById("recentSearches")
let historyModalEl = document.getElementById("historyModal");

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
        console.log()
        for (let i = 0; i < definitionArray.length; i++) {
          let definition = document.createElement("p");
          definition.textContent = definitionArray[i];
          wordDefinition.appendChild(definition);
        }
      }
      if (requestUrl === giphyURL) {
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

function deleteResults(x) {
  if (x.firstChild) {
    while (x.firstChild) {
      x.removeChild(x.firstChild);
    }
  }
}

wordSearchButton.addEventListener("click", function (event) {
  event.preventDefault();
  deleteResults(giphDisplayEl)
  deleteResults(wordDefinition)
  searchedWord = wordInputEl.value
  getMeriamWebsterURL()
  getGiphyURL()
  appendHistory(searchedWord)
  searchModalEl.classList.add("hidden");
});

recentSearchesEl.addEventListener("click", function (event) {
  event.preventDefault();
  if (event.target.dataset.test === "btn") {
   searchedWord = event.target.textContent
   deleteResults(giphDisplayEl)
   deleteResults(wordDefinition)
   getMeriamWebsterURL()
   getGiphyURL()
   appendHistory(searchedWord)
   historyModalEl.classList.add("hidden");
  }
    
});

// Opens Modal
openModalBtn.forEach(function (btn) {
  btn.onclick = function () {
    var modal = btn.getAttribute('data-modal');
    document.getElementById(modal).classList.remove("hidden");
    // overlay.classList.remove("hidden");
  };
});

// Close Modal
closeModalBtn.forEach(function (btn) {
  btn.onclick = function (event) {
    console.log(btn);
    
    event.target.parentNode.parentNode.classList.add("hidden");
    // overlay.classList.add("hidden");
  }
})

// Limits persistent storage to ten
function appendHistory() {
  let j = false;
  for (let i = 0; i < history.length; i++) {
    console.log("compared");
    if (searchedWord === history[i]) {
      j = true
    }
  }
  if (j === false) {
    console.log("adding result");
    if (history.length >= 10) {
      history.shift();
    }
    history.push(searchedWord);
  }
  localStorage.setItem("history", JSON.stringify(history));
  getSearches()
}

// Saves history
function getSearches() {
  if (JSON.parse(localStorage.getItem("history")) !== null) {
    history = JSON.parse(localStorage.getItem("history"));
  }
  renderSearchHistory();
};

function renderSearchHistory() {
  deleteResults(recentSearchesEl);
  wordInputEl.innerHTML = "";
  for (let i = 0; i < history.length; i++) {
    var searchHistoryButton = document.createElement("button");
    searchHistoryButton.classList.add("btn");
    searchHistoryButton.style.margin = ".25rem";
    searchHistoryButton.textContent = history[i]; 
    searchHistoryButton.dataset.test = "btn";
    recentSearchesEl.append(searchHistoryButton);
  }
}

getSearches()