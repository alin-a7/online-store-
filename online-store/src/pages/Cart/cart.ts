import { modalWindowCard } from "./modalWindow/modalWindowCard";
import { windowAppearance } from "./modalWindow/modalWindow";
import { validation } from "./modalWindow/modalWindow";
import { cartList } from "../../components/ProductList/cartList";
import { Iproduct } from "../../components/model/model";
import { giveEventListenersToButtonsInCart } from "../../components/cartArr/cartArr";
import { cartItem, cartTotal } from "../../components/cartArr/cartArr";
import { params } from "../Home/sortAndSearch";

let response: Iproduct[];
let currentPage: number 
params.has("curPage")
? (currentPage = Number(params.get("curPage")))
: (currentPage = 1);


const getProducts = async () => {
  const arr = localStorage.getItem("cartObjArr");
  if (arr === null) {
    return [];
  }
  return JSON.parse(arr);
};

export default {
  render: async () => {
    response = await getProducts();

    return `
      <div class="cart-not-found ${response.length? 'hidden-not':''}">Cart is empty</div>
      <div class="home-content ${response.length? '':'hidden'}">
        <div class="filter">
          <input id="prods-per-cart" type="number" min="1" value="100" class="cart-input"></number>
          <div class="turn-pages" style="display: flex">
            <div class="cart-btn-wrapper">
              <button class="btn btn-cart prev-page">/<</button>
              <div id="current-page">${currentPage}</div>
              <button class="btn btn-cart next-page">/></button>
            </div>
          </div>
          <div class="filter-card">
          <div class="filter__title">Summary</div>
          <div class="filter__range-wrapper">
          <div class="sum-products">Products: ${cartItem}</div>
          <div class="sum-total">Total: ${cartTotal}$</div>
          <button class="personal-btn bay-now cart-bay">BAY NOW</button>
          </div>
       </div>
    
        </div>
        <div class="sort-card-wrapper">
          ${cartList(response)}
        </div>
      </div>   
          <div class="popup">
            ${modalWindowCard()}
          </div>
      `;
  },
  afterRender: async () => {
    giveEventListenersToButtonsInCart();
    pageFiltering();
    windowAppearance();
    validation();
  },
};
export { response };
/*var old_element = document.getElementById("btn");
var new_element = old_element.cloneNode(true);
old_element.parentNode.replaceChild(new_element, old_element); */
function pageFiltering() {
  const currentPageEl = document.querySelector("#current-page") as HTMLElement;
  const prodsPerCart = document.querySelector(
    "#prods-per-cart"
  ) as HTMLInputElement;
  params.has("limit")
  ? (prodsPerCart.value = String(params.get("limit")))
  : (prodsPerCart.value = "100");
  let nextPage = document.querySelector(".next-page") as HTMLElement;
  nextPage.parentNode?.replaceChild(nextPage.cloneNode(true), nextPage);
  nextPage = document.querySelector(".next-page") as HTMLElement;
  let prevPage = document.querySelector(".prev-page") as HTMLElement;
  prevPage.parentNode?.replaceChild(prevPage.cloneNode(true), prevPage);
  prevPage = document.querySelector(".prev-page") as HTMLElement;
  const allCards: NodeListOf<Element> = document.querySelectorAll(".home-card");
  currentPage = +currentPageEl.innerHTML;
  if (currentPage > Math.ceil(allCards.length / +prodsPerCart.value)) {
    currentPage -= 1;
    currentPageEl.innerHTML = `${currentPage}`;
  }
  makeCartFilter();
  prodsPerCart.addEventListener("input", function () {
    params.set("limit", `${prodsPerCart.value}`);
    window.history.replaceState(
      {},
      "",
      `${document.location.pathname}?${params.toString()}${window.location.hash}`
    );
    makeCartFilter();
  });
  function makeCartFilter(): void{
    allCards.forEach((card, index) => {
      if (Number(prodsPerCart.value) > 0) {
        if (
          !(
            index >= Number(prodsPerCart.value) * (currentPage - 1) &&
            index < Number(prodsPerCart.value) * currentPage
          )
        ) {
          if (!card.classList.contains("hidden")) {
            card.classList.add("hidden");
          }
        } else {
          if (card.classList.contains("hidden")) {
            card.classList.remove("hidden");
          }
        }
      } else {
        console.log(prodsPerCart.value);
      }
    });
  }

  nextPage.addEventListener("click", function () {
    if (currentPage < Math.ceil(allCards.length / +prodsPerCart.value)) {
      currentPage += 1;
      params.set("curPage", `${currentPage}`);
      window.history.replaceState(
        {},
        "",
        `${document.location.pathname}?${params.toString()}${window.location.hash}`
      );  
      currentPageEl.innerHTML = `${currentPage}`;
      allCards.forEach((card, index) => {
        if (Number(prodsPerCart.value) > 0) {
          if (
            !(
              index >= Number(prodsPerCart.value) * (currentPage - 1) &&
              index < Number(prodsPerCart.value) * currentPage
            )
          ) {
            if (!card.classList.contains("hidden")) {
              card.classList.add("hidden");
            }
          } else {
            if (card.classList.contains("hidden")) {
              card.classList.remove("hidden");
            }
          }
        }
      });
    }
    console.log(currentPage);
  });
  prevPage.addEventListener("click", function () {
    if (currentPage > 1) {
      currentPage -= 1;
      params.set("curPage", `${currentPage}`);
      window.history.replaceState(
        {},
        "",
        `${document.location.pathname}?${params.toString()}${window.location.hash}`
      );  
      currentPageEl.innerHTML = `${currentPage}`;
      allCards.forEach((card, index) => {
        if (Number(prodsPerCart.value) > 0) {
          if (
            !(
              index >= Number(prodsPerCart.value) * (currentPage - 1) &&
              index < Number(prodsPerCart.value) * currentPage
            )
          ) {
            if (!card.classList.contains("hidden")) {
              card.classList.add("hidden");
            }
          } else {
            if (card.classList.contains("hidden")) {
              card.classList.remove("hidden");
            }
          }
        }
      });
    }
    console.log(currentPage);
  });
}

function updateFilteredCart() {
  const prodsPerCartEl = document.querySelector(
    "#prods-per-cart"
  ) as HTMLInputElement;
  const prodsPerCart: number = +prodsPerCartEl.value;
  const allCards: NodeListOf<Element> = document.querySelectorAll(".home-card");
  const currentPageEl = document.querySelector("#current-page") as HTMLElement;
  let currentPage: number = +currentPageEl.innerHTML;
  if (currentPage > Math.ceil(allCards.length / prodsPerCart)) {
    currentPage -= 1;
    currentPageEl.innerHTML = `${currentPage}`;
  }
  allCards.forEach((card, index) => {
    if (prodsPerCart > 0) {
      if (
        !(
          index >= prodsPerCart * (currentPage - 1) &&
          index < prodsPerCart * currentPage
        )
      ) {
        if (!card.classList.contains("hidden")) {
          card.classList.add("hidden");
        }
      } else {
        if (card.classList.contains("hidden")) {
          card.classList.remove("hidden");
        }
      }
    } else {
      console.log(prodsPerCart);
    }
  });
}

export { updateFilteredCart, pageFiltering };
