'use strict';

/* globals FB */

(function(exports) {

  var DEBUG = localStorage.getItem('debug') === 'enabled';
  var log = function log(msg) {
    if(DEBUG) {
      console.log(msg);
    }
  };

  window.fbAsyncInit = function() {
    FB.init({
      appId      : '976480642391571',
      xfbml      : true,
      version    : 'v2.3',
    });
  };

  (function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = '//connect.facebook.net/en_US/sdk.js';
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  var _responseStatusCheck = function(response, cb) {
    if (response.status === 'connected') {
      log('logged in to FB and connected');
      log(response.authResponse);
      if(cb) {
        cb({ 
          userID: response.authResponse.userID,
          authToken: response.authResponse.accessToken
        });
      }

      return;
    } 

    if(cb) {
      cb({});
    }
  };

  var checkLoginStatus = function(cb) {
    FB.getLoginStatus(function(response) {
      _responseStatusCheck(response, cb);
    });
  };

  var loginUser = function(cb) {
    FB.login(function(response) {
      _responseStatusCheck(response, cb);
    });
  };

  exports.FbUser = {
    checkLoginStatus: checkLoginStatus,
    loginUser: loginUser
  };

})((typeof exports === 'undefined') ? window : exports);
