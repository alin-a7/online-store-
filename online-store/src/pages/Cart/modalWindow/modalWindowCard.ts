import { isBay } from "../../../components/cartArr/cartArr";

export const modalWindowCard: () => string = () => {
  return `
    <div class="blackout ${isBay ? "" : "hidden"}"></div>
    <div class="popup-wrapper ${isBay ? "" : "hidden"}">
    <div class="popup__title">Personal details</div>
    <input type="text" class="input-name" placeholder="Name" />
    <input type="text" class="input-phone" placeholder="Phone number" />
    <input type="text" class="input-address" placeholder="Delivery address" />
    <input type="email" class="input-email" placeholder="E-mail" />
    <div class="credit-card__title">Credit card details</div>
    <div class="credit-card-wrapper">
      <div class="card-number-wrapper">
        <img
          src="./components/assets/bankCard.svg"
          alt="card"
          class="card-icon"
        />
        <input type="text" class="input-number" placeholder="Card number" />
      </div>
      <div class="card-info">
          <input type="text" id="valid" class="card-valid" placeholder="Valid Thru">
          <input type="text" id="cvv" class="card-cvv" placeholder="CVV">
      </div>
    </div>
    <button class="popup__btn">CONFIRM</button>
  </div>
    `;
};
