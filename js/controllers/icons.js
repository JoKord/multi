define(function () {
    var icons = {
        'startimes_emissores': 'assets/icons/point.png',
        'mcel_emissores': 'assets/icons/point.png',
        'vodacom_emissores': 'assets/icons/point.png',
        'zap_loja': 'assets/icons/point.png',
        'zap_agente': 'assets/icons/point_alt.png',
        'instaladores': 'assets/icons/yellow_dot.png',
        'instaladores_Instalador': 'assets/icons/yellow_dot_alt.png',
        'cluster_instaladores': 'assets/icons/cluster_inst.png'
    };
    
    return {
        getIconURL: function (type) {
            return icons[type];
        }
    };
});