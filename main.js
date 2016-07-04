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
        dynatree: "vendor/dynatree/jquery.dynatree",
        treeData: "../data/tree",
        jqueryui: "vendor/jquery-ui/jquery-ui",
        gmap: "controllers/gmap",
        sidebar: "controllers/sidebar",
        datafactory: "controllers/data",
        inst: "controllers/instaladores",
        conc: "controllers/concorrencia",
        icons: "controllers/icons"
    }
});

requirejs(['app'], function (app) {
    app.initialize();
});