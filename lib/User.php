<?php

class User {

    protected $_db;
    private $_username;
    private $_password;
    private $_user;

    public function __construct(PDO $db, $username, $password) {
        $this->_db = $db;
        $this->_username = $username;
        $this->_password = $password;
    }

    public function login() {
        $user = $this->_checkCredentials();
        if ($user) {
            $this->_user = $user;
            $_SESSION['user_id'] = $user['id'];
            return $user['id'];
        }
        return false;
    }

    protected function _checkCredentials() {
        $stmt = $this->_db->prepare('SELECT * FROM users.user_id WHERE name=?');
        $stmt->execute(array($this->_username));
        if ($stmt->rowCount() > 0) {
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            $submitted_pass = md5($this->_password);
            if ($submitted_pass == $user['password']) {
                return $user;
            }
        }
        return false;
    }

    public function getUser() {
        return $this->_user;
    }
}
