import { detailsCard } from "../../components/ProductCard/detailsCard/detailsCard";
import { productPatch } from "../../components/ProductCard/detailsCard/productPath";
import { getCartTotalAndItemProduct } from "../../components/cartArr/cartArr";

export default {
  render: async () => {
    return `
        <div class="product-wrapper">
          ${productPatch()}
          ${detailsCard()}
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
