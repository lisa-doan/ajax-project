var $homelink = document.querySelector('.home-link');
var $homePage = document.querySelector('.homepage-container');
var $wordPage = document.querySelector('.wotd-container');
var $defintionPage = document.querySelector('.definition-container');
var $wordlistPage = document.querySelector('.wordlist-container');
var $navBar = document.querySelector('.nav-bar-container');
var $wotdButton = document.querySelector('.wotd-button');
var $newWordButton = document.querySelector('.new-word');
var $learnItButton = document.querySelector('.learn-button');
var $saveButton = document.querySelector('.save-button');
var $deleteButton = document.querySelector('.delete-button');
var $yesButton = document.querySelector('.yes-button');
var $exitButton = document.querySelectorAll('.exit-button');
var $wordlistButton = document.querySelectorAll('.wordlist-button');
var $wordOfTheDay = document.querySelector('.wotd');
var $word = document.querySelector('.word-defintion');
var $definition = document.querySelector('.definition');
var $example = document.querySelector('.example');
var $partOfSpeech = document.querySelector('.partOfSpeech');
var $ul = document.querySelector('ul');
var $modal = document.querySelector('.modal-container');
var $form = document.querySelector('form');
var $modalMessage = document.querySelector('.modal-message');
var wordOfTheDay;

getRandomWord();

function getRandomWord() {
  var xhrRandomWord = new XMLHttpRequest();
  xhrRandomWord.open('GET', 'https://random-word-api.herokuapp.com/word?number=1');
  xhrRandomWord.responseType = 'json';
  xhrRandomWord.addEventListener('load', function () {
    wordOfTheDay = xhrRandomWord.response[0];
    $wordOfTheDay.textContent = xhrRandomWord.response[0];
  });
  xhrRandomWord.send();
}

function getDefintion(word) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.dictionaryapi.dev/api/v2/entries/en_US/' + word);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    if (xhr.response.title === 'No Definitions Found') {
      $modal.className = 'modal-container display';
      $yesButton.className = 'pink-button yes-button hidden';
      $modalMessage.textContent = 'Sorry, no definitions found. Please try again!';
    } else {
      var definition = xhr.response[0].meanings[0].definitions[0].definition;
      var example = xhr.response[0].meanings[0].definitions[0].example;
      var partOfSpeech = xhr.response[0].meanings[0].partOfSpeech;
      $definition.textContent = definition;
      $example.textContent = example;
      $partOfSpeech.textContent = partOfSpeech;
      $word.textContent = word;
    }
  });
  xhr.send();
}

function viewHomePage() {
  $homePage.className = 'homepage-container';
  $wordPage.className = 'wotd-container hidden';
  $navBar.className = 'nav-bar-container hidden';
  $defintionPage.className = 'definition-container hidden';
  $wordlistPage.className = 'wordlist-container hidden';
  $modal.className = 'modal-container hidden';
}

function viewWOTDPage() {
  $homePage.className = 'homepage-container hidden';
  $wordPage.className = 'wotd-container';
  $navBar.className = 'nav-bar-container';
  $defintionPage.className = 'definition-container hidden';
  $wordlistPage.className = 'wordlist-container hidden';
  $wordOfTheDay.textContent = wordOfTheDay;
}

function viewDefinitionPage(word) {
  $homePage.className = 'homepage-container hidden';
  $wordPage.className = 'wotd-container hidden';
  $navBar.className = 'nav-bar-container';
  $defintionPage.className = 'definition-container';
  $wordlistPage.className = 'wordlist-container hidden';
  $saveButton.className = 'pink-button save-button';
  $deleteButton.className = 'pink-button delete-button hidden';
  getDefintion(word);
}

function viewWordlistPage() {
  $homePage.className = 'homepage-container hidden';
  $wordPage.className = 'wotd-container hidden';
  $navBar.className = 'nav-bar-container';
  $defintionPage.className = 'definition-container hidden';
  $wordlistPage.className = 'wordlist-container';
}

function createList(currentWord) {
  for (var i = 0; i < data.words.length; i++) {
    if (data.words[i].word === currentWord) {
      var $li = document.createElement('li');
      $li.setAttribute('id', data.words[i].idNum);
      $li.textContent = currentWord;
    }
  }
  return $li;
}

function confirmDelete() {
  $modal.className = 'modal-container display';
  $yesButton.className = 'pink-button yes-button';
  $modalMessage.textContent = 'Are you sure you want to delete?';
}

function deleteWord() {
  $modal.className = 'modal-container display hidden';
  viewWordlistPage();
  var targetWord = $word.textContent;
  var currentListWord = $ul.querySelectorAll('li');
  for (var i = 0; i < currentListWord.length; i++) {
    if (currentListWord[i].textContent === targetWord) {
      currentListWord[i].remove();
    }
  }
  for (var j = 0; j < data.words.length; j++) {
    if (data.words[j].word === targetWord) {
      data.words.splice(j, 1);
    }
  }
}

function addWordtoList() {
  var targetWord = $word.textContent;
  var currentListWord = $ul.querySelectorAll('li');
  for (var i = 0; i < currentListWord.length; i++) {
    if (currentListWord[i].textContent === targetWord) {
      $modal.className = 'modal-container display';
      $yesButton.className = 'pink-button yes-button hidden';
      $modalMessage.textContent = 'You already saved this word!';
      return;
    }
  }
  viewWordlistPage();
  var currentWord = $word.textContent;
  var input = {};
  input.word = currentWord;
  input.idNum = data.nextIdNum;
  data.nextIdNum++;
  data.words.unshift(input);
  var newItem = createList(currentWord);
  $ul.prepend(newItem);
}
var $id = document.getElementById('n/a');

function viewSelectedWordDefinition() {
  var selectedWord = event.target.textContent;
  $word.textContent = selectedWord;
  viewDefinitionPage(selectedWord);
  $saveButton.className = 'pink-button save-button hidden';
  $deleteButton.className = 'pink-button delete-button';
  for (var i = 0; i < data.words.length; i++) {
    if (selectedWord === data.words[i].word) {
      $id.id = data.words[i].idNum;
    }
  }

}

$form.addEventListener('submit', function (event) {
  event.preventDefault();
  var searchedWord = event.target.search.value;
  viewDefinitionPage(searchedWord);
  $form.reset();
});

window.addEventListener('DOMContentLoaded', function (event) {
  for (var i = 0; i < data.words.length; i++) {
    var addWord = createList(data.words[i].word);
    $ul.append(addWord);
  }
});

$wordlistButton.forEach(function (item) {
  item.addEventListener('click', viewWordlistPage);
});

$exitButton.forEach(function (item) {
  item.addEventListener('click', viewHomePage);
});

$learnItButton.addEventListener('click', function (word) {
  viewDefinitionPage(wordOfTheDay);
});

$homelink.addEventListener('click', viewHomePage);
$wotdButton.addEventListener('click', viewWOTDPage);
$newWordButton.addEventListener('click', getRandomWord);
$deleteButton.addEventListener('click', confirmDelete);
$yesButton.addEventListener('click', deleteWord);
$saveButton.addEventListener('click', addWordtoList);
$ul.addEventListener('click', viewSelectedWordDefinition);
