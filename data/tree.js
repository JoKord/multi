define({
    data: [
        {title: "Startimes", tooltip: "Startimes", expand: false, key: "st",
            isFolder: true, select: true, addClass: "co-node",
            children: [
                {title: "Emissores", key: "startimes_emissores", addClass: "e-node"}
            ]},
        {title: "MCel", tooltip: "Mcel", expand: false, key: "mcel",
            isFolder: true, select: true, addClass: "co-node",
            children: [
                {title: "Emissores", key: "mcel_emissores", addClass: "e-node"},
                {title: "Cobertura", key: "mcel_emissores_cobertura", addClass: "c-node"}
            ]},
        {title: "Tv Cabo", tooltip: "Tv Cabo", expand: false, key: "tvcabo",
            isFolder: true, select: true, addClass: "co-node",
            children: [
                {title: "Cobertura", key: "tvcabo_cobertura", addClass: "c-node"}
            ]},
        {title: "Vodacom", tooltip: "Vodacom", expand: false, key: "vodacom",
            isFolder: true, select: true, addClass: "co-node",
            children: [
                {title: "Emissores", key: "vodacom_emissores", addClass: "e-node"},
                {title: "Cobertura", key: "vodacom_emissores_cobertura", addClass: "c-node"}
            ]},
        {title: "Zap", tooltip: "zap", expand: false, key: "zap",
            isFolder: true, select: true, addClass: "co-node",
            children: [
                {title: "Lojas", key: "zap_loja", addClass: "e-node"},
                {title: "Agentes", key: "zap_agente", addClass: "t-node"}
            ]}
    ]
});
