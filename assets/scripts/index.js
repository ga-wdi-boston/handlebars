'use strict';

// user require with a reference to bundle the file and use it in this file
// let example = require('./example');

const authEvents = require('./auth/events.js');

let displayBooks = function(books){
  let bookListingTemplate = require('./templates/book-listing.handlebars');
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
};


let getBooks = function(){
  return $.ajax({
    url: "http://book-json.herokuapp.com/books",
    // method: 'GET',
    // dataType: 'json'
  }).done(function(books){
    displayBooks(books);
  });
};


// On document ready
$(() => {
  authEvents.addHandlers();
  getBooks();
});
