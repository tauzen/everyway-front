'use strict';

/* globals $ */
/* exported UI */

(function(exports) {

  var CATEGORY_MAP = {
    'facility': 'Udogodnienie',
    'obstacle': 'Przeszkoda'
  };

  var KIND_MAP = {
    'elevator': 'Winda',
    'stairs': 'Schody',
    'low-curb': 'Przyjazny krawężnik',
    'high-curb': 'Wysoki krawężnik',
    'elevator-platform': 'Podnośnik',
    'cobbles': 'Nierówności',
    'foot-bridge':'Przejście nadziemne',
    'ramp':'Pochylnia',
    'slope':'Duża pochyłość'
  };

  var IMG_MAP = {
    'elevator': 'icon-fac-winda',
    'stairs': 'icon-obs-schody',
    'low-curb': 'icon-fac-kraw',
    'high-curb': 'icon-obs-kraweznik',
    'elevator-platform': 'icon-fac-pod',
    'cobbles': 'icon-obs-nierownosci',
    'foot-bridge':'icon-obs-prznad',
    'ramp':'icon-fac-poch',
    'slope':'icon-obs-pochylosc'
  };

  var stateTypeSelection = false;
  var activeMarker = null;
  var loggedInView = false;

  var mainSection = $('#main');
  var addBtn = $('#main-button-add');
  var backBtn = $('#main-button-back');

  var upvoteBtn = $('#btn-action-przeszkadzami');
  var failureBtn = $('#btn-action-awaria');
  var deleteBtn = $('#btn-action-del');

  upvoteBtn.click(function() {
    if(activeMarker && upvoteMarkerHandler) {
      upvoteMarkerHandler(activeMarker);
    }
  });

  failureBtn.click(function() {
    if(activeMarker && failureMarkerHandler) {
      failureMarkerHandler(activeMarker);
    }
  });

  deleteBtn.click(function() {
    if(activeMarker && deleteMarkerHandler) {
      deleteMarkerHandler(activeMarker);
      removeAction();
    }
  });

  var mainAddSection = $('#main-add');

  var removeAction = function() {
    mainSection.removeClass('action');
    mainSection.removeClass('action-add');
    mainSection.removeClass('action-details');
    activeMarker = null;
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
    activeMarker = marker;
  };

  var openAddView = function() {
    removeAction();

    if(loggedInView) {
      mainSection.addClass('action action-add');
    } else {
      fbLoginRequestHandler();
    }
  };

  addBtn.click(openAddView);

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
    removeAction();
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
    removeAction();
  });

  // handlers
  var addMarkerHandler = function(marker) {
    console.log('add marker', marker);
  };

  var setAddMarkerHandler = function(cb) {
    addMarkerHandler = cb;
  };

  var deleteMarkerHandler = function(marker) {
    console.log('delete marker', marker);
  };

  var setDeleteMarkerHandler = function(cb) {
    deleteMarkerHandler = cb;
  };

  var upvoteMarkerHandler = function(marker) {
    console.log('upvote marker', marker);
  };

  var setUpvoteMarkerHandler = function(cb) {
    upvoteMarkerHandler = cb;
  };

  var failureMarkerHandler = function(marker) {
    console.log('failure marker', marker);
  };

  var setFailureMarkerHandler = function(cb) {
    failureMarkerHandler = cb;
  };

  var enableDebug = function() {
    deleteBtn.removeClass('hide');
  };

  var fbLoginRequestHandler = function() {
    console.log('FB login requested');
  };

  var setFbLoginRequestHandler = function(cb) {
    fbLoginRequestHandler = cb;
  };

  var userLoggedIn = function() {
    loggedInView = true;
    openAddView();
  };

  var userLoggedOut = function() {
    loggedInView = false;
  };

  exports.UI = {
    showDetails: showDetails,
    setAddMarkerHandler: setAddMarkerHandler,
    setDeleteMarkerHandler: setDeleteMarkerHandler,
    setUpvoteMarkerHandler: setUpvoteMarkerHandler,
    setFailureMarkerHandler: setFailureMarkerHandler,
    setFbLoginRequestHandler: setFbLoginRequestHandler,
    userLoggedIn: userLoggedIn,
    userLoggedOut: userLoggedOut,
    enableDebug: enableDebug
  };

}((typeof exports === 'undefined') ? window : exports));
