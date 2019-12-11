class NavBar {

 constructor(){
 
 }


  render() {
    $('header').html( /*html*/ `
    <nav class="navbar-header-color navbar navbar-expand-lg navbar-light navbar-dark fixed-top ">
    <i class="fas fa-laptop" id="logo"></i>
    <a class=" navbar-brand" href="#">Chyvek-Data</a>
   
    
   
    <div class="d-flex order-lg-3">
    
    <div class="cart-icon navbar-nav " id="cart-button">
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
          <a class="nav-link menu-link active" href="#"><span>Start</span></a>
          <div  id="nav-active-line"></div>
        </li>
        <li class="nav-item">
          <a class="nav-link menu-link" href="#omoss"><span>About us</span></a>
        </li>
        <li class="nav-item">
        <a class="nav-link menu-link" href="#orderhistory"><span>Order history</span></a>
      </li>
        <li class="nav-item">
          <a class="nav-link menu-link" href="#produkter" id="produkter" role="button" data-toggle="collapse" data-target="#sub-nav" ><span>Products</span><span id="sub-toggler"> <i class="fas icon-size fa-angle-up"></i></span></a>
           <div class="collapse" id="sub-nav">
           <div class="d-lg-flex" id="sub-menu">
           <a class="nav-link menu-link navbar-header-color" id="product-laptop" href="#produkter&laptop"><span>Laptops</span></a>
           <a class="nav-link menu-link navbar-header-color" id="product-monitor" href="#produkter&monitor"><span>Screens</span></a>
           <a class="nav-link menu-link navbar-header-color" id="product-usb" href="#produkter&usb"><span>USB-accessories</span></a>
           </div>
           </div>
        </li>
      </ul>
    </div>
  </nav>
    `);
   
     $(document).ready( ()=> this.refreshListener())
      
  }

  refreshListener(){
    this.responsiveListener()  
    this.collapseListener()
 
    let hash = location.hash.replace(/#/g, '');
    let firstHash  = hash.split('&')[0]
    let subHash = hash.split('&')[1]
    if(firstHash == 'produkter'){
      $('#produkter').trigger('click')
    }
  
  setTimeout(()=>this.extendSub(subHash),200)
  }

  extendSub(subHash){

    switch(subHash){
      case "laptop":
         $('#product-laptop')[0].click()
        break
        case "monitor":
            $('#product-monitor')[0].click()
        break
        case "usb":
            $('#product-usb')[0].click()
        break
    }
  }
  
  collapseListener(){
    $('#sub-nav').on('shown.bs.collapse',function() {
      this.animateNavLine()
      $('#sub-toggler').html('<i class="fas icon-size fa-angle-up"></i>')
    }.bind(this))
    $('#sub-nav').on('hidden.bs.collapse', function() {
      this.animateNavLine()
      $('#sub-toggler').html('<i class="fas icon-size fa-angle-down"></i>')
    }.bind(this))
    $('#navbarSupportedContent').on('hidden.bs.collapse',  ()=> this.animateNavLine() ) 
    $('#navbarSupportedContent').on('shown.bs.collapse',  ()=> this.animateNavLine() )
   
 
  }

  

  responsiveListener(){
    $('.menu-link').on('click', (e)=> {
      if($(".navbar-expand-lg .navbar-toggler").is(":visible")){
        if(e.currentTarget.id != "produkter"){
          this.navCollapse();
        }
    }})

    $('main, footer').on('click', (e)=> {
      if($(".navbar-expand-lg .navbar-toggler").is(":visible")){
          this.navCollapse();
    }})
  }
  
  subNavCollapse() {
    $('#sub-nav').collapse('hide')
   }
  
   
  navCollapse() {
    $('#navbarSupportedContent').collapse('hide')
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
        $("#nav-active-line").show();
      })
    }else{
      $("#nav-active-line").hide()
    }

  }



}