import { Button } from "@mui/material";
import React from "react";
import "./Landpage.css";
import { Link } from "react-router-dom";
import Header from "../../Components/header/Header";
import Footer from "../../Components/footer/Footer";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
// ..
AOS.init({
  duration: 3000,
});

function Landpage() {
  return (
    <div className="Landpage">
      <Header />
      <div className="land-image">
        <div className="st">
        <h1 data-aos="zoom-in">MealMatch Foods</h1>
          <Link to="/menu" style={{ color: "white" }}>
            
            <h4 data-aos="zoom-out">Get Started</h4>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Landpage;
