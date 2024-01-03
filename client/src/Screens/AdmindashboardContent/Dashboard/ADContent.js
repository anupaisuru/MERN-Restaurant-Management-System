import React, { useState, useEffect } from "react";
import "./ADContent.css";
import Loader from "../../../Components/loader/Loader";
import Error from "../../../Components/error/Error";
import Pchart from "../../../Components/pchart/Pchart";

function ADContent() {
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();

  const [customerCount, setCustomerCount] = useState(0);
  const [salesCount, setSalesCount] = useState(0);
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    async function fetchCustomerCount() {
      try {
        setloading(true);
        const response = await fetch("/api/users/count");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCustomerCount(data.count);
        setloading(false);
      } catch (error) {
        console.error("Error fetching customer count: ", error);
        setloading(false);
        seterror(error);
      }
    }

    fetchCustomerCount();
  }, []);

  useEffect(() => {
    async function fetchSalesCount() {
      try {
        setloading(true);
        const response = await fetch("/api/kitchen/complete/count");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setSalesCount(data);
        setloading(false);
      } catch (error) {
        console.error("Error fetching sales count: ", error);
        setloading(false);
        seterror(error);
      }
    }

    fetchSalesCount();
  }, []);

  useEffect(() => {
    async function fetchProductCount() {
      try {
        setloading(true);
        const response = await fetch("/api/products/allcount");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProductCount(data);
        setloading(false);
      } catch (error) {
        console.error("Error fetching product count: ", error);
        setloading(false);
        seterror(error);
      }
    }

    fetchProductCount();
  }, []);

  useEffect(() => {
    setInterval(() => {
      window.location.reload();
    }, 600000);
  }, []);

  return (
    <div className="adc">
      {loading ? (
        <Loader />
      ) : error ? (
        <Error message={error.message} />
      ) : (
        <>
          <div>
            {/* first line */}
            <div className="first-line">
              <div className="total-customers">
                <img
                  src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQbFiT_kR49spEFCHegoJoAsDhYQTtymn0nxJ5dif9-p6OKhnms"
                  alt="tcustomers"
                  style={{ height: "80px", width: "80px" }}
                />
                <p>Total Customers</p>
                <p className="cus-count">{customerCount}</p>
              </div>
              <div className="total-foods">
                <img
                  src="https://img.freepik.com/premium-vector/fast-food-illustration_169137-969.jpg"
                  alt="tcustomers"
                  style={{ height: "80px", width: "80px" }}
                />
                <p>Total Foods</p>
                <p className="sales-count">{productCount}</p>
              </div>
            </div>
            {/* second line */}
            <div className="second-line">
              <div className="monthly-earning">
                <img
                  src="https://img.freepik.com/free-vector/passive-earning-personal-bank-account-forex-exchange-crowdfunding-fund-raising-investment-transfer-receiving-income-online-payback-with-internet-vector-isolated-concept-metaphor-illustration_335657-4320.jpg"
                  alt="tcustomers"
                  style={{ height: "80px", width: "80px" }}
                />
                <p>Total Earning</p>
                <p className="me-count">Rs.0</p>
              </div>
              <div className="today-sales">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfnOQG72xmbP2QgrLnV5Z3n8wSE_bmOq1dpQiHpiHVILb37-v7Uvbd6A2PGP3Fi2xZvhU&usqp=CAU"
                  alt="tcustomers"
                  style={{ height: "80px", width: "80px" }}
                />
                <p>Today Sales</p>
                <p className="sales-count">{salesCount}</p>
              </div>
            </div>
          </div>
          <div className="pchrrt">
            <Pchart />
          </div>
        </>
      )}
    </div>
  );
}

export default ADContent;
