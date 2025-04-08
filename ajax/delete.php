<?php
if ($_POST['q']=="dRemoveProduct") {
    require_once '../db/connect.php';
    $q = R::exec('DELETE FROM orders  WHERE ai=?', [$_POST['ai']]);
    echo $q ? 'ok' : $q;
}