export function windowAppearance() {
  const blackout = document.querySelector(".blackout") as HTMLElement;
  const popup = document.querySelector(".popup-wrapper") as HTMLElement;
  blackout.addEventListener("click", () => {
    blackout.classList.add("hidden");
    popup.classList.add("hidden");
  });
}
