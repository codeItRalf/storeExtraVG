
class OrderHistory {


  constructor(){
  this.sort = false;
  this.orderCopy = []
  }
  render() {

    $("main").html(/*html*/ `
        <div class="">
      <div class="row d-flex flex-column">
      
          <div class="col-12 d-flex flex-row justify-content-between">
            <span class="wide-item d-none d-sm-block">#</span>
            <span class="wide-item customer">Customer</span>
            <span class="wide-item customer-adress">Adress</span>
            <span class="wide-item customer-location">Location</span>
            <div class="wide-item  d-flex justify-content-center" id="toggle-order">
            <span>Order Date</span>
            <div>
             ${this.sort ? ' <span class="oi oi-data-transfer-upload sort-history"></span>' : ' <span class="oi oi-data-transfer-download sort-history"></span>'} 
            </div>
            </div>
            <span class="wide-item delivery-status">Status</span>
            <span class="wide-item">Amount</span>
          </div>
       

        <ol class="col-12" id="history-list">


        ${this.checkOrderHistories() ? this.orderCopy.map(order => this.renderInList(order)).join(""):this.orderListHandler()} 
        
          

        </ol>
      </div>
    </div>
    `);
    if(!store.purchases)  $('#history-list').html('<section class="list-group-item col-12 d-flex flex-row justify-content-around pl-0 pr-0">No Order History</section>')
    $(".detail-button").on(
      "click",
      function(e) {
        console.log(e.target);

        this.getOrderDetails(e.target);
      }.bind(this));


    $("#toggle-order" ).click( ()=> {
      this.orderCopy = $.extend(true, [], store.purchases)
      this.orderCopy.sort(this.compare.bind(this.sort))
      this.sort = !this.sort
      this.render()
    })
    
  }
 orderListHandler(){
   let orderList = store.purchases.map(order => this.renderInList(order)).join("")
   if (orderList){
     return orderList;
   }
   else {
     return ""
   }
 }
 checkOrderHistories(){
    if (store.purchases && store.purchases.length > this.orderCopy.length){
      this.sort = false;
      return false;
    }
    else  {
      return true;
    }
 }
 compare(a, b) {

    const orderA = a.orderNumber;
    const orderB = b.orderNumber;
    
    let comparison = 0;

      if (orderA > orderB) {
        comparison = this ? 1 : -1;
      } else if (orderA < orderB) {
        comparison= this ? -1 : 1;
      }
  
    return comparison;
  }
 


  renderInList(order) {
    // This is how I render myself in a list of products
    // (this method is called from a ProductList)
    return /*html*/ `<section class="list-group-item col-12 d-flex flex-column justify-content-between  pl-0 pr-0">
        
        <div class="wide-item d-flex  d-block mx-auto d-sm-none">
        <span># </span>
        <div class="detail-button"> <a title="View Details"
        data-toggle="tooltip"> ${order.orderNumber}</a></div>
        </div>

        <div class="d-flex flex-row justify-content-between pl-0 pr-0">   
         
        <div class=" wide-item detail-button d-none  d-sm-block"><a
            title="View Details"
            data-toggle="tooltip">${order.orderNumber}</a>
        </div>
        <div class="wide-item customer">
        <span>${order.customer.firstName} ${order.customer.lastName}</span>
          
        </div>
        <div class="wide-item customer-adress">${order.customer.adress}</div>
        <div class="wide-item customer-location">${order.customer.country}</div>
        <div class="wide-item order-date">${this.unixToDate(
          parseInt(order.orderNumber) + 3600000
        )}</div>
        <div class="wide-item delivery-status"><span class="status text-warning">&bull;</span> Pending</div>
        <div class="wide-item">${order.cart.cartValue.totalPrice}€</div>
        </div>
      </section>`;
  }

  unixToDate(unixTimestamp) {
    return new Date(unixTimestamp).toUTCString("sv-SV").slice(5, 22);
  }

  getOrderDetails(orderNr) {
    let number = $(orderNr).text();
    console.log(store.purchases);
    console.log(number);
    const orderDetail = store.purchases.filter(orderItem => {
      if (orderItem.orderNumber == number) {
        return orderItem;
      }
    });
    this.renderOrderDetails(orderDetail[0]);
  }

