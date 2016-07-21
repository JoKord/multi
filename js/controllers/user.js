define([], function () {
    "use strict";
    var User = {
        id: null,
        name: null,
        isDev: false,
        setUser: function (id, name) {
            this.id = id;
            this.name = name;
        },
        setDeveloper: function () {
            this.isDev = true;
        }
    };
    return User;
});
