define(['gmap', 'sidebar', 'conc', 'handlebars', 'user', 'bootstrap'], function (gmap, side, conc, hbs, user) {
    "use strict";
    hbs.registerHelper('toUpperCase', function (str) {
        return str.toUpperCase();
    });
    hbs.registerHelper('toLowerCase', function (str) {
        return str.toLowerCase();
    });

    function checkUser(e) {
        e.preventDefault();
        var data = $(e.target).serialize();
        $.ajax({
            type: "POST",
            url: "lib/checkUser.php",
            data: data,
            dataType: 'json',
            success: function (response, textStatus, xhr) {
                console.log(response);
            },
            error: function (xhr, textStatus, errorThrown) {
                console.error("error");
                console.error(xhr);
            }
        });
    }

    return({
        initialize: function () {
            gmap.initialize();
            side.initialize();
            conc.initialize();
            $("#login-form").on("submit", checkUser);
        }
    });
});