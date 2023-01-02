import { cartItem, cartTotal } from "../cartArr/cartArr";

export const header = () => {
    return `
    <header>
        <div class="header-wrapper">
        <a href="#/">
          <h1 class="header-title">ONLINE-STORE</h1>
        </a>
          <div class="cart-total">Cart-total: ${cartTotal}$</div>
          <a href="#/cart" class="cart-item">Cart(${cartItem})</a>
        </div>
    </header>
    `;
}