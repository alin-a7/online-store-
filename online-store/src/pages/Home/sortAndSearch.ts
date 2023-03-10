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
import { Filter, Sorting } from "../../components/model/const";

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
const PRICE_GAP: number = 300
const STOCK_GAP: number = 20

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
    if (selectValue === Sorting.price_ASC)
      sortedResponse = sortedResponse.sort((a, b) => a.price - b.price);
    if (selectValue === Sorting.price_DESC)
      sortedResponse = sortedResponse.sort((a, b) => b.price - a.price);
    if (selectValue === Sorting.rating_ASC)
      sortedResponse = sortedResponse.sort((a, b) => a.rating - b.rating);
    if (selectValue === Sorting.rating_DESC)
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
  hidddenId = getUniqArr(
    hidCategoryId,
    hidSearchId,
    hidBrandId,
    hidPricedId,
    hidStockdId
  );

  arrCards.forEach((card) => {
    hidddenId.includes(+card.id)
      ? card.classList.add("hidden")
      : card.classList.remove("hidden");
  });

  const hidCards: NodeListOf<Element> = document.querySelectorAll(".hidden");
  const quantity = document.querySelector(".quantity") as HTMLElement;
  quantity.innerHTML = `Found: ${100 - hidCards.length}`;

  getNotFoundPoduct();

  changesQuantityItem(Filter.category);
  changesQuantityItem(Filter.brand);
  changesRangeItem(Filter.price);
  changesRangeItem(Filter.stock);
}
export function getUniqArr(
  arr1: number[],
  arr2: number[],
  arr3: number[],
  arr4: number[],
  arr5: number[]
): number[] {
  return [...new Set([...arr1, ...arr2, ...arr3, ...arr4, ...arr5])];
}

function restoringCheckboxes(): void {
  const checkedArr: string[] = [...checkedBrandArr, ...checkedCategoryArr];
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
    input.addEventListener("input", (e) => {
      hidPricedId = [];
      minPriceValue = parseInt((rangePriceInput[0] as HTMLInputElement).value);
      maxPriceValue = parseInt((rangePriceInput[1] as HTMLInputElement).value);

      if(maxPriceValue - minPriceValue < PRICE_GAP){
        if((e.target as HTMLInputElement).className === 'price-min'){
          minPriceValue = maxPriceValue - PRICE_GAP;
          (rangePriceInput[0] as HTMLInputElement).value = `${minPriceValue}`
        } else {
          maxPriceValue = minPriceValue + PRICE_GAP;
          (rangePriceInput[1] as HTMLInputElement).value = `${maxPriceValue}`
        }
      }

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
    input.addEventListener("input", (e) => {
      hidStockdId = [];
      minStockValue = parseInt((rangeStockInput[0] as HTMLInputElement).value);
      maxStockValue = parseInt((rangeStockInput[1] as HTMLInputElement).value);

      if(maxStockValue - minStockValue < STOCK_GAP){
        if((e.target as HTMLInputElement).className === 'stock-min'){
          minStockValue = maxStockValue - STOCK_GAP;
          (rangeStockInput[0] as HTMLInputElement).value = `${minStockValue}`
        } else {
          maxStockValue = minStockValue + STOCK_GAP;
          (rangeStockInput[1] as HTMLInputElement).value = `${maxStockValue}`
        }
      }

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
    clearArray(hidddenId)
    clearArray(hidBrandId)
    clearArray(hidCategoryId)
    clearArray(hidPricedId)
    clearArray(hidSearchId)
    clearArray(hidStockdId)
    clearArray(checkedBrandArr)
    clearArray(checkedCategoryArr)

    const input = document.querySelector(".search-input") as HTMLInputElement;
    searchVal = "";
    input.value = "";
    const sortSelect = document.querySelector(
      ".sort-select"
    ) as HTMLSelectElement;
    sortSelect.value = "Sorting options";
    restoringCheckboxes();

    renderSortCards();
    hideCards();

    const quantity = document.querySelector(".quantity") as HTMLElement;
    quantity.innerHTML = `Found: 100`;
  });
};

interface Lengthwise {
  length: number;
}
export function clearArray<T extends Lengthwise>(arr:T): number{
  return arr.length = 0
}

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
  const rangeMinInput = document.querySelector(
    `.${str}-min`
  ) as HTMLInputElement;
  const rangeMaxInput = document.querySelector(
    `.${str}-max`
  ) as HTMLInputElement;
  const minValue = document.querySelector(`.${str}-min-value`) as HTMLElement;
  const maxValue = document.querySelector(`.${str}-max-value`) as HTMLElement;

  const min = `${getMinValue(str)}`;
  const max = `${getCurrentMaxValue(str)}`;

  rangeMinInput.value = min;
  rangeMaxInput.value = max;
  minValue.innerHTML = `${min}${
    str === Filter.price && hidddenId.length < 100 ? "$" : ""
  }`;
  maxValue.innerHTML = `${max}${
    str === Filter.price && hidddenId.length < 100 ? "$" : ""
  }`;
}

export { sortedResponse, hidddenId, isCards, params };
