import { PersonalCard } from "../components/ProductCard/PersonalCard/personalCard";
import { productPatch } from "../components/productPath/productPath";
import { getCartTotalAndItemProduct } from "../components/model/functionsForCart";
export default {
  render: async () => {
    return `
        <div class="product-wrapper">
          ${productPatch()}
          ${PersonalCard()}
        </div>
    `;
  },
  afterRender: async () => {
    const optionImages: NodeListOf<Element> =
      document.querySelectorAll(".option-img");
    const cardImg = document.querySelector(
      ".personal-card__img"
    ) as HTMLElement;

    optionImages.forEach((img) => {
      img.addEventListener("click", () => {
        const newSrc = img.getAttribute("src") as string;
        cardImg.removeAttribute("src");
        cardImg.setAttribute("src", newSrc);
        console.log(newSrc);
      });
    });
    getCartTotalAndItemProduct();
  },
};
