import { header } from '../Header/header'
import { footer } from "../Footer/footer"

export const layout = async (children: Function) => {
    return `
    ${header()}
        ${await children()}
    ${footer()}
    `
}
