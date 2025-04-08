class Add {
  orders = [];
  products = [];
  body = $("<div></div>");
  add = this;
  float = $("<div class='float'></div>");
  currentIndex = $('<input type="text">');
  fl = "";

  addOrder() {
    let id = this.orders.length + 1;
    let order = {
      id: id,
      ai: 0,
      name: "",
      cat: "",
      amount: 0.0,
      price: 0.0,
    };
    this.orders.push(order);
    return order;
  }

  addOrderWithPlace() {
    if (this.orders.length < 15) {
      this.addOrderPlace(this.addOrder());
    }
  }

  clearOrders() {
    this.orders.length = 0;
  }

  refreshBody() {
    console.log(this.orders);
    this.body.html("");
    for (let i = 0; i < this.orders.length; i++) {
      this.addOrderPlace(this.orders[i]);
    }
  }

  addOrderPlace(obj) {
    let index = obj.id - 1;
    let card = $('<div id="ord_card' + obj.id + '" class="ord_card"></div>');
    let name = $(
      '<input type="text" class="form-control form-control-sm" placeholder="Название" value="' +
        obj.name +
        '">'
    );
    let price = $('<span class="ord_price">' + obj.price + "</span>");
    let spanPrice = $("<span>Ц: </span>").append(price);
    let amount = $(
      '<input type="number" class="ord_amount form-control form-control-sm" placeholder="Кол-во" value="' +
        obj.amount +
        '">'
    );
    let sum = $('<span class="ord_sum">' + obj.price * obj.amount + "</span>");
    let spanSum = $('<span class="ord_sum_p">Сумма: </span>').append(sum);
    let btn = $(
      '<button type="button" class="btn btn-danger btn-sm ord_btn">x</button>'
    );
    let div = $("<div></div>").append(name);
    let col1 = $('<div class="col-1 p0"></div>').append(
      $("<span>" + obj.id + "</span>")
    );
    let hidden_inp = $('<input type="text" class="ord_hidden_inp">');
    let col2 = $('<div class="col-2 p0"></div>').append(amount);
    let col3 = $('<div class="col-3"></div>').append(spanPrice);
    let col4 = $('<div class="col-4 p0"></div>').append(spanSum);
    let col = $('<div class="col p0"></div>').append(btn);
    let row = $('<div class="row"></div>')
      .append(col1)
      .append(col2)
      .append(col3)
      .append(col4)
      .append(col);
    card.append(div).append(row).append(hidden_inp);
    this.body.append(card);

    btn.click(function () {
      add.removeOrderWithCard(index);
    });
    name.on("focus", function () {
      add.currentIndex = hidden_inp;
    });
    name.on("keyup", function () {
      add.findProducts(name);
    });
    name.on("blur", function () {
      setTimeout(function () {
        add.float.hide();
      }, 310);
    });
    amount.on("keyup", function () {
      let o = add.orders[index];
      sum.text(o.price * Number(amount.val()));
      o.amount = Number(amount.val());
    });
    amount.on("focus", function () {
      if (amount.val() == "0") {
        amount.val("");
      }
    });
    hidden_inp.on("change", function () {
      let p = add.products[Number(hidden_inp.val())];
      let o = add.orders[index];

      name.val(p.name);
      price.text(p.price);
      sum.text(p.price * Number(amount.val()));
      o.ai = p.ai;
      o.name = p.name;
      o.cat = p.cat;
      o.price = p.price;

      amount.focus();
    });
  }

  removeOrderWithCard(index) {
    this.orders.splice(index, 1);
    for (let i = 0; i < this.orders.length; i++) {
      this.orders[i].id = i + 1;
    }
    this.refreshBody();
  }

  createFloat() {
    let f = this.float;
    let p = this.products;
    f.html("");
    for (let i = 0; i < p.length; i++) {
      let item = $(
        "<div>" + p[i].name + "<p>" + p[i].name.toLowerCase() + "</p></div>"
      );
      item.click(function () {
        add.chooseItem(i);
      });
      f.append(item);
    }
    return f;
  }

  chooseItem(index) {
    console.log(add.currentIndex);
    add.currentIndex.val(index);
    add.currentIndex.trigger("change");
    add.float.hide();
  }

  findProducts(inp) {
    this.float.css({
      display: "block",
      top: inp.offset().top - add.fl.top + 30 + "px",
      left: inp.offset().left - add.fl.left + "px",
      width: inp.width() + 17 + "px",
    });
    $(".float>div").hide();
    $(".float>div>p:contains(" + inp.val().trim().toLowerCase() + ")")
      .parent("div")
      .show();
  }

  prepareOrder() {
    if ($("#client").val().trim() != "") {
      let orders = this.orders;
      let isAllOk = true;
      for (let i = 0; i < orders.length; i++) {
        let o = orders[i];
        if (o.ai != 0 && o.amount != 0) {
          $("#ord_card" + o.id).css({ border: "1px solid green" });
        } else {
          isAllOk = false;
          $("#ord_card" + o.id).css({ border: "1px solid red" });
        }
      }
      if (isAllOk) {
        return true;
      } else {
        Alert("Заполните все поля!");
        return false;
      }
    } else {
      $("#client").css({ border: "1px solid red" });
      Alert("Заполните все поля!");
      return false;
    }
  }
}
