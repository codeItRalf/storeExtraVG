class Cart {

  constructor() {
    this.cartProducts = []

  }

  /*

    I am a Cart.

    I want to be a shopping-cart
    but so far I am really stupid... 😢
  */

  render() {
    $('main').html(/*html*/`
  <section class="row">
  <div class="col d-flex justify-content-center">
    <h1>Shopping cart</h1>
  </div>
  </section>
  <section class="row">
    ${this.cartProducts.map(cartItems=> cartItems.renderInCart()).join('')}
  </section>
  <div class = "row">
      <div class = "col-8 total-price d-flex justify-content-end align-items-end">
  
          Total Price
      </div>

  </div>

`);
  }


  add(product) {


    // We are doing a json stringify of the product
    // minus the cart property of a product
    // (which is just a reference to the cart)
    //
    // We don't need a JSON.stringify when we have
    // intelligent methods... This i purely to
    // show what product that is intended to be added...
    // alert(`
    //   I am a cart. I'm still really stupid 😢!
    //   I have no render-method and no methods that calc sums.
    //   I have no add and remove methods...
    //   But I know that you tried to add this product to me:
    //   ${JSON.stringify({ ...product, cart: undefined }, '', '  ')}
    //   // remove all extra spaces after a new-line
    // `.replace(/\n\s*/g, '\n'))
    product.amount = 1;
    this.cartProducts.push(product)
    this.render();
    console.log(this.cartProducts)
    

  }


}

