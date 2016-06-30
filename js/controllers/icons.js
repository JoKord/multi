define(function () {
    var icons = {
        'startimes_emissores': 'assets/icons/point.png',
        'mcel_emissores': 'assets/icons/point.png',
        'vodacom_emissores': 'assets/icons/point.png',
        'zap_lojas': 'assets/icons/point.png',
        'zap_agentes': 'assets/icons/point_alt.png'
    };
    
    return {
        getIconURL: function (type) {
            return icons[type];
        }
    };
});