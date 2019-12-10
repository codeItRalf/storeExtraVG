class Cart {
  constructor() {
    store.cartProducts = store.cartProducts || [];
    store.save();
   // this.totalPrice = 0;
    this.calculateTotal();
    // this.shipping = 'free'
    this.removeToolTipListener();
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
          <h5 class="main-color">Sub-total  : </h5>
          <h6 class="main-color">25% VAT  : </h6>
          <h6 class="main-color">Shipping  : </h6>
          <h5 class="main-color">Order Total  : </h5>
      </div>
      <div class = " col-6 col-md-3 total-price d-flex flex-column justify-content-center align-items-start py-5">
      <h6 id="total-price" class="main-color"> €${this.totalPrice}</h6>
      <h6 id="tax" class="main-color"> €${this.tax}</h6>
      <h6 id="shipping" class="main-color">€${this.shipping}</h6>
      <h5 id="order-total" class="main-color"> €${this.orderTotal.toFixed(2).replace(".",",")} </h5>

      </div> 
          
  </div>
  <div class="row py-3">
    <div class = "col-12 total-price d-flex justify-content-between align-items-end">
      <a class="btn btn-info" href="#produkter" id="continueBuying">Continue buying</a>
      <a class="btn btn-info" href="#adressinfo" id="checkOut">Checkout</a>
    </div>
  </div>
`);
    this.calcDiscount();
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
    $('.tooltip').remove();
  
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
    this.totalDiscount = 0;
    this.calcDiscount();
    this.calcShipping();
    this.calcTax();
    this.calcOrderTotal();
  }

  calcDiscount(){
    this.totalPrice = 0;
    this.totalDiscount = 0;
    store.cartProducts.map(item => {
      item.currentPrice = item.amount * item.price;
      let [discountQuantity,forQuantity] = item.discount || [];
      if(discountQuantity){
        let numDiscountItem = Math.floor(item.amount/discountQuantity);
        let discountSum = item.price * numDiscountItem;
        if(item.amount < 3){
          $(`#discount-${item.id}`).html('');
        }
        else{
          $(`#discount-${item.id}`).html('You saved €' + discountSum)
        }
        console.log('discount',discountQuantity,'for',forQuantity, 'you saved',discountSum)
        item.currentPrice -= discountSum;
        //$(`#price-${item.id}`).html('€  ' + item.currentPrice);
        this.totalDiscount += discountSum;

        //store.save();
      }
      $(`#price-${item.id}`).html('€  ' + item.currentPrice);

      this.totalPrice += item.currentPrice;
    });

  }

  
  calcTax(){
    this.tax = (0.20 * this.totalPrice).toFixed(2).replace(".", ",");
    $('#tax').html('€' + this.tax);
    $('#total-price').html('€' + this.totalPrice);
  }

  calcShipping() {
    this.totalWeight = 0;
    store.cartProducts.map(item =>{
      this.totalWeight += (item.weight * item.amount);

    })
    if(this.totalWeight < 1){
      this.shipping = 'free';
      $('#shipping').html(this.shipping);
    }
    else{
      this.shipping = (4 * this.totalWeight).toFixed(2).replace(".", ",");
      $('#shipping').html('€' + this.shipping);
    }
  }

  calcOrderTotal() {
    if(this.totalWeight < 1) {
      this.orderTotal = this.totalPrice;
    }
    else{
      this.orderTotal = (parseFloat(this.totalPrice) + parseFloat(this.shipping.replace(",", ".")));
    }
    $('#order-total').html('€' + this.orderTotal.toFixed(2).replace(".", ","));
  }

  removeToolTipListener() {
    $('body').on('click', e => {
      $('.tooltip').remove();
    })
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
