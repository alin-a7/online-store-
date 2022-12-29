import { layout } from '../components/Layout/layout'
import  details  from '../pages/Details/details'
import home  from '../pages/Home/Home'
import cart from '../pages/Cart/cart'
import  notFound  from '../pages/notFound'

const pages = {
  '/': home,
  '/product': details,
  '/cart': cart,
}


export const router = async (route: string) => {
  const app = document.querySelector('#app') as HTMLElement
  app.innerHTML = ''

  const id:number = +route.split('/')[2]
  
  const currentPage = id > 100 ? notFound : pages[`${route[0]==='/'? '':'/'}${id? route.split('/').splice(0,2).join('/'):route}`] || notFound

  app.innerHTML = await layout(await currentPage.render)
  await currentPage.afterRender()
}


