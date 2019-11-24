class Product {


  /*
    I am a Product.

    I know how to display myself on a single page (product detail).
    I also know how to display myself in a list of products.
    On top of that I know how to call the cart when someone
    clicks my buy-button.
  */

  constructor(data, cart) {
    // Object.assign is used to copy all properties from data to me
    Object.assign(this, data);
    // I also know who is my cart (the App sent me this info)
    this.cart = cart;
    // I add listeners to my buy-button(s)
    this.addBuyButtonListener();
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
      // this.cart is an instance of Cart
      // add me to that cart
     // this.cart.add(this);
      this.animateImage()
    });
  }
  
  animateImage(){
    let image = $(`.product-image-${this.id}`)[0]
    let clonedImage = $(image).clone(true)
    console.log(clonedImage)
    $(clonedImage).css({position :"absolute",
       top : $(image).offset().top,
       left : $(image).offset().left})
    let position = $("#cart-button").offset()

    $(clonedImage).animate({
        left: position.left,  
        top: position.top 
     });

        console.log("Animate called!")
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
      <div class="col-12 col-md-6 col-lg-4 mt-5">
        <a href="#${this.slug}">
          <h4>${this.name} ${this.price} €</h4>
          <button id="buy-button-${this.id}" class="btn btn-primary my-2">Add to cart</button>
          <img class="img-fluid border border-primary rounded product-image-${this.id}" src="${this.image}">
        </a>
      </div>
    `
  }
  

}
