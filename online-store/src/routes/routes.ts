import { layout } from '../components/Layout/layout'
import  details  from '../pages/Details/details'
import home  from '../pages/Home/home'
import cart from '../pages/Cart/cart'

const pages = {
  home: home,
  details: details,
  cart: cart,
}

const getCurrentPage = (route: string) => {
  switch (route) {
    case '#': {
      return pages.home
    }
    case '#product': {
      return pages.details
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

  app.innerHTML = await layout(await currentPage.render)
  await currentPage.afterRender()
}


