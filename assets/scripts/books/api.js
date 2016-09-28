'use strict';

const app = require('../app.js');

let getBooks = function(){
  return $.ajax({
    url: app.host + "/books", // "http://book-json.herokuapp.com/books"
    method: 'GET',
    // dataType: 'json'
  });
};

module.exports = {
  getBooks,
};
