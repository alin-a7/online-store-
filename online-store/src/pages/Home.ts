import "../components/ProductList/productList";
import { ProductList } from "../components/ProductList/productList";
import { Iproduct } from "../components/model/model";
import { getCartTotalAndItemHome } from "../components/model/functionsForCart";

let response: Iproduct[];
// let currentProduct: Iproduct;
// let cartTotal: number = 0;
// let cartItem: number = 0;
// let cartArr: Iproduct[] = [];
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
    // const allCards: NodeListOf<Element> =
    //   document.querySelectorAll(".home-card");
    // allCards.forEach((card) => {
    //   card.addEventListener("click", () => {
    //     currentProduct = response[+card.id - 1];
    //   });
    // });
    getCartTotalAndItemHome();
  },
};

export { response };
