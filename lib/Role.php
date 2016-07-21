<?php

class Role {

    public $permissions;

    protected function __construct() {
        $this->permissions = array();
    }

    public static function getRolePerms($role_id) {
        $role = new Role();
        $db = new PDO('pgsql:host=gistree-db;dbname=multichoice', 'websig', 'e13cca4d70177737791b534655cd4c4c');
        $stmt = $db->prepare("SELECT t2.perm_desc FROM users.role_perm as t1
                JOIN users.permissions_id as t2 ON t1.perm_id = t2.perm_id
                WHERE t1.role_id =?");
        $stmt->execute(array($role_id));
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $role->permissions[$row["perm_desc"]] = true;
        }
        return $role;
    }

    public function hasPerm($permission) {
        return isset($this->permissions[$permission]);
    }

}
