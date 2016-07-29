define(['gmap', 'handlebars', 'text!../partials/multi/cvds.hbs', 'text!../partials/single/cvd.hbs', 'text!../partials/other/bairro.hbs', 'charts', 'user', 'util'], function (gmap, hbs, hbs_cvds, hbs_cvd, hbs_bairro, charts, user, Utilities) {
    "use strict";
    var reqData = {}, dataCVD = {};
    var ITEMS_PER_PAGE = 50;
    var LIMIT = 100;
    var clusters = {};
    var options = {
        width: 500,
        height: 300,
        legend: {position: "none"},
        annotations: {
            textStyle: {
                fontName: 'Arial',
                fontSize: 14,
                bold: true,
                color: '#871b47',
                opacity: 0.8
            }
        }
    };
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
            Utilities.hideRadio();
            parseData(collection);
            if (JSON.parse(req).marca === 'GOTv/DSTv') {
                $("#legendas").show();
                gmap.pushDifferentMarkersWithLabel('cvd', collection, dataDetail, ['marca', 'DSTv']);
                gmap.createClusters('cvd', callback, 'GOTv');
                gmap.setLabel('cvd');
            } else {
                $("#legendas").hide();
                gmap.pushMarkersWithLabel('cvd', collection, dataDetail);
                gmap.createCluster('cvd', callback);
                gmap.setLabel('cvd');
            }
            Utilities.removeLoader();
            Utilities.setRegistos(collection.features.length, 'cvd-colorify');
            Utilities.showRadio(radioCall);
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
                fotoalt: cvd.fotoalt,
                bairro: cvd.bairro,
                bairro_nome: cvd.bairro_nome,
                cidade: cvd.cidade
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
            var bairros = function () {
                var uniq = {};
                _.each(cvds, function (cvd) {
                    if (!uniq.hasOwnProperty(cvd.id)) {
                        uniq[cvd.bairro] = {id: cvd.bairro, nome: cvd.bairro_nome};
                    }
                });
                return uniq;
            };
            addGraficos(bairros());
        }
        $("#cvds .nav li span").click(function (e) {
            $("#cvds .nav li.active").removeClass('active');
            $(this).parent().addClass('active');
            renderDetails(cvds, null, $(this).data('type'));
        });
        $("#sel_detail").click();
    }
    function addGraficos(bairros) {
        console.log(bairros);
        var theTemplate = hbs.compile(hbs_bairro);
        $("#bairro_sel").append(theTemplate({bairros: bairros}));
        $("#bairro_sel .dropdown-menu a").click(function () {
            var btn = $(this).parents('.selector').find('button');
            btn.find('.btn-text').text($(this).text());
            btn.val($(this).text());
            $.getJSON('data/getCVDProductsData.php', {data: $(this).data('id')}, function (col) {
                options.width = 500;
                var dstvData = col.dstv;
                var gotvData = col.gotv;
                var totalGotv = {qqt: 0, prc: 0};
                if (gotvData.length !== 0) {
                    options.title = 'Produtos GOTV (Número de Vendas)';
                    charts.addColumnChart('n-prod-gotv', getChartData(gotvData, 'qqt_gotv', "Quantidade de Vendas"), options);
                    options.title = 'Produtos GOTV (Valor de Vendas)';
                    charts.addColumnChart('v-prod-gotv', getChartData(gotvData, 'prc_gotv', "Valor de Vendas"), options);
                    var totalGotv = function (obj) {
                        _.each(gotvData, function (item) {
                            obj.qqt += +item.qqt_gotv;
                            obj.prc += +item.prc_gotv;
                        });
                        obj.prc = Math.ceil(obj.prc);
                        return obj;
                    }(totalGotv);
                }
                var totalDstv = {qqt: 0, prc: 0};
                if (dstvData.length !== 0) {
                    options.title = 'Produtos DSTV (Número de Vendas)';
                    charts.addColumnChart('n-prod-dstv', getChartData(dstvData, 'qqt_dstv', "Quantidade de Vendas"), options);
                    options.title = 'Produtos DSTV (Valor de Vendas)';
                    charts.addColumnChart('v-prod-dstv', getChartData(dstvData, 'prc_dstv', "Valor de Vendas"), options);
                    var totalDstv = function (obj) {
                        _.each(dstvData, function (item) {
                            obj.qqt += +item.qqt_dstv;
                            obj.prc += +item.prc_dstv;
                        });
                        obj.prc = Math.ceil(obj.prc);
                        return obj;
                    }(totalDstv);
                }
                options.title = 'TOTAL (Número de Vendas)';
                charts.addColumnChart('t-n-prod', getChartData([{"cod_prod": 'DSTv', "qqt": totalDstv.qqt}, {"cod_prod": 'GOTv', "qqt": totalGotv.qqt}], "qqt", "Quantidade de Vendas"), options);
                options.title = 'TOTAL (Valor de Vendas)';
                charts.addColumnChart('t-v-prod', getChartData([{"cod_prod": 'DSTv', "prc": totalDstv.prc}, {"cod_prod": 'GOTv', "prc": totalGotv.prc}], "prc", "Valor de Vendas"), options);
            });
        });
    }
    function getChartData(cts, prop, text, colors) {
        var colors = colors || ["#ed1b24", "#f03f47", "#f3646a", "#f6888d", "#f8acb0", "#fbd1d3", "#fde3e4", "#fef5f6"];
        var parsedData = {}, res = [], i = 0;
        _.each(cts, function (item) {
            parsedData[item.cod_prod] = Math.ceil(+item[prop]);
        });
        res.push([prop.toString().toUpperCase(), text, {role: 'annotation'}, {role: 'style'}]);
        _.each(parsedData, function (value, key) {
            res.push([key, value, value, colors[i]]);
            i++;
        });
        return res;
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
        var total = +dataCVD[cv].prc - dataCVD[cv].obj;
        var color = total >= 0 ? "green" : "red";
        var prvData = [{"cod_prod": 'Objectivo', "val": dataCVD[cv].obj}, {"cod_prod": 'Vendas Realizadas', "val": dataCVD[cv].prc}, {"cod_prod": 'Balanço', "val": total}];
        options.width = 600;
        charts.addColumnChart('previsao-graph', getChartData(prvData, "val", "Valor", ["#ed1b24", "#f8acb0", color]), options);
        $.getJSON('data/getCVDProductsByID.php', {data: cv}, function (col) {
            var dstvData = col.dstv;
            var gotvData = col.gotv;
            if (dstvData.lenght !== 0) {
                options.title = 'Produtos DSTV (Número de Vendas)';
                charts.addColumnChart('n-vendas', getChartData(dstvData, 'qqt_dstv', "Quantidade de Vendas"), options);
                options.title = 'Produtos DSTV (Valor de Vendas)';
                charts.addColumnChart('v-vendas', getChartData(dstvData, 'prc_dstv', "Valor de Vendas"), options);
            }
            if (gotvData.length !== 0) {
                options.title = 'Produtos GOTV (Número de Vendas)';
                charts.addColumnChart('n-vendas', getChartData(gotvData, 'qqt_gotv', "Quantidade de Vendas"), options);
                options.title = 'Produtos GOTV (Valor de Vendas)';
                charts.addColumnChart('v-vendas', getChartData(gotvData, 'prc_gotv', "Valor de Vendas"), options);
            }
        });
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
    function radioCall(e) {
        e.preventDefault();
        gmap.setLabel('cvd', $(this).val());
    }
    function clearCVD() {
        $("#legendas").hide();
        Utilities.clearRegistos();
        Utilities.hideRadio();
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

