<?php

require dirname(__FILE__) . '/../lib/Database.php';
$db = new Database();
$points = $db->getTestingPoints();
header('Content-type: application/json');
echo json_encode($points);
