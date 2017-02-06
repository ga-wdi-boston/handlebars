'use strict';

const api = require('./api.js');
const ui = require('./ui.js');

const onGetBooks = (event) => {
  event.preventDefault();
  api.getBooks()
    .then(ui.getBooksSuccess)
    .catch(ui.failure);
};

const onClearBooks = (event) => {
  event.preventDefault();
  ui.clearBooks();
};

const addHandlers = () => {
  $('#getBooksButton').on('click', onGetBooks);
  $('#clearBooksButton').on('click', onClearBooks);
};

module.exports = {
  addHandlers,
};
