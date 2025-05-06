// Import burger images
import vegBurger from "../assets/veg_burger.jpg";
import chickenBurger from "../assets/chicken_burger.jpg";
import cheeseBurger from "../assets/cheese_burger.jpg";
import zinger from "../assets/zinger.jpg";
import doublePattyBurger from "../assets/double_patty_burger.jpg";
import chickenCheeseBurger from "../assets/chicken_cheese_burger.jpg";

// Import Pizza images
import margheritaPizza from "../assets/margherita_pizza.jpg";
import pepperoniPizza from "../assets/pepperoni_pizza.jpg";
import veggiePizza from "../assets/veggi.jpg";
import chickenTikkaPizza from "../assets/Crown.jpg";
import bbqChickenPizza from "../assets/Special.jpg";
import cheesePizza from "../assets/chezy.jpg";

// Import Pasta images
import Alfredo from "../assets/Alfredo.jpg";
import Arrabbiata from "../assets/Arrabbiata.jpg";
import Bolognese from "../assets/Bolognese.jpg";
import Pesto from "../assets/Pesto.jpg";
import Marinara from "../assets/Marinara.jpg";
import Carbonara from "../assets/Carbonara.jpg";

// Import Nuggets & Hot Wings images
import Classic from "../assets/Classic Chicken Nuggets.jpg";
import Spicy from "../assets/Spicy Peri-Peri Nuggets.jpg";
import Cheese from "../assets/Cheese Stuffed Nuggets.jpg";
import Garlic from "../assets/Garlic Parmesan Hot Wings.jpg";
import Buffalo from "../assets/Buffalo Hot Wings.jpg";
import Honey from "../assets/Honey BBQ Hot Wings.jpg";

// Import Fries Wrap & Sandwich images
import Chicken from "../assets/Chicken Wrap.jpg";
import Veggie from "../assets/Veggie Wrap.jpg";
import ClubS from "../assets/Club Sandwich.jpg";
import GrilledS from "../assets/Grilled Cheese Sandwich.jpg";
import French from "../assets/French Fries.jpg";
import Potato from "../assets/Potato Wedges.jpg";

// Import Drinks & Shakes images
import Red from "../assets/Red Bull.webp";
import Monster from "../assets/Monster Energy.jpg";
import Rockstar from "../assets/Rockstar.jpg";
import Vanilla from "../assets/Vanilla Shake.jpg";
import Strawberry from "../assets/Strawberry Shake.jpg";
import Chocolate from "../assets/Chocolate Shake.jpg";

// Import Coffee images
import Espresso from "../assets/Espresso.jpg";
import Cappuccino from "../assets/Cappuccino.jpg";
import Latte from "../assets/Latte.jpg";
import Americano from "../assets/Americano.jpg";
import Mocha from "../assets/Mocha.jpg";
import Macchiato from "../assets/Macchiato.jpg";

const foodData = {
  // Burger data with images, names, and prices
  burgers: [
    { name: "Veg Burger", price: "$10", image: vegBurger },
    { name: "Chicken Burger", price: "$12", image: chickenBurger },
    { name: "Cheese Burger", price: "$11", image: cheeseBurger },
    { name: "Zinger Burger", price: "$8", image: zinger },
    { name: "Double Patty Burger", price: "$14", image: doublePattyBurger },
    { name: "Chicken Cheese Burger", price: "$13", image: chickenCheeseBurger },
  ],

  // Pizzas data with images, names, and prices
  pizzas: [
    { name: "Margherita Pizza", price: "$12", image: margheritaPizza },
    { name: "Pepperoni Pizza", price: "$14", image: pepperoniPizza },
    { name: "Veggie Pizza", price: "$10", image: veggiePizza },
    { name: "Chicken Tikka Pizza", price: "$15", image: chickenTikkaPizza },
    { name: "BBQ Chicken Pizza", price: "$16", image: bbqChickenPizza },
    { name: "Cheese Pizza", price: "$11", image: cheesePizza },
  ],

  // Pastas data with images, names, and prices
  Pastas: [
    { name: "Alfredo", price: "$12", image: Alfredo },
    { name: "Arrabbiata", price: "$14", image: Arrabbiata },
    { name: "Bolognese", price: "$10", image: Bolognese },
    { name: "Pesto", price: "$15", image: Pesto },
    { name: "Marinara", price: "$16", image: Marinara },
    { name: "Carbonara", price: "$11", image: Carbonara },
  ],

  // Nuggets & Hot Wings data with images, names, and prices
  Nuggets: [
    { name: "Classic Chicken Nuggets", price: "$12", image: Classic },
    { name: "Spicy Peri-Peri Nuggets", price: "$14", image: Spicy },
    { name: "Cheese Stuffed Nuggets", price: "$10", image: Cheese },
    { name: "Buffalo Hot Wings", price: "$15", image: Buffalo },
    { name: "Honey BBQ Hot Wings", price: "$16", image: Honey },
    { name: "Garlic Parmesan Hot Wings", price: "$11", image: Garlic },
  ],

  // Wraps Sandwich & Fries data with images, names, and prices
  Wraps: [
    { name: "Chicken Wrap", price: "$12", image: Chicken },
    { name: "Veggie Wrap", price: "$14", image: Veggie },
    { name: "Club Sandwich", price: "$10", image: ClubS },
    { name: "Grilled Cheese Sandwich", price: "$15", image: GrilledS },
    { name: "French Fries", price: "$16", image: French },
    { name: "Potato Wedges", price: "$11", image: Potato },
  ],

  // Drinks & Shakes data with images, names, and prices
  drinks: [
    { name: "Red Bull", price: "$12", image: Red },
    { name: "Monster Energy", price: "$14", image: Monster },
    { name: "Rockstar Energy", price: "$10", image: Rockstar },
    { name: "Vanilla Shake", price: "$15", image: Vanilla },
    { name: "Strawberry Shake", price: "$16", image: Strawberry },
    { name: "Chocolate Shake", price: "$11", image: Chocolate },
  ],

  // Coffee data with images, names, and prices
  coffee: [
    { name: "Espresso", price: "$4.99", image: Espresso },
    { name: "Cappuccino", price: "$4.99", image: Cappuccino },
    { name: "Latte", price: "$3.99", image: Latte },
    { name: "Americano", price: "$3.99", image: Americano },
    { name: "Mocha", price: "$3.49", image: Mocha },
    { name: "Macchiato", price: "$3.49", image: Macchiato },
  ],
};

export default foodData;