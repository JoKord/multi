<?php

class Utilities {

    public static function hasPhoto($type, $id) {
        $fp = "assets/fotos/$type/$id" . ".png";
        $rfp = dirname(__FILE__) . "/../" . $fp;
        if (file_exists($rfp)) {
            return $fp;
        } else {
            $fp = "assets/fotos/$type/$id" . ".jpg";
            $rfp = dirname(__FILE__) . "/../" . $fp;
            if (file_exists($rfp)) {
                return $fp;
            } else {
                return null;
            }
        }
    }

}
