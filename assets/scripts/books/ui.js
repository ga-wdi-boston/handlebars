'use strict';

const showBooksTemplate = require('../templates/book-listing.handlebars');

const getBooksSuccess = (books) => {
  $('#content').append(showBooksTemplate(books));

  console.log(books);
};

const clearBooks = () => {
  $('#content').html("");
};

const failure = (error) => {
  console.error(error);
};

module.exports = {
  getBooksSuccess,
  clearBooks,
  failure,
};
