var searchedWord = "development";
var definitionArray = "";
var giphArray = [];

var meriamWebsterURL = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${searchedWord}?key=35209bec-5678-4beb-85bc-14642a260055`;
console.log(meriamWebsterURL)

var giphyURL = `https://api.giphy.com/v1/gifs/search?api_key=C46PLya5FW7iVdgTbVrt2tvX26ZgIo8w&q=${searchedWord}&limit=3&offset=0&rating=g&lang=en`

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
      }
      if (requestUrl === giphyURL) {
        giphArray = data.data;
        console.log(giphArray)
      }
    });
}

getAPI (meriamWebsterURL)
getAPI(giphyURL)