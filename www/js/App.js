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
      'cart' : new Cart()
    };
    

    //Code for the navbar
    this.navBar = new NavBar()
    this.navBar.render()
    //Changes location hash thru javascript due Href doent work when using collapse class
    $('header').on('click', '#produkter', ()=>{  location.hash = "#produkter"})

   
    // A shop should always have a cart
    this.cart = new Cart();
    // Listen to hash changes - rerender...
    $(window).on('hashchange', () => this.changeRoute());
    // Load the products from JSON
    this.loadProducts();
  }

  changeRoute() {
    // Get the hash from the url - remove the #-sign
    let hash = location.hash.replace(/#/g, '');
    // The first part of the hash is everything before a '-' character
    let hashFirstPart = hash.split('-')[0];

    //split hash at "&" second string is subcategory
    this.subCategory = hash.split('&')[1]
    if(!this.subCategory){this.navBar.subNavCollapse()
    console.log("Colapse")}

    //Each time the method gets called filter and make new list the sub category from the list which is created in loadProducts()
    if(this.subCategory){
    this.routes.produkter = new ProductList(this.products.filter(product => product.category ==  this.subCategory));
    }else
    this.routes.produkter = new ProductList(this.products)

    // Look up the "page to show" - the instance to call render on
    // if we do not find any page set the page to 'page404'
    let pageToShow = this.routes[hash.split('&')[0]] || this.routes.page404;
    // Make the correct menu item active
    // (the css selector finds a-tags with matching hrefs)
    $('header nav a').removeClass('active');
    $(`header nav a[href="#${hashFirstPart}"]`).addClass('active');
    // Render content
    pageToShow.render();
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
          let product = new Product(productData, this.cart);
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