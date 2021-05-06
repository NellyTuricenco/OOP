"use strict";
//abstract class Appliance
// function Appliance(settings) {
//   var manufacturer = settings.manufacturer; //private (это и есть инкапсуляция)
//   var model = settings.model; //private
//   this._type = settings.type; //protected
//   this._isTurnedOn = true; //protected
//   //protected
//   this._printErrorMessage = function (propName, value) {
//     var description = `${propName} should be numeric only. Current ${propName.toLowerCase()} power has type of  `;
//     console.error(description + typeof value);
//   };
//   //public
//   this.showDetails = function () {
//     //public
//     if (!this._isTurnedOn) {
//       return console.error(`You should first turn on the ${this._type}`);
//     }
//     console.log("%c[type]", "color: red; font-weight:bold;", this._type);
//     console.log(
//       "%c[manufacturer]",
//       "color: red; font-weight:bold;",
//       manufacturer
//     );
//     console.log("%c[model]", "color: red; font-weight:bold;", model);
//   };
//   //private
//   this.turnOn = function () {
//     if (this._isTurnedOn) return;
//     this._isTurnedOn = true;
//   };
//   //private
//   this.turnOff = function () {
//     if (!this._isTurnedOn) return;
//     this._isTurnedOn = false;
//   };
// }
////using prototype heritage we should do the next://
function Appliance(settings) {
  this._manufacturer = settings.manufacturer; //protected
  this._model = settings.model; //protected
  this._type = settings.type; //protected
  this._isTurnedOn = true; //protected
  //public
  Appliance.prototype.getType = function () {
    return this._type;
  };
  Appliance.prototype.getManufacturer = function () {
    return this.manufacturer;
  };
  Appliance.prototype.getModel = function () {
    return this.model;
  };
  //protected
  Appliance.prototype._printErrorMessage = function (propName, value) {
    var description = `${propName} should be numeric only. Current ${propName.toLowerCase()} power has type of  `;
    console.error(description + typeof value);
  };
  //public
  Appliance.prototype.showDetails = function () {
    //public
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
  };
  //private
  Appliance.prototype.turnOn = function () {
    if (this._isTurnedOn) return;
    this._isTurnedOn = true;
  };
  //private
  Appliance.prototype.turnOff = function () {
    if (!this._isTurnedOn) return;
    this._isTurnedOn = false;
  };
}
Fridge.prototype.__proto__ = Appliance.prototype;
TV.prototype.__proto__ = Appliance.prototype;
//class Fridge
function Fridge(settings) {
  settings.type = "fridge";
  Appliance.call(this, settings);
  this._power = settings.power; //protected
  this._t = 15; //protected
}

Fridge.prototype.changeEngine = function (enginePower) {
  if (this._isTurnedOn) {
    return console.error(`You should first turn off the ${this._type}`);
  }
  if (!Number.isFinite(enginePower)) {
    return this._printErrorMessage("Engine power", enginePower);
  }
  this._power = enginePower;
};

Fridge.prototype.temperature = function (nextTemperature) {
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
};

//public
Fridge.prototype.showDetails = function () {
  Appliance.prototype.showDetails.call(this);
  console.log("%c[power]", "color: blue; font-weight: bold;", this._power);
  console.log("%c[t]", "color: blue; font-weight: bold;", this._t);
};
// console.log("[fridge]", fridge);

//class TV
function TV(settings) {
  settings.type = "tv";
  Appliance.call(this, settings);
  this._channel = 1; //protected
  //public
}

TV.prototype.changeChannel = function (nextChannel) {
  if (this._isTurnedOn) {
    return console.error(`You should first turn on the ${this._type}`);
  }
  if (!Number.isFinite(nextChannel)) {
    return this._printErrorMessage("Channel", nextChannel);
  }
  this._channel = nextChannel;
};

//public
TV.prototype.showDetails = function () {
  Appliance.prototype.showDetails;
  console.log(
    "%c[channel]",
    "color: orange; font-weight: bold;",
    this._channel
  );
};

