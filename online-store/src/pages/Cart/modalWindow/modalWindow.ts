export function windowAppearance() {
  const blackout = document.querySelector(".blackout") as HTMLElement;
  const popup = document.querySelector(".popup-wrapper") as HTMLElement;
  blackout.addEventListener("click", () => {
    blackout.classList.add("hidden");
    popup.classList.add("hidden");
  });
}

const regEmail = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
const regPhone = /^((\+)+([0-9]){9,})$/;

export function validation() {
  const inputName = document.querySelector(".popup__btn") as HTMLElement;
  const popup = document.querySelector(".popup-wrapper") as HTMLElement;
  enteringOnlyNumbers();
  validationCardValid();
  validationCVV();
  validationCardNumber();

  inputName.addEventListener("click", () => {
    validationNameAndAdress("input-name", 2, 3, 0);
    validationNameAndAdress("input-address", 3, 5, 2);
    validationEmailAndPhone("input-phone", regPhone, 1);
    validationEmailAndPhone("input-email", regEmail, 3);
    if (
      validationNameAndAdress("input-name", 2, 3, 0) &&
      validationNameAndAdress("input-address", 3, 5, 2) &&
      validationEmailAndPhone("input-phone", regPhone, 1) &&
      validationEmailAndPhone("input-email", regEmail, 3) &&
      validationCardValid() &&
      validationCVV() &&
      validationCardNumber()
    ) {
      popup.innerHTML = "Your order has been placed!";
      setTimeout(() => {
        window.location.assign(`${window.location.pathname}`)
      }, 3000);
    }
  });
}

function getError(input: HTMLInputElement, err: HTMLElement): void {
  input.style.border = "3px solid rgb(215, 24, 24)";
  input.style.width = "50%";
  err.style.display = "block";
}
function getNotError(input: HTMLInputElement, err: HTMLElement): void {
  input.style.border = "1px solid white";
  input.style.width = "97%";
  err.style.display = "none";
}

function validationNameAndAdress(
  input: string,
  count: number,
  length: number,
  i: number
): boolean {
  const inputName = document.querySelector(`.${input}`) as HTMLInputElement;
  const errors: NodeListOf<Element> = document.querySelectorAll(".message");
  const errorMes = errors[i] as HTMLElement;
  let value: string;
  let nameCount: number;
  let nameLength: number;

  inputName.oninput = () => {
    value = inputName.value
      .split(" ")
      .map((x) =>
        x
          .split("")
          .map((z, i) => (i === 0 ? (z = z.toLocaleUpperCase()) : z))
          .join("")
      )
      .join(" ");
    inputName.value = value;
    nameCount = value.split(" ").length;
    nameLength = value.split(" ").filter((x) => x.length >= length).length;
    if (nameCount >= count && nameLength === nameCount) {
      getNotError(inputName, errorMes);
    } else {
      getError(inputName, errorMes);
    }
  };
  value = inputName.value
    .split(" ")
    .map((x) =>
      x
        .split("")
        .map((z, i) => (i === 0 ? (z = z.toLocaleUpperCase()) : z))
        .join("")
    )
    .join(" ");
  inputName.value = value;
  nameCount = value.split(" ").length;
  nameLength = value.split(" ").filter((x) => x.length >= length).length;
  if (nameCount >= count && nameLength === nameCount) {
    getNotError(inputName, errorMes);
    return true;
  } else {
    getError(inputName, errorMes);
    return false;
  }
}

function validationEmailAndPhone(str: string, re: RegExp, i: number): boolean {
  const input = document.querySelector(`.${str}`) as HTMLInputElement;
  const errors: NodeListOf<Element> = document.querySelectorAll(".message");
  const errorMes = errors[i] as HTMLElement;
  input.oninput = () => {
    if (re.test(input.value.trim())) {
      getNotError(input, errorMes);
    } else {
      getError(input, errorMes);
    }
  };
  if (re.test(input.value.trim())) {
    getNotError(input, errorMes);
    return true;
  } else {
    getError(input, errorMes);
    return false;
  }
}

