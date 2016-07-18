<?php

require dirname(__FILE__) . '/../lib/Database.php';
$db = new Database();
$request = json_decode(filter_input(INPUT_GET, 'data'));
$it = $request->it * 2000;
$points = $db->getAccounts($it, $request->status, $request->grp, $request->pro);
header('Content-type: application/json');
echo json_encode($points);