let ai_ = "";
let ide_ = "";
let currentInput = "";
function signIn() {
  let user = $("#user").val();
  let pass = $("#pass").val();
  $.ajax({
    type: "post",
    url: "ajax/sign_in.php",
    data: `user=${user}&pass=${pass}`,
    success: function (msg) {
      if (msg == "ok") {
        window.localStorage.setItem("agent", user);
        window.localStorage.setItem("agent_pass", pass);
        $("#root").hide();
        document.location.reload();
      } else {
        Alert("Неправильный пароль");
      }
    },
  });
}

function Alert(msg) {
  $("#txt_alert").text(msg);
  $("#Alert").fadeIn(400);
}
function Confirm() {
  console.log("Confirm is mot defined");
}
function removeProduct(ai, ide) {
  $("#confirm").fadeIn(500);
  ai_ = ai;
  ide_ = ide;
  Confirm = function () {
    $("#confirm").fadeOut(200);
    $.ajax({
      type: "post",
      url: "ajax/delete.php",
      data: `q=dRemoveProduct&ai=${ai_}`,
      success: function (msg) {
        if (msg == "ok") {
          $("#products_modal").load(
            `pages/fragments/components/products_modal.php?ide=${ide_}`,
            function () {}
          );
        } else {
          Alert(msg);
        }
      },
    });
  };
}

function removeOrder(ide) {
  $("#confirm").fadeIn(500);
  ide_ = ide;
  Confirm = function () {
    $("#confirm").fadeOut(200);
    $.ajax({
      type: "post",
      url: "ajax/delete.php",
      data: `q=dRemoveOrder&ide=${ide_}`,
      success: function (msg) {
        if (msg == "ok") {
        } else {
          Alert(msg);
        }
      },
    });
  };
}

function client() {
  var exp = $("#client");
  currentInput = exp;
  var fl = $("#fl").offset();
  $("#float").html("");
  $("#float").css({
    display: "block",
    top: exp.offset().top - fl.top + 30 + "px",
    left: exp.offset().left - fl.left + "px",
    width: exp.width() + 17 + "px",
  });
  $.ajax({
    type: "post",
    url: "ajax/get.php",
    data: "q=getList&type=clients&text=" + exp.val(),
    success: function (msg) {
      if (msg != "") {
        $("#float").html(msg);
      } else {
        Alert("Error!");
      }
    },
  });
}

function hideClient() {
  $("#float").hide();
}

