'use strict';

/* global UI, API */

window.addEventListener('DOMContentLoaded', function() {
  if(localStorage.getItem('debug') === 'enabled') {
    UI.enableDebug();
  }
});
