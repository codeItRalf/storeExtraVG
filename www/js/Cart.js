class Cart {
  constructor() {
    this.cartName = "Default Cart"
    store.carts = store.carts || [];
    if (store.carts.length < 1) {
      store.carts.push(new CartList(this.cartName))
    }

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
    $("main").html( /*html*/ `
  <section class="row">
  <div class="col d-flex flex-column align-items-center">
  <div class="dropdown">
  <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
  ${this.cartName}
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
      ${this.cartsForDropDown()}
    <a class="dropdown-item" data-toggle="modal" data-target="#cartListModal" href="">Create Cart +</a>
  </div>
</div>
    <h1>Shopping cart</h1>
  </div>
  </section>
   <section class="row">
   ${this.loadCartList()}
  </section>
   <section class="container"> 
   <div class = "row ">
   <div class = "d-none d-md-block col-md-6 total-price  py-5 w-25"></div>
   <div class = " col-6 col-md-3 total-price d-flex flex-column justify-content-center align-items-start py-5">
       <h5>Sub-total  : </h5>
       <h6 class="text-danger">Total-discount  : </h6>
       <h6>25% VAT  : </h6>
       <h6 >Shipping  : </h6>
       <h5 >Order Total  : </h5>
   </div>
   <div class = " col-6 col-md-3 total-price d-flex flex-column justify-content-center align-items-start py-5">
       <h5 id="total-price" >0,00 € </h5>
       <h6 id="total-discount" class="text-danger">0,00 €</h6>
       <h6 id="tax"> </h6>
       <h6 id="shipping" > </h6>
       <h5 id="order-total">0,00 € </h5>

   </div> 
       
</div>

   </section>
  <div class="row py-3">
    <div class = "col-12 total-price d-flex justify-content-between align-items-end">
      <a class="btn btn-primary" href="#produkter" id="continueBuying">Continue buying</a>
      <a class="btn btn-primary" href="#adressinfo" id="checkOut">Checkout</a>
    </div>
  </div>

  ${this.cartListModal()}
`);
    this.calculateTotal();
  }


  cartsForDropDown() {
    return store.carts.map(cart => this.cartName != cart.name ? /*html*/ `<a class="dropdown-item" href="">${cart.name}</a>` : "").join("")

  }

  getCartObject() {
    let cartObject = store.carts.find(cart =>
      cart.name === this.cartName)
    console.log("Cart object = ", cartObject)
    return cartObject
  }

  loadCartList() {
    let tempArray = [];
    this.getCartObject().cartProducts.map(cartItem => {
      tempArray.push(new Product(cartItem, this, cartItem.amount));
    });
    return tempArray.map(item => item.renderInCart()).join("");
  }

  add(product) {
    product = new Product(product, this, product.amount)
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


    let selectedProduct = this.getCartObject().cartProducts.find(storeProd => storeProd.id === product.id);
    if (selectedProduct) {
      product = new Product(selectedProduct, this, selectedProduct.amount)
      product.amount += 1;

    } else {
      product.amount += 1;
      this.getCartObject().cartProducts.push(product);

    }
    product.showDiscount();
    this.saveToStore(product);
  }




  removeFromStore(product) {
    let removedProduct = this.getCartObject().cartProducts.find(
      storeProd => storeProd.id === product.id
    );
    store.cartProducts = this.getCartObject().cartProducts.filter(
      product => product != removedProduct
    );

    this.updateCartIconQty()
    this.calculateTotal();
    $('.tooltip').remove();


    store.save();
    this.render();
  }

  saveToStore(product) {
    let productInStore = this.getCartObject().cartProducts.find(
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

  calculateTotal() {
    this.totalPrice = 0;
    this.totalDiscount = 0;
    this.calcDiscount();
    this.calcShipping();
    this.calcTax();
    this.calcOrderTotal();
  }

  calcDiscount() {
    this.totalPrice = 0;
    this.totalDiscount = 0;
    this.getCartObject().cartProducts.map(item => {
      item.currentPrice = item.amount * item.price;
      let [discountQuantity, forQuantity] = item.discount || [];
      if (discountQuantity) {
        let numDiscountItem = Math.floor(item.amount / discountQuantity);
        let discountSum = item.price * numDiscountItem;
        if (item.amount < 3) {
          $(`#discount-${item.id}`).html('');
        } else {
          $(`#discount-${item.id}`).html('You saved ' + discountSum + '€')
        }

        item.currentPrice -= discountSum;
        //$(`#price-${item.id}`).html('€  ' + item.currentPrice);
        this.totalDiscount += discountSum;

        //store.save();
      }
      this.totalPrice += item.currentPrice;

      $(`#price-${item.id}`).html(this.format(item.currentPrice) + ' €');
      $('#total-price').html(this.format(this.totalPrice) + ' €');
      $('#total-discount').html('- ' + this.format(this.totalDiscount) + ' €');

    });

  }

  calcTax() {

    this.tax = (0.20 * this.totalPrice);
    $('#tax').html(this.format(this.tax) + ' €');

  }

  calcShipping() {
    this.totalWeight = 0;
    this.getCartObject().cartProducts.map(item => {
      this.totalWeight += (item.weight * item.amount);

    })
    if (this.totalWeight < 1) {
      this.shipping = 'free';
      $('#shipping').html(this.shipping);
    } else {
      this.shipping = (4 * this.totalWeight);
      $('#shipping').html(this.format(this.shipping) + ' €');
    }
  }

  calcOrderTotal() {
    if (this.totalWeight < 1) {
      this.orderTotal = this.totalPrice;
    } else {
      this.orderTotal = (parseFloat(this.totalPrice) + parseFloat(this.shipping));
    }
    //$('#order-total').html(this.orderTotal.toFixed(2).replace(".", ",") + ' €');
    $('#order-total').html(this.format(this.orderTotal) + ' €');
  }

  removeToolTipListener() {
    $('body').on('click', e => {
      $('.tooltip').remove();
    })
  }

  updateCartIconQty() {
    let cartCount = 0;
    let cartList = this.getCartObject().cartProducts;
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

  format(n) {
    return n.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

  }

  cartListModal() {
    return /*html*/ `
    <!-- Modal -->
  <div class="modal fade" id="cartListModal" tabindex="-1" role="dialog" aria-labelledby="cartListModalLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="cartListModalLabel">Carts</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <ul class="list-group">
            <li class="list-group-item">Default Cart</li>
            ${this.cartsForModal()}
          </ul>
          <div class="input-group mb-3 mt-5">
          <input type="text" class="form-control" placeholder="Name On New Cart" aria-label="Name On New Cart" aria-describedby="basic-addon2">
         <div class="input-group-append">
           <button class="btn btn-outline-secondary" type="button"><i class="fas fa-cart-plus"></i></button>
         </div>
          </div>  
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
    `
  }

  addNewCart(){
    
  }
  cartsForModal() {
    return store.carts.map(cart => this.cartName != "Default Cart" ? /*html*/ `<li class="list-group-item">${cart.name}</li>` : "").join("")
  }


}