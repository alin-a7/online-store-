import { Iproduct } from "../model/model";
import { response } from "../../pages/Home/Home";
import { getCurrentProduct } from "../ProductCard/detailsCard/detailsCard";
import { responseDetails } from "../../pages/Details/details";
import { updateFilteredCart, pageFiltering, updateSumWithDiscount } from "../../pages/Cart/cart";
let currentProduct: Iproduct;
let cartTotal = Number(localStorage.getItem("cartTotal"));
let cartItem = Number(localStorage.getItem("cartItem"));
let isBay = false;
let cartArr: number[];
let cartObjArr: Iproduct[];
const arrObj = localStorage.getItem("cartObjArr");
const arr = localStorage.getItem("cartArr");
if (arr === null) {
  cartArr = [];
} else {
  cartArr = JSON.parse(arr);
}
if (arrObj === null) {
  cartObjArr = [];
} else {
  cartObjArr = JSON.parse(arrObj);
}

export const getCartTotalAndItemHome: () => void = () => {
  const allCards: NodeListOf<Element> = document.querySelectorAll(".home-card");
  const cartTotalEl = document.querySelector(".cart-total") as HTMLElement;
  const cartItemEl = document.querySelector(".cart-item") as HTMLElement;
  allCards.forEach((card) => {
    card.addEventListener("click", (event: Event) => {
      currentProduct = response[+card.id - 1];
      const target = event.target as HTMLElement;
      if (target.className.split(" ")[1] === "add-cart") {
        changeToCart(cartTotalEl, cartItemEl, target);
      }
    });
  });
};

export const getCartTotalAndItemProduct: () => void = () => {
  const addButton = document.querySelector(".add-cart") as HTMLElement;
  const bayButton = document.querySelector(".bay-now") as HTMLElement;
  const cartTotalEl = document.querySelector(".cart-total") as HTMLElement;
  const cartItemEl = document.querySelector(".cart-item") as HTMLElement;
  currentProduct = getCurrentProduct(responseDetails);
  addButton.addEventListener("click", () => {
    changeToCart(cartTotalEl, cartItemEl, addButton);
  });
  bayButton.addEventListener("click", () => {
    isBay = true;
    if (!cartArr.includes(currentProduct.id)) {
      cartObjArr.push(currentProduct);
      cartObjArr[cartObjArr.length - 1].copies = 1;
      cartArr.push(currentProduct.id);
      cartTotal += currentProduct.price;
      cartTotalEl.innerHTML = `Cart-total: ${cartTotal}$`;
      cartItemEl.innerHTML = `Cart(${++cartItem})`;

      localStorage.setItem("cartObjArr", JSON.stringify(cartObjArr));
      localStorage.setItem("cartArr", JSON.stringify(cartArr));
      localStorage.setItem("cartTotal", `${cartTotal}`);
      localStorage.setItem("cartItem", `${cartItem}`);
    }
  });
};

function changeToCart(
  cartTotalEl: HTMLElement,
  cartItemEl: HTMLElement,
  addButton: HTMLElement
): void {
  if (!cartArr.includes(currentProduct.id)) {
    console.log(currentProduct instanceof Iproduct);
    cartObjArr.push(currentProduct);
    cartObjArr[cartObjArr.length - 1].copies = 1;
    cartArr.push(currentProduct.id);
    cartTotal += currentProduct.price;
    cartTotalEl.innerHTML = `Cart-total: ${cartTotal}$`;
    cartItemEl.innerHTML = `Cart(${++cartItem})`;
    addButton.innerHTML = "DROP FROM CART";
  } else {
    const copies = cartObjArr[cartArr.indexOf(currentProduct.id)]?.copies;
    if (copies !== undefined) {
      cartTotal -= currentProduct.price * copies;
      cartItemEl.innerHTML = `Cart(${cartItem-=copies})`;
    }
    cartObjArr.splice(cartArr.indexOf(currentProduct.id), 1);
    cartArr.splice(cartArr.indexOf(currentProduct.id), 1);
    cartTotalEl.innerHTML = `Cart-total: ${cartTotal}$`;

    addButton.innerHTML = "ADD TO CART";
  }
  localStorage.setItem("cartObjArr", JSON.stringify(cartObjArr));
  localStorage.setItem("cartArr", JSON.stringify(cartArr));
  localStorage.setItem("cartTotal", `${cartTotal}`);
  localStorage.setItem("cartItem", `${cartItem}`);
}

