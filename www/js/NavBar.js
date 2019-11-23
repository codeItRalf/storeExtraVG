class NavBar {

  render() {
    $('header').html(/*html*/`
    <nav class="navbar navbar-expand-lg navbar-light bg-primary navbar-dark fixed-top">
    <a class=" navbar-brand" href="#">Chyvek-Data</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <a class="nav-link" href="#">Start</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#omoss">Om oss</a>
        </li>
        <li class="nav-item">
          <a class="nav-link " href="#produkter" id="produkter" role="button" data-toggle="collapse" data-target="#sub-nav" >Produkter</a>
           <div class="collapse " id="sub-nav">
           <div class="d-lg-flex">
           <a class="nav-link" id="product-laptop" href="#produkter&laptop">Laptops</a>
           <a class="nav-link" id="product-monitor" href="#produkter&monitor">Screens</a>
           <a class="nav-link" id="product-usb" href="#produkter&usb">USB-accessories</a>
           </div>
           </div>
        </li>
      </ul>

      <ul class="navbar-nav">
        <li class="cart-icon">
          <a class="fas fa-shopping-cart nav-link" href="#cart"></a>
        </li>
      </ul>
    </div>
    
  </nav>
    `);
  }


  subNavCollapse(){
    $('#sub-nav').collapse('hide')
  }








}