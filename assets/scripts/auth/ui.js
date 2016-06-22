'use strict';

const bookListingTemplate = require('../templates/book-listing.handlebars');
const books = (books) => {
  if (books) {
      $('.content').append(bookListingTemplate(books));
    }
};

const failure = (error) => {
  console.error(error);
};

// const success = (data) => {
//   if (data) {
//     console.log(data);
//   } else {
//     console.log('Success');
//   }
// };
//
// const failure = (error) => {
//   console.error(error);
// };
//
// const signInSuccess = (data) => {
//   app.user = data.user;
//   console.log(app.user);
// };
//
// const signOutSuccess = () => {
//   console.log('User signed out successfully');
//   app.user = null;
// };

module.exports = {
  books,
  failure
};
