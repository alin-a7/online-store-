import { response } from "./Home";
import { Iproduct } from "../../components/model/model";
import { hidddenId } from "./sortAndSearch";
import { products } from "../../components/model/const";

export const getFilterItems: (str: string) => string[] = (str) => {
  const items: string[] = [];
  response.forEach((product: Iproduct) =>
    !items.includes(product[`${str === 'category'? 'category':'brand'}`]) ? items.push(product[`${str === 'category'? 'category':'brand'}`]) : items
  );
  return items;
};

export const getMaxQuantityItem: (str: string, item: string) => number = (str, item) => {
  return products.filter((product: Iproduct) => product[`${str === 'category'? 'category':'brand'}`] === item).length;
};
export const getQuantityItem: (str: string, item: string) => number = (str, item) => {
  return response.filter((product: Iproduct) => product[`${str === 'category'? 'category':'brand'}`] === item && !hidddenId.includes(product.id)).length;
};

const filterItem: (str: string, item: string) => string = (str, item) => {
  return `
    <div class="filter__item">
      <label class="filter__label">
        <input type="checkbox" class="${str}" value="${item}" /> ${item}
      </label>
      <div class="filter-${str}__quantity">(${getQuantityItem(str,item)}/${getMaxQuantityItem(str, item)})</div>
    </div>
`;
};

const filterList: (str: string) => string = (str) => {
  const items = getFilterItems(str);

  let htmlList = ``;
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
