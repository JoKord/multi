define(['gmap', 'inst'], function (gmap, inst) {
    var DataFactory = {     
        addDataInstaladores: function () {
            inst.addDataInstaladores();
        },
        clearData: function (t) {
            gmap.hideFeatures(t);
        }
    };  
    return DataFactory;
});