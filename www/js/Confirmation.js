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
          <p>You can follow your order <a href="#orderhistory">here</a></p>
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
    
    
    this.pushOrder(new Order(this.clone( this.cart), this.orderNumber, this.customer));
    
    store.save();
  }

  pushOrder(order){
    let list = []

    if(store.purchases){
     list = store.purchases
    }
    list.push(order)
    store.purchases = list
  }


  clone(obj) {
    return Object.create(
      Object.getPrototypeOf(obj), 
      Object.getOwnPropertyDescriptors(obj) 
    );
  }
   

}
