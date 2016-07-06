<?php

require dirname(__FILE__) . '/../lib/Database.php';
$db = new Database();
$request = json_decode(filter_input(INPUT_GET, 'data'));
$points = $db->getInstaladores(parseRequest($request));
header('Content-type: application/json');
echo json_encode($points);

function parseRequest($req) {
    if ($req->marca == 'Tudo' || $req->marca == 'GOTv/DSTv' || $req->marca == '') {
        $req->marca = NULL;
    } else {
        if ($req->marca == 'GOTv') {
            $req->marca = "Gomagaiver";
        }else if ($req->marca == 'DSTv'){
            $req->marca = "Instalador";
        }
    }
    if ($req->categoria == '') {
        $req->categoria = NULL;
    }
    return $req;
}
