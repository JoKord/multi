define([], function () {
    "use strict";
    var User = {
        id: null,
        username: null,
        roles: {},
        login: function (e, user) {
            e.preventDefault();
            var data = $(e.target).serialize();
            $.ajax({
                type: "POST",
                url: "lib/checkUser.php",
                data: data,
                dataType: 'json',
                success: function (response, textStatus, xhr) {
                    console.log(response);
                    user.id = response.user_id;
                    user.username = response.username;
                    user.roles = response.roles;
                    $("#login-form").hide();
                    user.setAlert("success", "Sessão iniciada com sucesso!");
                    $("#top").append("<ul id='logout' class='nav navbar-nav navbar-right'><li><a href='#'>Wellcome, " + user.username + "!</a></li><button id='btn-logout' type='button' class='btn btn-black navbar-btn'>Terminar Sessão</button>&nbsp;</ul>");
                    var self = user;
                    $("#logout button").click(function () {
                        self.logout();
                    });
                },
                error: function (xhr, textStatus, errorThrown) {
                    user.setAlert("danger", xhr.responseJSON.ErrorMsg);
                }
            });
        },
        logout: function () {
            this.id = null;
            this.username = null;
            this.roles = {};
            var _self = this;
            $.ajax({
                type: "POST",
                url: "lib/logout.php",
                dataType: 'json',
                success: function (response, textStatus, xhr) {
                    _self.setAlert("success", "Sessão terminada com sucesso!");
                },
                error: function (xhr, textStatus, errorThrown) {
                    _self.setAlert("danger", xhr.responseJSON.ErrorMsg);
                }
            });
            $("#logout").remove();
            $("#login-form").show();
        },
        setAlert: function (cssClass, text) {
            $("#my-alert").html("<div id='alert' class='alert alert-" + cssClass + " fade in' role='alert'><span>" + text + "</span></div>");
            setTimeout(function () {
                $("#alert").alert('close');
            }, 2000);
        },
        inititalize: function () {
            var _self = this;
            $("#login-form").on("submit", function (event) {
                _self.login(event, _self);
            });
        }
    };
    return User;
});