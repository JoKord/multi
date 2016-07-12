define(['gmap', 'handlebars', 'text!../partials/contas.hbs', 'text!../partials/conta.hbs'], function (gmap, hbs, hbs_contas, hbs_conta) {
    var OFFSET = 2000;
    var dataContas = {};

    function getPartialAccounts(it) {
        $.getJSON('data/getAccounts.php', {data: it}, function (col) {
            console.log(col);
            parseData(col, 0);
            gmap.pushPoints('accounts', col, null);
            gmap.createCluster('accounts', callback);
//            resData = col.features.length;
//            if (resData === OFFSET) {
//                it++;
//                getPartialAccounts(it);
//            } else {
//                gmap.createCluster('accounts', callback);
//            }
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
    function renderDetails(contas) {
        $("#contas").remove();
        var data = {contas: _.chunk(_.toArray(contas), 4)};
        var theTemplate = hbs.compile(hbs_contas);
        $("#details").append(theTemplate(data));
        $("#contas a").click(function () {
            dataDetail($(this).data("id"));
        });
        $("#sel_detail").click();
    }
    function dataDetail(contaID) {
        console.log("IN");
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
            var nPro = parseArray(conta.d_model);
            _.each(nPro, function (item, i, list) {
                var products = {
                    grupo: conta.grupo,
                    d_model: parseArray(conta.d_model)[i],
                    d_number: parseArray(conta.d_number)[i],
                    s_model: parseArray(conta.s_model)[i],
                    s_number: parseArray(conta.s_number)[i],
                    p_code: parseArray(conta.d_model)[i],
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
            console.log(data);
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
        return typeof st !== 'undefined' ? st.slice(1, -1).split(',') : null;
    }
    function getAccounts() {
        getPartialAccounts(0);
    }
    return {
        addData: getAccounts
    };
});