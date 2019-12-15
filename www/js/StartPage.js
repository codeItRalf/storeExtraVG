class StartPage {
  /*
    I am a Start page.
    I display the start page...
  */

  render() {
    $("main").html( /*html*/ `
      <section class="row">
        <div class="col welcometext">
          <h1>Welcome to Chyvek Data!</h1>
          <p>We sell standard computer gear, as well as more premium products. Check out our wares!</p>
        </div>
        </section>
        <section class="row">
        <div class="col">
          <img src="https://charlotteagenda-charlotteagenda.netdna-ssl.com/wp-content/uploads/2015/08/IMG_7603.jpg" class="homepage-img">
        </div>
      </section>
    `);
  }
}