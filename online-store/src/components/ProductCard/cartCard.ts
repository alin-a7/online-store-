import { Iproduct } from "../model/model";
export const cartCard: (product: Iproduct) => string = (product) => {
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
    </div>
    <div class="button-wrapper">
      <button class="btn add-copy">+</button>
      <div class='copies-number'>${product.copies}</div>
      <button class="btn remove-copy">-</button>
    </div>
  </div>
    `;
};