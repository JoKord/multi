define(['gmap', 'sidebar', 'conc', 'handlebars', 'bootstrap'], function (gmap, side, conc, hbs) {
    "use strict";
    hbs.registerHelper('toUpperCase', function (str) {
        return str.toUpperCase();
    });
    hbs.registerHelper('toLowerCase', function (str) {
        return str.toLowerCase();
    });
    return({
        initialize: function () {
            gmap.initialize();
            side.initialize();
            conc.initialize();
        }
    });
});