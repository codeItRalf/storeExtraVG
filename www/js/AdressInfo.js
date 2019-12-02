class AdressInfo {
  render() {
    $("main").html(/*html*/ `
    <div class="row">
    <div class="col-md-4 order-md-2 mb-4">
      <h4 class="d-flex justify-content-between align-items-center mb-3">
        <span class="text-muted">Your cart</span>
        
      </h4>
      <ul class="list-group mb-3">
       ${this.loadCart()}
      </ul>

      <form class="card p-2">
        <div class="input-group">
          <input type="text" class="form-control" placeholder="Promo code">
          <div class="input-group-append">
            <button type="submit" class="btn btn-secondary">Redeem</button>
          </div>
        </div>
      </form>
    </div>
    <div class="col-md-8 order-md-1">
      <h4 class="mb-3">Billing address</h4>
      <form class="needs-validation" novalidate="">
        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="firstName">First name</label>
            <input type="text" class="form-control" id="firstName" placeholder="" value="" required="">
            <div class="invalid-feedback">
              Valid first name is required.
            </div>
          </div>
          <div class="col-md-6 mb-3">
            <label for="lastName">Last name</label>
            <input type="text" class="form-control" id="lastName" placeholder="" value="" required="">
            <div class="invalid-feedback">
              Valid last name is required.
            </div>
          </div>
        </div>

       

        <div class="mb-3">
          <label for="email">Email </label>
          <input type="email" class="form-control" id="email" placeholder="you@example.com">
          <div class="invalid-feedback">
            Please enter a valid email address for shipping updates.
          </div>
        </div>

        <div class="mb-3">
          <label for="address">Address</label>
          <input type="text" class="form-control" id="address" placeholder="1234 Main St" required="">
          <div class="invalid-feedback">
            Please enter your shipping address.
          </div>
        </div>

        <div class="mb-3">
          <label for="address2">Address 2 <span class="text-muted">(Optional)</span></label>
          <input type="text" class="form-control" id="address2" placeholder="Apartment or suite">
        </div>

        <div class="row">
          <div class="col-md-5 mb-3">
            <label for="country">Country</label>
            <select class="custom-select d-block w-100" id="country" required="">
              <option value="">Choose...</option>
              <option>Sweden</option>
              <option>Denmark</option>
              <option>Norway</option>
              <option>Finland</option>
            </select>
            <div class="invalid-feedback">
              Please select a valid country.
            </div>
          </div>
          <div class="col-md-3 mb-3">
            <label for="zip">Zip</label>
            <input type="text" class="form-control" id="zip" placeholder="" required="">
            <div class="invalid-feedback">
              Zip code required.
            </div>
          </div>
        </div>
        <hr class="mb-4">
        <div class="custom-control custom-checkbox">
          <input type="checkbox" class="custom-control-input" id="same-address">
          <label class="custom-control-label" for="same-address">Shipping address is the same as my billing address</label>
        </div>
        <div class="custom-control custom-checkbox">
          <input type="checkbox" class="custom-control-input" id="save-info">
          <label class="custom-control-label" for="save-info">Save this information for next time</label>
        </div>
        <hr class="mb-4">
        <div class="row">
        <div class="col-md-8 mx-auto">
        <h4 class="mb-3">Payment</h4>
        
        <article class="card">
        <div class="card-body p-5">
        
        <ul class="nav bg-light nav-pills rounded nav-fill mb-3" role="tablist">
          <li class="nav-item">
            <a class="nav-link active" data-toggle="pill" href="#nav-tab-card">
            <i class="fa fa-credit-card"></i> Credit Card</a></li>
          <li class="nav-item">
            <a class="nav-link" data-toggle="pill" href="#nav-tab-paypal">
            <i class="fab fa-paypal"></i>  Paypal</a></li>
          <li class="nav-item">
            <a class="nav-link" data-toggle="pill" href="#nav-tab-bank">
            <i class="fa fa-university"></i>  Bank Transfer</a></li>
        </ul>
        
        <div class="tab-content">
        <div class="tab-pane fade show active" id="nav-tab-card">
          <p class="alert alert-success">Some text success or error</p>
          <form role="form">
          <div class="form-group">
            <label for="username">Full name (on the card)</label>
            <input type="text" class="form-control" name="username" placeholder="" required="">
          </div> <!-- form-group.// -->
        
          <div class="form-group">
            <label for="cardNumber">Card number</label>
            <div class="input-group">
              <input type="text" class="form-control" name="cardNumber" placeholder="">
              <div class="input-group-append">
                <span class="input-group-text text-muted">
                  <i class="fab fa-cc-visa"></i>   <i class="fab fa-cc-amex"></i>   
                  <i class="fab fa-cc-mastercard"></i> 
                </span>
              </div>
            </div>
          </div> <!-- form-group.// -->
        
          <div class="row">
              <div class="col-sm-8">
                  <div class="form-group">
                      <label><span class="hidden-xs">Expiration</span> </label>
                    <div class="input-group">
                      <input type="number" class="form-control" placeholder="MM" name="">
                        <input type="number" class="form-control" placeholder="YY" name="">
                    </div>
                  </div>
              </div>
              <div class="col-sm-4">
                  <div class="form-group">
                      <label data-toggle="tooltip" title="" data-original-title="3 digits code on back side of the card">CVV <i class="fa fa-question-circle"></i></label>
                      <input type="number" class="form-control" required="">
                  </div> <!-- form-group.// -->
              </div>
          </div> <!-- row.// -->
          <button class="subscribe btn btn-primary btn-block" type="button"> Confirm  </button>
          </form>
        </div> <!-- tab-pane.// -->
        <div class="tab-pane fade" id="nav-tab-paypal">
        <p>Paypal is easiest way to pay online</p>
        <p>
        <button type="button" class="btn btn-primary"> <i class="fab fa-paypal"></i> Log in my Paypal </button>
        </p>
        <p><strong>Note:</strong> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. </p>
        </div>
        <div class="tab-pane fade" id="nav-tab-bank">
        <p>Bank accaunt details</p>
        <dl class="param">
          <dt>BANK: </dt>
          <dd> THE WORLD BANK</dd>
        </dl>
        <dl class="param">
          <dt>Accaunt number: </dt>
          <dd> 12345678912345</dd>
        </dl>
        <dl class="param">
          <dt>IBAN: </dt>
          <dd> 123456789</dd>
        </dl>
        <p><strong>Note:</strong> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. </p>
        </div> <!-- tab-pane.// -->
        </div> <!-- tab-content .// -->
        
        </div> <!-- card-body.// -->
        </article> <!-- card.// -->
        
        
          </div> <!-- col.// -->
          </div>
        <hr class="mb-4">
        <button class="btn btn-primary btn-lg btn-block" type="submit">Continue to checkout</button>
      </form>
    </div>
  </div>
    `);
  }


  loadCart() {
    let listProducts = ""
    let cartList = store.cartProducts

    cartList.forEach(product => {
      listProducts += /*html*/ `<li class="list-group-item d-flex justify-content-between lh-condensed">
     <div>
        <div id="thumb-nail">
        <img class="my-0 img-responsive img-rounded mh-100 mw-auto" src="${product.image}">
        </div>
        <small class="text-muted">${product.name}  </small>
    </div>
    <span class="text-muted">${product.price} €</span>
    <span class="text-muted">Pcs: ${product.amount} </span>
</li>`
    })

    return listProducts


  }


}





