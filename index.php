<?php
define('V', '1.50');
?>
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <title>DS courier</title>    
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link rel="stylesheet" href="css/style.css?v=<?= V; ?>">
    <script src="https://kit.fontawesome.com/1fd78dc055.js" crossorigin="anonymous"></script>
</head>
 
<body style="background:white;">
    <div style="display:none;" id="root">

    </div>
    <div id="Alert" style="display:none;position:fixed;z-index:99;width:100%;height:100vh;top:0;left:0;" onclick="$(this).fadeOut(200);">
        <div style="width:100%;height:100%;background:#0009;display:flex;justify-content:center;align-items:center;">
            <div onclick="event.stopPropagation();" style="text-align:center;background:white;width:max-content;min-width:300px;padding:30px;box-shadow:0 0 4px #666;border-radius:5px;color:#444;">
                <span id="txt_alert">hi</span>
            </div>
        </div>
    </div>
    <div id="modal_order" class="full_screen" style="display:none;z-index:98;" onclick="$(this).fadeOut(200);">
        <div class="child_to_center full" style="background:#0009;">
            <div onclick="event.stopPropagation();" style="text-align:center;background:white;width:max-content;min-width:300px;padding:30px;box-shadow:0 0 4px #666;border-radius:5px;color:#444;">
                <span id="txt_order">hi</span>
                <hr>
                <button id="create_order" class="btn btn-primary btn-sm">Создать</button>
            </div>
        </div>
    </div>
</body>
<script type='text/javascript' src='https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js'></script>
<script src="js/add.js?v=<?= V; ?>"></script>
<script src="js/functions.js?v=<?= V; ?>"></script>
<script src="js/script.js?v=<?= V; ?>"></script>

</html>