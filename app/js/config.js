'use strict';

(function(exports) {
  var DEVELOPMENT = true;

  if(DEVELOPMENT) {
    localStorage.setItem('debug', 'enabled');
  } else {
    localStorage.removeItem('debug');
  }

  var developmentUrl = 'http://localhost:3000';
  var productionUrl = 'https://everyway.herokuapp.com'; 

  exports.CONFIG  = {
    API_URL: (DEVELOPMENT) ? developmentUrl : productionUrl
  };

})((typeof exports === 'undefined') ? window : exports);
