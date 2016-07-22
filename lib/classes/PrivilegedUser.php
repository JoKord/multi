<?php

require_once dirname(__FILE__) . '/Role.php';
require_once dirname(__FILE__) . '/User.php';

class PrivilegedUser extends User {

    public $roles;

    public function __construct($db, $username, $password) {
        parent::__construct($db, $username, $password);
    }

    public static function getByUserID($user_id) {
        $db = new PDO('pgsql:host=gistree-db;dbname=multichoice', 'websig', 'e13cca4d70177737791b534655cd4c4c');
        $stmt = $db->prepare('SELECT * FROM users.user_id WHERE id=?');
        $stmt->execute(array($user_id));
        $result = $stmt->fetchAll();
        if (!empty($result)) {
            $pUser = new PrivilegedUser($db, $result[0]["name"], $result[0]["password"]);
            $pUser->user_id = $result[0]["id"];
            $pUser->username = $result[0]["name"];
            $pUser->email_addr = $result[0]["email_addr"];
            $pUser->initRoles();
            return $pUser;
        } else {
            return false;
        }
    }

    protected function initRoles() {
        $this->roles = array();
        $sql = "SELECT t1.role_id, t2.role_name FROM users.user_role as t1
                JOIN users.roles_id as t2 ON t1.role_id = t2.role_id
                WHERE t1.id =?";
        $stmt = $this->_db->prepare($sql);
        $stmt->execute(array($this->user_id));
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $this->roles[$row["role_name"]] = Role::getRolePerms($row["role_id"]);
        }
    }

    public function hasPrivilege($perm) {
        foreach ($this->roles as $role) {
            if ($role->hasPerm($perm)) {
                return true;
            }
        }
        return false;
    }

}
