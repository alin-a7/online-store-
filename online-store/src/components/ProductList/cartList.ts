import {Iproduct} from "../model/model"
import { cartCard } from '../ProductCard/cartCard'

export const renderList: (array: Iproduct[]) => string = (array = []) => {
  if (array.length < 1) return ''

  let htmlList: string = ``
  array.map((product) => {
    htmlList += cartCard(product)
  })
  return htmlList
}

export const cartList: (array: Iproduct[]) => string = (array = []) => {
    return `
        <div class="card-wrapper">
          <div class="home-not-found hidden">No products found</div>
            ${renderList(array)}
        </div>
    ` 
}
