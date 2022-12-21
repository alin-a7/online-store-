import { response } from "./Home";
import { Iproduct } from "../../components/model/model";
import { renderList } from "../../components/ProductList/homeList";
import { getCartTotalAndItemHome } from "../../components/cartArr/cartArr";

let arrCards: NodeListOf<Element>;
let hidddenId: number[] = [];
let hidSearchId: number[] = [];
let hidCategoryId: number[] = [];
let hidBrandId: number[] = [];
let selectValue: string;
let sortedResponse: Iproduct[];
let isCards: boolean = true;
let val: string;
let checkedCategoryArr: string[] = [];
let checkedBrandArr: string[] = [];

export const searh: () => void = () => {
  arrCards = document.querySelectorAll(".home-card");
  const input = document.querySelector(".search-input") as HTMLInputElement;
  if (val) {
    input.value = val;
    makeSearch();
  }
  input.oninput = () => {
    val = input.value.trim().toLocaleLowerCase();
    makeSearch();
  };

  function makeSearch(): void {
    hidSearchId = [];
    if (val != "") {
      arrCards.forEach((card: Element, i: number) => {
        const product = sortedResponse
          ? sortedResponse[i]
          : (response[i] as Iproduct);
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
      card.classList.contains("hidden")
        ? hidSearchId.push(+card.id)
        : hidSearchId;
    });

    hideCards();
  }
};

export const sorting: () => void = () => {
  const sortSelect = document.querySelector(
    ".sort-select"
  ) as HTMLSelectElement;
  if (selectValue) {
    sortSelect.value = selectValue;
  }
  sortedResponse = sortedResponse ? sortedResponse : [...response];
  sortSelect.onchange = () => {
    selectValue = sortSelect.value;
    if (selectValue === "price ASC")
      sortedResponse = sortedResponse.sort((a, b) => a.price - b.price);
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
  <div class="home-not-found hidden-not">No products found</div>
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
    homeNotFound.classList.remove("hidden-not");
  } else {
    homeNotFound.classList.add("hidden-not");
  }
}

export const switchingView: () => void = () => {
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

export const checkboxFilter = () => {
  restoringCheckboxes();
  const checkboxes: NodeListOf<Element> = document.querySelectorAll(
    'input[type="checkbox"]'
  );
  arrCards = document.querySelectorAll(".home-card");
  checkboxes.forEach((item: Element) => {
    item.addEventListener("click", (event) => {
      const checkbox = event.target as HTMLInputElement;
      if (checkbox.checked) {
        checkbox.classList.contains("category")
          ? checkedCategoryArr.push(checkbox.value)
          : checkedBrandArr.push(checkbox.value);
      } else {
        checkbox.classList.contains("category")
          ? checkedCategoryArr.splice(
              checkedCategoryArr.indexOf(checkbox.value),
              1
            )
          : checkedBrandArr.splice(checkedBrandArr.indexOf(checkbox.value), 1);
      }
      if (checkbox.classList.contains("category")) {
        hidCategoryId = [];
        if (checkedCategoryArr.length !== 0) {
          arrCards.forEach((card: Element, i: number) => {
            const product = sortedResponse
              ? sortedResponse[i]
              : (response[i] as Iproduct);
            if (checkedCategoryArr.includes(product.category)) {
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
          card.classList.contains("hidden")
            ? hidCategoryId.push(+card.id)
            : hidCategoryId;
        });

        hideCards();
      } else {
        hidBrandId = [];
        if (checkedBrandArr.length !== 0) {
          arrCards.forEach((card: Element, i: number) => {
            const product = sortedResponse
              ? sortedResponse[i]
              : (response[i] as Iproduct);
            if (checkedBrandArr.includes(product.brand)) {
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
          card.classList.contains("hidden")
            ? hidBrandId.push(+card.id)
            : hidBrandId;
        });

        hideCards();
      }
      console.log(checkedBrandArr, checkedCategoryArr);
    });
  });
};

export function hideCards(): void {
  hidddenId = [...new Set([...hidCategoryId, ...hidSearchId, ...hidBrandId])];
  console.log(hidddenId);

  arrCards.forEach((card) => {
    hidddenId.includes(+card.id)
      ? card.classList.add("hidden")
      : card.classList.remove("hidden");
  });

  const hidCards: NodeListOf<Element> = document.querySelectorAll(".hidden");
  const quantity = document.querySelector(".quantity") as HTMLElement;
  quantity.innerHTML = `Found: ${100 - hidCards.length}`;

  getNotFoundPoduct();
}

function restoringCheckboxes(): void {
  let checkedArr: string[] = [...checkedBrandArr, ...checkedCategoryArr];
  if (checkedArr.length !== 0) {
    const checkboxes: NodeListOf<Element> = document.querySelectorAll(
      'input[type="checkbox"]'
    );
    checkboxes.forEach((item: Element) => {
      const checkbox = item as HTMLInputElement;
      checkedArr.includes(checkbox.value)
        ? (checkbox.checked = true)
        : checkbox;
    });
  }
}

export { sortedResponse, hidddenId, isCards };
