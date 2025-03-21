import React, { useState, useRef, useEffect } from "react";
import "../styles/home.css";
import pic1 from "../assets/pic1.png";
import { FaSearch } from "react-icons/fa";

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
const Home = ({ cart, setCart }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showNotFound, setShowNotFound] = useState(false);
  const [highlightedItem, setHighlightedItem] = useState(null);
  const [itemNotifications, setItemNotifications] = useState({}); 
  const categoryRefs = useRef({});
  const searchInputRef = useRef(null);

  // Auto-focus on search input when the page loads
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  // Hide notification after 3 seconds
  useEffect(() => {
    const timers = Object.keys(itemNotifications).map((itemName) => {
      return setTimeout(() => {
        setItemNotifications((prev) => {
          const updated = { ...prev };
          delete updated[itemName]; 
          return updated;
        });
      }, 3000);
    });

    return () => timers.forEach((timer) => clearTimeout(timer)); 
  }, [itemNotifications]);

  const { burgers, pizzas, Pastas, Nuggets, Wraps, drinks, coffee } = foodData;

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setHighlightedItem(null);

    if (!query.trim()) {
      setSuggestions([]);
      setShowNotFound(false);
      return;
    }

    const results = Object.values(foodData)
      .flat()
      .filter((item) => item.name.toLowerCase().includes(query.toLowerCase()))
      .map((item) => item.name);

    setSuggestions(results);
    setShowNotFound(results.length === 0);
  };

  // Handle search and scroll to section
  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    const results = Object.entries(foodData).reduce(
      (acc, [category, items]) => {
        const matchedItems = items.filter((item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        if (matchedItems.length > 0) {
          acc[category] = matchedItems;
        }
        return acc;
      },
      {}
    );

    if (Object.keys(results).length > 0) {
      const firstCategory = Object.keys(results)[0];
      const firstMatchedItem = results[firstCategory][0];
      setHighlightedItem(firstMatchedItem.name);

      categoryRefs.current[firstCategory]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      setFilteredItems(results[firstCategory]);
      setShowNotFound(false);
    } else {
      setFilteredItems([]);
      setShowNotFound(true);
    }
    setSuggestions([]);
  };

  // Handle Enter key for search
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  // Add item to cart
  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.name === item.name);
    if (existingItem) {
      // If item already exists, increase its quantity
      setCart((prevCart) =>
        prevCart.map((cartItem) =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      // If item is new, add it to the cart with quantity 1
      setCart((prevCart) => [...prevCart, { ...item, quantity: 1 }]);
    }

    // Show notification for this item
    setItemNotifications((prev) => ({
      ...prev,
      [item.name]: `${item.name} added to cart!`,
    }));
  };

  return (
    <div className="myHome">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-left">
          <h1 className="hero-title">Find Your Favorite Food 🍔🍕</h1>
          <p className="hero-subtitle">Search for delicious meals and enjoy!</p>
          <div className="search-box">
            <input
              type="text"
              placeholder="Search here..."
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
              ref={searchInputRef}
            />
            <button onClick={handleSearch} className="search-button">
              <FaSearch />
            </button>
          </div>

          {/* Live Search Suggestions */}
          {suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map((suggestion, index) => (
                <li key={index} onClick={() => setSearchQuery(suggestion)}>
                  {suggestion}
                </li>
              ))}
            </ul>
          )}

          {/* Not Found Message */}
          {showNotFound && (
            <p className="not-found">No results found for "{searchQuery}"</p>
          )}
        </div>
        <div className="hero-right">
          <img src={pic1} alt="Chef Cooking" className="chef-image" />
        </div>
      </section>

      {/* Menu Section */}
      <section className="menu">
        <h1>Fry & Forth Menu - Enjoy Your Favorite Food Here</h1>
      </section>

      {/* Burger Section */}
      <section
        ref={(el) => (categoryRefs.current.burgers = el)}
        className="BurgerBg"
      >
        <div className="menu-category">
          <h2>Burgers</h2>
          <div className="category-items">
            {burgers.map((burger, index) => (
              <div
                key={index}
                className={`menu-item-card ${
                  highlightedItem === burger.name ? "highlighted-item" : ""
                }`}
              >
                <img src={burger.image} alt={burger.name} />
                <h3>{burger.name}</h3>
                <p className="price">{burger.price}</p>
                <button
                  className="add-to-cart"
                  onClick={() => addToCart(burger)}
                >
                  Add to Cart
                </button>
                {/* Notification for this item */}
                {itemNotifications[burger.name] && (
                  <div className="notification">
                    {itemNotifications[burger.name]}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pizza Section */}
      <section
        ref={(el) => (categoryRefs.current.pizzas = el)}
        className="PizzaBg"
      >
        <div className="menu-category">
          <h2>Pizzas</h2>
          <div className="category-items">
            {pizzas.map((pizza, index) => (
              <div
                key={index}
                className={`menu-item-card ${
                  highlightedItem === pizza.name ? "highlighted-item" : ""
                }`}
              >
                <img src={pizza.image} alt={pizza.name} />
                <h3>{pizza.name}</h3>
                <p className="price">{pizza.price}</p>
                <button
                  className="add-to-cart"
                  onClick={() => addToCart(pizza)}
                >
                  Add to Cart
                </button>
                {/* Notification for this item */}
                {itemNotifications[pizza.name] && (
                  <div className="notification">
                    {itemNotifications[pizza.name]}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pastas Section */}
      <section
        ref={(el) => (categoryRefs.current.Pastas = el)}
        className="PastaBg"
      >
        <div className="menu-category">
          <h2>Pastas</h2>
          <div className="category-items">
            {Pastas.map((pasta, index) => (
              <div
                key={index}
                className={`menu-item-card ${
                  highlightedItem === pasta.name ? "highlighted-item" : ""
                }`}
              >
                <img src={pasta.image} alt={pasta.name} />
                <h3>{pasta.name}</h3>
                <p className="price">{pasta.price}</p>
                <button
                  className="add-to-cart"
                  onClick={() => addToCart(pasta)}
                >
                  Add to Cart
                </button>
                {/* Notification for this item */}
                {itemNotifications[pasta.name] && (
                  <div className="notification">
                    {itemNotifications[pasta.name]}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nuggets & Hot Wings Section */}
      <section
        ref={(el) => (categoryRefs.current.Nuggets = el)}
        className="nugetBg"
      >
        <div className="menu-category">
          <h2>Nuggets & Hot Wings</h2>
          <div className="category-items">
            {Nuggets.map((nugget, index) => (
              <div
                key={index}
                className={`menu-item-card ${
                  highlightedItem === nugget.name ? "highlighted-item" : ""
                }`}
              >
                <img src={nugget.image} alt={nugget.name} />
                <h3>{nugget.name}</h3>
                <p className="price">{nugget.price}</p>
                <button
                  className="add-to-cart"
                  onClick={() => addToCart(nugget)}
                >
                  Add to Cart
                </button>
                {/* Notification for this item */}
                {itemNotifications[nugget.name] && (
                  <div className="notification">
                    {itemNotifications[nugget.name]}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wraps, Sandwich & Fries Section */}
      <section
        ref={(el) => (categoryRefs.current.Wraps = el)}
        className="friesBg"
      >
        <div className="menu-category">
          <h2>Wraps, Sandwich & Fries</h2>
          <div className="category-items">
            {Wraps.map((wrap, index) => (
              <div
                key={index}
                className={`menu-item-card ${
                  highlightedItem === wrap.name ? "highlighted-item" : ""
                }`}
              >
                <img src={wrap.image} alt={wrap.name} />
                <h3>{wrap.name}</h3>
                <p className="price">{wrap.price}</p>
                <button className="add-to-cart" onClick={() => addToCart(wrap)}>
                  Add to Cart
                </button>
                {/* Notification for this item */}
                {itemNotifications[wrap.name] && (
                  <div className="notification">
                    {itemNotifications[wrap.name]}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Drinks & Shakes Section */}
      <section
        ref={(el) => (categoryRefs.current.drinks = el)}
        className="drinksBg"
      >
        <div className="menu-category">
          <h2>Drinks & Shakes</h2>
          <div className="category-items">
            {drinks.map((drink, index) => (
              <div
                key={index}
                className={`menu-item-card ${
                  highlightedItem === drink.name ? "highlighted-item" : ""
                }`}
              >
                <img src={drink.image} alt={drink.name} />
                <h3>{drink.name}</h3>
                <p className="price">{drink.price}</p>
                <button
                  className="add-to-cart"
                  onClick={() => addToCart(drink)}
                >
                  Add to Cart
                </button>
                {/* Notification for this item */}
                {itemNotifications[drink.name] && (
                  <div className="notification">
                    {itemNotifications[drink.name]}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coffee Section */}
      <section
        ref={(el) => (categoryRefs.current.coffee = el)}
        className="coffeeBg"
      >
      
        <div className="menu-category">
          <h2>Coffee</h2>
          <div className="category-items">
            {coffee.map((coffeeItem, index) => (
              <div
                key={index}
                className={`menu-item-card ${
                  highlightedItem === coffeeItem.name ? "highlighted-item" : ""
                }`}
              >
                <img src={coffeeItem.image} alt={coffeeItem.name} />
                <h3>{coffeeItem.name}</h3>
                <p className="price">{coffeeItem.price}</p>
                <button
                  className="add-to-cart"
                  onClick={() => addToCart(coffeeItem)}
                >
                  Add to Cart
                </button>
                {/* Notification for this item */}
                {itemNotifications[coffeeItem.name] && (
                  <div className="notification">
                    {itemNotifications[coffeeItem.name]}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
