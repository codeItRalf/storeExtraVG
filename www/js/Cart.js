class Cart {
  constructor() {
    store.cartProducts = store.cartProducts || [];
    store.save();
   // this.totalPrice = 0;
    this.calculateTotal();
    this.shipping = 'free'
  }

  /*

    I am a Cart.

    I want to be a shopping-cart
    but so far I am really stupid... 😢
  */

  render() {
    $("main").html(/*html*/ `
  <section class="row">
  <div class="col d-flex justify-content-center">
    <h1>Shopping cart</h1>
  </div>
  </section>
   <section class="row">
   ${this.loadCartList()}
  </section>
  <div class = "row text-info">
      <div class = "d-none d-sm-block col-md-6 total-price  py-5 w-25"></div>
      <div class = " col-6 col-md-3 total-price d-flex flex-column justify-content-center align-items-start py-5">
          <h5>Sub-total  : </h5>
          <h6>25% VAT  : </h6>
          <h6>Shipping  : </h6>
          <h5>Order Total  : </h5>
      </div>
      <div class = " col-6 col-md-3 total-price d-flex flex-column justify-content-center align-items-start py-5">
      <h6 id="total-price"> €${this.totalPrice}</h6>
      <h6 id="tax"> €${this.tax}</h6>
      <h6 id="shipping"> ${this.shipping}</h6>
      <h5 id="Order-total"> €${this.orderTotal} </h5>

      </div> 
          
  </div>
  <div class="row py-3">
    <div class = "col-12 total-price d-flex justify-content-between align-items-end">
      <a class="btn btn-info" href="#produkter" id="continueBuying">Continue buying</a>
      <a class="btn btn-info" href="#adressinfo" id="checkOut">Checkout</a>
    </div>
  </div>
`);
  }

  loadCartList() {
    let tempArray = [];

    store.cartProducts.map(cartItem => {
      tempArray.push(new Product(cartItem, this, cartItem.amount));
    });
    return tempArray.map(item => item.renderInCart()).join("");
  }

  add(product) {
    console.log("cart.add");
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
    }

    else{
      product.amount += 1;
      store.cartProducts.push(product);

    }
    product.showDiscount();
    this.saveToStore(product);
    }

  removeFromStore(product) {
    let removedProduct = store.cartProducts.find(
      storeProd => storeProd.id === product.id
    );
    store.cartProducts = store.cartProducts.filter(
      product => product != removedProduct
    );
    store.save();
    //this.render();
    this.updateCartIconQty()
    this.calculateTotal();
  }

  saveToStore(product) {
    let productInStore = store.cartProducts.find(
      storeProd => storeProd.id === product.id
    );
    productInStore.amount = product.amount;
    productInStore.currentPrice = product.currentPrice;
    store.save();
    //this.render();
    $(`#amount-${product.id}`).html(product.amount);
    this.calculateTotal();
    this.updateCartIconQty()

  }

  calculateTotal(){
    this.totalPrice = 0;
    this.calcDiscount();
    this.calcTax();
  }

  calcDiscount(){
    store.cartProducts.map(item => {
      item.currentPrice = item.amount * item.price;
      let [discountQuantity,forQuantity] = item.discount || [];
      if(discountQuantity){
        let numDiscountItem = Math.floor(item.amount/discountQuantity);
        let discountSum = item.price * numDiscountItem;
        $(`#discount-${item.id}`).html('You saved €' + discountSum);
        console.log('discount',discountQuantity,'for',forQuantity, 'you saved',discountSum)
        item.currentPrice -= discountSum;
        $(`#price-${item.id}`).html('€  ' + item.currentPrice);
        //store.save();
      }
      this.totalPrice += item.currentPrice;
    });

  }
  
  calcTax(){
    this.tax = (0.25 * this.totalPrice).toFixed(2) ;
    $('#tax').html('€' + this.tax);
    $('#total-price').html('€' + this.totalPrice);

  }



  updateCartIconQty() {
    let cartCount = 0;
    let cartList = store.cartProducts;
    console.log(cartList);
    cartList.forEach(product => {
      cartCount += product.amount;
    });
    if (cartCount > 0) {
      $("#cart-count").html(cartCount);
    } else {
      $("#cart-count").html("");
    }
  }
}
