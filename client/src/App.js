import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./Components/login/Login";
import BillInfo from "./Components/billinfo/BillInfo";
import Landpage from "./Screens/Landpage/Landpage";
import Notfound from "./Screens/notfound/Notfound";
import Register from "./Screens/register/Register";
import ADContent from "./Screens/AdmindashboardContent/Dashboard/ADContent";
import Subadmin from "./Screens/subAdmin/Subadmin";
import Customer from "./Screens/customer/Customer";
import Menu from "./Components/menu/Menu";
import ProductDashboardPage from "./Screens/AdmindashboardContent/Product/ProductDashboardPage";
import ProductDashboardPage2 from "./Screens/AdmindashboardContent/Product/ProductDashboardPage2";
import DashboardLayout from "./Screens/AdmindashboardContent/DashboardLayout";
import ProductDashboardPage3 from "./Screens/AdmindashboardContent/Product/ProductDashboardPage3";
import Customerprofile from "./Screens/customerProfile/Customerprofile";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landpage />} />
        <Route path="/bill" element={<BillInfo />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Profile" element={<Customerprofile />} />
        <Route
          path="/subadmin"
          element={<DashboardLayout component={<Subadmin />} />}
        />
        <Route
          path="/customer"
          element={<DashboardLayout component={<Customer />} />}
        />
        <Route
          path="/dashboard"
          element={<DashboardLayout component={<ADContent />} />}
        />

        <Route
          path="/products"
          element={<DashboardLayout component={<ProductDashboardPage />} />}
        />
        <Route
          path="/products/add"
          element={<DashboardLayout component={<ProductDashboardPage2 />} />}
        />
        <Route
          path="/products/update/:id"
          element={<DashboardLayout component={<ProductDashboardPage3 />} />}
        />
        <Route path="/menu" element={<Menu />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </div>
  );
}

export default App;
