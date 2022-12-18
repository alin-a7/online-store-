import "../components/ProductList/productList";
import { ProductList } from "../components/ProductList/productList";
import { Iproduct } from "../components/model/model";
import { getCartTotalAndItemHome } from "../components/model/functionsForCart";
import { searh, sorting } from "../components/model/sortAndSearch";
import { switchingView } from "../components/model/sortAndSearch";

let response: Iproduct[];
const API = "https://dummyjson.com/products?limit=100";

const getProducts = async () => {
  const response = await window.fetch(API).then((res) => res.json());
  return response.products;
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
     ${ProductList(response)}
       </div>
      </div>
    `;
  },
  afterRender: async () => {
    getCartTotalAndItemHome();
    switchingView();
    sorting();
    searh();
  },
};

export { response };
