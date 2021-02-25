var $homelink = document.querySelector('.home-link');
var $homePage = document.querySelector('.homepage-container');
var $wordPage = document.querySelector('.wotd-container');
var $defintionPage = document.querySelector('.definition-container');
var $wordlistPage = document.querySelector('.wordlist-container');
var $navBar = document.querySelector('.nav-bar-container');
var $wotdButton = document.querySelector('.wotd-button');
var $newWordButton = document.querySelector('.new-word');
var $learnItButton = document.querySelector('.learn-button');
var $exitButton = document.querySelector('.exit-button');
var $saveButton = document.querySelector('.save-button');
var $wordlistButton = document.querySelector('.wordlist-button');
var $wordOfTheDay = document.querySelector('.wotd');
var $word = document.querySelector('.wotd-defintion');
var $definition = document.querySelector('.definition');
var $example = document.querySelector('.example');
var $partOfSpeech = document.querySelector('.partOfSpeech');

getRandomWord();

function getRandomWord(event) {
  var xhrRandomWord = new XMLHttpRequest();
  xhrRandomWord.open('GET', 'https://random-word-api.herokuapp.com/word?number=1');
  xhrRandomWord.responseType = 'json';
  xhrRandomWord.addEventListener('load', function () {
    $wordOfTheDay.textContent = xhrRandomWord.response[0];
    $word.textContent = xhrRandomWord.response[0];
  });
  xhrRandomWord.send();
}

function getDefintion() {
  var randomWord = $wordOfTheDay.textContent;
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.dictionaryapi.dev/api/v2/entries/en_US/' + randomWord);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    var definition = xhr.response[0].meanings[0].definitions[0].definition;
    var example = xhr.response[0].meanings[0].definitions[0].example;
    var partOfSpeech = xhr.response[0].meanings[0].partOfSpeech;
    $definition.textContent = definition;
    $example.textContent = example;
    $partOfSpeech.textContent = partOfSpeech;
  });
  xhr.send();
}

function viewHomePage(event) {
  $homePage.className = 'homepage-container';
  $wordPage.className = 'wotd-container hidden';
  $navBar.className = 'nav-bar-container hidden';
  $defintionPage.className = 'definition-container hidden';
  $wordlistPage.className = 'wordlist-container hidden';
}

function viewWOTDPage(event) {
  $homePage.className = 'homepage-container hidden';
  $wordPage.className = 'wotd-container';
  $navBar.className = 'nav-bar-container';
  $defintionPage.className = 'definition-container hidden';
  $wordlistPage.className = 'wordlist-container hidden';
}

function viewDefinitionPage(event) {
  $homePage.className = 'homepage-container hidden';
  $wordPage.className = 'wotd-container hidden';
  $navBar.className = 'nav-bar-container';
  $defintionPage.className = 'definition-container';
  $wordlistPage.className = 'wordlist-container hidden';
  getDefintion();
}

function viewWordlistPage(event) {
  $homePage.className = 'homepage-container hidden';
  $wordPage.className = 'wotd-container hidden';
  $navBar.className = 'nav-bar-container';
  $defintionPage.className = 'definition-container hidden';
  $wordlistPage.className = 'wordlist-container';
}

$saveButton.addEventListener('click', function (event) {
  viewWordlistPage();
  console.log('checking....');
});

$homelink.addEventListener('click', viewHomePage);
$exitButton.addEventListener('click', viewHomePage);
$wotdButton.addEventListener('click', viewWOTDPage);
$newWordButton.addEventListener('click', getRandomWord);
$learnItButton.addEventListener('click', viewDefinitionPage);
$wordlistButton.addEventListener('click', viewWordlistPage);
