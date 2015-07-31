'use strict';

var CONFIG = require('./config.js').CONFIG;
var $ = require('jquery');

var SERVER_URL = CONFIG.API_URL;
var authToken = '';

var _creatSuccessCB = function(callback) {
  return function(data) {
    console.log('Data received: ' + JSON.stringify(data));
    if(callback) {
      callback(data);
    }
  };
};

var _createErrorCB = function(callback) {
  return function(jqXHR, textStatus, errorThrown) {
    console.error('Request failed ', textStatus, errorThrown);
    if(callback) {
      callback(errorThrown);
    }
  };
};

var getMarkers = function getMarkers(bounds, success, error) {
  $.ajax(SERVER_URL + '/marks.json')
  .done(_creatSuccessCB(success))
  .fail(_createErrorCB(error));
};

var addMarker = function addMarker(marker, success, error) {
  $.ajax(SERVER_URL + '/marks', {
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(marker),
    headers: { 'easy-authorization-token': authToken }
  })
  .done(_creatSuccessCB(success))
  .fail(_createErrorCB(error));
};

var updateMarker = function updateMarker(marker, success, error) {
  $.ajax(SERVER_URL + '/marks/' + marker.id, {
    method: 'PUT',
    contentType: 'application/json',
    data: JSON.stringify(marker),
    headers: { 'easy-authorization-token': authToken }
  })
  .done(_creatSuccessCB(success))
  .fail(_createErrorCB(error));
};

var deleteMarker = function deleteMarker(marker, success, error) {
  $.ajax(SERVER_URL + '/marks/' + marker.id, {
    method: 'DELETE',
    contentType: 'application/json',
    data: JSON.stringify(marker),
    headers: { 'easy-authorization-token': authToken }
  })
  .done(_creatSuccessCB(success))
  .fail(_createErrorCB(error));
};

var updateAuthToken = function updateAuthToken(token) {
  authToken = token;
};

exports.API = {
  getMarkers: getMarkers,
  addMarker: addMarker,
  updateMarker: updateMarker,
  deleteMarker: deleteMarker,
  updateAuthToken: updateAuthToken
};
