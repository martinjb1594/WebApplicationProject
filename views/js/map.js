// initialise the map and get the xml location

function initialise() {
    myLatlng = new google.maps.LatLng(54.559323,-3.321304);
    mapOptions = {
        zoom: 5,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
    }
    geocoder = new google.maps.Geocoder();
    infoWindow = new google.maps.InfoWindow();
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
     
    xmlUrl = "Locations.xml";
     
    loadMarkers();
     
}
    google.maps.event.addDomListener(window, 'load', initialise);
 // create markers based on the xml file
function loadMarkers() {
    map.markers = map.markers || []
    downloadUrl(xmlUrl, function(data) {
        var xml = data.responseXML;
      // find the xml and loop throuh it to find each element 
        markers = xml.documentElement.getElementsByTagName("location");
        for (var i = 0; i < markers.length; i++) {
            var name = markers[i].children[0].innerHTML;
            var address = markers[i].children[1].innerHTML;
            var point = new google.maps.LatLng(
                parseFloat(markers[i].children[2].innerHTML),
                parseFloat(markers[i].children[3].innerHTML));
            var html = "<div class='infowindow'><b>" + name + "</b> <br/>" + address+'<br/></div>';
            var marker = new google.maps.Marker({
              map: map,
              position: point,
              title: name
            });
            map.markers.push(marker);
           bindInfoWindow(marker, map, infoWindow, html);
        }
    });
}
// add the info window
    function bindInfoWindow(marker, map, infowindow, html) {
    marker.addListener('click', function() {
        infowindow.setContent(html);
        infowindow.open(map, this);
    });
} 
  
    function downloadUrl(url,callback) {
    var request = window.ActiveXObject ?
         new ActiveXObject('Microsoft.XMLHTTP') :
         new XMLHttpRequest();
     
    request.onreadystatechange = function() {
        if (request.readyState == 4) {
            //request.onreadystatechange = doNothing;
            callback(request, request.status);
        }
    };
     
    request.open('GET', url, true);
    request.send(null);
}

  