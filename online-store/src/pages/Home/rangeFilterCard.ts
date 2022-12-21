import { response } from "./Home";
import { Iproduct } from "../../components/model/model";

const getMaxValue: (str: string) => number = (str) => {
    const responseCopy = [...response]
  return responseCopy.sort((a,b)=>b[str]-a[str])[0][str];
};

export const rangeFilterCard: (str: string) => string = (str) =>{
    return `
    <div class="filter-card">
      <div class="filter__title">${str}</div>
      <div class="filter__range-wrapper">
        <div class="range-value-wrapper">
          <div class="${str}-min-value">0${str === 'price'? '$':''}</div>
          <div class="">⟷</div>
          <div class="${str}-max-value">${getMaxValue(str)}${str === 'price'? '$':''}</div>
        </div>
        <div class="range-slider ${str}-range">
          <input type="range" min="0" max="${getMaxValue(str)}" step="${getMaxValue(str)/100}" value="0" class="${str}-min">
          <input type="range" min="0" max="${getMaxValue(str)}" step="${getMaxValue(str)/100}" value="${getMaxValue(str)}" class="${str}-max">
        </div>
     </div>
   </div>

    `
}
