class OrderHistory {
  render() {
    $("main").html(/*html*/ `
        <div class="container">
      <div class="row d-flex flex-column">
      
          <div class="col-12 d-flex flex-row justify-content-around">
            <span class="wide-item">#</span>
            <span class="wide-item">Customer</span>
            <span class="wide-item">Location</span>
            <span class="wide-item">Order Date</span>
            <span class="wide-item">Status</span>
            <span class="wide-item">Net Amount</span>
            <span class="wide-item">Action</span>
          </div>
       

        <ol class="col-12" id="history-list">
        ${store.purchases.map(order => this.renderInList(order)).join("")}
        
          

        </ol>
      </div>
    </div>
    `);
  }

  renderInList(order) {
    // This is how I render myself in a list of products
    // (this method is called from a ProductList)
    return /*html*/ `<section class="list-group-item col-12 d-flex flex-row justify-content-around pl-0 pr-0">
        <div class="wide-item ">${order.orderNumber}</div>
        <div class="wide-item">
        <span>${order.customer.firstName} ${order.customer.lastName}</span>
          
        </div>
        
        <div class="wide-item">${order.customer.country}</div>
        <div class="wide-item">${this.unixToDate(parseInt(order.orderNumber) + 3600000)}</div>
        <div class="wide-item"><span class="status text-warning">&bull;</span> Pending</div>
        <div class="wide-item">${order.cart.totalPrice}€</div>
        <div class="wide-item">
          <a
            href="#"
            class="view"
            title="View Details"
            data-toggle="tooltip"
            ><i class="fas fa-info-circle"></i></a>
        </div>
      </section>`;
  }
  unixToDate(unixTimestamp) {
    return new Date(unixTimestamp).toUTCString("sv-SV").slice(5, 22);
  }
  dayTimeSaving() {}
}