function enteringOnlyNumbers(): void {
  const inputs: NodeListOf<Element> =
    document.querySelectorAll(".only-numbers");
  inputs.forEach((element) => {
    const input = element as HTMLInputElement;
    input.addEventListener("keydown", (event: KeyboardEvent) => {
      if (
        event.keyCode == 46 ||
        event.keyCode == 8 ||
        event.keyCode == 9 ||
        event.keyCode == 27 ||
        (event.keyCode == 65 && event.ctrlKey === true) ||
        (event.keyCode >= 35 && event.keyCode <= 39)
      ) {
        return;
      } else {
        if (
          (event.keyCode < 48 || event.keyCode > 57) &&
          (event.keyCode < 96 || event.keyCode > 105)
        ) {
          event.preventDefault();
        }
      }
    });
  });
}

function getCardError(input: HTMLInputElement, err: HTMLElement): void {
  input.style.border = "3px solid rgb(215, 24, 24)";
  err.style.display = "block";
}
function getCardNotError(input: HTMLInputElement, err: HTMLElement): void {
  input.style.border = "1px solid white";
  err.style.display = "none";
}

function validationCardValid(): boolean {
  const inputValid = document.querySelector(`.card-valid`) as HTMLInputElement;
  const validErr = document.querySelector(`.valid-err`) as HTMLElement;
  let value: string = inputValid.value;
  inputValid.oninput = () => {
    const intermediateValue = inputValid.value
      .split(/(\d{2})/)
      .map((item) => item.replace("/", ""))
      .filter((item) => item !== "");
    intermediateValue.includes("/")
      ? (value = intermediateValue.join(""))
      : (value = intermediateValue.join("/"));
    inputValid.value = value;
    if (+value.split("/")[0] <= 12 && +value.split("/")[1] >= 22) {
      getCardNotError(inputValid, validErr);
    } else {
      getCardError(inputValid, validErr);
    }
  };
  if (+value.split("/")[0] <= 12 && +value.split("/")[1] >= 22) {
    return true;
  } else {
    return false;
  }
}

function validationCVV(): boolean {
  const inputCVV = document.querySelector(`.card-cvv`) as HTMLInputElement;
  const cvvErr = document.querySelector(`.cvv-err`) as HTMLElement;
  inputCVV.oninput = () => {
    if (inputCVV.value.length === 3) {
      getCardNotError(inputCVV, cvvErr);
    } else {
      getCardError(inputCVV, cvvErr);
    }
  };
  if (inputCVV.value.length === 3) {
    return true;
  } else {
    return false;
  }
}

function validationCardNumber(): boolean {
  const inputValid = document.querySelector(
    `.input-number`
  ) as HTMLInputElement;
  const numberErr = document.querySelector(`.number-err`) as HTMLElement;
  let value: string = inputValid.value;
  inputValid.oninput = () => {
    changeCardLogo(inputValid);
    const intermediateValue = inputValid.value
      .split(/(\d{4})/)
      .map((item) => item.replace(" ", ""))
      .filter((item) => item !== "");
    intermediateValue.includes(" ")
      ? (value = intermediateValue.join(""))
      : (value = intermediateValue.join(" "));
    inputValid.value = value;
    if (value.length === 19) {
      getCardNotError(inputValid, numberErr);
    } else {
      getCardError(inputValid, numberErr);
    }
  };
  if (value.length === 19) {
    return true;
  } else {
    return false;
  }
}

function changeCardLogo(input: HTMLInputElement): void {
  const logo = document.querySelector(".card-icon") as HTMLImageElement;
  if (+input.value.split("")[0] === 4) {
    logo.setAttribute("src", "./components/assets/visa.svg");
  } else if (+input.value.split("")[0] === 5) {
    logo.setAttribute("src", "./components/assets/MAstercard.png");
  } else if (+input.value.split("")[0] === 6) {
    logo.setAttribute("src", "./components/assets/belcart.png");
  } else {
    logo.setAttribute("src", "./components/assets/bankCard.svg");
  }
}
