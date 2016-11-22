'use strict';

const showBooksTemplate = require('../templates/book-listing.handlebars');
const showTitlesTemplate = require('../templates/book-titles.handlebars');

const getBooksSuccess = (books) => {
  console.log("books is ", books);
  $('#content').html(showBooksTemplate(books));
};

const getTitlesSuccess = (books) => {
  console.log("books is ", books);
  $('#content').html(showTitlesTemplate(books));
};

const clearBooks = () => {
  $('#content').html('');
};

const failure = (error) => {
  console.error(error);
};

module.exports = {
  getBooksSuccess,
  getTitlesSuccess,
  clearBooks,
  failure,
};
