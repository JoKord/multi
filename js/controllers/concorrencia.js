define(['gmap', 'treeData', 'dynatree'], function (gmap, treeData) {
    function initialize() {
        createDynaTree();
    }
    function createDynaTree() {
        var resData = resData || {selected: []};
        $("#concorrencia").dynatree({
            checkbox: true,
            selectMode: 3,
            children: treeData.data,
            onSelect: function (select, node) {
                var selKeys = $.map(node.tree.getSelectedNodes(), function (node) {
                    return node.data.key;
                });
                var myKeys = _.without(selKeys, 'st', 'mcel', 'tvm', 'tvcabo', 'vodacom', 'zap');
                var unSel = _.difference(resData.selected, myKeys);
                if (unSel.length !== 0) {
                    for (var i = 0, length = unSel.length; i < length; i++) {
                        resData.selected = _.without(resData.selected, unSel[i]);
                        gmap.hideFeatures(unSel[i]);
                    }
                }
                for (var i = 0, length = myKeys.length; i < length; i++) {
                    if (!_.contains(resData.selected, myKeys[i])) {
                        resData.selected.push(myKeys[i]);
                        addDataConcurrencia(myKeys[i]);
                    }
                }
                resData.selected = _.uniq(resData.selected);
            },
            debugLevel: 0
        });
        $("#concorrencia").hide();
    }
    function addDataConcurrencia(table) {
        if (gmap.checkData(table)) {
            gmap.showFeatures(table);
        } else {
            getDataConcurrencia(table);
        }
    }
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
    return {
        initialize: initialize,
        addDataConcurrencia: addDataConcurrencia
    };
});