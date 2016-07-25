define(['underscore', 'icons', 'clusterer', 'async!https://maps.google.com/maps/api/js?v=3'], function (_, icons) {
    "use strict";
    var gmap = {
        map: {},
        data: {},
        clusters: {},
        initialize: function gmap(lat, lng, callback) {
            var mapOptions = {
                zoom: 5,
                center: new google.maps.LatLng(-18.217540, 33.127108),
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
        pushPoints: function (type, points, callback) {
            this.data[type] = this.data[type] || {};
            this.data[type]['visible'] = true;
            this.data[type]['data'] = this.data[type]['data'] || [];
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
                            id: properties.id,
                            icon: icon
                        });
                        myMarker.setMap(this.map);
                        this.data[type]['data'].push(myMarker);
                    } else {
                        for (var j = 0, cLength = geo.coordinates.length; j < cLength; j++) {
                            var myMarker = new google.maps.Marker({
                                position: new google.maps.LatLng(geo.coordinates[j][1], geo.coordinates[j][0]),
                                id: properties.id,
                                icon: icon
                            });
                            myMarker.setMap(this.map);
                            this.data[type]['data'].push(myMarker);
                        }
                    }
                    google.maps.event.addListener(myMarker, 'click', function () {
                        callback(this);
                    });
                }
            }
        },
        pushDifferentPoints: function (type, points, callback, extras) {
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
                if (properties[extras[0]] === extras[1]) {
                    icon.url = icons.getIconURL(type + "_" + extras[1]);
                } else {
                    icon.url = icons.getIconURL(type);
                }
                if (geo.type === 'Point' || geo.type === 'MultiPoint') {
                    if (geo.type === 'Point') {
                        var myMarker = new google.maps.Marker({
                            position: new google.maps.LatLng(geo.coordinates[1], geo.coordinates[0]),
                            id: properties.id,
                            sep: properties[extras[0]],
                            icon: icon
                        });
                        myMarker.setMap(this.map);
                        this.data[type]['data'].push(myMarker);
                    } else {
                        for (var j = 0, cLength = geo.coordinates.length; j < cLength; j++) {
                            var myMarker = new google.maps.Marker({
                                position: new google.maps.LatLng(geo.coordinates[j][1], geo.coordinates[j][0]),
                                id: properties.id,
                                sep: properties[extras[0]],
                                icon: icon
                            });
                            myMarker.setMap(this.map);
                            this.data[type]['data'].push(myMarker);
                        }
                    }
                    google.maps.event.addListener(myMarker, 'click', function () {
                        callback(this);
                    });
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
                            strokeColor: '#bd7100',
                            strokeOpacity: 0.1,
                            strokeWeight: 3,
                            fillColor: '#bd7100',
                            fillOpacity: 0.1,
                            center: new google.maps.LatLng(geo.coordinates[1], geo.coordinates[0]),
                            radius: 50000
                        });
                        myCircle.setMap(this.map);
                        this.data[type]['data'].push(myCircle);
                    } else {
                        for (var j = 0, cLength = geo.coordinates.length; j < cLength; j++) {
                            var myCircle = new google.maps.Circle({
                                strokeColor: '#bd7100',
                                strokeOpacity: 0.3,
                                strokeWeight: 3,
                                fillColor: '#bd7100',
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
                        strokeColor: '#bd7100',
                        strokeOpacity: 0.7,
                        strokeWeight: 3,
                        fillColor: '#bd7100',
                        fillOpacity: 0.5
                    });
                    polygon.setMap(this.map);
                    this.data[type]['data'].push(polygon);
                }
            }
        },
        clearPoints: function (el) {
            this.hideFeatures(el);
            if (typeof this.data[el] !== 'undefined') {
                this.data[el].data = [];
                this.data[el].visible = false;
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
        },
        createCluster: function (el, callback) {
            var mcOptions = {
                gridSize: 10,
                styles: [{
                        'url': icons.getIconURL('cluster_' + el), // (string) The image url.
                        'height': 9, // (number) The image height.
                        'width': 9, // (number) The image width.
                        'anchorText': [-8, 8], // (Array) The anchor position of the label text.
                        'textColor': "#000", //(string) The text color.
                        'textSize': 12, //(number) The text size.
                        'backgroundPosition': "0 0", // (string) The position of the backgound x, y.
                        'anchorIcon': [4.5, 4.5] // (Array) The anchor position of the icon x, y.
                    }],
                callback: callback,
                maxZoom: 21
            };
            var myCluster = new MarkerClusterer(this.map, this.data[el].data, mcOptions);
            this.clusters[el] = [];
            this.clusters[el].push(myCluster);
        },
        createClusters: function (el, callback, separator) {
            this.clusters[el] = [];
            var firstData = [], secondData = [];
            _.each(this.data[el].data, function (item, index, list) {
                if (item.sep === separator) {
                    firstData.push(item);
                } else {
                    secondData.push(item);
                }
            });
            var firstOp = {
                gridSize: 5,
                styles: [{
                        'url': icons.getIconURL('cluster_' + el), // (string) The image url.
                        'height': 9, // (number) The image height.
                        'width': 9, // (number) The image width.
                        'anchorText': [-9, -9], // (Array) The anchor position of the label text.
                        'textColor': "#000", //(string) The text color.
                        'textSize': 12, //(number) The text size.
                        'backgroundPosition': "0 0", // (string) The position of the backgound x, y.
                        'anchorIcon': [9, 9] // (Array) The anchor position of the icon x, y.                      
                    }],
                maxZoom: 21,
                callback: callback
            };
            var first = new MarkerClusterer(this.map, firstData, firstOp);
            this.clusters[el].push(first);
            var secondOp = {
                gridSize: 5,
                styles: [{
                        'url': icons.getIconURL('cluster_' + el), // (string) The image url.
                        'height': 9, // (number) The image height.
                        'width': 9, // (number) The image width.
                        'anchorText': [9, 9], // (Array) The anchor position of the label text.
                        'textColor': "#000", //(string) The text color.
                        'textSize': 12, //(number) The text size.
                        'backgroundPosition': '-9 0', // (string) The position of the backgound x, y.
                        'anchorIcon': [0, 0] // (Array) The anchor position of the icon x, y.
                    }],
                maxZoom: 21,
                callback: callback
            };
            var second = new MarkerClusterer(this.map, secondData, secondOp);
            this.clusters[el].push(second);
        },
        clearCuster: function (el) {
            _.each(this.clusters[el], function (ele, i, list) {
                if (ele instanceof MarkerClusterer) {
                    ele.clearMarkers();
                    list[i] = [];
                }
            });
        },
        resetMap: function () {
            google.maps.event.trigger(this.map, "resize");
            this.map.setZoom(5);
            this.map.setCenter(new google.maps.LatLng(-18.217540, 33.127108));
            var mapcenter = this.map.getCenter();
            this.map.setCenter(new google.maps.LatLng((mapcenter.lat() + 0.0000001), mapcenter.lng()));
            google.maps.event.trigger(this.map, "resize");
        }
    };
    return gmap;
});