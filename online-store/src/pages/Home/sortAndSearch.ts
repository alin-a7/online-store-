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
let isCards: boolean;
let searchVal: string;
let checkedCategoryArr: string[] = [];
let checkedBrandArr: string[] = [];
let minPriceValue: number;
let maxPriceValue: number;
let minStockValue: number;
let maxStockValue: number;
let params: URLSearchParams = new URLSearchParams(window.location.search);

export const searh: () => void = () => {
  arrCards = document.querySelectorAll(".home-card");
  const input = document.querySelector(".search-input") as HTMLInputElement;
  params.has("searchVal")
    ? (searchVal = String(params.get("searchVal")))
    : (searchVal = "");

  if (searchVal) {
    input.value = searchVal;
    makeSearch();
  }
  input.oninput = () => {
    searchVal = input.value.trim().toLocaleLowerCase();
    params.set("searchVal", `${searchVal}`);
    window.history.replaceState(
      {},
      "",
      `${document.location.pathname}?${params.toString()}`
    );
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
  sortedResponse = sortedResponse ? sortedResponse : [...response];
  params.has("selectValue")
    ? (selectValue = String(params.get("selectValue")))
    : (selectValue = "");
  if (selectValue) {
    sortSelect.value = selectValue;
  }
  makeSorting();
  sortSelect.onchange = () => {
    selectValue = sortSelect.value;
    params.set("selectValue", `${selectValue}`);
    window.history.replaceState(
      {},
      "",
      `${document.location.pathname}?${params.toString()}`
    );
    makeSorting();
  };
  function makeSorting(): void {
    if (selectValue === "price ASC")
      sortedResponse = sortedResponse.sort((a, b) => a.price - b.price);
    if (selectValue === "price DESC")
      sortedResponse = sortedResponse.sort((a, b) => b.price - a.price);
    if (selectValue === "rating ASC")
      sortedResponse = sortedResponse.sort((a, b) => a.rating - b.rating);
    if (selectValue === "rating DESC")
      sortedResponse = sortedResponse.sort((a, b) => b.rating - a.rating);

    renderSortCards();
  }
};

export const renderSortCards: () => void = () => {
  const cardWrapper = document.querySelector(".card-wrapper") as HTMLElement;
  cardWrapper.innerHTML = `
  <div class="home-not-found hidden-not">No products found</div>
  ${renderList(sortedResponse ? sortedResponse : response)}`;
  arrCards = document.querySelectorAll(".home-card");
  arrCards.forEach((card: Element) =>
    hidddenId.includes(+card.id) ? card.classList.add("hidden") : card
  );
  getNotFoundPoduct();

  getCartTotalAndItemHome();
  searh();
  // checkboxFilter();
  // rangePriceFilter();
  // rangeStockFilter();
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
  params.has("isCards")
    ? (isCards = Boolean(params.get("isCards")))
    : (isCards = true);

  isCards
    ? iconCards.classList.add("active-icon")
    : iconList.classList.add("active-icon");
  // renderSortCards();

  iconCards.addEventListener("click", () => {
    isCards = true;
    params.set("isCards", "true");

    window.history.replaceState(
      {},
      "",
      `${document.location.pathname}?${params.toString()}`
    );
    iconCards.classList.add("active-icon");
    iconList.classList.remove("active-icon");
    renderSortCards();
  });

  iconList.addEventListener("click", () => {
    isCards = false;
    params.set("isCards", "");

    window.history.replaceState(
      {},
      "",
      `${document.location.pathname}?${params.toString()}`
    );
    iconList.classList.add("active-icon");
    iconCards.classList.remove("active-icon");
    renderSortCards();
  });
};

export const checkboxFilter = () => {
  const checkboxes: NodeListOf<Element> = document.querySelectorAll(
    'input[type="checkbox"]'
  );
  arrCards = document.querySelectorAll(".home-card");

  params.has("category")
    ? (checkedCategoryArr = params.getAll("category")[0].split(","))
    : (checkedCategoryArr = []);
  params.has("brand")
    ? (checkedBrandArr = params.getAll("brand")[0].split(","))
    : (checkedBrandArr = []);
  restoringCheckboxes();
  filterByCategory();
  filetrByBrand();

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
      checkedCategoryArr.length
        ? params.set("category", `${String(checkedCategoryArr)}`)
        : params.delete("category");
      checkedBrandArr.length
        ? params.set("brand", `${String(checkedBrandArr)}`)
        : params.delete("brand");
      window.history.replaceState(
        {},
        "",
        `${document.location.pathname}?${params.toString()}`
      );

      if (checkbox.classList.contains("category")) {
        filterByCategory();
      } else {
        filetrByBrand();
      }
    });
  });

  function filterByCategory(): void {
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
  }
  function filetrByBrand(): void {
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

  params.has("minprice")
    ? (minPriceValue = Number(params.get("minprice")))
    : (minPriceValue = 0);
  params.has("maxprice")
    ? (maxPriceValue = Number(params.get("maxprice")))
    : (maxPriceValue = 1749);

  filterByPrice();

  rangePriceInput.forEach((input) => {
    input.addEventListener("change", () => {
      hidPricedId = [];
      minPriceValue = parseInt(rangePriceMinInput.value);
      maxPriceValue = parseInt(rangePriceMaxInput.value);
      minPriceValue = Math.min(minPriceValue, maxPriceValue);
      maxPriceValue = Math.max(minPriceValue, maxPriceValue);

      params.set("minprice", `${minPriceValue}`);
      params.set("maxprice", `${maxPriceValue}`);
      window.history.replaceState(
        {},
        "",
        `${document.location.pathname}?${params.toString()}`
      );
      filterByPrice();
    });
  });

  function filterByPrice(): void {
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
  }
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

  params.has("minstock")
    ? (minStockValue = Number(params.get("minstock")))
    : (minStockValue = 0);
  params.has("maxstock")
    ? (maxStockValue = Number(params.get("maxstock")))
    : (maxStockValue = 150);
  filterByStock();

  rangeStockInput.forEach((input) => {
    input.addEventListener("change", () => {
      hidStockdId = [];
      minStockValue = parseInt(rangeStockMinInput.value);
      maxStockValue = parseInt(rangeStockMaxInput.value);
      minStockValue = Math.min(minStockValue, maxStockValue);
      maxStockValue = Math.max(minStockValue, maxStockValue);

      params.set("minstock", `${minStockValue}`);
      params.set("maxstock", `${maxStockValue}`);
      window.history.replaceState(
        {},
        "",
        `${document.location.pathname}?${params.toString()}`
      );

      filterByStock();
    });
  });

  function filterByStock(): void {
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
  }
};

