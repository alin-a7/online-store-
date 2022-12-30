import { cartList } from "../../components/ProductList/cartList";
import { Iproduct } from "../../components/model/model";
import { giveEventListenersToButtonsInCart } from "../../components/cartArr/cartArr";

let response: Iproduct[];
const API = "https://dummyjson.com/products?limit=100";

const getProducts = async () => {
  const arr = localStorage.getItem('cartObjArr');
  if (arr === null){
    return [];
  }
  return JSON.parse(arr);

  
};

export default {
  render: async () => {
    response = await getProducts();

    return `
      <div class="home-content">
        <div class="filter">
          <input id="prods-per-cart" type="number" min="1" value="100"></number>
          <div class="turn-pages" style="display: flex">
          <button class="btn prev-page">/<</button>
          <div id="current-page">1</div>
          <button class="btn next-page">/></button>
          </div>
       </div>
       <div class="sort-card-wrapper">
     ${cartList(response)}
       </div>
      </div>
    `;
  },
  afterRender: async () => {
    giveEventListenersToButtonsInCart();
    pageFiltering();
  },
};

export { response };
/*var old_element = document.getElementById("btn");
var new_element = old_element.cloneNode(true);
old_element.parentNode.replaceChild(new_element, old_element); */
function pageFiltering(){
  const currentPageEl = document.querySelector('#current-page') as HTMLElement;
const prodsPerCart = document.querySelector('#prods-per-cart') as HTMLInputElement;
let nextPage = document.querySelector('.next-page') as HTMLElement;
nextPage.parentNode?.replaceChild(nextPage.cloneNode(true), nextPage);
nextPage = document.querySelector('.next-page') as HTMLElement;
let prevPage = document.querySelector('.prev-page') as HTMLElement;
prevPage.parentNode?.replaceChild(prevPage.cloneNode(true), prevPage);
prevPage = document.querySelector('.prev-page') as HTMLElement;
const allCards: NodeListOf<Element> = document.querySelectorAll('.home-card');
let currentPage: number = +currentPageEl.innerHTML;
if (currentPage > Math.ceil(allCards.length / +prodsPerCart.value)){
  currentPage -= 1;
  currentPageEl.innerHTML = `${currentPage}`;
};
prodsPerCart.addEventListener('change', function() {
  allCards.forEach((card, index) => {
    if (Number(prodsPerCart.value) > 0){
      if (!(index >= Number(prodsPerCart.value) * (currentPage - 1)
      && index < Number(prodsPerCart.value) * currentPage)){
        if (!card.classList.contains('hidden')){
          card.classList.add('hidden'); 
        }
      }
      else {
        if (card.classList.contains('hidden')){
          card.classList.remove('hidden');
        }
      }
    }
    else {
      console.log(prodsPerCart.value);
    }
  })
});

nextPage.addEventListener('click', function() {
  if (currentPage < Math.ceil(allCards.length / +prodsPerCart.value)){
    currentPage += 1;
    currentPageEl.innerHTML = `${currentPage}`
    allCards.forEach((card, index) => {
      if (Number(prodsPerCart.value) > 0){
        if (!(index >= Number(prodsPerCart.value) * (currentPage - 1)
        && index < Number(prodsPerCart.value) * currentPage)){
          if (!card.classList.contains('hidden')){
            card.classList.add('hidden'); 
          }
        }
        else {
          if (card.classList.contains('hidden')){
            card.classList.remove('hidden');
          }
        }
      }
    })
  }
  console.log(currentPage);
});
prevPage.addEventListener('click', function() {
  if (currentPage > 1){
    currentPage -= 1;
    currentPageEl.innerHTML = `${currentPage}`
    allCards.forEach((card, index) => {
      if (Number(prodsPerCart.value) > 0){
        if (!(index >= Number(prodsPerCart.value) * (currentPage - 1)
        && index < Number(prodsPerCart.value) * currentPage)){
          if (!card.classList.contains('hidden')){
            card.classList.add('hidden'); 
          }
        }
        else {
          if (card.classList.contains('hidden')){
            card.classList.remove('hidden');
          }
        }
      }
    })
  }
  console.log(currentPage);
})
}

function updateFilteredCart(){
  const prodsPerCartEl = document.querySelector('#prods-per-cart') as HTMLInputElement;
  const prodsPerCart: number = +prodsPerCartEl.value;
  const allCards: NodeListOf<Element> = document.querySelectorAll('.home-card');
  const currentPageEl = document.querySelector('#current-page') as HTMLElement;
  let currentPage: number = +currentPageEl.innerHTML;
  if (currentPage > Math.ceil(allCards.length / prodsPerCart)){
    currentPage -= 1;
    currentPageEl.innerHTML = `${currentPage}`;
  };
  allCards.forEach((card, index) => {
    if (prodsPerCart > 0){
      if (!(index >= prodsPerCart * (currentPage - 1)
      && index < prodsPerCart * currentPage)){
        if (!card.classList.contains('hidden')){
          card.classList.add('hidden'); 
        }
      }
      else {
        if (card.classList.contains('hidden')){
          card.classList.remove('hidden');
        }
      }
    }
    else {
      console.log(prodsPerCart);
    }
  })
}

export {updateFilteredCart, pageFiltering}