
class Product {


  /*
    I am a Product.

    I know how to display myself on a single page (product detail).
    I also know how to display myself in a list of products.
    On top of that I know how to call the cart when someone
    clicks my buy-button.
  */

  constructor(data, cart, counter) {
    // Object.assign is used to copy all properties from data to me
    Object.assign(this, data);
    // I also know who is my cart (the App sent me this info)
    this.cart = cart;
    // I add listeners to my buy-button(s)
    this.amount = 0;

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
      e.target.innerText = "In cart";
      e.target.disabled = true;
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
   

    console.log("Animation called")
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
          <button id="buy-button-${this.id}" class="btn btn-primary my-2">Add to cart</button>
        </div>
        <div class="col-12 col-lg-3 product-image-${this.id}">
          <img class="img-fluid border border-primary rounded" src="${this.image}">
        </div>
      </section>
    `);
  }

  renderInList() {
    // This is how I render myself in a list of products
    // (this method is called from a ProductList)
    return `
      <div class="col-12 col-md-6 col-lg-4 mt-5 position-static">
        <a href="#${this.slug}">
          <h4>${this.name} ${this.price} €</h4>
          <button id="buy-button-${this.id}" class="btn btn-primary my-2">Add to cart</button>
          <img class="img-fluid border border-primary rounded product-image-${this.id}" src="${this.image}">
        </a>
      </div>
    `
  }
  removeProduct() {

    $('body').on('click', `#remove-button-${this.id}`, e => {
      e.preventDefault();
      this.amount = 0;
      this.cart.removeFromStore(this);
     // $( `#remove-button-${this.id}`).parent().siblings().remove();
    });
  }

  addPlusButtonClickListener() {
    let rowTotal = 0;
    $('body').on('click', `#add-${this.id}`, e => {
      e.preventDefault();
      this.amount += 1;
      rowTotal = this.price * this.amount;
      this.cart.saveToStore(this);
    });
  }

  addMinusButtonClickListener() {

    $('body').on('click', `#remove-${this.id}`, e => {
      e.preventDefault();
      this.amount -= 1;

      if (this.amount <= 0) {
        this.cart.removeFromStore(this);
      }
      this.cart.saveToStore(this);
    });
  }

  renderInCart() {

    return `
    <div class="col-2 col-lg-2">
    <img class="img-fluid rounded" src="${this.image}">
    </div>

    <div class=" col-4 col-lg-4 d-flex align-items-center">
    <h6>${this.name}</h6>
    
    </div>

    </div>
    <div class=" col-2 col-lg-1 d-flex align-items-center">
    <h5 id="price">€${this.price}</h5>
    
    </div>


    <div class="col-2 col-lg-2 amount d-flex align-items-center ">
    <span class="oi oi-plus" id="add-${this.id}"></span>
    <h5 class="px-2">${this.amount}</h5>
    <span class="oi oi-minus" id="remove-${this.id}"></span>
    </div>

  
  <div class=" col-2 col-lg-3 d-flex align-items-center ">
    <button id="remove-button-${this.id}" class="btn btn-secondary my-2">remove</button>
  </div>

    `
  }



}
