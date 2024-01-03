import React from "react";
import Footer from "../../Components/footer/Footer";
import Header from "../../Components/header/Header";
import Sidemenu from "../../Components/sideMenu/Sidemenu";

function DashboardLayout(props) {
  return (
    <div>
      <Header />
      <div className="row">
        <Sidemenu />

        <div className="col-10">{props.component}</div>
      </div>
      <Footer />
    </div>
  );
}

export default DashboardLayout;
