class Confirmation {
  
  constructor(cart){
    this.cart = cart;
  }

  render() {
    $("main").html(/*html*/ `
        <main class="container">
        <section class="row">
        <div class="col confirmationtext">
          <h2> Order confirmed! </h2>
          <p> Thank you for shopping at Chyvek Data! </p>
          <a>See your order here: <span id="order"></span></a>
          <p> An email with your order and an order confirmation has been sent to your registrered email-adress. </p>
          <p>We hope you'll enjoy your products. </p>
        </div>
        </section>
        </main>
        `);
    this.completeOrder();
  }
  completeOrder() {
    this.saveOrder();
    store.cartProducts = [];
    store.save();
    this.cart.updateCartIconQty();
  }
  saveOrder() {
    this.orderNumber = Date.now();
    $("#order").html(this.orderNumber);
    //this.cart = store.cartProducuc
    this.customer = store.customer;
    console.log(this.orderNumber);
    console.log(this.cart);
    console.log(this.customer);

    let purchase = new OrderHistory(this.cart, this.orderNumber, this.customer);
    store.purchases = purchase;
    store.save();
  }
}
