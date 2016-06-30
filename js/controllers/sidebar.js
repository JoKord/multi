define(['treeData', 'datafactory', 'dynatree'], function (treeData, DataFactory) {
    function initialize() {
        createDynaTree();
        $(document).ready(function () {
            $("ul.nav-sidebar li.visual").click(function (e) {
                $(this).parent().find('.active.visual').removeClass('active');
                $(this).addClass('active');
            });
            $("ul.nav-sidebar li.idc").click(function (e) {
                $(this).parent().find('.active.idc').removeClass('active');
                $(this).addClass('active');
                showIndicators($(this).data('ind'));
            });
        });
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
                        // Limpar Dados!
                        // Todo
                        DataFactory.clearData(unSel[i]);
                        console.log("Limpei " + unSel[i]);
                    }
                }
                for (var i = 0, length = myKeys.length; i < length; i++) {
                    if (!_.contains(resData.selected, myKeys[i])) {
                        resData.selected.push(myKeys[i]);
                        // Adicionar Dados
                        // Todo
                        DataFactory.addData('concurrencia', myKeys[i]);
                        console.log("Adicionei " + myKeys[i]);
                    }
                }
                resData.selected = _.uniq(resData.selected);
            },
            debugLevel: 0
        });
        $("#concorrencia").hide();
    }
    function showIndicators(ind) {
        $("#indicadores").empty();
        $("#concorrencia").hide();
        if (ind === 'concorrencia') {
            $("#concorrencia").show();
        }
    }
    return {
        initialize: initialize
    };
});
