import {Iproduct} from "../model/model"
import { cartCard } from '../ProductCard/cartCard'

export const renderList: (array: Iproduct[]) => string = (array = []) => {
  if (array.length < 1) return ''

  let htmlList = ``
  array.map((product, index) => {
    htmlList += cartCard(product, index)
  })
  return htmlList
}

export const cartList: (array: Iproduct[]) => string = (array = []) => {
    return `
        <div class="cart-card-wrapper">
          <div class="home-not-found hidden">No products found</div>
            ${renderList(array)}
        </div>
    ` 
}
