'use strict';

// user require with a reference to bundle the file and use it in this file
// let example = require('./example');

const app = require('./app.js');
const ui = require('./auth/ui.js');

let getBooks = function(){
  $.ajax({
    url: app.host + '/books',
    // method: 'GET',
    // dataType: 'json'
  }).done(ui.books)
  .fail(ui.failure);
};

// Modal portion

$('#open-sign-in').on('click', function () {
  $('#sign-in-modal').modal('show');
});

$(document).ready(function(){
  getBooks();
  $('#sign-out').hide();
  $('#change-password').hide();
});
