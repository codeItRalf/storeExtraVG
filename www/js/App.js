class App {

  /*
  
    I am an App.

    I am a router... I display the correct page content.
    I also read all the products from json
    and create routes for them too.
    All routes will replace the content
    in the main-tag :)
  */

  constructor() {
    // This are some routes:
    // * the keys are url hashes
    // * the values are instances of classes
    // (we will add more routes when we have read
    //  the products from JSON)
    this.routes = {
      '': new StartPage(),
      'omoss': new AboutUs(),
      'page404': new Page404(),
      'cart' : new Cart(),
      'adressinfo' : new AdressInfo(),
      'payment-info': new PaymentInfo(),
      'confirmation' : new Confirmation()
    };
    
    //save window width to keep track on responsive changes
    this.fullScreen = false

    //Code for the navbar
    this.navBar = new NavBar()
    this.navBar.render()
    //Changes location hash thru javascript due Href doent work when using bootstrap collapse class
    $('header').on('click', '#produkter', ()=>{  location.hash = "#produkter"})
  



    // A shop should always have a cart
    this.cart = new Cart();
    // Store a new class CartCounter through its constructor in this.cartCounter
    // this.cartCounter is able to call for the method render() in class CartCounter
    // because we stored a new class CartCounter in the property this.cartCounter
    // 
    // this.cartCounter = new CartCounter();
    // this.cartCounter.render();
    
    // Listen to hash changes - rerender...
    $(window).on('hashchange', () => this.changeRoute());
    // Load the products from JSON
    this.loadProducts();
    this.windowSizeListener()
  }

  windowSizeListener(){
      //Everytime width of the window is changed this gets called
      $(window).resize(()=> {
        //This is used when the window width is over 992px and the #sub-menu display flex
       if(parseFloat($(window).width()) > 992 &&  this.fullScreen && $("#sub-menu").css("display") == "flex"){
        this.fullScreen = !this.fullScreen
        this.navBar.animateNavLine()
        //This is used when the window width is under 992px and the #sub-menu display block
       }else if(parseFloat($(window).width()) <= 992 && !this.fullScreen && $("#sub-menu").css("display") == "block"){
        this.fullScreen = !this.fullScreen
        this.navBar.animateNavLine()
       }
      });
     
  }

  changeRoute() {
    // Get the hash from the url - remove the #-sign
    let hash = location.hash.replace(/#/g, '');
    // The first part of the hash is everything before a '-' character
    let hashFirstPart = hash.split('-')[0];

    //split hash at "&" second string is subcategory
    this.subCategory = hash.split('&')[1]
    if(!this.subCategory){this.navBar.subNavCollapse()
    }

    //Each time the method gets called filter and make new list the sub category from the list which is created in loadProducts()
    if(this.subCategory){
    this.routes.produkter = new ProductList(this.products.filter(product => product.category ==  this.subCategory));
    }else if(hashFirstPart == "produkter")
    this.routes.produkter = new ProductList(this.products)

    // Look up the "page to show" - the instance to call render on
    // if we do not find any page set the page to 'page404'
    let pageToShow = this.routes[hash.split('&')[0]] || this.routes.page404;
    // Make the correct menu item active
    // (the css selector finds a-tags with matching hrefs)
    $('header nav a').removeClass('active');
    $(`header nav a[href="#${hashFirstPart}"]`).not(".navbar-brand").addClass('active');
 
    // Render content
    pageToShow.render();

    this.navBar.animateNavLine()
  }




  // An async function is allowed to await things
  // Loading data from JSON takes time
  // await "pauses" until we have have a result
  async loadProducts() {
    // Load the products from JSON
    let productsData = await $.getJSON('/json/products.json');
    // We will convert the raw JSON data to instances of Product
    // and store them in this.products
    this.products = [];
    // Loop through the JSON data and create Products
    for (let productData of productsData) {
      let product = new Product(productData, this.cart, this.cartCounter);
      this.products.push(product);
      this.routes[product.slug] = product;
    }
    localStorage.setItem("products", JSON.stringify(this.products));


    // Make a new product list with all of our products
    // and add it to our routes
    
    // Now we are ready to call changeRoute and display
    // the correct page on initial page load..
    this.changeRoute();
  }
}