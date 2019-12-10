class Confirmation {
  constructor(cart) {
    this.cart = cart;
  }

  render() {

    $("main").html(/*html*/ `
        <main class="container">
        <section class="row">
        <div class="col confirmationtext">
          <h2> Order confirmed! </h2>
          <p> Thank you for shopping at Chyvek Data! </p>
          <a>Your order number is: <span id="order"></span></a>
          <p> An email with your order and an order confirmation has been sent to your registrered email-adress. </p>
          <p>You can follow your order <a href="#orderhistory">here</a></p>
          <p>We hope you'll enjoy your products. </p>
        </div>
        </section>
        </main>
        `);
    this.completeOrder();
  }
  completeOrder() {
    console.log(store.cartProducts);
    if (store.cartProducts.length > 0){
    this.saveOrder();
    store.cartProducts = [];
    store.save();
    this.cart.updateCartIconQty();
    }
  }
  saveOrder() {
    this.orderNumber = Date.now();
    $("#order").html(this.orderNumber);
    //this.cart = store.cartProducts
    this.customer = store.customer;

    let order = {
      cartValue: this.clone(this.cart),
      orderList: this.clone(store.cartProducts) 
    };
    this.pushOrder(
      new Order(order, this.orderNumber, this.customer)
    );
    store.save();
  }

  pushOrder(order) {
    let list = [];
    if (store.purchases) {
      list = store.purchases;
    }
    console.log('push order is called')
    list.push(order);
    store.purchases = list;


  }

  clone(obj) {
    return Object.create(
      Object.getPrototypeOf(obj),
      Object.getOwnPropertyDescriptors(obj)
    );
  }
}
