// function getWord(randomWord) {
//   var randomWord = $wordOfTheDay.textContent;
//   var xhr = new XMLHttpRequest();
//   xhr.open('GET', 'https://api.dictionaryapi.dev/api/v2/entries/en_US/' + randomWord);
//   xhr.responseType = 'json';
//   xhr.addEventListener('load', function () {
//     console.log(xhr.status);
//     console.log(xhr.response);
//   });
//   xhr.send();
// }

function getRandomWord(event) {
  var xhrRandomWord = new XMLHttpRequest();
  xhrRandomWord.open('GET', 'https://random-word-api.herokuapp.com//word?number=1');
  xhrRandomWord.responseType = 'json';
  xhrRandomWord.addEventListener('load', function () {
    var $wordOfTheDay = document.querySelector('.wotd');
    $wordOfTheDay.textContent = xhrRandomWord.response[0];
  });
  xhrRandomWord.send();
}

var $homelink = document.querySelector('.home-link');
var $homePage = document.querySelector('.homepage-container');
var $wordPage = document.querySelector('.wotd-container');
var $navBar = document.querySelector('.nav-bar-container');
var $wotdButton = document.querySelector('.wotd-button');
var $newWordButton = document.querySelector('.new-word');

function viewHomePage(event) {
  $homePage.className = 'homepage-container';
  $wordPage.className = 'wotd-container hidden';
  $navBar.className = 'nav-bar-container hidden';
}

function viewWOTDPage(event) {
  $homePage.className = 'homepage-container hidden';
  $wordPage.className = 'wotd-container';
  $navBar.className = 'nav-bar-container';
  getRandomWord();
}

$homelink.addEventListener('click', viewHomePage);
$wotdButton.addEventListener('click', viewWOTDPage);
$newWordButton.addEventListener('click', viewWOTDPage);
