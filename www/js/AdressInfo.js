class AdressInfo {
  render() {
    $("main").html(/*html*/ `
<div class="form-group form">    
  <form class="row d-flex adresspayment justify-content-center align-content-center">
      <div class="col-12">
      <h1>Adress info</h1>
      </div>
      <div class="col-6 d-flex justify-content-center align-content-center">
      <p> First name </p>
      </div>
      <div class="col-6">
      <input type="text" placeholder="Enter your first name">
      </div>
      <div class="col-6 d-flex justify-content-center align-content-center">
      <p> Last name </p>
      </div>
      <div class="col-6">
      <input type="text" placeholder="Enter your last name">
      </div>
      <div class="col-6 d-flex justify-content-center align-content-center">
      <p>Email adress</p>
      </div>
      <div class="col-6">
      <input type="text" placeholder="Email adress">
      </div>
      <div class="col-6 d-flex justify-content-center align-content-center">
      <p> Adress </p>
      </div>
      <div class="col-6">
      <input type="text" placeholder="Enter your adress">
      </div>
    
    <div class="col-12">
    <h2>Payment info </h2>
    </div>
    <div class="col-6 d-flex justify-content-center align-content-center">
    <p>Mastercard, Visa and Amex</p>
    </div>
    <div class="col-6">
    <input type="text" placeholder="Card number">
    </div>
    <div class="col-6 d-flex justify-content-center align-content-center">
    <p>Expiration date</p>
    </div>
    <div class="col-6">
    <input type="text" placeholder="Month/Date">
    </div>
    
    <div class="col-6 d-flex justify-content-center align-content-center">
    <p id="securitycode">Security code</p>
    </div>
    <div class="col-6">
    <input type="text" placeholder="Ex: 111">
    </div>
    <div class="col-6">
    <button class="btn btn-primary">Back</button>
    </div>
    <div class="col-6">
    <button type="submit" class="btn btn-primary" id="confirmbutton">Confirm purchase</button>
    </div>
  </form>
</div>
    `);
  }
}




