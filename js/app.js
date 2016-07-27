define(['gmap', 'sidebar', 'conc', 'handlebars', 'user', 'bootstrap', 'markerwithlabel'], function (gmap, side, conc, hbs, user) {
    "use strict";
    hbs.registerHelper('toUpperCase', function (str) {
        return str.toUpperCase();
    });
    hbs.registerHelper('toLowerCase', function (str) {
        return str.toLowerCase();
    });
    hbs.registerHelper('if', function (user, permission, options) {
        var roles = user.roles;
        var _self = this;
        var _options = options;
        if (!_.isEmpty(roles)) {
            var hasPerm = function () {
                var someFlag = false;
                _.each(roles, function (role) {
                    if (role.permissions.hasOwnProperty(permission)) {
                        someFlag = true;
                    }
                });
                return someFlag;
            };
        }
        if (hasPerm) {
            return _options.fn(_self);
        }
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