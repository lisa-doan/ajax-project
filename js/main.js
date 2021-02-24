function getWord(word) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.dictionaryapi.dev/api/v2/entries/en_US/' + word);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    console.log(xhr.status);
    console.log(xhr.response);
  });
  xhr.send();
}

function getWord(word) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.dictionaryapi.dev/api/v2/entries/en_US/' + word);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    console.log(xhr.status);
    console.log(xhr.response);
  });
  xhr.send();
}

var xhrRandomWord = new XMLHttpRequest();
xhrRandomWord.open('GET', 'https://random-word-api.herokuapp.com//word?number=1');
xhrRandomWord.responseType = 'json';
xhrRandomWord.addEventListener('load', function () {
  console.log('xhrRandomWord.status: ', xhrRandomWord.status);
  console.log('xhrRandomWord.response: ', xhrRandomWord.response);
});
xhrRandomWord.send();

var $homelink = document.querySelector('.home-link');
var $homePage = document.querySelector('.homepage-container');
var $wordPage = document.querySelector('.wotd-container');
var $navBar = document.querySelector('.nav-bar-container');
var $wotdbutton = document.querySelector('.wotd-button');

function viewHomePage(event) {
  $homePage.className = 'homepage-container';
  $wordPage.className = 'wotd-container hidden';
  $navBar.className = 'nav-bar-container hidden';
}

function viewWOTDPage(event) {
  $homePage.className = 'homepage-container hidden';
  $wordPage.className = 'wotd-container';
  $navBar.className = 'nav-bar-container';

}

$homelink.addEventListener('click', viewHomePage);
$wotdbutton.addEventListener('click', viewWOTDPage);
