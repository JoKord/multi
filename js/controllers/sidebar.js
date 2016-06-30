define(['treeData', 'datafactory', 'dynatree'], function (treeData, DataFactory) {
    function initialize() {
        createDynaTree();
        $(document).ready(function () {
            $("ul.nav-sidebar li.visual").click(function (e) {
                $(this).parent().find('.active.visual').removeClass('active');
                $(this).addClass('active');
                showVisualization($(this).data('vis'));
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
                        DataFactory.clearData(unSel[i]);
                    }
                }
                for (var i = 0, length = myKeys.length; i < length; i++) {
                    if (!_.contains(resData.selected, myKeys[i])) {
                        resData.selected.push(myKeys[i]);
                        DataFactory.addDataConcurrencia(myKeys[i]);
                    }
                }
                resData.selected = _.uniq(resData.selected);
            },
            debugLevel: 0
        });
        $("#concorrencia").hide();
    }
    function showIndicators(ind) {
        $("#indicadores_title").text("").removeClass();
        $("#indicadores").empty();
        $("#concorrencia").hide();
        switch (ind) {
            case 'vendasdirectas':
                $("#indicadores_title").text("Vendas Directas");
                $("#indicadores_title").addClass('side-3');
                break;
            case 'clientes':
                $("#indicadores_title").text("Clientes");
                $("#indicadores_title").addClass('side-4');
                break;
            case 'instaladores':
                $("#indicadores_title").text("Instaladores");
                $("#indicadores_title").addClass('side-5');
                break;
            case 'canaisvendaindirecta':
                $("#indicadores_title").text("Canais de Venda Indirecta");
                $("#indicadores_title").addClass('side-6');
                break;
            case 'concorrencia':
                $("#indicadores_title").text("Concorrência");
                $("#indicadores_title").addClass('side-7');
                $("#concorrencia").show();
                break;
            default:
                break;
        }
    }
    function showVisualization(el) {
        if (el === 'detail') {
            $("#basemap").hide();
        } else if (el === 'map') {
            $("#detail").hide();
            $("#basemap").show();
        }
    }
    return {
        initialize: initialize
    };
});