  renderOrderDetails(orderItem) {
    console.log(orderItem);
    $("main").html(/*html*/ `
    <div class="row">
    <div class="col-md-4 order-md-2 mb-4">
      <h4 class="d-flex justify-content-between align-items-center mb-3">
        <span class="text-muted">#${orderItem.orderNumber}</span>
        
      </h4>
      <ul class="list-group mb-3´´">
       ${this.loadCart(orderItem)}
      <li class="list-group-item d-flex justify-content-between lh-condensed">
      <div class = "col-md-12 total-price d-flex flex-column justify-content-center py-5">
        <div class="d-flex justify-content-between mb-1">
          <div class="main-color">Sub-total:</div>
          <span class="detail-info"> ${this.format(orderItem.cart.cartValue.totalPrice)}€ </span>
          </div>
          <div class="d-flex justify-content-between mb-1">
          <div class="main-color">Total discount:</div>
          <span class="detail-discount">-${this.format(orderItem.cart.cartValue.totalDiscount)}€ </span>
          </div>
          <div class="d-flex justify-content-between mb-1">
          <div class="main-color">25% VAT:</div>
          <span class="detail-info"> ${this.format(orderItem.cart.cartValue.tax)}€ </span>
          </div>
          <div class="d-flex justify-content-between mb-1">
          <div class="main-color">Shipping:</div>
          <span class="detail-info"> ${orderItem.cart.cartValue.shipping == "free" ? orderItem.cart.cartValue.shipping : this.format(orderItem.cart.cartValue.shipping) + "€"} </span>
          </div>
          <div class="d-flex justify-content-between">
          <div class="main-color">Order Total:</div>
          <span class="detail-info"> ${this.format(orderItem.cart.cartValue.orderTotal)}€ </span>
          </div>
      </div>
      </li>
      </ul>
    
     
    </div>
    <div class="col-md-8 order-md-1">
    
    <div class="card">
      <div class="card-header" id="headingOne">
        <h2 class="mb-0">
          <h4 class="mb-3">Shipping/Billing address</h4>
          
        </h2>
      </div>
      <div id="" class="" aria-labelledby="headingOne" data-parent="">
      <div class="card-body">
    <div class="mw-100">   
      <form data-toggle="validator" id="adress-form" role="form">
        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="firstName">First name:</label>
            <span type="text" class="" id="firstName">${
              orderItem.customer.firstName
            }</span>
            
          </div>
          <div class="col-md-6 mb-3">
            <label for="lastName">Last name:</label>
            <span class="" id="lastName">${orderItem.customer.lastName}</span>
            
          </div>
        </div>

        <div class="mb-3">
          <label for="email">Email:</label>
          <span class="" id="email">${orderItem.customer.email}</span>
          
        </div>
        <div class="col-md-6 mb-3 pl-0">
            <label for="city">City:</label>
            <span type="text" class="" id="city">${
              orderItem.customer.city
            }</span>
            
          </div>

        <div class="mb-3">
          <label for="address">Adress:</label>
          <span class="" id="lastName">${orderItem.customer.adress}</span>
          
        </div>

        <div class="row">
          <div class="col-md-5 mb-3">
            <label for="country">Country:</label>
            <span class="" id="country">${orderItem.customer.country}</span>
          </div>
        </div>
          <div class="col-md-3 mb-3 pl-0">
            <label for="zip">Zip:</label>
            <span class="" id="zip">${orderItem.customer.zip}</span>
            
          </div>
        </div>
        <hr class="mb-4">
        <div class="mt-4">
        <button type="button" class="btn btn-primary" id="back-button">Back</button>
        </div>
    `);
    $("#back-button").on("click", () => this.render());
  }
  loadCart(cart) {
    let object = cart;
    let listProducts = "";
    let cartList = [];
    cartList = object.cart.orderList;

    // hack to convert cartList to array
    // (should have been an array already, where did that go wrong?)
    
    // let newCartList = [];
    // for(let key in cartList){
    //   newCartList[key] = cartList[key];
    // }
    // cartList = newCartList;

    console.log(cartList);

    cartList.map(product => {
    
      listProducts += /*html*/ `<li class="list-group-item d-flex justify-content-between lh-condensed container">
      <div class="row">
        <div class = "col">
            <div id="thumb-nail">
            <img class="my-0 img-responsive img-rounded mh-100 mw-auto w-100" src="${product.image}">
            </div>
            <small class="text-muted my-0">${product.name} </small>
        </div>
        <div class="col d-flex justify-content-between">
            <span class="text-muted">${product.price} €</span>
            <span class="text-muted">Qty: ${product.amount} </span>

        </div>

      </div>
    
</li>`;
    });

    return listProducts;
  }

  format(n) {
    return n.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    
  }

}
