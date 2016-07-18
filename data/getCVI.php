<?php

require dirname(__FILE__) . '/../lib/Database.php';
$db = new Database();
$request = json_decode(filter_input(INPUT_GET, 'data'));
$points = $db->getCVI(parseRequest($request));
header('Content-type: application/json');
echo json_encode($points);

function parseRequest($req) {
    if ($req->marca == 'Tudo' || $req->marca == 'GOTv/DSTv' || $req->marca == '') {
        $req->marca = NULL;
    }
    if ($req->subtipo == '') {
        $req->subtipo = NULL;
    }
    return $req;
}
