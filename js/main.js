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
var $wordPage = document.querySelector('.wod-container');

function viewHomepage(event) {
  console.log('ok this works');
  $homePage.className = 'homepage-container display';
  $wordPage.className = 'wod-container hidden';

}

$homelink.addEventListener('click', viewHomepage)
;
