import { Iproduct } from "../model/model";
import { response } from "../../pages/Home/home";
import cart from "../../pages/Cart/cart";
let currentProduct: Iproduct;
let cartTotal: number = Number(localStorage.getItem('cartTotal'));
let cartItem: number = Number(localStorage.getItem('cartItem'));
let cartArr: number[];
let cartObjArr: Iproduct[];
const arrObj = localStorage.getItem('cartObjArr');
const arr = localStorage.getItem('cartArr');
if (arr === null){
  cartArr = [];
}
else{
  cartArr = JSON.parse(arr);
}
if (arrObj === null){
  cartObjArr = [];
}
else{
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
  const cartTotalEl = document.querySelector(".cart-total") as HTMLElement;
  const cartItemEl = document.querySelector(".cart-item") as HTMLElement;
  addButton.addEventListener("click", () => {
    changeToCart(cartTotalEl, cartItemEl, addButton);
  });
};

function changeToCart(
  cartTotalEl: HTMLElement,
  cartItemEl: HTMLElement,
  addButton: HTMLElement
): void {
  if (!cartArr.includes(currentProduct.id)) {
    cartObjArr.push(currentProduct);
    cartObjArr[cartObjArr.length-1].copies = 1;
    cartArr.push(currentProduct.id);
    cartTotal += currentProduct.price;
    cartTotalEl.innerHTML = `Cart-total: ${cartTotal}$`;
    cartItemEl.innerHTML = `Cart(${++cartItem})`;
    addButton.innerHTML = "DROP FROM CART";
  } else {
    const copies = cartObjArr[cartArr.indexOf(currentProduct.id)]?.copies;
    if (copies !== undefined){
      cartTotal -= currentProduct.price * copies;
      cartItemEl.innerHTML = `Cart(${--cartItem})`;
    }
    cartObjArr.splice(cartArr.indexOf(currentProduct.id), 1);
    cartArr.splice(cartArr.indexOf(currentProduct.id), 1);
    cartTotalEl.innerHTML = `Cart-total: ${cartTotal}$`;
    
    addButton.innerHTML = "ADD TO CART";
  }
  localStorage.setItem('cartObjArr', JSON.stringify(cartObjArr));
  localStorage.setItem('cartArr', JSON.stringify(cartArr));
  localStorage.setItem('cartTotal', `${cartTotal}`);
  localStorage.setItem('cartItem', `${cartItem}`)
}

export function giveEventListenersToButtonsInCart(){
  const cartItemEl = document.querySelector(".cart-item") as HTMLElement;
  const cartTotalEl = document.querySelector(".cart-total") as HTMLElement;
  const allCards: NodeListOf<Element> = document.querySelectorAll(".home-card");
  allCards.forEach((card, index) => {
    card.addEventListener("click", (event: Event) => {
      const target = event.target as HTMLElement;
      const copiesEl = card.querySelector('.copies-number') as HTMLElement;
      if (target.className.split(" ")[1] === "add-copy") {
          cartObjArr[index].copies = Number(cartObjArr[index].copies) + 1;
          copiesEl.innerHTML = `${cartObjArr[index].copies}`;
          cartTotal += cartObjArr[cartArr.indexOf(+card.id)].price;
          cartTotalEl.innerHTML = `Cart-total: ${cartTotal}$`;

      }
      if (target.classList.contains('remove-copy')){
          if (cartObjArr[index].copies === 1){
            const copies = cartObjArr[cartArr.indexOf(+card.id)].copies;
              cartTotal -= cartObjArr[cartArr.indexOf(+card.id)].price;
              cartItemEl.innerHTML = `Cart(${--cartItem})`;
              cartTotalEl.innerHTML = `Cart-total: ${cartTotal}$`;
            cartObjArr.splice(cartArr.indexOf(+card.id), 1);
            cartArr.splice(cartArr.indexOf(+card.id), 1);
            card.classList.toggle('hidden');
          } else if (Number(cartObjArr[index].copies) > 1){
            cartObjArr[index].copies = Number(cartObjArr[index].copies) - 1;
            cartTotal -= cartObjArr[cartArr.indexOf(+card.id)].price;
            cartTotalEl.innerHTML = `Cart-total: ${cartTotal}$`;
            copiesEl.innerHTML = `${cartObjArr[index].copies}`;
          }
      }
      console.log(cartObjArr);
      localStorage.setItem('cartObjArr', JSON.stringify(cartObjArr));
      localStorage.setItem('cartArr', JSON.stringify(cartArr));
      localStorage.setItem('cartTotal', `${cartTotal}`);
      localStorage.setItem('cartItem', `${cartItem}`)
    });
  });
}

export { currentProduct, cartTotal, cartItem, cartArr, cartObjArr};
