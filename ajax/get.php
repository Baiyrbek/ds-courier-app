<?php
require_once '../db/connect.php';
if ($_POST['q'] == "getList") {
    if (isset($_POST['type'])) {
        echo ('<div style="width:100%;overflow-x:hidden;">');
        $ed = '';
        if ($_POST['type'] == "products") {
            $ed = 'AND we_have=1';
        }
        $s = R::getAll('SELECT ai, name FROM '.$_POST['type'].' WHERE name LIKE ? ' . $ed . '  ORDER BY name', [$_POST['text'].'%']);
        foreach ($s as $a) {
            echo ('<div ai="' . $a['ai'] . '" class="emir '.$_POST['type'].'">' . $a['name'] . '</div>');
        }
        echo ('</div>');
    }
}

if ($_POST['q'] == "gProductsList") {
    $s = R::getAll('SELECT ai, name, cat, price FROM products WHERE we_have=1 ORDER BY name');
    $response = array(
        "status" => "ok",
        "products" => $s,
    );
    echo(json_encode($response, JSON_UNESCAPED_UNICODE));
}
