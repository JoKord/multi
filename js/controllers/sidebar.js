define(['dynatree'], function () {
    function initialize() {
        createDynaTree();
        $(document).ready(function () {
            $("ul.nav-sidebar li.visual").click(function (e) {
                $(this).parent().find('.active.visual').removeClass('active');
                $(this).addClass('active');
            });
            $("ul.nav-sidebar li.idc").click(function (e) {
                $(this).parent().find('.active.idc').removeClass('active');
                $(this).addClass('active');
                showIndicators($(this).data('ind'));
            });
        });
    }

    function createDynaTree() {
        var treeData = [
            {title: "Botswana", tooltip: "Botswana", expand: false, key: "bot",
                isFolder: true, select: true, addClass: "co-node",
                children: [
                    {title: "Limits", key: "botswana_limits", addClass: "l-node"},
                    {title: "Cities", key: "botswana_cities", addClass: "c-node"},
                    {title: "Villages", key: "botswana_villages", addClass: "t-node"}
                ]},
            {title: "Madagascar", tooltip: "Madagascar", expand: false, key: "mad",
                isFolder: true, select: true, addClass: "co-node",
                children: [
                    {title: "Limits", key: "madagascar_limits", addClass: "l-node"},
                    {title: "Cities", key: "madagascar_cities", addClass: "c-node"},
                    {title: "Towns", key: "madagascar_towns", addClass: "t-node"},
                    {title: "Airports", key: "madagascar_airports", addClass: "a-node"}
                ]}
        ];
        $("#concorrencia").dynatree({
            checkbox: true,
            selectMode: 3,
            children: treeData,
            onSelect: function (select, node) {
                var selKeys = $.map(node.tree.getSelectedNodes(), function (node) {
                    console.log(node.data.key);
                    return node.data.key;
                });
            },
            debugLevel: 0
        });
        $("#concorrencia").hide();
    }

    function showIndicators(ind) {
        $("#indicadores").empty();
        $("#concorrencia").hide();
        if (ind === 'concorrencia') {
            $("#concorrencia").show();
        }
    }
    return {
        initialize: initialize
    };
});
