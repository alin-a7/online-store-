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
          <input type="number"></number>
          <div class="turn-pages" style="display: flex">
          <button class="btn prev-page">/<</button>
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
  },
};

export { response };
