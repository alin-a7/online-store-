import { header } from '../Header/header'
import { footer } from "../Footer/Footer"

export const layout = async (children: () => Promise<string>) => {
    return `
    ${header()}
        ${await children()}
    ${footer()}
    `
}
