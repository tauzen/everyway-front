var main = $('#main');
var addBtn = $('#main-button-add');
var backBtn = $('#main-button-back');

var removeAction = function() {
  main.removeClass('action');
  main.removeClass('action-add');
  main.removeClass('action-details');
};

var detailsClickHandler = function(event) {
  removeAction();
  main.toggleClass('action action-details');
};

addBtn.click(function() {
  removeAction();
  main.toggleClass('action action-add');
}); 

backBtn.click(function() {
  removeAction();
});

$('#main-add-type-select').click(function(event) {
  console.log(event);
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