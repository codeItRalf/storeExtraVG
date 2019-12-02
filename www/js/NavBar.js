class NavBar {

  render() {
    $('header').html( /*html*/ `
    <nav class="navbar navbar-expand-lg navbar-light bg-info navbar-dark fixed-top ">
    <a class=" navbar-brand" href="#">Chyvek-Data</a>
    <div  id="nav-active-line"></div>
    
   
    <div class="d-flex order-lg-3">
    <div class="cart-icon navbar-nav" id="cart-button">
    <a class="fas fa-shopping-cart nav-link position-relative" href="#cart">
    <span class="cart-icon-number" id="cart-count"></span>
    </a>
    </div>
    <button class="navbar-toggler ml-3 ml-lg-0" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
    </button>
    </div>
    
    
    
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <a class="nav-link menu-link" href="#"><span>Start</span></a>
       
        </li>
        <li class="nav-item">
          <a class="nav-link menu-link" href="#omoss"><span>About us</span></a>
        </li>
        <li class="nav-item">
          <a class="nav-link menu-link" href="#produkter" id="produkter" role="button" data-toggle="collapse" data-target="#sub-nav" ><span>Products</span></a>
           <div class="collapse bg-info" id="sub-nav">
           <div class="d-lg-flex" id="sub-menu">
           <a class="nav-link menu-link" id="product-laptop" href="#produkter&laptop"><span>Laptops</span></a>
           <a class="nav-link menu-link" id="product-monitor" href="#produkter&monitor"><span>Screens</span></a>
           <a class="nav-link menu-link" id="product-usb" href="#produkter&usb"><span>USB-accessories</span></a>
           </div>
           </div>
        </li>
      </ul>
    </div>

    

  </nav>
    `);
  }


  subNavCollapse() {
    $('#sub-nav').collapse('hide')
  }




  animateNavLine() {
    //Animates nav line
    let element = $(`header nav .menu-link[class~="active"]`).not(".navbar-brand")[0]
    if (element) {
      let position = $(element).offset()
      $("#nav-active-line").animate({
        left: position.left + parseFloat($(element).css("padding-left")),
        top: (position.top + parseFloat($(element).css("height")) - parseFloat($(element).css("padding"))) - parseFloat($(window).scrollTop()),
        width: $(element).find("span").css("width")
      }, 250, ()=>{
        $("#nav-active-line").css('opacity', '1');
      });
    }

  }



}