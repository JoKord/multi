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
        }
    },
    paths: {
        underscore: "vendor/underscore/underscore",
        inst: "lib/instaladores/instaladores",
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