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
            gmap.pushPoints('instaladores', collection);
            parseData(collection);
        });
    }
    function parseData(col) {
        _.each(col.features, function (el, i, list) {
            dataInstaladores[el.properties.id] = el.properties;
            dataInstaladores[el.properties.id]['foto'] = "assets/avatar.png";
        });
    }
    function renderDetails() {
        var data = {instaladores: _.chunk(_.toArray(dataInstaladores), 4)};
        var theTemplate = hbs.compile(hbs_instaladores);
        $("#details").append(theTemplate(data));
        $("#instaladores a").click(function () {
            dataDetail($(this).data("id"));
        });
    }
    function dataDetail(id) {
        $("#instaladores").hide();
        var data = dataInstaladores[id];
        var theTemplate = hbs.compile(hbs_instalador);
        $("#details").append(theTemplate(data));
        $("#instalador button").click(function () {
            $("#instalador").remove();
            $("#instaladores").show();
        });
    }

    return({
        addData: addDataInstaladores,
        render: renderInstaladores
    });
});
