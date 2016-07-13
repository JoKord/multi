var x = null;
define(['gmap', 'handlebars', 'text!../partials/contas.hbs', 'text!../partials/conta.hbs', 'data_produtos'], function (gmap, hbs, hbs_contas, hbs_conta, produtos) {
    var OFFSET = 2000;
    var ITEMS_PER_PAGE = 5;
    var dataContas = {};
    var reqData = {};
    function renderClientes() {
        $("#indicadores").load('partials/contas_menu.html', function () {
            $("#legendas").hide();
            $(".dropdown-menu.conta a").click(function () {
                var btn = $(this).parents('.selector').find('button');
                if (btn[0].id === 'btn-grp') {
                    renderProducts($(this).text());
                }
                btn.find('.btn-text').text($(this).text());
                btn.val($(this).text());
            });
            $("#btn_search_contas").click(function () {
                reqData.status = $("#btn-status").val();
                reqData.grp = mapGroupValue($("#btn-grp").val());
                reqData.pro = $("#btn-produto").val();
                getAccounts(reqData);
            });
            $("#btn_clear_contas").click(function () {
                gmap.hideFeatures('accounts');
                gmap.clearCuster('accounts');
                clearAccounts();
            });
        });
    }
    function renderProducts(grp) {
        $("#produtos-menu").empty();
        _.each(produtos[grp], function (item) {
            $("#produtos-menu").append("<li><a href='#'>" + item + "</a></li>");
        });
        $(".produtos-menu-title").removeClass('hidden');
        $(".dropdown-menu.conta a").click(function () {
            var btn = $(this).parents('.selector').find('button');
            btn.find('.btn-text').text($(this).text());
            btn.val($(this).text());
        });
    }
    function getPartialAccounts(reqData) {
        $.getJSON('data/getAccounts.php', {data: reqData}, function (col) {
            reqData = JSON.parse(reqData);
            parseData(col, reqData.it);
            gmap.pushPoints('accounts', col, dataDetail);
            var resData = col.features.length;
            if (resData === OFFSET) {
                reqData.it = reqData.it + 1;
                getPartialAccounts(JSON.stringify(reqData));
            } else {
                gmap.createCluster('accounts', callback);
            }
        });
    }
    function callback(markers) {
        var data = _.map(markers, function (item) {
            var conta = dataContas[item.id];
            return {
                id: item.id,
                nCli: conta.cust_n,
                nome: conta.nome,
                conta: conta.tipo_conta,
                tipo: conta.customer_type
            };
        });
        renderDetails(data);
    }
    function parseData(col, it) {
        if (it === 0) {
            dataContas = {};
        }
        _.each(col.features, function (el, i, list) {
            dataContas[el.properties.id] = el.properties;
        });
    }
    function mapGroupValue(grp) {
        switch (grp) {
            case 'Access':
                return 1;
            case 'Commercial':
                return 2;
            case 'Compact':
                return 3;
            default:
                return "";
        }
    }
    function renderDetails(contas, page) {
        if (typeof page === 'undefined') {
            page = 1;
        }
        $("#contas").remove();
        var pagesNu = Math.ceil(contas.length / ITEMS_PER_PAGE) + 1;
        var pageData = getPageData(contas, page);
        var data = {contas: _.chunk(pageData, 4), pages: _.range(1, pagesNu)};
        var theTemplate = hbs.compile(hbs_contas);
        $("#details").append(theTemplate(data));
        $("#contas .pager a[value=" + page + "]").addClass('active');
        $("#contas a").click(function () {
            dataDetail($(this).data("id"));
        });
        $("#contas .pager a").click(function (e) {
            var btn = $(this).data('bt');
            if (typeof btn !== 'undefined') {
                var el = $("#contas .pager");
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
            renderDetails(contas, page);
        });
        $("#sel_detail").click();
    }
    function getPageData(contas, page) {
        var lastIndex = (page * ITEMS_PER_PAGE);
        var startIndex = --page * ITEMS_PER_PAGE;
        return contas.slice(startIndex, lastIndex);
    }
    function dataDetail(contaID) {
        $(window).scrollTop();
        var pConta = true;
        if (typeof contaID === 'object') {
            contaID = contaID.id;
            pConta = false;
        }
        $("#contas").hide();
        $.getJSON('data/getConta.php', {data: contaID}, function (conta) {
            console.log(conta);
            var data = {
                acc_n: contaID,
                foto: "assets/avatar.png",
                cust_n: conta.customer_number,
                nome: conta.nome,
                tipo_conta: conta.tipo_conta,
                endereco: conta.endereco.slice(1, -1),
                cod_post: conta.cod_postal,
                bairro: conta.id_bairro,
                cidade: conta.id_cidade,
                localidade: conta.id_localidade,
                distrito: conta.id_distrito,
                provincia: conta.id_provincia
            };
            data.produtos = [];
            var nStatus = parseArray(conta.status);
            _.each(nStatus, function (item, i, list) {
                var products = {
                    grupo: conta.grupo,
                    d_model: parseArray(conta.d_model)[i],
                    d_number: parseArray(conta.d_number)[i],
                    s_model: parseArray(conta.s_model)[i],
                    s_number: parseArray(conta.s_number)[i],
                    p_code: parseArray(conta.p_code)[i],
                    psnr: parseArray(conta.psnr)[i],
                    pay: parseArray(conta.pay)[i],
                    status: parseArray(conta.status)[i],
                    st_dt: parseArray(conta.start_dt)[i],
                    dis_dt: parseArray(conta.last_dis_dt)[i],
                    inv_dt: parseArray(conta.last_inv_dt)[i],
                    rec_dt: parseArray(conta.last_rec_dt)[i]
                };
                data.produtos.push(products);
            });
            var theTemplate = hbs.compile(hbs_conta);
            $("#details").append(theTemplate(data));
            $("#conta button").click(function () {
                $("#conta").remove();
                if (pConta) {
                    $("#contas").show();
                } else {
                    $("#sel_map").click();
                }
            });
            $("#sel_detail a").click();
        });
    }
    function parseArray(st) {
        return st !== '{NULL}' ? st.slice(1, -1).split(',') : ["Não Definido."];
    }
    function getAccounts(reqData) {
        gmap.clearPoints('accounts');
        gmap.clearCuster('accounts');
        reqData.it = 0;
        getPartialAccounts(JSON.stringify(reqData));
    }
    function clearAccounts() {
        gmap.resetMap();
        $("#sel_map").click();
        var btn = $('#btn-status');
        btn.val('');
        btn.find('.btn-text').text('Escolha o Estado da Conta');
        btn = $('#btn-grp');
        btn.val('');
        btn.find('.btn-text').text('Escolha o Grupo Produtos');
        btn = $("#btn-produto");
        btn.val('');
        btn.find('.btn-text').text('Escolha o Produto');
        $("#produtos-menu").empty();
        $(".produtos-menu-title").addClass('hidden');
        $("#contas").remove();
        $("#conta").remove();
    }
    return {
        render: renderClientes,
        addData: getAccounts
    };
});