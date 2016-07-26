requirejs.config({
    baseUrl: "js",
    shim: {
        underscore: {
            deps: ['jquery'],
            exports: '_'
        },
        dynatree: {
            deps: ['jqueryui']
        },
        jqueryui: {
            deps: ['jquery']
        },
        bootstrap: {
            deps: ['jquery'],
            exports: '$'
        },
        clusterer: {
            exports: 'MarkerClusterer'
        }
    },
    paths: {
        underscore: "vendor/underscore/underscore",
        bootstrap: "vendor/bootstrap/js/bootstrap",
        handlebars: "https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.5/handlebars.min",
        dynatree: "vendor/dynatree/jquery.dynatree",
        treeData: "../data/tree",
        jqueryui: "vendor/jquery-ui/jquery-ui",
        gmap: "controllers/gmap",
        charts: "controllers/charts",
        clusterer: "vendor/markercluster/markerclusterer",
        sidebar: "controllers/sidebar",
        data_produtos: "../data/produtos",
        cvd: "controllers/cvd",
        clientes: "controllers/clientes",
        inst: "controllers/instaladores",
        cvi: "controllers/cvi",
        conc: "controllers/concorrencia",
        icons: "controllers/icons",
        util: "controllers/util",
        user: "controllers/user"
    }
});

requirejs(['app'], function (app) {
    "use strict";
    app.initialize();
});