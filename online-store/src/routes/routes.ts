import { Layout } from '../components/Layout/layout'
import  Product  from '../pages/Product'
import Home  from '../pages/Home'
import Cart from '../pages/Cart'

const pages = {
  home: Home,
  product: Product,
  cart: Cart,
}

const getCurrentPage = (route: string) => {
  switch (route) {
    case '#': {
      return pages.home
    }
    case '#product': {
      return pages.product
    }
    case '#cart': {
      return pages.cart
    }
    default: {
      return pages.home
    }
  }
}



export const router = async (route: string) => {
  const app = document.querySelector('#app') as HTMLElement
  app.innerHTML = ''

  const currentPage = getCurrentPage(route) as any

  app.innerHTML = await Layout(await currentPage.render)
  await currentPage.afterRender()
}


