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

    public function getAccounts($offset, $status, $grp, $pro) {
        $q = "SELECT ST_AsGeoJSON(geom) as geojson, conta.account_number as id, conta.endereco, conta.customer_number as cust_n, " .
                " tipo_conta.descricao as tipo_conta, conta.id_bairro, conta.id_cidade, conta.id_localidade, conta.id_distrito, conta.id_provincia, " .
                " nome, customer_type, acc_status, pay_method, product_code, pg.descricao as grupo " .
                " FROM  clientes.conta conta " .
                " LEFT OUTER JOIN clientes.cliente ON cliente.customer_number = conta.customer_number " .
                " LEFT OUTER JOIN clientes.tipo_conta ON id_tipo = id_acc_type " .
                " LEFT OUTER JOIN clientes.decoders_account dca ON  dca.account_number = conta.account_number " .
                " LEFT OUTER JOIN clientes.produto p ON p.cod_produto = dca.product_code ".
                " LEFT OUTER JOIN clientes.produto_grupo pg ON pg.id_grp = p.id_prod_grp";
        $extraparams = array();
        if ($grp != "") {
            array_push($extraparams, " (conta.account_number IN (SELECT account_number FROM clientes.conta WHERE id_prod_grp = '$grp')) ");
        }
        if ($status != "" || $pro != "") {
            $dQuery = array();
            $aQ = " conta.account_number IN " .
                    " (SELECT account_number FROM clientes.decoders_account ";
            if ($status != "") {
                array_push($dQuery, " acc_status = '$status' ");
            }
            if ($pro != "") {
                array_push($dQuery, " product_code = '$pro' ");
            }
            if (!empty($dQuery)) {
                $extra = " WHERE ";
                for ($i = 0; $i < sizeof($dQuery) - 1; $i++) {
                    $extra = $extra . " " . $dQuery[$i] . "  AND ";
                }
                $extra = $extra . " " . $dQuery[$i] . ") ";
            } else {
                $extra = "";
            }
            $aQ .= $extra;
            array_push($extraparams, $aQ);
        }
        if (!empty($extraparams)) {
            $extra = " WHERE ";
            for ($i = 0; $i < sizeof($extraparams) - 1; $i++) {
                $extra = $extra . " " . $extraparams[$i] . "  AND ";
            }
            $extra = $extra . " " . $extraparams[$i] . "  ";
        } else {
            $extra = "";
        }
        $q .= $extra;
        $q .= " OFFSET $offset LIMIT 2000 ";
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

    public function getConta($id) {
        $q = "SELECT c.account_number, c.customer_number, nome, tc.descricao as tipo_conta, pg.descricao as grupo, c.endereco, c.cod_postal, c.id_bairro, c.id_cidade, c.id_localidade, c.id_distrito, c.id_provincia, array_agg(decoder_model) as d_model, array_agg(decoder_number) as d_number, array_agg(smartcard_model) as s_model, array_agg(smartcard_number) as s_number, array_agg(product_code) as p_code, array_agg(psnr) as psnr, array_agg(acc_status) as status, array_agg(pay_method) as pay, array_agg(prod_start_dt) as start_dt, array_agg(last_rec_dt) as last_rec_dt, array_agg(last_dis_dt) as last_dis_dt, array_agg(next_inv_dt) as last_inv_dt FROM clientes.conta c 
              INNER JOIN clientes.cliente cl ON cl.customer_number = c.customer_number INNER JOIN clientes.tipo_conta tc ON id_tipo = id_acc_type INNER JOIN clientes.produto_grupo pg ON id_grp = id_prod_grp INNER JOIN clientes.decoders_account da ON da.account_number = $id
              WHERE c.account_number = $id GROUP BY c.account_number, cl.nome, c.customer_number, tc.descricao, pg.descricao, c.endereco, c.cod_postal, c.id_bairro, c.id_cidade, c.id_localidade, c.id_distrito, c.id_provincia";
        $rs = pg_query($q);
        if (!$rs) {
            echo 'An SQL error occured.\n';
            exit;
        }
        while ($row = pg_fetch_assoc($rs)) {
            return $row;
        }
    }

}
