define(['gmap'], function (gmap) {
    var DataFactory = {
        addDataConcurrencia: function (table) {
            if (gmap.checkData(table)) {
                gmap.showFeatures(table);
            } else {
                getDataConcurrencia(table);
            }
        },
        addDataInstaladores: function () {
            if (gmap.checkData('instaladores')) {
                gmap.showFeatures('instaladores');
            } else {
                getDataInstaladores();
            }
        },
        clearData: function (t) {
            gmap.hideFeatures(t);
        }
    };

    function getDataConcurrencia(table) {
        $.getJSON('data/getConcorrencia.php', {data: table}, function (collection) {
            var featType = collection.features[0].geometry.type;
            if (featType === 'Point' || featType === 'MultiPoint') {
                if (!table.toString().endsWith("_cobertura")) {
                    gmap.pushPoints(table, collection);
                } else {
                    gmap.pushCircles(table, collection);
                }
            } else {
                gmap.pushPolygons(table, collection);
            }
        });
    }

    function getDataInstaladores() {
        $.getJSON('data/getInstaladores.php', function (collection) {
            gmap.pushPoints('instaladores', collection);
            
        });
    }

    return DataFactory;
});