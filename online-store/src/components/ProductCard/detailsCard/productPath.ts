import { getCurrentProduct } from "./detailsCard";
import { Iproduct } from "../../model/model";

export const productPatch = (response) => {
  let currentProduct: Iproduct =  getCurrentProduct(response);
  return `
  <div class="product-path">
    <a href="#/" class="product-path__item">store</a>
    <div class="product-path__item">>></div>
    <div class="product-path__item">${currentProduct.category}</div>
    <div class="product-path__item">>></div>
    <div class="product-path__item">${currentProduct.brand}</div>
    <div class="product-path__item">>></div>
    <div class="product-path__item">${currentProduct.title}</div>
  </div>

`;
};
