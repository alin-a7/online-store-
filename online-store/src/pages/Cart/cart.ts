import { cartList } from "../../components/ProductList/cartList";
import { Iproduct } from "../../components/model/model";
import { giveEventListenersToButtonsInCart } from "../../components/cartArr/cartArr";

let response: Iproduct[];
let currentPage: number = 1;
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
          <input id="prods-per-cart" type="number" min="1" value="0"></number>
          <div class="turn-pages" style="display: flex">
          <button class="btn prev-page">/<</button>
          <div id="current-page">${currentPage}</div>
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

function pageFiltering(){
  const currentPageEl = document.querySelector('#current-page') as HTMLElement;
const prodsPerCart = document.querySelector('#prods-per-cart') as HTMLInputElement;
const allCards: NodeListOf<Element> = document.querySelectorAll('.home-card');
prodsPerCart.addEventListener('change',function(){
  allCards.forEach((card, index) => {
    if (Number(prodsPerCart.value) > 0){
      currentPage = 1;
      currentPageEl.innerHTML = `${currentPage}`
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

      console.log('I tried');
    }
    else {
      console.log(prodsPerCart.value);
    }
  })
})
}
