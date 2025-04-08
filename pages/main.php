<div>
    <div id="fragment_area">

    </div>
    <div class="btm_nav" style="z-index:23;">
        <div class="item active" fragment="orders">
            <i class="fa-solid fa-house-chimney"></i>
        </div>
        <div class="item add" fragment="add">
            <i class="fa-solid fa-plus"></i>
        </div>
        <div class="item" fragment="list">
            <i class="fa-solid fa-list"></i>
        </div>
        <div class="item" fragment="salary">
            <i class="fa-solid fa-sack-dollar"></i>
        </div>
        <div class="item" fragment="terms">
            <i class="fa-solid fa-file-contract"></i>
        </div>
    </div>
    <div id="confirm" onclick="$(this).fadeOut(200);" style="display:none;z-index:22;" class="full_screen">
        <div class="child_to_center full" style="background:#0009;">
            <div onclick="event.stopPropagation();" style="padding:30px;border-radius:15px;background:#fff;text-align:right;">
                <h6 style="text-align:center;color:#222;">Подтвердите действие</h6>
                <hr>
                <button class="btn btn-secondary btn-sm" onclick="$('#confirm').fadeOut(200);">Нет</button>
                <button id="btn-confirm" class="btn btn-primary btn-sm" onclick="Confirm();" style="margin-left:20px;">Да</button>
            </div>
        </div>
    </div>
</div>