<?php

class Error {
    
    private $errorCode;
    private $errorMsg;
    private static $errors = [
        0 => "Nome de Utilizador ou Password Errada.",
        1 => "Não tem sessão iniciada. Por Favor, inicie a sessão.",
        2 => "São necessárias permissões para realizar a operação.",
        200 => "Não foi possível terminar a sessão. Por favor tente novamente."
    ];

    public function __construct($errorCode) {
        $this->errorCode = $errorCode;
        $this->errorMsg = $this->getErrorMessage($errorCode);
    }
    
    private function getErrorMessage($errorCode){
        return self::$errors[$errorCode];
    }
    
    public function getErrorCode() {
        return $this->errorCode;
    }
    
    public function getErrorMsg() {
        return $this->errorMsg;
    }
    
}
