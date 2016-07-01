define(['gmap', 'sidebar', 'bootstrap'], function (gmap, side) {
    return({
        initialize: function () {
            gmap.initialize();
            side.initialize();
        }
    });
});