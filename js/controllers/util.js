define(function () {
    return{
        setRegistos: function (s, c) {
            var elTxt = $("#registos span b");
            elTxt.text(s);
            elTxt.removeClass();
            elTxt.addClass(c);
            elTxt.parents('#registos').show();
        },
        clearRegistos: function(){
            var elTxt = $("#registos span b");
            elTxt.text('');
            elTxt.removeClass();
            elTxt.parents('#registos').hide();
        }
    };
});