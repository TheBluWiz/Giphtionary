var searchedWord = "development"
var definition = ""

var meriamWebsterURL = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${searchedWord}?key=35209bec-5678-4beb-85bc-14642a260055`;
console.log(meriamWebsterURL)

function getAPI(requestUrl) {
  fetch(requestUrl)
    .then(function (response) {
      console.log(response.status);
      if (response.status !== 200) {
        console.log(response.status) = response.status;
      }
      return response.json();
    })
    .then(function (data) {
      if (requestUrl === meriamWebsterURL) {
      definition = data[0].shortdef
      console.log(definition)
      }
    });
}

getAPI (meriamWebsterURL)