<?php

require dirname(__FILE__) . '/../lib/Database.php';
$db = new Database();
$request = filter_input(INPUT_GET, "data");
$points = $db->getCVDGraphs($request);
header('Content-type: application/json');
echo json_encode($points);