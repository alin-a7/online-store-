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
          <p class=""> 111111111111111111111111111111111111111111 </p>
          <p class=""> 2 </p>
          <p class=""> 3 </p>
       </div>
       <div class="sort-card-wrapper">
         <div class="sort-wrapper">
         <select name="city" class="sort-select">
         <option class="option-item" value="">Sorting options:</option>
         <option class="option-item" value="price ASC">price ASC</option>
         <option class="option-item" value="price DESC">price DESC</option>
         <option class="option-item" value="rating ASC">rating ASC</option>
         <option class="option-item" value="rating DESC">rating DESC</option>
         </select>
       <div class="quantity">Found: 100</div>
       <input type="text" placeholder="Search product" class="search-input" />
       <div class="icon-wrapper">
         <img src="./components/assets/cards.svg" alt="cards" class="home-icon home-icon-cards" />
         <img src="./components/assets/list.svg" alt="list" class="home-icon home-icon-list" />
       </div>
     </div>
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
