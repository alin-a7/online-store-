import { response } from "./Home";
import { Iproduct } from "../../components/model/model";
import { renderList } from "../../components/ProductList/homeList";
import { getCartTotalAndItemHome } from "../../components/cartArr/cartArr";
import { getCurrentMaxValue, getMinValue } from "./rangeFilterCard";
import {
  getMaxQuantityItem,
  getQuantityItem,
  getFilterItems,
} from "./filterCard";

let arrCards: NodeListOf<Element>;
let hidddenId: number[] = [];
let hidSearchId: number[] = [];
let hidCategoryId: number[] = [];
let hidBrandId: number[] = [];
let hidPricedId: number[] = [];
let hidStockdId: number[] = [];
let selectValue: string;
let sortedResponse: Iproduct[];
let isCards: boolean = true;
let searchVal: string;
let checkedCategoryArr: string[] = [];
let checkedBrandArr: string[] = [];
let minPriceValue: number;
let maxPriceValue: number;
let minStockValue: number;
let maxStockValue: number;

export const searh: () => void = () => {
  arrCards = document.querySelectorAll(".home-card");
  const input = document.querySelector(".search-input") as HTMLInputElement;
  if (searchVal) {
    input.value = searchVal;
    makeSearch();
  }
  input.oninput = () => {
    searchVal = input.value.trim().toLocaleLowerCase();
    makeSearch();
  };

  function makeSearch(): void {
    hidSearchId = [];
    if (searchVal != "") {
      arrCards.forEach((card: Element, i: number) => {
        const product = sortedResponse
          ? sortedResponse[i]
          : (response[i] as Iproduct);
        if (
          product.title.toLowerCase().search(searchVal) !== -1 ||
          product.category.toLowerCase().search(searchVal) !== -1 ||
          product.brand.toLowerCase().search(searchVal) !== -1 ||
          product.price.toString().search(searchVal) !== -1 ||
          product.discountPercentage.toString().search(searchVal) !== -1 ||
          product.rating.toString().search(searchVal) !== -1 ||
          product.stock.toString().search(searchVal) !== -1
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
  hidddenId = [
    ...new Set([
      ...hidCategoryId,
      ...hidSearchId,
      ...hidBrandId,
      ...hidPricedId,
      ...hidStockdId,
    ]),
  ];

  arrCards.forEach((card) => {
    hidddenId.includes(+card.id)
      ? card.classList.add("hidden")
      : card.classList.remove("hidden");
  });

  const hidCards: NodeListOf<Element> = document.querySelectorAll(".hidden");
  const quantity = document.querySelector(".quantity") as HTMLElement;
  quantity.innerHTML = `Found: ${100 - hidCards.length}`;

  getNotFoundPoduct();

  changesQuantityItem("category");
  changesQuantityItem("brand");
  changesRangeItem("price");
  changesRangeItem("stock");
}

function restoringCheckboxes(): void {
  let checkedArr: string[] = [...checkedBrandArr, ...checkedCategoryArr];
  const checkboxes: NodeListOf<Element> = document.querySelectorAll(
    'input[type="checkbox"]'
  );
  checkboxes.forEach((item: Element) => {
    const checkbox = item as HTMLInputElement;
    checkedArr.includes(checkbox.value)
      ? (checkbox.checked = true)
      : (checkbox.checked = false);
  });
}

export const rangePriceFilter: () => void = () => {
  const rangePriceInput: NodeListOf<Element> =
    document.querySelectorAll(".price-range input");
  const rangePriceMinInput = document.querySelector(
    ".price-min"
  ) as HTMLInputElement;
  const rangePriceMaxInput = document.querySelector(
    ".price-max"
  ) as HTMLInputElement;
  const minValue = document.querySelector(".price-min-value") as HTMLElement;
  const maxValue = document.querySelector(".price-max-value") as HTMLElement;

  rangePriceMinInput.value = minPriceValue ? `${minPriceValue}` : "0";
  rangePriceMaxInput.value = maxPriceValue ? `${maxPriceValue}` : `1749`;
  minValue.innerHTML = `${parseInt(rangePriceMinInput.value)}$`;
  maxValue.innerHTML = `${parseInt(rangePriceMaxInput.value)}$`;

  rangePriceInput.forEach((input) => {
    input.addEventListener("change", () => {
      hidPricedId = [];
      minPriceValue = parseInt(rangePriceMinInput.value);
      maxPriceValue = parseInt(rangePriceMaxInput.value);
      minPriceValue = Math.min(minPriceValue, maxPriceValue);
      maxPriceValue = Math.max(minPriceValue, maxPriceValue);

      const arrCards: NodeListOf<Element> =
        document.querySelectorAll(".home-card");
      arrCards.forEach((card: Element, i: number) => {
        const product = sortedResponse
          ? sortedResponse[i]
          : (response[i] as Iproduct);
        if (product.price >= minPriceValue && product.price <= maxPriceValue) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
      arrCards.forEach((card) => {
        card.classList.contains("hidden")
          ? hidPricedId.push(+card.id)
          : hidPricedId;
      });
      minValue.innerHTML = `${minPriceValue}$`;
      maxValue.innerHTML = `${maxPriceValue}$`;

      hideCards();
    });
  });
};

export const rangeStockFilter: () => void = () => {
  const rangeStockInput: NodeListOf<Element> =
    document.querySelectorAll(".stock-range input");
  const rangeStockMinInput = document.querySelector(
    ".stock-min"
  ) as HTMLInputElement;
  const rangeStockMaxInput = document.querySelector(
    ".stock-max"
  ) as HTMLInputElement;
  const minValue = document.querySelector(".stock-min-value") as HTMLElement;
  const maxValue = document.querySelector(".stock-max-value") as HTMLElement;

  rangeStockMinInput.value = minStockValue ? `${minStockValue}` : "0";
  rangeStockMaxInput.value = maxStockValue ? `${maxStockValue}` : `150`;
  minValue.innerHTML = `${parseInt(rangeStockMinInput.value)}`;
  maxValue.innerHTML = `${parseInt(rangeStockMaxInput.value)}`;

  rangeStockInput.forEach((input) => {
    input.addEventListener("change", () => {
      hidStockdId = [];
      minStockValue = parseInt(rangeStockMinInput.value);
      maxStockValue = parseInt(rangeStockMaxInput.value);
      minStockValue = Math.min(minStockValue, maxStockValue);
      maxStockValue = Math.max(minStockValue, maxStockValue);

      const arrCards: NodeListOf<Element> =
        document.querySelectorAll(".home-card");
      arrCards.forEach((card: Element, i: number) => {
        const product = sortedResponse
          ? sortedResponse[i]
          : (response[i] as Iproduct);
        if (product.stock >= minStockValue && product.stock <= maxStockValue) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
      arrCards.forEach((card) => {
        card.classList.contains("hidden")
          ? hidStockdId.push(+card.id)
          : hidStockdId;
      });
      minValue.innerHTML = `${minStockValue}`;
      maxValue.innerHTML = `${maxStockValue}`;

      hideCards();
    });
  });
};

export const resetFilters: () => void = () => {
  const resetBtn = document.querySelector(".reset") as HTMLElement;
  resetBtn.addEventListener("click", () => {
    sortedResponse = [...response];
    hidddenId =
      hidBrandId =
      hidCategoryId =
      hidPricedId =
      hidSearchId =
      hidStockdId =
      checkedBrandArr =
      checkedCategoryArr =
        [];

    const input = document.querySelector(".search-input") as HTMLInputElement;
    searchVal = "";
    input.value = "";
    restoringCheckboxes();

    const rangePriceMinInput = document.querySelector(
      ".price-min"
    ) as HTMLInputElement;
    const rangePriceMaxInput = document.querySelector(
      ".price-max"
    ) as HTMLInputElement;
    const rangeStockMinInput = document.querySelector(
      ".stock-min"
    ) as HTMLInputElement;
    const rangeStockMaxInput = document.querySelector(
      ".stock-max"
    ) as HTMLInputElement;
    const minValuePrice = document.querySelector(
      ".price-min-value"
    ) as HTMLElement;
    const maxValuePrice = document.querySelector(
      ".price-max-value"
    ) as HTMLElement;

    rangePriceMinInput.value = "0";
    rangePriceMaxInput.value = `1749`;
    minValuePrice.innerHTML = `0$`;
    maxValuePrice.innerHTML = `1749$`;

    const minValueStock = document.querySelector(
      ".stock-min-value"
    ) as HTMLElement;
    const maxValueStock = document.querySelector(
      ".stock-max-value"
    ) as HTMLElement;

    rangeStockMinInput.value = "0";
    rangeStockMaxInput.value = `150`;
    minValueStock.innerHTML = `0`;
    maxValueStock.innerHTML = `150`;

    renderSortCards();

    const quantity = document.querySelector(".quantity") as HTMLElement;
    quantity.innerHTML = `Found: 100`;
  });
};

export const copyLink = () => {
  const copyBtn = document.querySelector(".copy") as HTMLElement;
  copyBtn.addEventListener("click", () => {
    copyBtn.innerHTML = "Copied!";
    setTimeout(() => (copyBtn.innerHTML = "Copy link"), 2000);
  });
};

function changesQuantityItem(str: string): void {
  const itemsArr = getFilterItems(str);
  const filterItems = document.querySelectorAll(`.filter-${str}__quantity`);

  filterItems.forEach((item: Element, i: number) => {
    const currentItem = item as HTMLElement;
    currentItem.innerHTML = `(${getQuantityItem(
      str,
      itemsArr[i]
    )}/${getMaxQuantityItem(str, itemsArr[i])})`;
  });
}

function changesRangeItem(str: string): void {
  const rangeMinInput = document.querySelector(
    `.${str}-min`
  ) as HTMLInputElement;
  const rangeMaxInput = document.querySelector(
    `.${str}-max`
  ) as HTMLInputElement;
  const minValue = document.querySelector(`.${str}-min-value`) as HTMLElement;
  const maxValue = document.querySelector(`.${str}-max-value`) as HTMLElement;

  rangeMinInput.value = `${getMinValue(str)}`;
  rangeMaxInput.value = `${getCurrentMaxValue(str)}`;
  minValue.innerHTML = `${getMinValue(str)}${
    str === "price" && hidddenId.length < 100 ? "$" : ""
  }`;
  maxValue.innerHTML = `${getCurrentMaxValue(str)}${
    str === "price" && hidddenId.length < 100 ? "$" : ""
  }`;
}

export { sortedResponse, hidddenId, isCards };
