define(['gmap'], function (gmap) {

    function addMarker() {
        var marker = new google.maps.Marker();
        marker.setPosition(new google.maps.LatLng(-22.8960817, 32.5404711));
        marker.setMap(gmap.map);
    }

    return {
        addMarker: addMarker
    };

});
