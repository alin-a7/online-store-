import { header } from '../Header/header'
import { footer } from "../Footer/Footer"

export const layout = async (children: Function) => {
    return `
    ${header()}
        ${await children()}
    ${footer()}
    `
}
