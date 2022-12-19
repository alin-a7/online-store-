import { response } from "./home";
import { Iproduct } from "../../components/model/model";
import { renderList } from "../../components/ProductList/homeList";
import { getCartTotalAndItemHome } from "../../components/cartArr/cartArr";

let hidddenId: number[] = [];
let selectValue: string;
let sortedResponse: Iproduct[];
let isCards: boolean = true;

export const searh: () => void = () => {
  const arrCards: NodeListOf<Element> = document.querySelectorAll(".home-card");

  const input = document.querySelector(".search-input") as HTMLInputElement;
  input.oninput = () => {
    hidddenId = [];
    let val: string = input.value.trim().toLocaleLowerCase();
    if (val != "") {
      arrCards.forEach((card: Element) => {
        const product = response[+card.id - 1] as Iproduct;
        if (
          product.title.toLowerCase().search(val) !== -1 ||
          product.category.toLowerCase().search(val) !== -1 ||
          product.brand.toLowerCase().search(val) !== -1 ||
          product.price.toString().search(val) !== -1 ||
          product.discountPercentage.toString().search(val) !== -1 ||
          product.rating.toString().search(val) !== -1 ||
          product.stock.toString().search(val) !== -1
        ) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    } else {
      arrCards.forEach((card) => {
        card.classList.remove("hidden");
      });
    }
    arrCards.forEach((card) => {
      card.classList.contains("hidden") ? hidddenId.push(+card.id) : hidddenId;
    });

    const hidCards: NodeListOf<Element> = document.querySelectorAll(".hidden");
    const quantity = document.querySelector(".quantity") as HTMLElement;
    quantity.innerHTML = `Found: ${101 - hidCards.length}`;

    getNotFoundPoduct();
  };
};

export const sorting: () => void = () => {
  const sortSelect = document.querySelector(
    ".sort-select"
  ) as HTMLSelectElement;
  sortedResponse = [...response];
  sortSelect.onchange = () => {
    selectValue = sortSelect.value;
    if (selectValue === "price ASC")
    sortedResponse= sortedResponse.sort((a, b) => a.price - b.price);
    if (selectValue === "price DESC")
    sortedResponse = sortedResponse.sort((a, b) => b.price - a.price);
    if (selectValue === "rating ASC")
    sortedResponse = sortedResponse.sort((a, b) => a.rating - b.rating);
    if (selectValue === "rating DESC")
    sortedResponse = sortedResponse.sort((a, b) => b.rating - a.rating);

    renderSortCards();
  };
};

export const renderSortCards: () => void = () => {
  const cardWrapper = document.querySelector(".card-wrapper") as HTMLElement;
  cardWrapper.innerHTML = `
  <div class="home-not-found hidden">No products found</div>
  ${renderList(sortedResponse ? sortedResponse : response)}`;
  const arrCards: NodeListOf<Element> = document.querySelectorAll(".home-card");
  arrCards.forEach((card: Element) =>
    hidddenId.includes(+card.id) ? card.classList.add("hidden") : card
  );
  getNotFoundPoduct();
  
  getCartTotalAndItemHome();
  searh();
};

function getNotFoundPoduct(): void {
  const homeNotFound = document.querySelector(".home-not-found") as HTMLElement;
  if (hidddenId.length === 100) {
    homeNotFound.classList.remove("hidden");
  } else {
    homeNotFound.classList.add("hidden");
  }
}

export const switchingView = () => {
  const iconCards = document.querySelector(".home-icon-cards") as HTMLElement;
  const iconList = document.querySelector(".home-icon-list") as HTMLElement;
  isCards
    ? iconCards.classList.add("active-icon")
    : iconList.classList.add("active-icon");

  iconCards.addEventListener("click", () => {
    isCards = true;
    iconCards.classList.add("active-icon");
    iconList.classList.remove("active-icon");
    renderSortCards();
  });

  iconList.addEventListener("click", () => {
    isCards = false;
    iconList.classList.add("active-icon");
    iconCards.classList.remove("active-icon");
    renderSortCards();
  });
};

export { sortedResponse, hidddenId, isCards };
