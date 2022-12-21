import { homeList } from "../../components/ProductList/homeList";
import { Iproduct } from "../../components/model/model";
import { getCartTotalAndItemHome } from "../../components/cartArr/cartArr";
import { searh, sorting, switchingView, sortedResponse, hideCards, checkboxFilter, rangePriceFilter, rangeStockFilter, resetFilters } from "./sortAndSearch";
import { filterCard } from "./filterCard";
import { rangeFilterCard } from "./rangeFilterCard";

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
          <div class="home-buttons">
            <button class="filter-btn reset">Reset filters</button>
            <button class="filter-btn">Copy link</button>
          </div>  
        ${filterCard("category")}
        ${filterCard("brand")}
        ${rangeFilterCard('price')}
        ${rangeFilterCard('stock')}
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
     ${homeList(sortedResponse ? sortedResponse : response)}
       </div>
      </div>
    `;
  },
  afterRender: async () => {
    getCartTotalAndItemHome();
    switchingView();
    sorting();
    searh();
    checkboxFilter();
    rangePriceFilter();
    rangeStockFilter();
    hideCards();
    resetFilters();
  },
};

export { response };
