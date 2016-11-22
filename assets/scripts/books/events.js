'use strict';

const api = require('./api.js');
const ui = require('./ui.js');

const onGetBooks = (event) => {
  event.preventDefault();
  api.getBooks()
    .then(ui.getBooksSuccess)
    .then(function(){
      $('.test-button').on('click', alertTest);
      $('.delete-book').on('click', deleteBook);
    })
    .catch(ui.failure);
};

const onGetTitles = (event) => {
  event.preventDefault();
  api.getBooks()
    .done(ui.getTitlesSuccess)
    .fail(ui.failure);
};

const onClearBooks = (event) => {
  event.preventDefault();
  ui.clearBooks();
};

const alertTest = function(){
  console.log("I hate alerts");
};

const deleteBook = function(){
  console.log("lets delete a book");
};

const addHandlers = () => {
  $('#getBooksButton').on('click', onGetBooks);
  $('#getTitlesButton').on('click', onGetTitles);
  $('#clearBooksButton').on('click', onClearBooks);
  $('.test-button').on('click', alertTest);
};

module.exports = {
  addHandlers,
};
