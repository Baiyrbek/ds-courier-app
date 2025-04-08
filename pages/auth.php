<?php
require_once "../db/connect.php";
$q = R::getAll('SELECT ai, name, fio FROM agents');
?>
<div class="full_screen child_to_center">
    <div class="modal_card m_w_400">
        <h5 class="text-center">ВХОД</h5>
        <hr>
        <select class="form-control form-control-sm" id="user">
            <?php
            foreach ($q as $agent) {
                echo ('
            <option value="' . $agent['ai'] . '">' . $agent['fio'] . '</option>        
                    ');
            }
            ?>
        </select>
        <hr>
        <input type="text" id="pass" class="form-control form-control-sm" placeholder="Пароль">
        <hr>
        <button class="btn btn-danger btn-sm d-block w-100" type="button" onclick="signIn();">Войти</button>
    </div>
</div>