define(['gmap', 'handlebars', 'text!../partials/multi/cvds.hbs', 'text!../partials/single/cvd.hbs', 'user', 'util'], function (gmap, hbs, hbs_cvds, hbs_cvd, user, Utilities) {
    "use strict";
    var reqData = {}, dataCVD = {};
    var ITEMS_PER_PAGE = 50;
    function renderCVD() {
        $("#indicadores").load('partials/menu/cvds_menu.html', function () {
            $("#legendas").hide();
            $("#btn_search_cvd").click(function () {
                Utilities.clearRegistos();
                reqData.marca = $("#btn-marca").val();
                reqData.subtipo = $("#btn-subtipo").val();
                addDataCVD(JSON.stringify(reqData));
            });
            $("#btn_clear_cvd").click(function () {
                gmap.hideFeatures('cvd');
                gmap.clearCuster('cvd');
                clearCVD();
            });
            $(".dropdown-menu.cvd a").click(function () {
                var btn = $(this).parents('.selector').find('button');
                btn.find('.btn-text').text($(this).text());
                btn.val($(this).text());
            });
        });
    }
    function addDataCVD(req) {
        getDataCVD(req);
    }
    function getDataCVD(req) {
        Utilities.addLoader();
        $.getJSON('data/getCVD.php', {data: req}, function (collection) {
            gmap.clearPoints('cvd');
            gmap.clearCuster('cvd');
            parseData(collection);
            if (JSON.parse(req).marca === 'GOTv/DSTv') {
                $("#legendas").show();
                gmap.pushDifferentPoints('cvd', collection, dataDetail, ['marca', 'DSTv']);
                gmap.createClusters('cvd', callback, 'GOTv');
            } else {
                $("#legendas").hide();
                gmap.pushPoints('cvd', collection, dataDetail);
                gmap.createCluster('cvd', callback);
            }
            Utilities.removeLoader();
            Utilities.setRegistos(collection.features.length, 'cvd-colorify');
        });
    }
    function parseData(col) {
        dataCVD = {};
        _.each(col.features, function (el, i, list) {
            dataCVD[el.properties.id] = el.properties;
            dataCVD[el.properties.id]['foto'] = el.properties.foto || "assets/defaults/avatar_cvd.png";
            var fullname = el.properties.fullname.split(" ");
            dataCVD[el.properties.id].firstName = fullname[0];
            dataCVD[el.properties.id].lastName = fullname.pop();
        });
    }
    function callback(markers) {
        var data = _.map(markers, function (item) {
            var cvd = dataCVD[item.id];
            return {
                id: item.id,
                foto: cvd.foto,
                nome: cvd.firstName,
                apelido: cvd.lastName,
                marca: cvd.marca,
                subtipo: cvd.subtipo,
                fotoalt: cvd.fotoalt
            };
        });
        renderDetails(data);
    }
    function renderDetails(cvds, page, type) {
        if (typeof page === 'undefined' || page === null) {
            page = 1;
        }
        if (typeof type === 'undefined' || type === 'l') {
            $("#cvds").remove();
            var pagesNu = Math.ceil(cvds.length / ITEMS_PER_PAGE) + 1;
            var pageData = getPageData(cvds, page);
            var data = {cvds: _.chunk(pageData, 4), pages: _.range(1, pagesNu)};
            var theTemplate = hbs.compile(hbs_cvds);
            $("#details .center-details").hide();
            $("#details").append(theTemplate(data));
            $("#graficos").hide();
            $("#cvds .pager a[value=" + page + "]").addClass('active');
            $("#cvds a").click(function () {
                dataDetail($(this).data("id"));
            });
            $("#cvds .pager a").click(function (e) {
                var btn = $(this).data('bt');
                if (typeof btn !== 'undefined') {
                    var el = $("#cvds .pager");
                    var maxPages = el.find('li:nth-last-child(2)').text();
                    var cPage = el.find("a.active").text();
                    if (btn === 's' && cPage !== maxPages) {
                        page = ++cPage;
                    } else if (btn === 'a' && cPage !== '1') {
                        page = --cPage;
                    } else {
                        page = cPage;
                    }
                } else {
                    page = +$(this).text();
                }
                renderDetails(cvds, page);
            });
        } else {
            $("#listagem-cvds").hide();
            $("#graficos").show();
            // ToDo
            //addGraficos(contas);
        }
        $("#cvds .nav li span").click(function (e) {
            $("#cvds .nav li.active").removeClass('active');
            $(this).parent().addClass('active');
            renderDetails(cvds, null, $(this).data('type'));
        });
        $("#sel_detail").click();
    }
    function getPageData(cvds, page) {
        var lastIndex = (page * ITEMS_PER_PAGE);
        var startIndex = --page * ITEMS_PER_PAGE;
        return cvds.slice(startIndex, lastIndex);
    }
    function dataDetail(cv) {
        $(window).scrollTop(0);
        var pCV = true;
        if (typeof cv === 'object') {
            cv = cv.id;
            pCV = false;
        }
        $("#cvds").hide();
        var data = dataCVD[cv];
        data.user = user;
        var theTemplate = hbs.compile(hbs_cvd);
        $("#details .center-details").hide();
        $("#details").append(theTemplate(data));
        $("#cvd button").click(function () {
            $("#cvd").remove();
            if (pCV) {
                $("#cvds").show();
            } else {
                $("#sel_map").click();
            }
        });
        $("#sel_detail a").click();
    }
    function clearCVD() {
        $("#legendas").hide();
        Utilities.clearRegistos();
        var btn = $('#btn-marca');
        btn.val('');
        btn.find('.btn-text').text('Escolha a Marca');
        btn = $('#btn-subtipo');
        btn.val('');
        btn.find('.btn-text').text('Escolha o Subtipo');
        $("#cvd").remove();
        $("#cvds").remove();
        window.setTimeout(function () {
            $("#sel_map").click();
            gmap.resetMap();
            $("#details .center-details").show();
        }, 250);
    }
    return {
        render: renderCVD,
        addData: addDataCVD
    };

});

