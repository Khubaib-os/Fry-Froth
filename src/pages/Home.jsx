import React, { useState, useRef, useEffect } from "react";
import "../styles/home.css";
import pic1 from "../assets/pic1.png";
import { FaSearch } from "react-icons/fa";
import foodData from "./foodData"; // Import foodData

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