import { modalWindowCard } from "./modalWindow/modalWindowCard";
import { windowAppearance } from "./modalWindow/modalWindow";
import { validation } from "./modalWindow/modalWindow";
import { cartList } from "../../components/ProductList/cartList";
import { Iproduct } from "../../components/model/model";
import { giveEventListenersToButtonsInCart } from "../../components/cartArr/cartArr";
import { cartItem, cartTotal } from "../../components/cartArr/cartArr";
import { params } from "../Home/sortAndSearch";
import { promocodes } from "./promocodes/promocodes";

let response: Iproduct[];
let currentPage: number 
params.has("curPage")
? (currentPage = Number(params.get("curPage")))
: (currentPage = 1);
let totalDiscount: number = 0;


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
              <button class="btn btn-cart prev-page"><</button>
              <div id="current-page">1</div>
              <button class="btn btn-cart next-page">></button>
            </div>
          </div>
          <div class="filter-card">
          <div class="filter__title">Summary</div>
          <div class="filter__range-wrapper">
          <div class="sum-products">Products: ${cartItem}</div>
          <div class="sum-total" id="sum-without-discount">Total: ${cartTotal}$</div>
          <div class="sum-total hidden" id="sum-with-discount">Total: ${cartTotal * (1 - totalDiscount)}$</div>
          <input id="input-promo" val="" type="text"></input>
          <div class="hidden" id="found-promo"></div>
          <button class="personal-btn bay-now cart-bay">BAY NOW</button>
          <div style="text-align: center; margin-bottom: 5px" id="promocodes-for-dummies">Some promocodes are:<br>${Object.keys(promocodes)}</div>
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
    inputPromoAddEvent();
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
  let prodsPerCartValue: number = +prodsPerCart.value
  let nextPage = document.querySelector(".next-page") as HTMLElement;
  nextPage.parentNode?.replaceChild(nextPage.cloneNode(true), nextPage);
  nextPage = document.querySelector(".next-page") as HTMLElement;
  let prevPage = document.querySelector(".prev-page") as HTMLElement;
  prevPage.parentNode?.replaceChild(prevPage.cloneNode(true), prevPage);
  prevPage = document.querySelector(".prev-page") as HTMLElement;
  const allCards: NodeListOf<Element> = document.querySelectorAll(".home-card");
  console.log(allCards)
  params.has("curPage")
