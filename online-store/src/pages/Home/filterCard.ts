import { response } from "./Home";
import { Iproduct } from "../../components/model/model";

const getFilterItems: (str: string) => string[] = (str) => {
  let items: string[] = [];
  response.forEach((product: Iproduct) =>
    !items.includes(product[str]) ? items.push(product[str]) : items
  );
  return items;
};

const getQuantityItem: (str: string, item: string) => number = (str, item) => {
  return response.filter((product: Iproduct) => product[str] === item).length;
};

const filterItem: (str: string, item: string) => string = (str, item) => {
  return `
    <div class="filter__item">
      <label class="filter__label">
        <input type="checkbox" class="${str}" value="${item}" /> ${item}
      </label>
      <div class="filter__quantity">(${getQuantityItem(str,item)}/${getQuantityItem(str, item)})</div>
    </div>
`;
};

const filterList: (str: string) => string = (str) => {
  const items = getFilterItems(str);

  let htmlList: string = ``;
  items.map((item: string) => {
    htmlList += filterItem(str, item)
  });
  return htmlList
};

export const filterCard: (str: string) => string = (str) =>{
    return `
    <div class="filter-card">
      <div class="filter__title">${str}</div>
      <div class="filter__item-wrapper">
        ${filterList(str)}
     </div>
   </div>

    `
}
