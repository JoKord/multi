define(['gmap', 'sidebar', 'conc', 'bootstrap'], function (gmap, side, conc) {
    return({
        initialize: function () {
            gmap.initialize();
            side.initialize();
            conc.initialize();
        }
    });
});