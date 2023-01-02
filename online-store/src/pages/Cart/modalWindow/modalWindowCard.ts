import { isBay } from "../../../components/cartArr/cartArr";

export const modalWindowCard: () => string = () => {
  return `
    <div class="blackout ${isBay ? "" : "hidden"}"></div>
    <div class="popup-wrapper ${isBay ? "" : "hidden"}">
    <div class="popup__title">Personal details</div>
    <div class="input-wrapper">
      <input type="text" class="input-name" placeholder="Name" />
      <div class="message hidden">Name - error</div>
    </div>
    <div class="input-wrapper">
      <input type="text" class="input-phone" placeholder="Phone number" />
      <div class="message hidden">Phone - error</div>
    </div>
    <div class="input-wrapper">
      <input type="text" class="input-address" placeholder="Delivery address" />
      <div class="message hidden">Address - error</div>
    </div>
    <div class="input-wrapper">
      <input type="email" class="input-email" placeholder="E-mail" />
      <div class="message hidden">Email - error</div>
    </div>
    <div class="credit-card__title">Credit card details</div>
    <div class="credit-card-wrapper">
      <div class="card-number-wrapper">
        <img
          src="./components/assets/bankCard.svg"
          alt="card"
          class="card-icon"
        />
        <input type="text" class="input-number only-numbers" maxlength="19" placeholder="Card number" />
      </div>
      <div class="card-info">
          <input type="text" id="valid" class="card-valid only-numbers" maxlength="5" placeholder="Valid Thru">
          <input type="text" id="cvv" class="card-cvv only-numbers" maxlength="3" placeholder="CVV">
      </div>
    </div>
    <button class="popup__btn">CONFIRM</button>
    <div class="message number-err hidden">Card number - error</div>
    <div class="message valid-err hidden">Card valid thru - error</div>
    <div class="message cvv-err hidden">Card CVV - error</div>
  </div>
    `;
};
