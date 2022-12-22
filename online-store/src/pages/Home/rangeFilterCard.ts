import { response } from "./Home";
import { hidddenId } from "./sortAndSearch";
import { Iproduct } from "../../components/model/model";

const getMaxValue: (str: string) => number = (str) => {
  const responseCopy = [...response];
  return responseCopy.sort((a, b) => b[str] - a[str])[0][str];
};
export const getCurrentMaxValue: (str: string) => number = (str) => {
  const responseCopy = [...response];
  return responseCopy.filter(
    (product: Iproduct) => !hidddenId.includes(product.id)
  ).length
    ? responseCopy
        .filter((product: Iproduct) => !hidddenId.includes(product.id))
        .sort((a, b) => b[str] - a[str])[0][str]
    : 'Not found';
};

export const getMinValue: (str: string) => number = (str) => {
  const responseCopy = [...response];
  return responseCopy.filter(
    (product: Iproduct) => !hidddenId.includes(product.id)
  ).length
    ? responseCopy
        .filter((product: Iproduct) => !hidddenId.includes(product.id))
        .sort((a, b) => a[str] - b[str])[0][str]
    : 'Not found';
};

export const rangeFilterCard: (str: string) => string = (str) => {
  return `
    <div class="filter-card">
      <div class="filter__title">${str}</div>
      <div class="filter__range-wrapper">
        <div class="range-value-wrapper">
          <div class="${str}-min-value">${getMinValue(str)}${
    str === "price" ? "$" : ""
  }</div>
          <div class="">⟷</div>
          <div class="${str}-max-value">${getMaxValue(str)}${
    str === "price" ? "$" : ""
  }</div>
        </div>
        <div class="range-slider ${str}-range">
          <input type="range" min="0" max="${getMaxValue(str)}" step="${
    getMaxValue(str) / 100
  }" value="${getMinValue(str)}" class="${str}-min">
          <input type="range" min="0" max="${getMaxValue(str)}" step="${
    getMaxValue(str) / 100
  }" value="${getCurrentMaxValue(str)}" class="${str}-max">
        </div>
     </div>
   </div>

    `;
};
