// DOM Element Selectors
const overlay = document.querySelector("#overlay");
const openModalBtn = document.querySelectorAll(".btn-open");
const closeModalBtn = document.querySelectorAll(".btn-close");
const wordInputEl = document.getElementById("search-modal");
const wordSearchButton = document.getElementById("searchBtn");
const wordDefinition = document.getElementById("wordDefinition");
const giphDisplayEl = document.getElementById("giphs");
const searchModalEl = document.getElementById("searchModal")
const recentSearchesEl = document.getElementById("recentSearches")
const historyModalEl = document.getElementById("historyModal");
const clearButtonEl = document.getElementById("clear")

// State Variables
var searchedWord = "";
var definitionArray = [];
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
  giphyURL = `https://api.giphy.com/v1/gifs/search?api_key=C46PLya5FW7iVdgTbVrt2tvX26ZgIo8w&q=${searchedWord}&limit=6&offset=0&rating=g&lang=en`
  getAPI(giphyURL)
  return giphyURL
}

// Calls APIs
function getAPI(requestUrl) {
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Processes data based off API origin
      if (requestUrl === meriamWebsterURL) {
        definitionArray = data[0].shortdef
        for (let i = 0; i < definitionArray.length; i++) {
          let definition = document.createElement("p");
          definition.textContent = definitionArray[i];
          wordDefinition.appendChild(definition);
        }
      }
      if (requestUrl === giphyURL) {
        giphArray = data.data;
        for (let i = 0; i < giphArray.length; i++) {
          let giph = document.createElement("iframe");
          giph.src = giphArray[i].embed_url;
          giphDisplayEl.appendChild(giph);
        }
      }
    });
}

// Clears children from DOM
function deleteResults(x) {
  if (x.firstChild) {
    while (x.firstChild) {
      x.removeChild(x.firstChild);
    }
  }
}

// Executes New Search
function search() {
  deleteResults(giphDisplayEl)
  deleteResults(wordDefinition)
  getMeriamWebsterURL()
  getGiphyURL()
  appendHistory(searchedWord)
}

// Performs search based on user input
wordSearchButton.addEventListener("click", function (event) {
  event.preventDefault();
  searchedWord = wordInputEl.value
  search();
  searchModalEl.classList.add("hidden");
  overlay.classList.remove("active");
});

// Performs search from historical value
recentSearchesEl.addEventListener("click", function (event) {
  event.preventDefault();
  if (event.target.dataset.test === "btn") {
    searchedWord = event.target.textContent
    search();
    historyModalEl.classList.add("hidden");
    overlay.classList.remove("active");
  }
});

// Clears search history
clearButtonEl.addEventListener("click", function (event) {
  event.preventDefault();
  history = [];
  localStorage.removeItem("history");
  getSearches();
  historyModalEl.classList.add("hidden");
  overlay.classList.remove("active");
})


// Opens Modal
openModalBtn.forEach(function (btn) {
  btn.onclick = function () {
    var modal = btn.getAttribute('data-modal');
    document.getElementById(modal).classList.remove("hidden");
    overlay.classList.add("active");
  };
});

// Close Modal
closeModalBtn.forEach(function (btn) {
  btn.onclick = function (event) {
    event.target.parentNode.parentNode.classList.add("hidden");
    overlay.classList.remove("active");
  }
})

// Limits persistent storage to ten
function appendHistory() {
  let isUnique = true;
  for (let i = 0; i < history.length; i++) {
    if (searchedWord === history[i]) {
      isUnique = false
    }
  }
  if (isUnique === true) {
    if (history.length >= 6) {
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

// adds buttons for previously search items
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

// Initializes page
getSearches()