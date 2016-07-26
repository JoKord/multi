define(['cvd', 'clientes', 'inst', 'cvi', 'gmap'], function (cvd, clientes, inst, cvi, gmap) {
    function initialize() {
        $('.dropdown-toggle').dropdown();
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
    function showIndicators(ind) {
        $("#indicadores_title").text("").removeClass();
        $("#indicadores").empty();
        $("#concorrencia").hide();
        switch (ind) {
            case 'vendasdirectas':
                $("#indicadores_title").text("Vendas Directas");
                $("#indicadores_title").addClass('side-3');
                cvd.render();
                break;
            case 'clientes':
                $("#indicadores_title").text("Clientes");
                $("#indicadores_title").addClass('side-4');
                clientes.render();
                break;
            case 'instaladores':
                $("#indicadores_title").text("Instaladores");
                $("#indicadores_title").addClass('side-5');
                inst.render();
                break;
            case 'canaisvendaindirecta':
                $("#indicadores_title").text("Canais de Venda Indirecta");
                $("#indicadores_title").addClass('side-6');
                cvi.render();
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
            $("#container_toggle").removeClass().addClass('container');
            $("#map_area").hide();
            $("#details").show();
        } else if (el === 'map') {
            $("#container_toggle").removeClass().addClass('container-fluid');
            $("#details").hide();
            $("#map_area").show();
            window.setTimeout(function () {
                gmap.resetMap();
            }, 400);
        }
    }
    return {
        initialize: initialize
    };
});
