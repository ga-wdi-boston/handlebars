'use strict';

// const app = require('./api.js');
const bookListingTemplate = require('../templates/book-listing.handlebars');
const books = (books) => {
  if (books) {
    for (let i = 0; i < books.length; i++) {
      $('.content').append(bookListingTemplate({
        books:[
          {
          title: books[i].title,
          desc: books[i].desc
          }
        ]
      }));
    }
    console.log(books);
  } else {
    console.log('Error getting books.');
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
