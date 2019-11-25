class PaymentInfo{
    render() {
        $("main").html(/*html*/ `
        <div class="form form-group">
        <form class="row">
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
            <a class="btn btn-primary" href="#adressinfo">Back</a>
            </div>
            <div class="col-6">
            <a type="submit" class="btn btn-primary" href="#confirmation" id="confirmbutton">Confirm</a>
            </div>
          </form>
        </div>
        `);
      }
    }
    
    
    