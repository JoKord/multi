<?php

class Database {

    private $connString = "host=gistree-db dbname=multichoice user=websig password=e13cca4d70177737791b534655cd4c4c sslmode=require";

    public function __construct() {
        global $dbconn;
        $dbconn = pg_connect($this->connString);
    }

    public function getConcorrencia($table) {
        $q = "SELECT id, ST_AsGeoJSON(ST_Transform((geom),4326)) AS geojson FROM concorrencia.$table";
        $rs = pg_query($q);
        if (!$rs) {
            echo 'An SQL error occured.\n';
            exit;
        }
        $geojson = array(
            'type' => 'FeatureCollection',
            'features' => array()
        );
        while ($row = pg_fetch_assoc($rs)) {
            $properties = $row;
            unset($properties['geojson']);
            unset($properties['geom']);
            $feature = array(
                'type' => 'Feature',
                'geometry' => json_decode($row['geojson'], true),
                'properties' =>
                $properties
            );
            array_push($geojson['features'], $feature);
        }
        return $geojson;
    }

    public function getInstaladores($req) {
        $q = "SELECT id, cod_cracha, tipo, nome, endereco, contacto, categoria, email, observacoes, regiao, ST_AsGeoJSON(ST_Transform((geom),4326)) AS geojson FROM instaladores.instaladores";
        $extraparams = array();
        if ($req->marca != NULL) {
            array_push($extraparams, " tipo = '$req->marca'");
        }
        if ($req->categoria != NULL) {
            array_push($extraparams, " categoria = '$req->categoria'");
        }
        if (!empty($extraparams)) {
            $extra = " WHERE ";
            for ($i = 0; $i < sizeof($extraparams) - 1; $i++) {
                $extra = $extra . "( " . $extraparams[$i] . " ) AND ";
            }
            $extra = $extra . "( " . $extraparams[$i] . " ) ";
        } else {
            $extra = "";
        }
        $rs = pg_query($q . $extra);
        if (!$rs) {
            echo 'An SQL error occured.\n';
            exit;
        }
        $geojson = array(
            'type' => 'FeatureCollection',
            'features' => array()
        );
        while ($row = pg_fetch_assoc($rs)) {
            $properties = $row;
            unset($properties['geojson']);
            unset($properties['geom']);
            $feature = array(
                'type' => 'Feature',
                'geometry' => json_decode($row['geojson'], true),
                'properties' =>
                $properties
            );
            array_push($geojson['features'], $feature);
        }
        return $geojson;
    }

    public function getTestingPoints() {
        $q = "SELECT id, s_loc, id_type, value, ST_AsGeoJSON(ST_Transform((geom),4326)) AS geojson FROM testing.test";
        $rs = pg_query($q);
        if (!$rs) {
            echo 'An SQL error occured.\n';
            exit;
        }
        $geojson = array(
            'type' => 'FeatureCollection',
            'features' => array()
        );
        while ($row = pg_fetch_assoc($rs)) {
            $properties = $row;
            unset($properties['geojson']);
            unset($properties['geom']);
            $feature = array(
                'type' => 'Feature',
                'geometry' => json_decode($row['geojson'], true),
                'properties' =>
                $properties
            );
            array_push($geojson['features'], $feature);
        }
        return $geojson;
    }

}
