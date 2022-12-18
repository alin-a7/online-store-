import {Iproduct} from "../model/model"
import { ProductCard, ProductCardMini } from '../ProductCard/productCard'
import { isCards } from "../model/sortAndSearch"

export const renderList: (array: Iproduct[]) => string = (array = []) => {
  if (array.length < 1) return ''

  let htmlList: string = ``
  array.map((product) => {
   isCards? htmlList += ProductCard(product):  htmlList += ProductCardMini(product)
  })
  return htmlList
}

export const ProductList: (array: Iproduct[]) => string = (array = []) => {
    return `
        <div class="card-wrapper">
          <div class="home-not-found hidden">No products found</div>
            ${renderList(array)}
        </div>
    ` 
}