export function clickCart() {
  const cartHeader = document.querySelector(".cart-item") as HTMLElement;
  cartHeader.addEventListener("click", () => {
    isBay = false;
  });
}
export function giveEventListenersToButtonsInCart() {
  const cartItemEl = document.querySelector(".cart-item") as HTMLElement;
  const cartTotalEl = document.querySelector(".cart-total") as HTMLElement;
  const sumTotalEl = document.querySelector(".sum-total") as HTMLElement;
  const sumItemEl = document.querySelector(".sum-products") as HTMLElement;
  const notProducts = document.querySelector(".cart-not-found") as HTMLElement;
  const cartContent = document.querySelector(".home-content") as HTMLElement;
  const allCards: NodeListOf<Element> = document.querySelectorAll(".home-card");
  allCards.forEach((card) => {
    card.addEventListener("click", (event: Event) => {
      const target = event.target as HTMLElement;
      const copiesEl = card.querySelector(".copies-number") as HTMLElement;
      if (
        target.classList.contains("add-copy") &&
        Number(cartObjArr[cartArr.indexOf(+card.id)].copies) <
          cartObjArr[cartArr.indexOf(+card.id)].stock
      ) {
        cartObjArr[cartArr.indexOf(+card.id)].copies =
          Number(cartObjArr[cartArr.indexOf(+card.id)].copies) + 1;
        copiesEl.innerHTML = `${cartObjArr[cartArr.indexOf(+card.id)].copies}`;
        cartTotal += cartObjArr[cartArr.indexOf(+card.id)].price;
        cartTotalEl.innerHTML = `Cart-total: ${cartTotal}$`;
        sumTotalEl.innerHTML = `Total: ${cartTotal}$`;

        cartItemEl.innerHTML = `Cart(${++cartItem})`;
        sumItemEl.innerHTML = `Products: ${cartItem}`;
      }
      if (target.classList.contains("remove-copy")) {
        if (cartObjArr[cartArr.indexOf(+card.id)].copies === 1) {
          // const copies = cartObjArr[cartArr.indexOf(+card.id)].copies;
          cartTotal -= cartObjArr[cartArr.indexOf(+card.id)].price;
          cartItemEl.innerHTML = `Cart(${--cartItem})`;
          cartTotalEl.innerHTML = `Cart-total: ${cartTotal}$`;
          sumItemEl.innerHTML = `Products: ${cartItem}`;
          sumTotalEl.innerHTML = `Total: ${cartTotal}$`;
          cartObjArr.splice(cartArr.indexOf(+card.id), 1);
          cartArr.splice(cartArr.indexOf(+card.id), 1);
          if (!cartArr.length) {
            notProducts.classList.toggle("hidden-not");
            cartContent.classList.toggle("hidden");
          }
          card.classList.toggle("hidden");
          card.remove();
          updateFilteredCart();
          pageFiltering();
        } else if (Number(cartObjArr[cartArr.indexOf(+card.id)].copies) > 1) {
          cartObjArr[cartArr.indexOf(+card.id)].copies =
            Number(cartObjArr[cartArr.indexOf(+card.id)].copies) - 1;
          cartTotal -= cartObjArr[cartArr.indexOf(+card.id)].price;
          cartTotalEl.innerHTML = `Cart-total: ${cartTotal}$`;
          sumTotalEl.innerHTML = `Total: ${cartTotal}$`;
          cartItemEl.innerHTML = `Cart(${--cartItem})`;
          sumItemEl.innerHTML = `Products: ${cartItem}`;  
          copiesEl.innerHTML = `${
            cartObjArr[cartArr.indexOf(+card.id)].copies
          }`;
        }
      }
      console.log(cartObjArr);
      localStorage.setItem("cartObjArr", JSON.stringify(cartObjArr));
      localStorage.setItem("cartArr", JSON.stringify(cartArr));
      localStorage.setItem("cartTotal", `${cartTotal}`);
      localStorage.setItem("cartItem", `${cartItem}`);
      updateSumWithDiscount();
    });
  });
}

export function sum(a:number, b:number):number{
  return a+b
}

export { currentProduct, cartTotal, cartItem, cartArr, isBay, cartObjArr };
