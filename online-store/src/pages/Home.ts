import "../components/ProductList/productList";
import { ProductList } from "../components/ProductList/productList";
import { Iproduct } from "../components/model/model";
import { getCartTotalAndItemHome } from "../components/model/functionsForCart";

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
      ${ProductList(response)}
      </div>
    `;
  },
  afterRender: async () => {
    getCartTotalAndItemHome();
  },
};

export { response };
