
class Product {


  /*
    I am a Product.

    I know how to display myself on a single page (product detail).
    I also know how to display myself in a list of products.
    On top of that I know how to call the cart when someone
    clicks my buy-button.
  */

  constructor(data, cart, amount) {
    // Object.assign is used to copy all properties from data to me
    Object.assign(this, data);
    // I also know who is my cart (the App sent me this info)
    this.cart = cart;
    // I add listeners to my buy-button(s)
    //console.log('amount in constructor', amount)
    this.amount = amount || 0;
    this.currentPrice = 0;

    if (amount > 0) {
      this.currentPrice = this.price * this.amount;
      let [discountQuantity,forQuantity] = this.discount || [];
      if(discountQuantity){
        let numDiscountItem = Math.floor(this.amount/discountQuantity);
        let discountSum = this.price * numDiscountItem;
        console.log('discount',discountQuantity,'for',forQuantity, 'you saved',discountSum)
        this.currentPrice -= discountSum;
        //$(`#price-${this.id}`).html('€  ' + this.currentPrice);
        store.save();
      }
    }

    this.removeProduct();
    this.addBuyButtonListener();
    this.addPlusButtonClickListener();
    this.addMinusButtonClickListener();
  }


  addBuyButtonListener() {
    // this a delegated event handler:
    // * when you click on the body
    // * if you clicked inside something matching the css-selector
    //   #buy-button-myId 
    // * then run the anonymous arrow function...
    $('body').on('click', `#buy-button-${this.id}`, e => {
      // e is the event object
      // it has a preventDefault method
      // when you call that method it prevents the browser
      // from doing what it normally does on a certain element
      // since the buy button is sometimes inside a a-tag
      // in this case it prevents us from following the a-tag
      e.preventDefault();
      e.stopImmediatePropagation();
      //e.target.innerText = "In cart";
      //e.target.disabled = true;
      // this.cart is an instance of Cart
      // add me to that cart
      this.cart.add(this);
      //Animate added product to cart
      this.animateImage()
    })

  }

  animateImage() {
    let image = $(`.product-image-${this.id}`)[0]
    if(image){
      let imagePosition = $(image).offset()
      let clonedImage = $(image).clone()
     
      $(clonedImage).css({position :"absolute",
         top : imagePosition.top,
         left : imagePosition.left,
         "z-index" : 3000,
        width : image.width,
        height : image.height})
         $(clonedImage).appendTo($(image).parent())
         console.log(clonedImage)
      let position = $("#cart-button").offset() 
     console.log(position)
      $(clonedImage).animate({
          left:   position.left,  
          top:   position.top,
          opacity: 30,
          width: 10,
          height: 10
       }, 400,()=>{
        $(clonedImage).remove()
  
        let cart =  $("#cart-button").animate({
          opacity: "0"
        },100,()=>{
          cart.animate({
            opacity: "1"
          },100)
        })
       });
    }

  }



  render() {
    // This is how I render myself on a product-detail page
    // there it only me
    $('main').html(/*html*/`
     <section class="row">
        <div class="col">
          <h1>${this.name}</h1>
        </div>
      </section>
      <section class="row">
        <div class="col-12 col-lg-9">
          <p>${this.description}</p>
          <p>Weight: ${this.weight}</p>
          <h4>${this.price} €</p>
          <button id="buy-button-${this.id}" class="btn btn-info my-2">Add to cart</button>
        </div>
        <div class="col-12 col-lg-3 product-image-${this.id}">
          <img class="img-fluid " src="${this.image}">
        </div>
      </section>
    `);
  }

  renderInList() {
    // This is how I render myself in a list of products
    // (this method is called from a ProductList)
    return `
      <div class="col-12 col-md-6 col-lg-4 mt-5 position-static text-info">
        <a href="#${this.slug}">
          <h5>${this.name} ${this.price} €</h5>
          <button id="buy-button-${this.id}" class="btn btn-info my-2">Add to cart</button>
          <img class="img-fluid border border-primary rounded product-image-${this.id}" src="${this.image}" >
        </a>
      </div>
    `
  }
  removeProduct() {

    $('body').on('click', `#remove-button-${this.id}`, e => {
      e.preventDefault();
      this.amount = 0;
      this.cart.removeFromStore(this);
      $(`.cart-content-${this.id}`).remove();
    });
  }

  addPlusButtonClickListener() {
    // $(`#add-${this.id}`).unbind('click');
    $('body').on('click', `#add-${this.id}`, e => {
      e.stopImmediatePropagation();
      let clickedItemInCart = store.cartProducts.find(cartItem => cartItem.id === this.id);
      this.amount = clickedItemInCart.amount;

      this.amount++;
      this.currentPrice= this.price * this.amount;

      //$(`#price-${this.id}`).html(`€  ${this.currentPrice}`);
      //$(`#price-${this.id}`).html('€  ' + this.currentPrice);
       //$(`#amount-${this.id}`).html(this.amount);
      this.cart.saveToStore(this);
    });
  }

  addMinusButtonClickListener() {
    $('body').on('click', `#remove-${this.id}`, e => {
      e.stopImmediatePropagation();
      let clickedItemInCart = store.cartProducts.find(cartItem => cartItem.id === this.id);
      this.amount = clickedItemInCart.amount;

      this.amount -= 1;
      this.currentPrice= this.price * this.amount;

      // $(`#price-${this.id}`).html('€ ' + this.currentPrice);

      if (this.amount <= 0) {
        this.cart.removeFromStore(this);
         $(`.cart-content-${this.id}`).remove();
      }
      //  $(`#amount-${this.id}`).html(this.amount);

      //this.cart.calculateTotal();
      this.cart.saveToStore(this);
    });
  }


  renderInCart() {

    return `
    <div class="col-12 cart-content-${this.id} border-top border-secondary " id="cart-info">
    <div class = "row py-3 d-flex justify-content-center w-75"> 
    <div class=" col-12 col-md-2">
    <img class="img-fluid rounded cart-image d-flex align-items-center " src="${this.image}" style="width: 50px; height: 50px;">
    </div>

    <div class=" col-12 col-md-4 d-flex align-items-center my-1">
    <h6>${this.name}</h6>
    
    </div>

    
    <div class="col-6 col-md-2 d-flex align-items-center">
    <h5 id="price-${this.id}">€${this.currentPrice}</h5>
    
    </div>


    <div class=" col-6 col-md-2 d-flex align-items-center  flex-row py-2">
    <span class="oi oi-minus" id="remove-${this.id}"></span>
    <h5 class="px-2" id="amount-${this.id}">${this.amount}</h5>
    <span class="oi oi-plus" id="add-${this.id}"></span>
    </div>

  
  <div class="col-12 col-md-2 d-flex align-items-center">
    <button id="remove-button-${this.id}" class="btn btn-secondary my-2">remove</button>
  
  </div>

    </div>

</div>
    `
  }





}
