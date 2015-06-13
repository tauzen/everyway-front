function init_map(){
    var myOptions = {zoom:15, center:new google.maps.LatLng(52.221973,21.01772600000004), mapTypeId:google.maps.MapTypeId.ROADMAP, scrollwheel:false};

    var map = new google.maps.Map(document.getElementById("main-map"), myOptions);
    var marker = new google.maps.Marker({map: map,position: new google.maps.LatLng(52.221973, 21.01772600000004)});
    var infowindow = new google.maps.InfoWindow({content:"<b>Warsztat Warszawski</b><br/>Plac Konstytucji 4<br/>00-552 Warszawa" });
    google.maps.event.addListener(marker, "click", function(){infowindow.open(map,marker);});
    infowindow.open(map,marker);
  }

google.maps.event.addDomListener(window, 'load', init_map);