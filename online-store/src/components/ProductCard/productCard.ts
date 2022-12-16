import { Iproduct } from "../model/model";
export const ProductCard: (product: Iproduct) => string = (product) => {
  return `
    <div class="home-card" id="${product.id}">
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
      <button class="btn add-cart">ADD TO CART</button>
      <a href="#product" >
        <button class="btn details">DETAILS</button>
     </a>
    </div>
  </div>
    `;
};

// export const CardForProductPage: (product: Iproduct) => string = (product) => {
//   return `
 
//  `;
// };
