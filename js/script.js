let localS = window.localStorage;
if (localS.getItem("agent") === null) {
  localS.setItem("agent", "");
  localS.setItem("agent_pass", "");
}
let user = localS.getItem("agent");
let pass = localS.getItem("agent_pass");
let add = new Add();
$(function () {
  // authorization ___START {
  if (user.length === 0) {
    $("#root").load("./pages/auth.php", function () {
      $("#root").fadeIn(500);
    });
  } else {
    $.ajax({
      type: "post",
      url: "ajax/sign_in.php",
      data: `user=${user}&pass=${pass}`,
      success: function (msg) {
        if (msg == "ok") {
          $("#root").load("./pages/main.php", function () {
            $("#root").fadeIn(500);
            $("#fragment_area").load(
              "./pages/fragments/orders.php?user=" + user
            );
          });
        } else {
          localS.setItem("agent", "");
          localS.setItem("agent_pass", "");
          $("#root").load("./pages/auth.php", function () {
            $("#root").fadeIn(500);
          });
        }
      },
    });
  }
  // authorization ___END }

  // bottomNavigation changing fragment function _____START {
  $("body").on("click", ".btm_nav>.item", function () {
    let fragment = $(this).attr("fragment");
    $(".btm_nav>.item").removeClass("active");
    $(this).addClass("active");
    $("#fragment_area").load(
      `pages/fragments/${fragment}.php?user=${user}`,
      function () {
        if (fragment == "add") {
          setTimeout(() => {
            if (add.products.length === 0) {
              $.ajax({
                type: "post",
                url: "ajax/get.php",
                data: `q=gProductsList`,
                success: function (msg) {
                  let r = JSON.parse(msg);
                  if (r.status == "ok") {
                    add.products = r.products;
                    add.body = $("#body_order");
                    add.fl = $("#fl").offset();
                    add.clearOrders();
                    add.addOrder();
                    add.refreshBody();
                    $("#fl").append(add.createFloat());
                  } else {
                    console.log(msg);
                    $("#fl").hide();
                    Alert("Проверьте интернет!");
                  }
                },
              });
            } else {
              add.body = $("#body_order");
              add.fl = $("#fl").offset();
              add.clearOrders();
              add.addOrder();
              add.refreshBody();
              $("#fl").append(add.createFloat());
            }
          }, 200);
        }
      }
    );
  });
  // bottomNavigation changing fragment function _____END }

  // showing client_history according to thouse id page consigments.php c____START {
  $("body").on("click", ".client_history", function () {
    $("#products_modal").load(
      `pages/fragments/components/products_modal.php?ide=${$(this).attr(
        "ide"
      )}`,
      function () {
        $("#products_modal").fadeIn(500);
      }
    );
  });
  //showing client_history according to thouse id page consigments.php ____END }

  // page consigments.php loaded page products_modal.php ____START{
  $("body").on("keyup", ".inp_return", function () {
    $(this).parent().css({ background: "red" });
  });
  // page consigments.php loaded page products_modal.php _____END}

  // ____START{
  $("body").on("click", "#top_nav_text", function () {
    document.location.reload();
  });
  // ______END}

  // showing hidden table rows in page return.php ____START {
  $("body").on("click", ".show_orders", function () {
    $(".orders_row").hide();
    $("." + $(this).attr("client")).fadeIn(500);
  });
  // showing hidden table rows in page return.php ______END }

  // increasing and decreasing amount of returning products in input page products_modal.php ____START{
  $("body").on("click", ".fa-circle-minus", function () {
    let ai = $(this).attr("ai");
    let c_amount = Number($("#r" + ai).val());
    if (c_amount > 0) {
      $("#r" + ai).val(--c_amount);
      $("#r" + ai)
        .parent()
        .css({ background: "red" });
    }
  });

  $("body").on("click", ".fa-circle-plus", function () {
    let ai = $(this).attr("ai");
    let c_amount = Number($("#r" + ai).val());
    if (Number($("#a" + ai).text()) > c_amount) {
      $("#r" + ai).val(++c_amount);
      $("#r" + ai)
        .parent()
        .css({ background: "red" });
    }
  });
  // increasing and decreasing amount of returning products in input page products_modal.php ______END }

  // ______START{
  $("body").on("click", "#add_new_card", function () {
    add.addOrderWithPlace();
  });
  // _______END}

  // ______START{
  $("body").on("click", "#prepare_order", function () {
    if (add.prepareOrder()) {
      let ord = add.orders;
      let sum = 0;
      for (let i = 0; i < ord.length; i++) {
        sum += ord[i].amount * ord[i].price;
      }
      $("#txt_order").text(sum);
      $("#modal_order").fadeIn(300);
    }
  });
  // _______END}

  // ______START{
  $("#create_order").on("click", function () {
    $("#modal_order").hide();+
    $.ajax({
      type: "post",
      url: "ajax/create_order.php",
      data: `user=${user}&orders=${JSON.stringify(add.orders)}&client=${$(
        "#client"
      ).val()}&ide=${$("#inp_ide").val()}`,
      success: function (msg) {
        if (msg == "ok") {
          $(".btm_nav>.add").trigger("click");
          Alert("Заказ создан");
        } else {
          Alert("Произошла ошибка");
        }
      },
    });
  });
  // _______END}

  // ______START{
  $("body").on("mousedown", ".emir", function () {
    $("#client").val($(this).text());
    $("#client").css({ border: "1px solid green" });
    $("#float").hide();
  });
  // _______END}

  // ______START{
  $("body").on("keyup", "#client", function () {
    let inp = $("#client");
    $(".emir").filter(function () {
      $(this).toggle(
        $(this)
          .text()
          .trim()
          .toLowerCase()
          .startsWith(inp.val().trim().toLowerCase())
      );
    });
  });
  // _______END}

  // ______START{
  $("body").on("keyup", "#search_prod", function () {
    let inp = $("#search_prod");
    $(".name_prod").parent("tr").hide();
    $(".name_prod:contains(" + inp.val().trim().toLowerCase() + ")")
      .parent("tr")
      .show();
  });
  // _______END}

  // ______START{
  $("body").on("click", "#btn_reduct", function () {
    let ide = $(this).attr("ide");
    let prod = $(this).attr("products");
    let p = JSON.parse(prod);
    let products = [];
    let client = $(this).attr("client");
    for (let i = 0; i < p.length; i++) {
      let product = {
        id: i + 1,
        ai: p[i].ai_product,
        name: p[i].name,
        cat: p[i].cat,
        amount: p[i].amount,
        price: p[i].price,
      };
      products.push(product);
    }
    console.log(prod);
    console.log(products);
    let fragment = "add";
    $(".btm_nav>.item").removeClass("active");
    $(".btn_nav>.item.add").addClass("active");
    $("#fragment_area").load(
      `pages/fragments/${fragment}.php?user=${user}`,
      function () {
        if (add.products.length === 0) {
          $.ajax({
            type: "post",
            url: "ajax/get.php",
            data: `q=gProductsList`,
            success: function (msg) {
              let r = JSON.parse(msg);
              if (r.status == "ok") {
                add.products = r.products;
                add.body = $("#body_order");
                add.fl = $("#fl").offset();
                add.clearOrders();
                add.orders = products;
                add.refreshBody();
                $("#fl").append(add.createFloat());
                $("#client").val(client);
                $("#inp_ide").val(ide);
              } else {
                console.log(msg);
                $("#fl").hide();
                Alert("Проверьте интернет!");
              }
            },
          });
        } else {
          add.body = $("#body_order");
          add.fl = $("#fl").offset();
          add.clearOrders();
          add.orders = products;
          add.refreshBody();
          $("#fl").append(add.createFloat());
          $("#client").val(client);
          $("#inp_ide").val(ide);
        }
      }
    );
  });
  // _______END}
});
