class Cart {

  constructor() {
    this.products = []
    for(let product of this.products){
      loadObject(product.id);
      console.log( "loaded product",loadObject(product.id) );
    }
  }

  /*

    I am a Cart.

    I want to be a shopping-cart
    but so far I am really stupid... 😢
  */

 render() {
  $('main').html(/*html*/`
    <section class="row">
      <div class="col">
        <h1>Shopping cart</h1>
      </div>
    </section>
    <section class="row">
     <ol class="col" id="cart-list">
      
    
     </ol>
    </section>
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

    this.products.push(product)
   // localStorage.setItem("cart",JSON.stringify(product) );

    console.log(this.products)
  }


}
function loadObject(key){
  const stringInLocalStorage = localStorage.getItem(key);
  return JSON.parse(stringInLocalStorage);
}

