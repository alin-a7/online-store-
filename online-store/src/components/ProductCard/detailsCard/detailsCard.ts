import { cartArr } from "../../cartArr/cartArr";
import { Iproduct } from "../../model/model";
import { params } from "../../../pages/Home/sortAndSearch";

let currentId: number;

const optionImg: (img: string) => string = (img) => {
  return `
    <img
        src="${img}"
        alt=""
        class="option-img"
      />
`;
};

const getOptionImages: (product: Iproduct) => string = (product) => {
  let htmlList: string = ``;
  product.images.map((img: string) => {
    htmlList += optionImg(img);
  });
  return htmlList;
};

export const detailsCard = (response: Iproduct[]) => {
  let currentProduct: Iproduct = getCurrentProduct(response);
  return `
  <div class="personal-card">
  <div class="personal-card__title">${currentProduct.title}</div>
  <div class="personal-info-wrapper">
    <div class="img-wrapper">
      ${getOptionImages(currentProduct)}
    </div>
    <img
      class="personal-card__img"
      src="${currentProduct.images[0]}
      "
      alt=""
    />
    <div class="personal-info">
      <div class="personal-info__item">
        <div class="personal-info__title">Description</div>
        <div class="personal-info__text">
        ${currentProduct.description}
        </div>
      </div>
      <div class="personal-info__item">
        <div class="personal-info__title">Discount</div>
        <div class="personal-info__text">${
          currentProduct.discountPercentage
        }</div>
      </div>
      <div class="personal-info__item">
        <div class="personal-info__title">Raiting</div>
        <div class="personal-info__text">${currentProduct.rating}</div>
      </div>
      <div class="personal-info__item">
        <div class="personal-info__title">Stock</div>
        <div class="personal-info__text">${currentProduct.stock}</div>
      </div>
      <div class="personal-info__item">
        <div class="personal-info__title">Brand</div>
        <div class="personal-info__text">${currentProduct.brand}</div>
      </div>
      <div class="personal-info__item">
        <div class="personal-info__title">Category</div>
        <div class="personal-info__text">${currentProduct.category}</div>
      </div>
    </div>
    <div class="personal-button-wrapper">
      <div class="personal-price">
      ${currentProduct.price}$
      </div>
      <button class="personal-btn add-cart">${
        cartArr.includes(currentProduct.id) ? "DROP FROM CART" : "ADD TO CART"
      }</button>
      <button class="personal-btn details">BAY NOW</button>
    </div>  
  </div>
</div>
  `;
};

export function getCurrentProduct(response: Iproduct[]):Iproduct {
  params.has("id") ? (currentId = Number(params.get("id"))) : currentId;
  return response[currentId-1]
}
