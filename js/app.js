define(['gmap', 'sidebar', 'conc', 'handlebars', 'user', 'bootstrap'], function (gmap, side, conc, hbs, user) {
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
            user.inititalize();
        }
    });
});