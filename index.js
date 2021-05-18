//  lgFridge1 = new Fridge({
//   manufacturer: "LG",
//   model: "RX-2",
//   power: 2000,
// });

// const samsungFridge = new Fridge({
//   manufacturer: "Samsung",
//   model: "YX-204",
//   power: 2000,
// });
// const tv = new TV({
//   manufacturer: "Sony",
//   model: "MD-4",
// });
// u1.addProductToCart(lgFridge1);
// u1.addProductToCart(lgFridge2);
// u1.addProductToCart(samsungFridge);
// u1.addProductToCart(samsungFridge);
// u1.addProductToCart(tv);

// console.log("[TV]", tv);
// const firstName = prompt("Please enter your first name", "");
// const lastName = prompt("Please enter your last name", "");
// const user = new AuthenticatedUser({
//   firstName: firstName,
//   lastName: lastName,
// });

// outer: while (true) {
//   const message =
//     "Choose one of the options:\n 1) Add product to cart \n 2) Remove product from cart \n 3) Print products \n 4) Quit";
//   const option = +prompt(message, "");
//   switch (option) {
//     case 1:
//       const userInput = prompt("Enter product type and manufacturer");
//       const result = userInput.split("|");
//       const type = result[0];
//       const manufacturer = result[1];
//       if (type === "tv") {
//         user.addProductToCart(tv);
//       } else {
//         user.addProductToCart(manufacturer === "lg" ? lgFridge : samsungFridge);
//       }
//       break;
//     case 2:
//       const userInput = prompt("Enter product type and manufacturer");
//       const result = userInput.split("|");
//       const type = result[0];
//       const manufacturer = result[1];
//       if (type === "tv") {
//         user.removeProductFromCart(tv);
//       } else {
//         user.removeProductFromCart(
//           manufacturer === "lg" ? lgFridge : samsungFridge
//         );
//       }
//       break;
//     case 3:
//       user.printCartToConsole();
//       break;
//     case 4:
//     default:
//       console.log("Good bye!");
//       break outer;
//   }
// }
