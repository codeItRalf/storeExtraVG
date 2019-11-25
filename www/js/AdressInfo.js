class AdressInfo {
  render() {
    $("main").html(/*html*/ `
<div class="form-group form">    
  <form class="row d-flex adress justify-content-center align-content-center">
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
      <div class="col-6">
    <a class="btn btn-primary" href="#cart">Back</a>
    </div>
    <div class="col-6">
    <a type="link" class="btn btn-primary" href="#payment-info" id="confirmbutton">Payment</a>
    </div>
  </form>
</div>
    `);
  }
}





