import { currentProduct } from "../model/functionsForCart";
export const productPatch: () => string = () => {
  return `
  <div class="product-path">
    <a href="#" class="product-path__item">store</a>
    <div class="product-path__item">>></div>
    <div class="product-path__item">${currentProduct.category}</div>
    <div class="product-path__item">>></div>
    <div class="product-path__item">${currentProduct.brand}</div>
    <div class="product-path__item">>></div>
    <div class="product-path__item">${currentProduct.title}</div>
  </div>

`;
};
