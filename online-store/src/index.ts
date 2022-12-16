import { router } from './routes/routes'

const init = () => {
  router(window.location.hash);

  window.addEventListener("hashchange", () => {
    router(window.location.hash);
  });
};

window.addEventListener("load", init);

// const dB = document.querySelectorAll('button');
// console.log(dB)