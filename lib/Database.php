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
        $q = "SELECT id, cod_cracha, tipo, nome as fullName, endereco, contacto, categoria, email, observacoes, regiao, ST_AsGeoJSON(ST_Transform((geom),4326)) AS geojson FROM instaladores.instalador";
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

    public function getAccounts($offset, $status = 'Active') {
        $q = "SELECT ST_AsGeoJSON(geom) as geojson, conta.account_number as acc_n, conta.endereco, conta.customer_number as cust_n, " .
                " tipo_conta.descricao as tipo_conta, conta.id_bairro, conta.id_cidade, conta.id_localidade, conta.id_distrito, conta.id_provincia, " .
                " nome, customer_type " .
                " FROM  clientes.conta conta " .
                " LEFT OUTER JOIN clientes.cliente ON cliente.customer_number = conta.customer_number " .
                " LEFT OUTER JOIN clientes.tipo_conta ON id_tipo = id_acc_type " .
                " JOIN clientes.decoders_account dca ON  dca.account_number = conta.account_number " .
                " LEFT OUTER JOIN clientes.produto ON produto.cod_produto = dca.product_code " .
                " WHERE conta.account_number IN " .
                " (SELECT account_number FROM clientes.decoders_account WHERE acc_status = 'Active') " .
                " OFFSET $offset LIMIT 2000 ";
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
