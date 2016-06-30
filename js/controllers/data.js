define(['gmap'], function (gmap) {
    function getDataConcurrencia(table) {
        $.getJSON('data/getConcorrencia.php', {data: table}, function (points) {
            gmap.pushPoints(table, points);
        });
    }
    return {
        getDataConcurrencia: getDataConcurrencia
    };
});