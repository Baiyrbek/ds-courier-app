<?php
if (isset($_POST['user'])) {
    require_once '../db/connect.php';
    $ai = R::getCell('SELECT ai FROM agents WHERE ai = ? AND pass = ?', [(int)$_POST['user'], $_POST['pass']]);
    if(!empty($ai)) echo 'ok'; else echo $_POST['user'].$_POST['pass'];
}
