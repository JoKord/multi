define(['gmap', 'handlebars', 'text!../partials/cvis.hbs', 'text!../partials/cvi.hbs', 'util'], function (gmap, hbs, cvis, cvi, Utilities) {

    function renderCVI() {
        $("#indicadores").load('partials/cvis_menu.html', function () {
            
//            $("#btn_search_instaladores").click(function () {
//                Utilities.clearRegistos();
//                reqData.marca = $("#btn-marca").val();
//                reqData.categoria = $("#btn-categoria").val();
//                addDataInstaladores(JSON.stringify(reqData));
//            });
//            $("#btn_clear_instaladores").click(function () {
//                gmap.hideFeatures('instaladores');
//                gmap.clearCuster('instaladores');
//                clearInstaladores();
//            });
//            $(".dropdown-menu.inst a").click(function () {
//                var btn = $(this).parents('.selector').find('button');
//                btn.find('.btn-text').text($(this).text());
//                btn.val($(this).text());
//            });
        });
    }

    return {
        render: renderCVI
    };
});
