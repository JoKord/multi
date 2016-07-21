<?php

class Error {
    
    private $errorCode;
    private $errorMsg;
    private static $errors = [
        0 => "Wrong Username or Password",
        1 => "The User is not Logged In",
        2 => "Permission Required to complete the Operation"
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
