import { modalWindowCard } from "./modalWindow/modalWindowCard";
import { windowAppearance } from "./modalWindow/modalWindow";
import { validation } from "./modalWindow/modalWindow";

export default {
    render: async () => {
      return `
          <div class="cart-wrapper">
          not found
          </div>
          <div class="popup">
            ${modalWindowCard()}
          </div>
      `;
    },
    afterRender: async () => {
      windowAppearance();
      validation();
    },
  };
  