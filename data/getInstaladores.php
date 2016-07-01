<?php

require dirname(__FILE__) . '/../lib/Database.php';
$db = new Database();
$points = $db->getInstaladores();
header('Content-type: application/json');
echo json_encode($points);
