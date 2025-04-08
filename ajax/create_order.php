<?php
require_once '../db/connect.php';
$orders = json_decode($_POST['orders'], true);
if ($_POST['ide'] != "0") {
    $ide = $_POST['ide'];
    $t = R::getRow('SELECT date, time FROM orders WHERE ide=?', [$_POST['ide']]);
    $d = $t['time'];
    $date = $t['date'];
    R::exec('DELETE FROM orders WHERE ide=?', [$_POST['ide']]);
} else {
    $ide = R::getCell('SELECT ord FROM ide WHERE ai=1');
    $date = date('Y-m-d');
    $q = R::exec('UPDATE ide SET ord=ord+1 WHERE ai=1');
}
if (R::getCell('SELECT ai FROM clients WHERE name=?', [$_POST['client']]) == '') {
    $q = R::exec('INSERT INTO 
    clients 
        (name) 
    VALUES
        (?)', [$_POST['client']]);
}
for ($i = 0; $i < count($orders); $i++) {
    $pr = $orders[$i];

    $q = R::exec(
        'INSERT INTO 
        orders 
            ( ide,  cat, ai_product,   name,  client,  amount,  price,  time,  date,  agent,  agent_fio) 
        VALUES
            (:ide, :cat, :ai_product, :name, :client, :amount, :price, :time, :date, :agent, :agent_fio)',
        [
            'ide' => $ide,
            'cat' => $pr['cat'],
            'ai_product' => $pr['ai'],
            'name' => $pr['name'],
            'client' => $_POST['client'],
            'amount' => $pr['amount'],
            'price' => $pr['price'],
            'time' => $d,
            'date' => $date,
            'agent' => R::getCell('SELECT name FROM agents WHERE ai=?', [$_POST['user']]),
            'agent_fio' => R::getCell('SELECT fio FROM agents WHERE ai=?', [$_POST['user']]),
        ]
    );
}
echo 'ok';
