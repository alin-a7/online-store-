import { layout } from "../components/Layout/layout";
import details from "../pages/Details/details";
import home from "../pages/Home/Home";
import cart from "../pages/Cart/cart";
import notFound from "../pages/notFound";

interface Pages {
  render: () => Promise<string>;
  afterRender: () => Promise<void>;
}
type Router = Record<string, Pages>;

const pages: Router = {
  "/": home,
  "/product": details,
  "/cart": cart,
};

export const router = async (route: string) => {
  const app = document.querySelector("#app") as HTMLElement;
  app.innerHTML = "";
  const id: number = +route.split("/")[2];

  const currentPage: Pages =
    ((id > 100) || (route.split("/").length >= 4))
      ? notFound
      : pages[getPage(route)] || notFound;

  app.innerHTML = await layout(await currentPage.render);
  await currentPage.afterRender();
};

export function getPage(str: string): string {
  return `${str[0] === "/" ? "" : "/"}${
    +str.split("/")[2] ? str.split("/").splice(0, 2).join("/") : str
  }`;
}
