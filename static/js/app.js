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

var detailsClickHandler = function(event) {
  removeAction();
  mainSection.addClass('action action-details');
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

$('#main-add-type-select').click(function(event) {
  var sectionId = event.target.id;
  if(!sectionId.startsWith('btn-type')) {
    return;
  }

  var addClass = sectionId.replace('btn-type-','');
  mainAddSection.addClass(addClass);
  mainAddSection.removeClass('select-type');
  stateTypeSelection = true;
});

function init_map(){
    var myOptions = {zoom:15, center:new google.maps.LatLng(52.221973,21.01772600000004), mapTypeId:google.maps.MapTypeId.ROADMAP, scrollwheel:false};

    var map = new google.maps.Map(document.getElementById("main-map"), myOptions);
    var marker = new google.maps.Marker({map: map,position: new google.maps.LatLng(52.221973, 21.01772600000004)});
    google.maps.event.addListener(marker, "click", function(){
      detailsClickHandler();
    });
}

google.maps.event.addDomListener(window, 'load', init_map);