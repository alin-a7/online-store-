import {Iproduct} from "../model/model"
import {  homeCard, homeCardMini } from '../ProductCard/homeCard'
import { isCards } from "../../pages/Home/sortAndSearch"

export const renderList: (array: Iproduct[]) => string = (array = []) => {
  if (array.length < 1) return ''

  let htmlList = ``
  array.map((product) => {
   isCards? htmlList += homeCard(product):  htmlList += homeCardMini(product)
  })
  return htmlList
}

export const homeList: (array: Iproduct[]) => string = () => {
    return `
        <div class="card-wrapper">
          <div class="home-not-found hidden-not">No products found</div>
        </div>
    ` 
}
