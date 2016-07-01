/* global _ */

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
        }
    },
    paths: {
        underscore: "vendor/underscore/underscore",
        bootstrap: "vendor/bootstrap/js/bootstrap",
        handlebars: "https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.5/handlebars.min",
//        inst: "controllers/instaladores",
        sidebar: "controllers/sidebar",
        datafactory: "controllers/data",
        gmap: "controllers/gmap",
        icons: "controllers/icons",
        dynatree: "vendor/dynatree/jquery.dynatree",
        treeData: "../data/tree",
        jqueryui: "vendor/jquery-ui/jquery-ui"
    }
});

requirejs(['app'], function (app) {
    app.initialize();
});