var searchedWord = "development";
var definitionArray = "";
var giphArray = [];
let wordInputEl = document.getElementById("js-word-input");
let wordSearchButton = document.getElementById("js-search-word");
let wordDefinition = document.getElementById("word-definition");
let giphDisplayEl = document.getElementById("giphs");

function meriamWebsterURL() {
  let url = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${searchedWord}?key=35209bec-5678-4beb-85bc-14642a260055`;
  console.log(url)
  return url
}

function giphyURL() {
  let url = `https://api.giphy.com/v1/gifs/search?api_key=C46PLya5FW7iVdgTbVrt2tvX26ZgIo8w&q=${searchedWord}&limit=3&offset=0&rating=g&lang=en`
  return url
}

// link for search history 
function getWord(event) {
  event.preventDefault();
  searchedWord = wordInputEl.textContent
}
wordSearchButton.addEventListener("click", getWord);

function getAPI(requestUrl) {
  fetch(requestUrl)
    .then(function (response) {
      console.log(response.status);
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
        for (let i = 0; i < definitionArray; i++) {
          let definition = document.createElement("p")
          definition.textContent = definitionArray[i]
          wordDefinition.appendChild(definition)
        }
      }
      if (requestUrl === giphyURL) {
        giphArray = data.data;
        console.log(giphArray)
        for (let i = 0; i < giphArray; i++) {
          let giph = document.createElement("iframe");
          giph.src = giphArray[i].url;
          giphDisplayEl.appendChild(giph)
        }
      }
    });
}

wordSearchButton.addEventListener("click", function (event) {
  event.preventDefault();
  searchedWord = wordInputEl.value
  getAPI(meriamWebsterURL())
  getAPI(giphyURL())
});