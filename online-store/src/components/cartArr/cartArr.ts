import { Iproduct } from "../model/model";
import { response } from "../../pages/Home/Home";
import { params } from "../../pages/Home/sortAndSearch";
let currentProduct: Iproduct;
let cartTotal: number = 0;
let cartItem: number = 0;
let cartArr: number[] = [];
let isBay: boolean = false;

export const getCartTotalAndItemHome: () => void = () => {
  const allCards: NodeListOf<Element> = document.querySelectorAll(".home-card");
  const cartTotalEl = document.querySelector(".cart-total") as HTMLElement;
  const cartItemEl = document.querySelector(".cart-item") as HTMLElement;
  allCards.forEach((card) => {
    card.addEventListener("click", (event: Event) => {
      currentProduct = response[+card.id - 1];
      console.log(card.id);
      const target = event.target as HTMLElement;
      if (target.className.split(" ")[1] === "add-cart") {
        changeToCart(cartTotalEl, cartItemEl, target);
      }
      if (target.classList.contains("details")) {
        params.set("id", `${card.id}`);
        window.history.replaceState(
          {},
          "",
          `${document.location.pathname}?${params.toString()}`
        );
      }
    });
  });
};

export const getCartTotalAndItemProduct: () => void = () => {
  const addButton = document.querySelector(".add-cart") as HTMLElement;
  const bayButton = document.querySelector(".bay-now") as HTMLElement;
  const cartTotalEl = document.querySelector(".cart-total") as HTMLElement;
  const cartItemEl = document.querySelector(".cart-item") as HTMLElement;
  addButton.addEventListener("click", () => {
    changeToCart(cartTotalEl, cartItemEl, addButton);
  });
  bayButton.addEventListener("click", () => {
    isBay = true;
    if (!cartArr.includes(currentProduct.id)) {
      cartArr.push(currentProduct.id);
      cartTotal += currentProduct.price;
      cartTotalEl.innerHTML = `Cart-total: ${cartTotal}$`;
      cartItemEl.innerHTML = `Cart(${++cartItem})`;
    }
  });
};

function changeToCart(
  cartTotalEl: HTMLElement,
  cartItemEl: HTMLElement,
  addButton: HTMLElement
): void {
  if (!cartArr.includes(currentProduct.id)) {
    cartArr.push(currentProduct.id);
    cartTotal += currentProduct.price;
    cartTotalEl.innerHTML = `Cart-total: ${cartTotal}$`;
    cartItemEl.innerHTML = `Cart(${++cartItem})`;
    addButton.innerHTML = "DROP FROM CART";
  } else {
    cartArr.splice(cartArr.indexOf(currentProduct.id), 1);
    cartTotal -= currentProduct.price;
    cartTotalEl.innerHTML = `Cart-total: ${cartTotal}$`;
    cartItemEl.innerHTML = `Cart(${--cartItem})`;
    addButton.innerHTML = "ADD TO CART";
  }
}

export function clickCart() {
  const cartHeader = document.querySelector(".cart-item") as HTMLElement;
  cartHeader.addEventListener("click", () => {
    isBay = false;
  });
}

export { currentProduct, cartTotal, cartItem, cartArr, isBay };
