'use strict';

var position = null;

var _getPosition = function(refresh) {
  if(!navigator.geolocation) {
    return Promise.reject('Geolocation not supported');
  }

  if(position !== null && !refresh) {
    return Promise.resolve(position);
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((pos) => {
      position = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      };
      resolve(position);
    }, (err) => {
      reject(err);
    });
  });
};

module.exports = {
  getPosition: _getPosition
};
