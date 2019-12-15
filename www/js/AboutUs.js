class AboutUs {

  /*
    I am an About Us page.
    I display info about us.
  */

  render() {
    $('main').html( /*html*/ `
      <section class="row about-us-text">
        <div class="col">
          <h1>Meet our staff!</h1>
          <p>We are a small company who sell good and reliable computers, computer accessories and monitors for reasonable prices!</p>
        </div>
      </section>
      <section class="row">
      <div class="col">
      <img src="https://miro.medium.com/max/4000/1*k-amjoRy0eejeco76Jz2CA.jpeg" class="about-us-img">
    `);
  }

}