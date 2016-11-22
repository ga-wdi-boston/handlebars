'use strict';

const api = require('./api.js');
const ui = require('./ui.js');

const onGetBooks = (event) => {
  event.preventDefault();
  api.getBooks()
    .then(ui.getBooksSuccess)
    .then(function(){
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

const deleteBook = function(event){
  event.preventDefault();
  // what does this click handler get as an argument by default?
  // something called `event`. But what it is event!?! What is event.target?!
  console.log("event.target is", event.target);
  // is there anything useful in here ^  ^  ^  ????


  let bookId = event.target.getAttribute('data-id');
  console.log("We're about to delete book with id: ", bookId);
  // where does `data-id` come from? Do a cmd + shift + f and search for data-id


  // what do I need to do now that I have the id?!?
};

const addHandlers = () => {
  $('#getBooksButton').on('click', onGetBooks);
  $('#getTitlesButton').on('click', onGetTitles);
  $('#clearBooksButton').on('click', onClearBooks);
};

module.exports = {
  addHandlers,
};
