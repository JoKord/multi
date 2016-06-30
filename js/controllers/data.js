define(['gmap'], function (gmap) {

    var DataFactory = {
        data: {},
        addData: function (type, table) {
            if (gmap.checkData(table)) {
                gmap.showPoints(table);
            } else {
                switch (type) {
                    case 'concurrencia':
                        getDataConcurrencia(table);
                        break;
                }
            }
        },
        clearData: function (t) {
            gmap.hidePoints(t);
        }
    };

    function getDataConcurrencia(table) {
        $.getJSON('data/getConcorrencia.php', {data: table}, function (points) {
            gmap.pushPoints(table, points);
        });
    }
    return DataFactory;
});