define(['gmap', 'handlebars', 'text!../partials/instaladores.hbs', 'text!../partials/instalador.hbs'], function (gmap, hbs, hbs_instaladores, hbs_instalador) {

    var dataInstaladores = {};
    var reqData = {};
    function renderInstaladores() {
        $("#indicadores").load('/partials/instaladores_menu.html', function () {
            $("#btn_search_instaladores").click(function () {
                reqData.marca = $("#btn-marca").val();
                reqData.categoria = $("#btn-categoria").val();
                addDataInstaladores(JSON.stringify(reqData));
            });
            $("#btn_clear_instaladores").click(function () {
                gmap.hideFeatures('instaladores');
                gmap.clearCuster('instaladores');
                clearInstaladores();
            });
            $(".dropdown-menu.inst a").click(function () {
                var btn = $(this).parents('.selector').find('button');
                btn.find('.btn-text').text($(this).text());
                btn.val($(this).text());
            });
        });
    }
    function addDataInstaladores(req) {
        getDataInstaladores(req);
    }
    function getDataInstaladores(req) {
        $.getJSON('data/getInstaladores.php', {data: req}, function (collection) {
            gmap.clearPoints('instaladores');
            gmap.clearCuster('instaladores');
            parseData(collection);
            if (JSON.parse(req).marca === 'GOTv/DSTv') {
                gmap.pushDifferentPoints('instaladores', collection, dataDetail, ['tipo', 'Instalador']);
                gmap.createClusters('instaladores', 'Gomagaiver');
            } else {
                gmap.pushPoints('instaladores', collection, dataDetail);
                gmap.createCluster('instaladores');
            }
        });
    }
    function parseData(col) {
        dataInstaladores = {};
        _.each(col.features, function (el, i, list) {
            dataInstaladores[el.properties.id] = el.properties;
            dataInstaladores[el.properties.id]['foto'] = "assets/avatar.png";
        });
    }
    function renderDetails() {
        $("#instaladores").remove();
        var data = {instaladores: _.chunk(_.toArray(dataInstaladores), 4)};
        var theTemplate = hbs.compile(hbs_instaladores);
        $("#details").append(theTemplate(data));
        $("#instaladores a").click(function () {
            dataDetail($(this).data("id"));
        });
    }
    function dataDetail(inst) {
        if (typeof inst === 'object') {
            inst = inst.id;
        }
        $("#instaladores").hide();
        var data = dataInstaladores[inst];
        var theTemplate = hbs.compile(hbs_instalador);
        $("#details").append(theTemplate(data));
        $("#instalador button").click(function () {
            $("#instalador").remove();
            if ($("#instaladores").size() !== 0) {
                $("#instaladores").show();
            } else {
                $("#sel_map").click();
            }
        });
        $("#sel_detail a").click();
    }
    function clearInstaladores() {
        var btn = $('#btn-marca');
        btn.val('');
        btn.find('.btn-text').text('Escolha a Marca');
        btn = $('#btn-categoria');
        btn.val('');
        btn.find('.btn-text').text('Escolha a Categoria');
        $("#instaladores").remove();
        $("#instalador").remove();
        $("#sel_map").click();
    }
    return({
        addData: addDataInstaladores,
        render: renderInstaladores
    });
});
