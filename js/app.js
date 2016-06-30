define(['gmap', 'sidebar'], function (gmap, side) {
    return({
        initialize: function () {
            gmap.initialize();
            side.initialize();
        }
    });
});