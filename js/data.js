/* exported data */
var data = {
  view: 'wordlist-view',
  entries: [],
  nextId: 1
};

var previousSavedJSON = localStorage.getItem('saved-local-storage');

if (previousSavedJSON !== null) {
  data = JSON.parse(previousSavedJSON);

}

window.addEventListener('beforeunload', function (event) {
  var todosJSON = JSON.stringify(data);
  localStorage.setItem('saved-local-storage', todosJSON);
});
