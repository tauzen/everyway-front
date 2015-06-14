'use strict';

/* globals $, google */
/* exported UI */

(function(exports) {

  var CATEGORY_MAP = {
    'facility': 'Udogodnienie',
    'obstacle': 'Przeszkoda'
  };

  var KIND_MAP = {
    'elevator': 'Winda',
    'stairs': 'Schody'
  };

  var IMG_MAP = {
    'elevator': 'icon-fac-winda',
    'stairs': 'icon-obs-schody'
  };

  var stateTypeSelection = false;

  var mainSection = $('#main');
  var addBtn = $('#main-button-add');
  var backBtn = $('#main-button-back');

  var mainAddSection = $('#main-add');

  var removeAction = function() {
    mainSection.removeClass('action');
    mainSection.removeClass('action-add');
    mainSection.removeClass('action-details');
  };

  var backToTypeSelection = function() {
    mainAddSection.removeClass('select-facility');
    mainAddSection.removeClass('select-obstacle');
    mainAddSection.removeClass('select-failure');
    mainAddSection.addClass('select-type');
  };

  var updateDetailsView = function(marker) {
    $('#main-details-type').text(CATEGORY_MAP[marker.category]);
    $('#main-details-category').text(KIND_MAP[marker.kind]);
    $('#main-details-upvotes-count').text(marker.votes);

    $('#main-details-img').removeClass();
    $('#main-details-img').addClass('icon icon-big ' + IMG_MAP[marker.kind]);

    if(marker.category === 'obstacle') {
      $('#main-details').removeClass('type-facility');
      $('#main-details').addClass('type-obstacle');
    } else {
      $('#main-details').removeClass('type-obstacle');
      $('#main-details').addClass('type-facility');
    }
  };

  var showDetails = function(marker) {
    removeAction();
    mainSection.addClass('action action-details');
    updateDetailsView(marker);
  };

  addBtn.click(function() {
    removeAction();
    mainSection.addClass('action action-add');
  }); 

  backBtn.click(function() {
    if(stateTypeSelection) {
      stateTypeSelection = false;
      backToTypeSelection();
    } else {
      removeAction();
    }
  });

  var getClickedElementType = function(prefix, event) {
    var sectionId = event.target.id;
    if(!sectionId.startsWith(prefix)) {
      return null;
    }

    var elType = sectionId.replace(prefix, '');
    return elType;
  };

  // type selection
  $('#main-add-type-select').click(function(event) {
    var elType = getClickedElementType('btn-type-', event);
    if(!elType) {
      return;
    }

    mainAddSection.addClass(elType);
    mainAddSection.removeClass('select-type');
    stateTypeSelection = true;
  });

  var addMarkerHandler = function(marker) {
    console.log(marker);
  };

  var setAddMarkerHandler = function(cb) {
    addMarkerHandler = cb;
  };

  // add obstacle
  $('#main-add-obstacle').click(function(event) {
    var elType = getClickedElementType('btn-obs-', event);
    if(!elType) {
      return;
    }

    var marker = {
      kind: $(event.target).data('markerKind'),
      category: 'obstacle'
    };
    
    addMarkerHandler(marker);
  });

  //add facility
  $('#main-add-facility').click(function(event) {
    var elType = getClickedElementType('btn-fac-', event);
    if(!elType) {
      return;
    }

    var marker = {
      kind: $(event.target).data('markerKind'),
      category: 'facility'
    };

    addMarkerHandler(marker);
  });

  exports.UI = {
    showDetails: showDetails,
    setAddMarkerHandler: setAddMarkerHandler 
  };

}((typeof exports === 'undefined') ? window : exports));

/*var currentMarker = { category: 'facility', kind: 'elevator', votes: 15 };

function init_map(){
    var myOptions = {zoom:15, center:new google.maps.LatLng(52.221973,21.01772600000004), mapTypeId:google.maps.MapTypeId.ROADMAP, scrollwheel:false};

    var map = new google.maps.Map(document.getElementById("main-map"), myOptions);
    var marker = new google.maps.Marker({map: map,position: new google.maps.LatLng(52.221973, 21.01772600000004)});
    google.maps.event.addListener(marker, "click", function(){
      UI.showDetails(currentMarker);
    });
}

google.maps.event.addDomListener(window, 'load', init_map);*/