? (currentPage = Number(params.get("curPage")))
: (currentPage = 1);
  currentPageEl.innerHTML = `${currentPage}`;
  if (currentPage > Math.ceil(allCards.length / +prodsPerCart.value)) {
    currentPage -= 1;
    currentPageEl.innerHTML = `${currentPage}`;
  }
  makeCartFilter();
  prodsPerCart.addEventListener("input", function () {
    prodsPerCartValue = +prodsPerCart.value
    params.set("limit", `${prodsPerCartValue}`);
    window.history.replaceState(
      {},
      "",
      `${document.location.pathname}?${params.toString()}${window.location.hash}`
    );
    if(prodsPerCart.value === ''){
      prodsPerCartValue = allCards.length
      currentPage = 1;
      currentPageEl.innerHTML = `${currentPage}`;
      allCards.forEach((card) => {
        card.classList.remove('hidden')
      });
      params.set("curPage", `${currentPage}`);
      params.set("limit", `${prodsPerCartValue}`);
      window.history.replaceState(
        {},
        "",
        `${document.location.pathname}?${params.toString()}${window.location.hash}`
      );  
    }
    if(prodsPerCartValue*currentPage > allCards.length){
      currentPage = Math.ceil(allCards.length/prodsPerCartValue) || 1
      currentPageEl.innerHTML = `${currentPage}`;
      params.set("curPage", `${currentPage}`);
      params.set("limit", `${prodsPerCartValue}`);
      window.history.replaceState(
        {},
        "",
        `${document.location.pathname}?${params.toString()}${window.location.hash}`
      );  
      makeCartFilter();
    }
    makeCartFilter();
  });
  function makeCartFilter(): void{
    allCards.forEach((card, index) => {
      if (Number(prodsPerCartValue) > 0) {
        if (
          !(
            index >= Number(prodsPerCartValue) * (currentPage - 1) &&
            index < Number(prodsPerCartValue) * currentPage
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
        console.log(prodsPerCartValue);
      }
    });
  }

  nextPage.addEventListener("click", function () {
    if (currentPage < Math.ceil(allCards.length / +prodsPerCartValue)) {
      currentPage += 1;
      params.set("curPage", `${currentPage}`);
      window.history.replaceState(
        {},
        "",
        `${document.location.pathname}?${params.toString()}${window.location.hash}`
      );  
      currentPageEl.innerHTML = `${currentPage}`;
      allCards.forEach((card, index) => {
        if (Number(prodsPerCartValue) > 0) {
          if (
            !(
              index >= Number(prodsPerCartValue) * (currentPage - 1) &&
              index < Number(prodsPerCartValue) * currentPage
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
        if (Number(prodsPerCartValue) > 0) {
          if (
            !(
              index >= Number(prodsPerCartValue) * (currentPage - 1) &&
              index < Number(prodsPerCartValue) * currentPage
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
  const allCardsItems: NodeListOf<Element> = document.querySelectorAll(".current-item");
  const currentPageEl = document.querySelector("#current-page") as HTMLElement;
  let currentPage: number = +currentPageEl.innerHTML;
  if (currentPage > Math.ceil(allCards.length / prodsPerCart)) {
    currentPage -= 1;
    currentPageEl.innerHTML = `${currentPage}`;
  }
  allCardsItems.forEach((item, index)=>{
    item.innerHTML=`${index+1}`
  })
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

function inputPromoAddEvent(){
  let listOfAddedPromos:string[] = [];
  const inputPromo = document.getElementById('input-promo') as HTMLInputElement;
  const totalSumEl = document.getElementById('sum-without-discount') as HTMLElement;
  const promoSumEl = document.getElementById('sum-with-discount') as HTMLElement;
  const foundPromoOriginalEl = document.getElementById('found-promo') as HTMLElement;
  inputPromo.addEventListener('input', function(){
    if (Object.keys(promocodes).includes(inputPromo.value) && document.getElementById(inputPromo.value) === null){
      const foundPromoEl = foundPromoOriginalEl.cloneNode() as HTMLElement;
      const currentPromo: string = inputPromo.value;
      foundPromoEl.id = currentPromo;
      foundPromoEl.classList.remove('hidden');
      inputPromo.after(foundPromoEl);
      foundPromoEl.innerHTML = `${currentPromo} - ${+promocodes[currentPromo as keyof Object] * 100}%
      <button class="drop-promo">add</button>`;
      foundPromoEl.lastChild?.addEventListener('click', function(){
        if (listOfAddedPromos.length === 0){
          totalSumEl.setAttribute('style', 'text-decoration: line-through');
          promoSumEl.classList.remove('hidden');
        }
        totalDiscount += +promocodes[currentPromo as keyof Object];
        promoSumEl.innerHTML = `Total: ${Math.ceil(cartTotal * (1 - totalDiscount))}$`;
        listOfAddedPromos.push(currentPromo);
        foundPromoEl.innerHTML = `${currentPromo} - ${+promocodes[currentPromo as keyof Object] * 100}%
      <button class="drop-promo">remove</button>`;
        const addedPromoEl = foundPromoEl.cloneNode(true) as HTMLElement;
        inputPromo.before(addedPromoEl);
        foundPromoEl.remove();
        addedPromoEl.lastChild?.addEventListener('click', function(){
          totalDiscount -= +promocodes[currentPromo as keyof Object];
          listOfAddedPromos = listOfAddedPromos.filter((el) => el !== currentPromo);
          addedPromoEl.remove();
          updateSumWithDiscount();
          if (listOfAddedPromos.length === 0){
            totalSumEl.setAttribute('style', '');
            promoSumEl.classList.add('hidden');
          }
        });
      })
    }
  });
}

function updateSumWithDiscount(){
  const promoSumEl = document.getElementById('sum-with-discount') as HTMLElement;
  promoSumEl.innerHTML = `Total: ${Math.ceil(cartTotal * (1 - totalDiscount))}$`;
}

export { updateFilteredCart, pageFiltering, updateSumWithDiscount };
