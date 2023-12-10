import React from "react";
import Ksidebar from "../../Components/kittchen_sidebar/Ksidebar";
import Footer from "../../Components/footer/Footer";
import Search from "../../Components/search/Search";
import Header from "../../Components/header/Header";
import logo from "../../assets/images/logo.jpg";

import "./Complete_order.css";
import Kcompletebox from "../../Components/kitchen_complete_box/Kcompletebox";

import { useState, useEffect } from "react";
import axios from "axios";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import jsPDF from "jspdf";
import "jspdf-autotable";

function Complete_order() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get("/api/kitchen/complete").then((response) => {
      setData(response.data);
      console.log(response.data);
    });
  }, []);

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [["Name", "Customer"]],
      body: filteredData.map((item) => [item.foodName, item.customername]),
      margin: { top: 70 },
    });

    doc.addImage(logo, "JPEG", 10, 10, 65, 50);

    doc.text("Complete Orders", 85, 65);
    doc.setFontSize(9);
    doc.text("MealMatch Foods", 155, 30);
    doc.text("Colombo 07 127/4", 155, 35);
    doc.text("MealMatch@gmail.com", 155, 40);
    doc.text("0716775718", 155, 45);

    doc.save("pending-orders.pdf");
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data.filter(
    (item) =>
      item.foodName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.customername.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="Complete_order">
      <div>
        <div className="row r1">
          <Header />
        </div>
        <div className="row r2">
          <div className="col-2">
            <Ksidebar />
          </div>

          <div className="col-10 p-4 context ">
            <div className="row">
              <div className="col-6"></div>
              <div className="col-6 pe-4 pl-4 pb-3 pt-o">
                <form className="d-flex">
                  <input
                    className="form-control me-1 p-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  <button className="btn btn-warning" onClick={handleDownload}>
                    PDF
                  </button>
                </form>
              </div>
            </div>

            <table className="table ">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Customer</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <Kcompletebox
                    no={index + 1}
                    key={item._id}
                    id={item._id}
                    count="6"
                    name={item.foodName}
                    createdAt={item.createdAt}
                    customername={item.customername}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="row r3">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Complete_order;
