import { Footer } from '../Footer/Footer'
import { Header } from '../Header/header'

export const Layout = async (children: Function) => {
    return `
    ${Header()}
        ${await children()}
    ${Footer()}
    `
}