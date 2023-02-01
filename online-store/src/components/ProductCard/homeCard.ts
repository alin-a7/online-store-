import { Iproduct } from "../model/model";
import { cartArr } from "../cartArr/cartArr";



export const homeCard: (product: Iproduct) => string = (product) => {
  return `
    <div class="home-card home-card-style" id="${product.id}">
    <div class="home-card__title">${product.title}</div>
    <div class="info-wrapper">
    <div class="home-card__img-wrapper">
    <img
    class="home-card__img"
    src="${product.images[0]}
  "
    onerror="this.onerror=null; this.src='components/assets/noImg.jpg';"
    alt="${product.category} - ${product.title}"
  />
    </div>
      <div class="info">
        <p class="info__item">Category: ${product.category}</p>
        <p class="info__item">Brand: ${product.brand}</p>
        <p class="info__item">Price: ${product.price}$</p>
        <p class="info__item">Discount: ${product.discountPercentage}</p>
        <p class="info__item">Rating: ${product.rating}</p>
        <p class="info__item">Stock: ${product.stock}</p>
      </div>
    </div>
    <div class="button-wrapper">
      <button class="btn add-cart">${getButtonText(cartArr, product.id)}</button>
      <a href="#/product/${product.id}" >
        <button class="btn details">DETAILS</button>
     </a>
    </div>
  </div>
    `;
};

export const homeCardMini: (product: Iproduct) => string = (product) => {
  return `
  <div class="home-card card-mini" id="${product.id}">
  <div class="card-mini__img-wrapper">
  <img
  src="${product.images[0]}"
  onerror="this.onerror=null; this.src='components/assets/noImg.jpg';"
  alt="${product.category} - ${product.title}"
  class="card-mini__img"
/>
  </div>
  <div class="card-mini__content">
    <div class="card-mini__title">${product.title}</div>
    <div class="mini-button-wrapper">
      <button class="btn add-cart">${getButtonText(cartArr, product.id)}</button>
      <a href="#/product/${product.id}">
        <button class="btn details">DETAILS</button>
      </a>
    </div>
  </div>
</div>
`;
};

export function getButtonText(arr: number[], id: number){
  return arr.includes(id)? 'DROP FROM CART':'ADD TO CART'
}



