class CartCounter {
    
/* A counter that counts every time the user clicks on buy*/

    constructor() {
        this.counter = 0;    
    }

/*  This method tells the property (this.counter) to add one
    and also tells the class CartCounter to find the method render
    and update the screen everytime the counter adds.
*/

    addCounter() {
        this.counter++;
        this.render();
    }

    render() {
        $('#cart-counter').html(`
            <input type="text" id="counter" name="name" value="${this.counter}">
            <i class="fas fa-shopping-cart"></i>
        `);
    }
}