function User(userData) {
  this._firstName = userData.firstName;
  this._lastName = userData.lastName;
}
User.prototype.getPersonalData = function () {
  return `${this._firstName} ${this._lastName}`;
};
// AuthenticatedUser.prototype.__proto__ = User.prototype; - more mordern method
AuthenticatedUser.prototype = Object.create(User.prototype);
AuthenticatedUser.prototype.constructor = AuthenticatedUser;

function AuthenticatedUser(userData) {
  User.call(this, userData);
  this._cart = {};
}
AuthenticatedUser.prototype._findProductInCart = function (product) {
  var type = product.getType();
  var cartProducts = this._cart[type];
  for (var i = 0, length = cartProducts.length; i < length; i++) {
    var cartProduct = cartProducts[i];

    var areEqualModels = cartProduct.getModel() === product.getModel();
    var areEqualManufacturers =
      cartProduct.getManufacturer() === product.getManufacturer();
    if (areEqualModels && areEqualManufacturers) {
      return {
        product: cartProduct,
        adx: i,
      };
    }
  }
  return null;
};

AuthenticatedUser.prototype.addProductToCart = function (product) {
  var type = product.getType();
  if (type in this._cart) {
    var existingProduct = this._findProductInCart(product);
    if (existingProduct) {
      existingProduct.product.quantity++;
      return;
    }

    var productInCart = Object.assign(
      Object.create(Appliance.prototype),
      product,
      { quantity: 1 }
    );
    var cartProducts = this._cart[type];
    cartProducts.push(productInCart);
    return;
  }
  var productInCart = Object.assign(
    Object.create(Appliance.prototype),
    product,
    { quantity: 1 }
  );
  this._cart[type] = [productInCart];
};
AuthenticatedUser.prototype.removeProductFromCart = function (product) {
  var foundProductData = this._findProductInCart(product);
  var type = product.getType();
  if (!foundProductData) return console.error(`${type} does not exist`);
  var cartProducts = this._cart[type];
  var cartProduct = foundProductData.product;
  if (cartProduct.quantity > 1) {
    cartProduct.quantity--;
    return;
  }
  if (cartProducts.length === 1) {
    delete this._cart[type];
    return;
  }
  cartProducts.splice(foundProductData.idx, 1);
};
AuthenticatedUser.prototype.printCartToConsole = function () {
  console.table(this._cart);
};
var firstName = prompt("Please enter your first name", "");
var lastName = prompt("Please enter your last name", "");
var user = new AuthenticatedUser({
  firstName: firstName,
  lastName: lastName,
});

outer: while (true) {
  var message =
    "Choose one of the options:\n 1) Add product to cart \n 2) Remove product from cart \n 3) Print products \n 4) Quit";
  var option = +prompt(message, "");
  switch (option) {
    case 1:
      var userInput = prompt("Enter product type and manufacturer");
      var result = userInput.split("|");
      var type = result[0];
      var manufacturer = result[1];
      if (type === "tv") {
        user.addProductToCart(tv);
      } else {
        user.addProductToCart(manufacturer === "lg" ? lgFridge : samsungFridge);
      }
      break;
    case 2:
      var userInput = prompt("Enter product type and manufacturer");
      var result = userInput.split("|");
      var type = result[0];
      var manufacturer = result[1];
      if (type === "tv") {
        user.removeProductFromCart(tv);
      } else {
        user.removeProductFromCart(
          manufacturer === "lg" ? lgFridge : samsungFridge
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
// console.log("[u1]", u1);
var lgFridge1 = new Fridge({
  manufacturer: "LG",
  model: "RX-2",
  power: 2000,
});

var samsungFridge = new Fridge({
  manufacturer: "Samsung",
  model: "YX-204",
  power: 2000,
});
var tv = new TV({
  manufacturer: "Sony",
  model: "MD-4",
});
// u1.addProductToCart(lgFridge1);
u1.addProductToCart(lgFridge2);
u1.addProductToCart(samsungFridge);
u1.addProductToCart(samsungFridge);
u1.addProductToCart(tv);

// console.log("[TV]", tv);
