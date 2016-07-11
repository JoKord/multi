define(['gmap'], function (gmap) {
    var OFFSET = 2000;
    function getAccounts() {
        getPartialAccounts(0);
    }

    function getPartialAccounts(it) {
        $.getJSON('data/getAccounts.php', {data: it}, function (col) {
            console.log(col);
            gmap.pushPoints('accounts', col, null);
            resData = col.features.length;
            if (resData === OFFSET) {
                it++;
                getPartialAccounts(it);
            }else{
                gmap.createCluster('accounts');
            }
        });
    }

    return {
        addData: getAccounts
    };
});