class Cart {

  constructor() {
    store.cartProducts = store.cartProducts || [];
    store.save();
    //this.render();
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
   <section class="row cart-items-info">${this.loadCartList()}
  </section>
  <div class = "row">
      <div class = "col-8 total-price d-flex justify-content-end align-items-end py-5">
          <h3>Total Price : € 0 </h3>
      </div>     
  </div>
  <div class="row py-3">
    <div class = "col-12 total-price d-flex justify-content-between align-items-end">
      <a class="btn btn-primary" href="#produkter" id="continueBuying">Continue buying</a>
      <a class="btn btn-primary" href="#adressinfo" id="checkOut">Checkout</a>
    </div>
  </div>
`)}



loadCartList(){
  let tempArray = []
  
  store.cartProducts.map(cartItem => {
    tempArray.push (new Product(cartItem, Cart.cart, cartItem.amount))
  })
  return tempArray.map(item => item.renderInCart()).join('')
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
    let selectedProduct = store.cartProducts.find(storeProd => storeProd.id === product.id);
    if(selectedProduct){
      product.amount += 1;
    }else{
      product.amount += 1;
      store.cartProducts.push(product);
  
    }
    store.save();
    //this.render();
    console.log(store.cartProducts)
    // localStorage.setItem('cart',JSON.stringify(product));

    this.updateCartIconQty()
  }

   removeFromStore(product){
    let removedProduct = store.cartProducts.find(storeProd => storeProd.id === product.id);
    store.cartProducts = store.cartProducts.filter(product => product != removedProduct);
    store.save();
    this.render();
    this.updateCartIconQty()
  }

  saveToStore(product) {
    let productInStore = store.cartProducts.find(storeProd => storeProd.id === product.id);
    productInStore.amount = product.amount;
    productInStore.price = product.price;
    store.save();
    this.render();
    this.updateCartIconQty()
    
  }


  updateCartIconQty(){
    let cartCount = 0;
    let cartList = store.cartProducts
    console.log(cartList)
    cartList.forEach(product => {
     cartCount += product.amount
   });
   if(cartCount > 0){
     $('#cart-count').html(cartCount)
   }else{
    $('#cart-count').html("")
   }

  }

}

