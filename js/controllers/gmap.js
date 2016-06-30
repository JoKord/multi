define(['underscore', 'icons', 'async!https://maps.google.com/maps/api/js?v=3'], function (_, icons) {
    var gmap = {
        map: {},
        data: {},
        initialize: function gmap(lat, lng, callback) {
            var mapOptions = {
                zoom: 5,
                center: new google.maps.LatLng(-18.482051, 32.810217),
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                disableDefaultUI: true,
                styles: [{
                        featureType: "poi",
                        stylers: [
                            {visibility: "off"}
                        ]
                    },
                    {
                        featureType: "transit.station",
                        stylers: [
                            {visibility: "off"}
                        ]
                    }, {
                        featureType: "all",
                        stylers: [
                            {
                                //saturation: -80
                                //hue: "#ff2233"
                            }
                        ]
                    }, {
                        featureType: "administrative.country",
                        elementType: "labels",
                        stylers: [
                            {visibility: "off"}
                        ]
                    },
                    {
                        featureType: "administrative.cities",
                        elementType: "labels",
                        stylers: [
                            {visibility: "off"}
                        ]
                    }
                ]};
            this.map = new google.maps.Map(document.getElementById('basemap'), mapOptions);
        },
        pushPoints: function (type, points) {
            this.data[type] = this.data[type] || {};
            this.data[type]['visible'] = true;
            this.data[type]['data'] = [];
            var icon = {
                url: icons.getIconURL(type),
                size: new google.maps.Size(16, 16),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(7.5, 7.5)
            };
            var features = points.features;
            for (var i = 0, fLength = features.length; i < fLength; i++) {
                var feature = features[i];
                var geo = feature.geometry;
                var properties = feature.properties;
                if (geo.type === 'Point' || geo.type === 'MultiPoint') {
                    if (geo.type === 'Point') {
                        var myMarker = new google.maps.Marker({
                            position: new google.maps.LatLng(geo.coordinates[1], geo.coordinates[0]),
                            id: properties.gid,
                            icon: icon
                        });
                        myMarker.setMap(this.map);
                        this.data[type]['data'].push(myMarker);
                    } else {
                        for (var j = 0, cLength = geo.coordinates.length; j < cLength; j++) {
                            var myMarker = new google.maps.Marker({
                                position: new google.maps.LatLng(geo.coordinates[j][1], geo.coordinates[j][0]),
                                id: properties.gid,
                                icon: icon
                            });
                            myMarker.setMap(this.map);
                            this.data[type]['data'].push(myMarker);
                        }
                    }
                }
            }
        },
        pushCircles: function (type, points) {
            this.data[type] = this.data[type] || {};
            this.data[type]['visible'] = true;
            this.data[type]['data'] = [];
            var features = points.features;
            for (var i = 0, fLength = features.length; i < fLength; i++) {
                var feature = features[i];
                var geo = feature.geometry;
                var properties = feature.properties;
                if (geo.type === 'Point' || geo.type === 'MultiPoint') {
                    if (geo.type === 'Point') {
                        var myCircle = new google.maps.Circle({
                            strokeColor: '#00abbd',
                            strokeOpacity: 0.1,
                            strokeWeight: 3,
                            fillColor: '#00abbd',
                            fillOpacity: 0.1,
                            center: new google.maps.LatLng(geo.coordinates[1], geo.coordinates[0]),
                            radius: 50000
                        });
                        myCircle.setMap(this.map);
                        this.data[type]['data'].push(myCircle);
                    } else {
                        for (var j = 0, cLength = geo.coordinates.length; j < cLength; j++) {
                            var myCircle = new google.maps.Circle({
                                strokeColor: '#00abbd',
                                strokeOpacity: 0.3,
                                strokeWeight: 3,
                                fillColor: '#00abbd',
                                fillOpacity: 0.3,
                                center: new google.maps.LatLng(geo.coordinates[j][1], geo.coordinates[j][0]),
                                radius: 500
                            });
                            myCircle.setMap(this.map);
                            this.data[type]['data'].push(myCircle);
                        }
                    }
                }
            }
        },
        pushPolygons: function (type, polygons) {
            this.data[type] = this.data[type] || {};
            this.data[type]['visible'] = true;
            this.data[type]['data'] = [];
            var features = polygons.features;
            for (var i = 0, fLength = features.length; i < fLength; i++) {
                var feature = features[i];
                var geo = feature.geometry;
                var properties = feature.properties;
                for (var j = 0; j < geo.coordinates.length; j++) {
                    var x = geo.coordinates[j][0];
                    var path = new Array();
                    for (var k = 0, length = x.length; k < length; k++) {
                        path.push(new google.maps.LatLng(x[k][1], x[k][0]));
                    }
                    var polygon = new google.maps.Polygon({
                        paths: path,
                        strokeColor: '#00abbd',
                        strokeOpacity: 0.7,
                        strokeWeight: 3,
                        fillColor: '#00abbd',
                        fillOpacity: 0.5
                    });
                    polygon.setMap(this.map);
                    this.data[type]['data'].push(polygon);
                }
            }
        },
        hideFeatures: function (el) {
            if (typeof this.data[el] !== 'undefined') {
                _.each(this.data[el].data, function (el, index, list) {
                    el.setMap(null);
                });
                this.data[el].visible = false;
            }
        },
        showFeatures: function (el) {
            if (typeof this.data[el] !== 'undefined') {
                var map = this.map;
                _.each(this.data[el].data, function (el, index, list) {
                    el.setMap(map);
                });
                this.data[el].visible = true;
            }
        },
        checkData: function (el) {
            return typeof this.data[el] !== 'undefined';
        }
    };
    return gmap;
});