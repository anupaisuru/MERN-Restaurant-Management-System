import React from "react";
import Footer from "../../Components/footer/Footer";
import Header from "../../Components/header/Header";
import Sidemenu from "../../Components/sideMenu/Sidemenu";
import Error from '../../Components/error/Error'

function DashboardLayout(props) {

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser || currentUser.role !== 'admin') {
    return <Error message="You are not authorized to access this page" />;
  }

  return (
    <div>
      <Header />
      <div className="row">

          <Sidemenu />

        <div className="col-10">
          {props.component}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default DashboardLayout;
