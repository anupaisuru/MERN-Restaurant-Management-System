import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import Pizza from "./Pizza";
import axios from "axios";
import Error from "../../Components/error/Error";

function Menu() {
  const [pizzas, setPizzas] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products").then((result) => {
      setPizzas(result.data);
    });
  }, []);

  const fetchPizzas = () => {
    axios.get("http://localhost:5000/api/products").then((result) => {
      setPizzas(result.data);
    });
  };

  useEffect(() => {
    fetchPizzas();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query === "") {
      setSuggestions([]);
    } else {
      const filteredPizzas = pizzas.filter((pizza) =>
        pizza.name.toLowerCase().includes(query.toLowerCase())
      );
      if (filteredPizzas.length > 0) {
        setSuggestions(filteredPizzas);
      } else {
        setSuggestions([]);
      }
    }
  };

  const handleSuggestionClick = (name) => {
    setSearchQuery(name);
    setSuggestions([]);
  };

  return (
    <div className="Menu">
      <Header />
      <div className="menu-content" style={{ minHeight: "70vh" }}>
        <div>
          <div className="row">
            <div className="col-md-12 p-3 position-relative">
              <input
                type="text"
                placeholder="Search for pizzas..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                style={{ width: "30%" }}
              />
              {suggestions.length > 0 && (
                <ul className="hmenu-suggestions">
                  {suggestions.map((pizza, i) => (
                    <li
                      key={i}
                      onMouseDown={() => handleSuggestionClick(pizza.name)}
                      className="hmenu-suggestion"
                    >
                      {pizza.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {pizzas
              .filter((pizza) =>
                pizza.name.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((pizza, i) => (
                <div key={i} className="col-md-4 p-3">
                  <div>
                    <Pizza pizza={pizza} />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Menu;