<?php
date_default_timezone_set('Asia/Dhaka');
$d = date('Y-m-d H:i:s');
require_once "rb-mysql.php";

$user = 'ds';
$pass = '1910baiyr';
$db_name = 'baiyrbek191001_ds';
$charset = 'utf8';
/**
 * Подключаемся к базе данных
 * Последний (4-й) параметр по умолчанию выставлен в FALSE
 * Если нужно применить заморозку таблиц в БД (отменить создание на лету),
 * то нужно данный параметр выставить в TRUE
 * или так: R::freeze(true);
 */
R::setup('mysql:host=localhost;dbname=' . $db_name, $user, $pass, false);

// Проверка подключения к БД
if (!R::testConnection()) die('No DB connection!');

/**
 * Если нужно работать с таблицами, в названии которых
 * присутствует знак подчёркивания (_), то необходимо воспользоваться 
 * таким методом
 *
 *R::ext('xdispense', function( $type ){
 *  return R::getRedBean()->dispense( $type );
 *});
 * Использовать так:
 *$test = R::xdispense('test_table');
 * Code...
 *R::store($test);*/
