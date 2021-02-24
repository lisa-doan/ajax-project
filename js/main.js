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
