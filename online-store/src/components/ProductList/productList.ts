import {Iproduct} from "../model/model"
import { ProductCard } from '../ProductCard/productCard'

const renderList: (array: Iproduct[]) => string = (array = []) => {
  if (array.length < 1) return ''

  let htmlList: string = ``
  array.map((product) => {
    htmlList += ProductCard(product)
  })
  return htmlList
}

export const ProductList: (array: Iproduct[]) => string = (array = []) => {
    return `
        <div class="card-wrapper">
            ${renderList(array)}
        </div>
    ` 
}
