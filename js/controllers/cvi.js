define(['gmap', 'handlebars', 'text!../partials/multi/cvis.hbs', 'text!../partials/single/cvi.hbs', 'user', 'util'], function (gmap, hbs, hbs_cvis, hbs_cvi, user, Utilities) {
    "use strict";
    var dataCVI = {};
    var reqData = {};
    function renderCVI() {
        $("#indicadores").load('partials/menu/cvis_menu.html', function () {
            $("#legendas").hide();
            $("#btn_search_indi").click(function () {
                Utilities.clearRegistos();
                reqData.marca = $("#btn-marca").val();
                reqData.subtipo = $("#btn-subtipo").val();
                addDataCVI(JSON.stringify(reqData));
            });
            $("#btn_clear_indi").click(function () {
                gmap.hideFeatures('cvi');
                gmap.clearCuster('cvi');
                clearCVI();
            });
            $(".dropdown-menu.indi a").click(function () {
                var btn = $(this).parents('.selector').find('button');
                btn.find('.btn-text').text($(this).text());
                btn.val($(this).text());
            });
        });
    }
    function addDataCVI(req) {
        getDataCVI(req);
    }
    function getDataCVI(req) {
        Utilities.addLoader();
        $.getJSON('data/getCVI.php', {data: req}, function (collection) {
            gmap.clearPoints('cvi');
            gmap.clearCuster('cvi');
            parseData(collection);
            if (JSON.parse(req).marca === 'GOTv/DSTv') {
                $("#legendas").show();
                gmap.pushDifferentPoints('cvi', collection, dataDetail, ['marca', 'DSTv']);
                gmap.createClusters('cvi', callback, 'GOTv');
            } else {
                $("#legendas").hide();
                gmap.pushPoints('cvi', collection, dataDetail);
                gmap.createCluster('cvi', callback);
            }
            Utilities.removeLoader();
            Utilities.setRegistos(collection.features.length, 'indi-colorify');
        });
    }
    function parseData(col) {
        dataCVI = {};
        _.each(col.features, function (el, i, list) {
            dataCVI[el.properties.id] = el.properties;
            dataCVI[el.properties.id]['foto'] = el.properties.foto || "assets/defaults/avatar_indi.png";
            var fullname = el.properties.fullname.split(" ");
            dataCVI[el.properties.id].firstName = fullname[0];
            dataCVI[el.properties.id].lastName = fullname.pop();
        });
    }
    function callback(markers) {
        var data = _.map(markers, function (item) {
            var cvi = dataCVI[item.id];
            return {
                id: item.id,
                foto: cvi.foto,
                nome: cvi.firstName,
                apelido: cvi.lastName,
                marca: cvi.marca,
                subtipo: cvi.subtipo,
                fotoalt: cvi.fotoalt
            };
        });
        renderDetails(data);
    }
    function renderDetails(dataCVI) {
        $("#cvis").remove();
        var data = {cvis: _.chunk(_.toArray(dataCVI), 4)};
        var theTemplate = hbs.compile(hbs_cvis);
        $("#details .center-details").hide();
        $("#details").append(theTemplate(data));
        $("#cvis a").click(function () {
            dataDetail($(this).data("id"));
        });
        $("#sel_detail").click();
    }
    function dataDetail(inst) {
        $(window).scrollTop(0);
        var pInst = true;
        if (typeof inst === 'object') {
            inst = inst.id;
            pInst = false;
        }
        $("#cvis").hide();
        var data = dataCVI[inst];
        data.user = user;
        var theTemplate = hbs.compile(hbs_cvi);
        $("#details .center-details").hide();
        $("#details").append(theTemplate(data));
        $("#cvi button").click(function () {
            $("#cvi").remove();
            if (pInst) {
                $("#cvis").show();
            } else {
                $("#sel_map").click();
            }
        });
        $("#sel_detail a").click();
    }
    function clearCVI() {
        $("#legendas").hide();
        Utilities.clearRegistos();
        var btn = $('#btn-marca');
        btn.val('');
        btn.find('.btn-text').text('Escolha a Marca');
        btn = $('#btn-subtipo');
        btn.val('');
        btn.find('.btn-text').text('Escolha o Subtipo');
        $("#cvi").remove();
        $("#cvis").remove();
        window.setTimeout(function () {
            $("#sel_map").click();
            gmap.resetMap();
            $("#details .center-details").show();
        }, 250);
    }
    return {
        render: renderCVI,
        addData: addDataCVI
    };
});
