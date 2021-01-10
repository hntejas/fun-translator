var btnTranslate = document.querySelector("#button-translate");
var textInput = document.querySelector("#textarea-input");
var outputArea = document.querySelector("#area-output");
var translateSelection = document.querySelector("#translate-lang");
var translateLanguage = "";


btnTranslate.addEventListener("click", translateText);

function translateText() {
  if (textInput.value) {
    toggleTranslateButton();
    var requestUrl = getRequestUrl();
    fetch(requestUrl)
      .then(convertToJson)
      .then(displayTranslation)
      .catch(displayError);
  }else{
    alert('Please enter the text to translate');
  }
}

function toggleTranslateButton() {
  btnTranslate.disabled = !btnTranslate.disabled;
}

function getRequestUrl() {
  translateLanguage = translateSelection.value;
  var ENDPOINT_URL_TEMPLATE = `https://api.funtranslations.com/translate/${translateLanguage}.json`;
  return ENDPOINT_URL_TEMPLATE + "?text=" + encodeURI(textInput.value);
}

function convertToJson(serverReturnData) {
  return serverReturnData.json();
}

function displayTranslation(jsonData) {
  if(!jsonData.contents || jsonData.hasOwnProperty("error")){
    throw jsonData.error
  }
  var translatedText = jsonData.contents.translated;
  outputArea.innerHTML = translatedText;
  toggleTranslateButton();
}

function displayError(error) {
  toggleTranslateButton();
  console.error(error);
  alert(
    "Sorry! Unable to process your request currently. \nPlease try again later."
  );
}