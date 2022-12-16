import { cartItem, cartTotal } from "../model/functionsForCart";

export const Header = () => {
    return `
    <header>
        <div class="header-wrapper">
        <a href="#home">
          <h1 class="header-title">ONLINE-STORE</h1>
        </a>
          <div class="cart-total">Cart-total: ${cartTotal}$</div>
          <a href="#cart" class="cart-item">Cart(${cartItem})</a>
        </div>
    </header>
    `;
}