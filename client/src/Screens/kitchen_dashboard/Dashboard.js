import React from 'react'
import './Dashboard.css'
import Ksidebar from '../../Components/kittchen_sidebar/Ksidebar'
import Ktopbanner from '../../Components/kitchen_top_Banner/Ktopbanner'
import KcartBanner from '../../Components/kitchen_cart_Banner/KcartBanner'
import Header from '../../Components/header/Header'
import Footer from '../../Components/footer/Footer';

import  { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {


    const [pCount, setData1] = useState("");
  const [cCount, setData2] = useState("");

  useEffect(() => {
    axios.get("/api/kitchen/pending/count").then((response) => {
      setData1(response.data);
    });

    axios.get("/api/kitchen/complete/count").then((response) => {
      setData2(response.data);
    });
  }, []);

    return (
        <div className='row vh-100  main kitchen '>
            <div className="row r1">
                <Header />
            </div>
            <div className="row r2">
                <div className="col-2">
                    <Ksidebar />
                </div>
                <div className="col-10   p-4 context">
                    <div className="row p-4">
                        <Ktopbanner />
                    </div>
                    <div className="row ">
                        <div className="col-6 p-4">
                            <KcartBanner count={pCount} name="Pending Order" />
                        </div>
                        <div className="col-6 p-4">
                            <KcartBanner count={cCount} name="Complete Order" />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Dashboard