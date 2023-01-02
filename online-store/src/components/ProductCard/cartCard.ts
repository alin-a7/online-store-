import { Iproduct } from "../model/model";
export const cartCard: (product: Iproduct, index:number) => string = (product, index) => {
  return `
    <div class="home-card cart-card-style" id="${product.id}">
    <a href="#/product/${product.id}">
      <div class="cart-card__title">${product.title}</div>
    </a>


    <div class="cart-info-wrapper">
    <span class="current-item">${index+1}</span>
    <img
      class="cart-card__img"
      src="${product.images[0]}
      "
      alt=""
    />
    <div class="cart-info">
      <div class="personal-info__item">
        <div class="personal-info__title">Description</div>
        <div class="personal-info__text">
        ${product.description}
        </div>
      </div>

      <div class="cart-subinfo">
      <div class="personal-info__item">
      <div class="personal-info__title">Discount</div>
      <div class="personal-info__text">${
        product.discountPercentage
      }</div>
    </div>
    <div class="personal-info__item">
      <div class="personal-info__title">Raiting</div>
      <div class="personal-info__text">${product.rating}</div>
    </div>
    <div class="personal-info__item">
      <div class="personal-info__title">Stock</div>
      <div class="personal-info__text">${product.stock}</div>
    </div>
  </div>

      </div>

      <div class="personal-price">
      ${product.price}$
      </div>
  </div>
  

    <div class="cart-button-wrapper">
      <button class="btn add-copy">+</button>
      <div class='copies-number'>${product.copies}</div>
      <button class="btn remove-copy">-</button>
    </div>
  </div>
    `;
};



// <div class="info-wrapper">
// <img
//   class="home-card__img"
//   src="${product.images[0]}
// "
//   alt=""
// />
// </div>
