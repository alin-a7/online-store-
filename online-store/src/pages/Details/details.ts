import { detailsCard } from "../../components/ProductCard/detailsCard/detailsCard";
import { productPatch } from "../../components/ProductCard/detailsCard/productPath";
import { getCartTotalAndItemProduct } from "../../components/cartArr/cartArr";
import { currentProduct } from "../../components/cartArr/cartArr";
import { getProducts } from "../Home/Home";
import { Iproduct } from "../../components/model/model";

export default {
  render: async () => {
    let response: Iproduct[] = await getProducts();
    return `
        <div class="product-wrapper">
          ${productPatch(response)}
          ${detailsCard(response)}
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
