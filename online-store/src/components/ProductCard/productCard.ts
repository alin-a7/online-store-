import { Iproduct } from "../model/model";
import { cartArr } from "../model/functionsForCart";
export const ProductCard: (product: Iproduct) => string = (product) => {
  return `
    <div class="home-card home-card-style" id="${product.id}">
    <div class="home-card__title">${product.title}</div>
    <div class="info-wrapper">
      <img
        class="home-card__img"
        src="${product.images[0]}
      "
        alt=""
      />
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
      <button class="btn add-cart">${cartArr.includes(product.id)? 'DROP FROM CART':'ADD TO CART'}</button>
      <a href="#product" >
        <button class="btn details">DETAILS</button>
     </a>
    </div>
  </div>
    `;
};

export const ProductCardMini: (product: Iproduct) => string = (product) => {
  return `
  <div class="home-card card-mini" id="${product.id}">
  <img
    src="${product.images[0]}"
    alt=""
    class="card-mini__img"
  />
  <div class="card-mini__content">
    <div class="card-mini__title">${product.title}</div>
    <div class="mini-button-wrapper">
      <button class="btn add-cart">${cartArr.includes(product.id)? 'DROP FROM CART':'ADD TO CART'}</button>
      <a href="#product">
        <button class="btn details">DETAILS</button>
      </a>
    </div>
  </div>
</div>
`;
};



