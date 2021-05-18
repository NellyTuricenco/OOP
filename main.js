"use strict";

class Appliance {
  constructor(settings) {
    this._manufacturer = settings.manufacturer;
    this._model = settings.model;
    this._type = settings.type;
    this._isTurnedOn = true;
  }
  getType() {
    return this._type;
  }
  getManufacturer() {
    return this.manufacturer;
  }
  getModel() {
    return this.model;
  }
  _printErrorMessage(propName, value) {
    const description = `${propName} should be numeric only. Current ${propName.toLowerCase()} power has type of  `;
    console.error(description + typeof value);
  }
  showDetails() {
    if (!this._isTurnedOn) {
      return console.error(`You should first turn on the ${this._type}`);
    }
    console.log("%c[type]", "color: red; font-weight:bold;", this._type);
    console.log(
      "%c[manufacturer]",
      "color: red; font-weight:bold;",
      this._manufacturer
    );
    console.log("%c[model]", "color: red; font-weight:bold;", this._model);
  }
  turnOn() {
    if (this._isTurnedOn) return;
    this._isTurnedOn = true;
  }
  turnOff() {
    if (!this._isTurnedOn) return;
    this._isTurnedOn = false;
  }
}

class Fridge extends Appliance {
  constructor(settings) {
    settings.type = "fridge";
    super(settings);
    this._power = settings.power;
    this._t = 15;
  }
  changeEngine(enginePower) {
    if (this._isTurnedOn) {
      return console.error(`You should first turn off the ${this._type}`);
    }
    if (!Number.isFinite(enginePower)) {
      return this._printErrorMessage("Engine power", enginePower);
    }
    this._power = enginePower;
  }

  temperature(nextTemperature) {
    if (!this._isTurnedOn) {
      return console.error(`You should first turn on the ${this._type}`);
    }
    if (nextTemperature === undefined) {
      return console.log(`Current temperature: ${this._t}`);
    }
    if (!Number.isFinite(nextTemperature)) {
      return this._printErrorMessage("Temperature", nextTemperature);
    }
    setTimeout(
      function () {
        t = nextTemperature;
        console.log("Temperature is set");
      },
      power > 2000 ? 1000 : 2000
    );
  }

  showDetails() {
    showDetails.call(this);
    console.log("%c[power]", "color: blue; font-weight: bold;", this._power);
    console.log("%c[t]", "color: blue; font-weight: bold;", this._t);
  }
}

class TV extends Appliance {
  constructor(settings) {
    settings.type = "tv";
    super(settings);
    this._channel = 1;
  }
  changeChannel(nextChannel) {
    if (this._isTurnedOn) {
      return console.error(`You should first turn on the ${this._type}`);
    }
    if (!Number.isFinite(nextChannel)) {
      return this._printErrorMessage("Channel", nextChannel);
    }
    this._channel = nextChannel;
  }
  showDetails() {
    showDetails;
    console.log(
      "%c[channel]",
      "color: orange; font-weight: bold;",
      this._channel
    );
  }
}

class User {
  constructor(userData) {
    this._firstName = userData.firstName;
    this._lastName = userData.lastName;
  }
  getPersonalData() {
    return `${this._firstName} ${this._lastName}`;
  }
}

class AuthenticatedUser extends User {
  constructor(userData) {
    super(userData);
    this._cart = {};
  }
  _findProductInCart(product) {
    const type = product.getType();
    const cartProducts = this._cart[type];
    for (const i = 0, length = cartProducts.length; i < length; i++) {
      const cartProduct = cartProducts[i];

      const areEqualModels = cartProduct.getModel() === product.getModel();
      const areEqualManufacturers =
        cartProduct.getManufacturer() === product.getManufacturer();
      if (areEqualModels && areEqualManufacturers) {
        return {
          product: cartProduct,
          adx: i,
        };
      }
    }
    return null;
  }

  addProductToCart(product) {
    const type = product.getType();
    if (type in this._cart) {
      const existingProduct = this._findProductInCart(product);
      if (existingProduct) {
        existingProduct.product.quantity++;
        return;
      }

      const productInCart = Object.assign(
        Object.create(Appliance.prototype),
        product,
        { quantity: 1 }
      );
      const cartProducts = this._cart[type];
      cartProducts.push(productInCart);
      return;
    }
    const productInCart = Object.assign(
      Object.create(Appliance.prototype),
      product,
      { quantity: 1 }
    );
    this._cart[type] = [productInCart];
  }
  removeProductFromCart(product) {
    const foundProductData = this._findProductInCart(product);
    const type = product.getType();
    if (!foundProductData) return console.error(`${type} does not exist`);
    const cartProducts = this._cart[type];
    const cartProduct = foundProductData.product;
    if (cartProduct.quantity > 1) {
      cartProduct.quantity--;
      return;
    }
    if (cartProducts.length === 1) {
      delete this._cart[type];
      return;
    }
    cartProducts.splice(foundProductData.idx, 1);
  }
  printCartToConsole() {
    console.table(this._cart);
  }
}

const lgFridge1 = new Fridge({
  manufacturer: "LG",
  model: "RX-2",
  power: 2000,
});

const samsungFridge = new Fridge({
  manufacturer: "Samsung",
  model: "YX-204",
  power: 2000,
});

const tv = new TV({
  manufacturer: "Sony",
  model: "MD-4",
});

console.log("[TV]", tv);
const firstName = prompt("Please enter your first name", "");
const lastName = prompt("Please enter your last name", "");
const user = new AuthenticatedUser({
  firstName: firstName,
  lastName: lastName,
});

outer: while (true) {
  const message =
    "Choose one of the options:\n 1) Add product to cart \n 2) Remove product from cart \n 3) Print products \n 4) Quit";
  const option = +prompt(message, "");
  switch (option) {
    case 1:
      const userInput1 = prompt("Enter product type and manufacturer");
      const result1 = userInput1.split("|");
      const type1 = result1[0];
      const manufacturer1 = result1[1];
      if (type1 === "tv") {
        user.addProductToCart(tv);
      } else {
        user.addProductToCart(
          manufacturer1 === "lg" ? lgFridge : samsungFridge
        );
      }
      break;
    case 2:
      const userInput2 = prompt("Enter product type and manufacturer");
      const result2 = userInput2.split("|");
      const type2 = result2[0];
      const manufacturer2 = result2[1];
      if (type2 === "tv") {
        user.removeProductFromCart(tv);
      } else {
        user.removeProductFromCart(
          manufacturer2 === "lg" ? lgFridge : samsungFridge
        );
      }
      break;
    case 3:
      user.printCartToConsole();
      break;
    case 4:
    default:
      console.log("Good bye!");
      break outer;
  }
}
