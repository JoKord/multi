<?php
require_once dirname(__FILE__) . '/../classes/PrivilegedUser.php';
require_once dirname(__FILE__) . '/../classes/MyError.php';

define('MAX_FILE_SIZE', 2 * 1048576); // 2MB 
session_start();
if (isset($_SESSION["user_id"])) {
    $u = PrivilegedUser::getByUserID($_SESSION["user_id"]);
} else {
    $error = new MyError(1);
}
if (!isset($error)) {
    if ($u->hasPrivilege("AddPhotos")) {
        if (!isset($_FILES['file']['error']) || is_array($_FILES['file']['error'])) {
            $erro = new MyError(300);
        }
        switch ($_FILES['file']['error']) {
            case UPLOAD_ERR_OK:
                break;
            case UPLOAD_ERR_NO_FILE:
                $erro = new MyError(301);
            case UPLOAD_ERR_INI_SIZE:
            case UPLOAD_ERR_FORM_SIZE:
                $erro = new MyError(302);
            default:
                $erro = new MyError(300);
        }
        if ($_FILES['file']['size'] > MAX_FILE_SIZE) {
            $erro = new MyError(302);
        }
        $finfo = new finfo(FILEINFO_MIME_TYPE);
        if (false === $ext = array_search($finfo->file($_FILES['file']['tmp_name']), array(
            'jpg' => 'image/jpeg',
            'png' => 'image/png',)
                , true
                )) {
            $erro = new MyError(303);
        }
        $id = filter_input(INPUT_POST, 'id', FILTER_SANITIZE_NUMBER_INT);
        $type = filter_input(INPUT_POST, 'type', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
        $fp = "/../../assets/fotos/$type";
        $rfp = dirname(__FILE__) . $fp;
        if (!isset($erro)) {
            $erro = addPhoto();
        }
    } else {
        $erro = new MyError(2);
    }
}

if (!isset($erro)) {
    include '../../partials/other/success.html';
    echo '<p class="lead">O pedido foi realizado com sucesso!</p>';
    echo '<p>Faça refresh ao mapa para visualizar os resultados.</p>';
    include '../../partials/other/bottom.html';
} else {
    include '../../partials/other/error.html';
    echo "<h1 class='cover-heading'>ERRO (" . $erro->getErrorCode() . ")</h1>";
    echo "<p class='lead'>" . $erro->getErrorMsg() . "</p>";
    include '../../partials/other/bottom.html';
}

function createDir() {
    global $rfp;
    if (mkdir($rfp . "/", 0777, true)) {
        addPhoto();
    } else {
        return new MyError(304);
    }
}

function addPhoto() {
    global $rfp, $id, $ext;
    if (file_exists($rfp)) {
        if (!move_uploaded_file($_FILES['file']['tmp_name'], $rfp . "/" . $id . "." . $ext)) {
            return new MyError(300);
        }
    } else {
        return createDir();
    }
}
