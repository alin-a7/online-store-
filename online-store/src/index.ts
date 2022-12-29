import { router } from './routes/routes'

const init = () => {
  router(window.location.hash.slice(1));

  window.addEventListener("hashchange", () => {
    router(window.location.hash.slice(1));
  });
};

window.addEventListener("load", init);

