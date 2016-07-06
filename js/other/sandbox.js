
requirejs(['jquery', 'underscore'], function ($, _) {
    $(document).ready(function () {
        $("ul.nav-sidebar li.visual").click(function (e) {
            $(this).parent().find('.active.visual').removeClass('active');
            $(this).addClass('active');
        });
        $("ul.nav-sidebar li.idc").click(function (e) {
            $(this).parent().find('.active.idc').removeClass('active');
            $(this).addClass('active');
        });
        $.getJSON('/data/getTestingPoints.php', function (data, textStatus, jqXHR) {
            if (jqXHR.status === 200) {
                var vDiSales = [],
                        vInSales = [];
                //console.log(data);
                _.each(data.features, function (feature, index, list) {
                    //console.log(feature);
                    var geometry = feature.geometry;
                    var properties = feature.properties;
                    if (geometry.type === 'Point') {
                        var marker = new google.maps.Marker({
                            position: new google.maps.LatLng(geometry.coordinates[1], geometry.coordinates[0]),
                            value: properties.value
                        });
                        if (properties.id_type === "1") {
                            vDiSales.push(marker);
                        } else {
                            vInSales.push(marker);
                        }
                        //marker.setMap(map);
                    }
                });
                var mcOptions1 = {
                    gridSize: 5,
                    styles: [{
                            'url': "assets/icons/test.gif", // (string) The image url.
                            'height': 8, // (number) The image height.
                            'width': 8, // (number) The image width.
                            'anchorText': [-8, 8], // (Array) The anchor position of the label text.
                            'textColor': "#000", //(string) The text color.
                            'textSize': 12, //(number) The text size.
                            'backgroundPosition': "0 0", // (string) The position of the backgound x, y.
                            'anchorIcon': [3, 3] // (Array) The anchor position of the icon x, y.
                        }],
                    maxZoom: 15
                };
                cstDiSales = new MarkerClusterer(map, vDiSales, mcOptions1);
                cstDiSales.setCalculator(function () {
                    var markers = cstDiSales.getMarkers(),
                            total = 0;
                    _.each(markers, function (elem, index, list) {
                        total += +elem.value;
                    });
                    return {
                        index: 0,
                        text: total,
                        title: "lala"
                    };
                });
                var mcOptions2 = {
                    gridSize: 5,
                    styles: [{
                            'url': "assets/icons/test.gif", // (string) The image url.
                            'height': 8, // (number) The image height.
                            'width': 8, // (number) The image width.
                            'anchorText': [8, 8], // (Array) The anchor position of the label text.
                            'textColor': "#000", //(string) The text color.
                            'textSize': 12, //(number) The text size.
                            'backgroundPosition': '-8 0', // (string) The position of the backgound x, y.
                            'anchorIcon': [-3, -3] // (Array) The anchor position of the icon x, y.
                        }]
                };
                cstInSales = new MarkerClusterer(map, vInSales, mcOptions2);
                cstInSales.setCalculator(function () {
                    var markers = cstInSales.getMarkers(),
                            total = 0;
                    _.each(markers, function (elem, index, list) {
                        total += +elem.value;
                    });
                    return {
                        index: 0,
                        text: total,
                        title: "lala"
                    };
                });
            }
        });
    });
});



require(['jquery', 'inst'], function ($, inst) {
    console.log(inst.isLoaded());
});