export const resetFilters: () => void = () => {
  const resetBtn = document.querySelector(".reset") as HTMLElement;
  resetBtn.addEventListener("click", () => {
    params = new URLSearchParams("");
    window.history.replaceState({}, "", `${document.location.pathname}`);
    sortedResponse = [...response];
    hidddenId.length =
      hidBrandId.length =
      hidCategoryId.length =
      hidPricedId.length =
      hidSearchId.length =
      hidStockdId.length =
      checkedBrandArr.length =
      checkedCategoryArr.length =
        0;

    const input = document.querySelector(".search-input") as HTMLInputElement;
    searchVal = "";
    input.value = "";
    restoringCheckboxes();

    renderSortCards();
    hideCards();

    const quantity = document.querySelector(".quantity") as HTMLElement;
    quantity.innerHTML = `Found: 100`;
  });
};

export const copyLink = () => {
  const copyBtn = document.querySelector(".copy") as HTMLElement;
  copyBtn.addEventListener("click", () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        copyBtn.innerHTML = "Copied!";
        setTimeout(() => (copyBtn.innerHTML = "Copy link"), 2000);
      })
      .catch((error) => console.log(error));
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
  let min: string;
  let max: string;
  const rangeMinInput = document.querySelector(
    `.${str}-min`
  ) as HTMLInputElement;
  const rangeMaxInput = document.querySelector(
    `.${str}-max`
  ) as HTMLInputElement;
  const minValue = document.querySelector(`.${str}-min-value`) as HTMLElement;
  const maxValue = document.querySelector(`.${str}-max-value`) as HTMLElement;

  min = `${getMinValue(str)}`;
  max = `${getCurrentMaxValue(str)}`;

  rangeMinInput.value = min;
  rangeMaxInput.value = max;
  minValue.innerHTML = `${min}${
    str === "price" && hidddenId.length < 100 ? "$" : ""
  }`;
  maxValue.innerHTML = `${max}${
    str === "price" && hidddenId.length < 100 ? "$" : ""
  }`;
}

export { sortedResponse, hidddenId, isCards, params };
