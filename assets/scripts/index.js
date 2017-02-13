'use strict';

const setAPIOrigin = require('../../lib/set-api-origin');
const config = require('./config');

const authEvents = require('./auth/events.js');
const bookEvents = require('./books/events.js');

// On document ready
$(() => {
  authEvents.addHandlers();
  bookEvents.addHandlers();
  setAPIOrigin(location, config);

  // $("#content").on("click", 'button', function(e){
  //   e.preventDefault();
  //   $(e.target).parent().parent().remove();
  // });
});

// use require with a reference to bundle the file and use it in this file
// const example = require('./example');

// use require without a reference to ensure a file is bundled
require('./example');
