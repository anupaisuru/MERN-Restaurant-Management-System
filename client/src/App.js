import "./App.css";
import Login from "./Components/login/Login";
import BillInfo from "./Components/billinfo/BillInfo";
import Landpage from "./Screens/Landpage/Landpage";
import Dashboard from "./Screens/kitchen_dashboard/Dashboard";
import Notfound from "./Screens/notfound/Notfound";
import Register from "./Screens/register/Register";
import ADContent from "./Screens/AdmindashboardContent/Dashboard/ADContent";
import Subadmin from "./Screens/subAdmin/Subadmin";
import Customer from "./Screens/customer/Customer";
import Menu from "./Components/menu/Menu";
import { Routes, Route } from "react-router-dom";
import Pending_order from "./Screens/kitchen_pending_order/Pending_order";
import Complete_order from "./Screens/kitchen_complete_order/Complete_order";
import ProductDashboardPage from "./Screens/AdmindashboardContent/Product/ProductDashboardPage";
import ProductDashboardPage2 from "./Screens/AdmindashboardContent/Product/ProductDashboardPage2";
import DashboardLayout from "./Screens/AdmindashboardContent/DashboardLayout";
import ProductDashboardPage3 from "./Screens/AdmindashboardContent/Product/ProductDashboardPage3";
import Customerprofile from "./Screens/customerProfile/Customerprofile";

//Orders Management
import Cart from "./Screens/User_Cart/Cart";
import OrderLayout from "./Components/Admin_Order_Layout/OrderLayout";
import OrderDashBoard from "./Screens/Admin_Order_DashBoard/OrderDashboard";
import Order from "./Screens/Admin_Orders/Order";
import PendingOrder from "./Screens/Admin_Pending_Orders/PendingOrder";
import CompleteOrder from "./Screens/Admin_Complete_Orders/CompletelOrder";
import DeliveringOrder from "./Screens/Admin_Delivering_Orders/DeliveringOrder";
import DeliveredOrder from "./Screens/Admin_Delivered_Orders/DeliveredOrder";
import CancelOrder from "./Screens/Admin_Cancel_Orders/CancelOrder";
import NewOrder from "./Screens/Admin_Manual_New_Orders/NewOrder";
import { Toaster } from "react-hot-toast";
import UpdateOrder from "./Screens/Admin_Update _Orders/UpdateOrder";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landpage />} />
        <Route path="/bill" element={<BillInfo />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/kitchen" element={<Dashboard />} />
        <Route path="/kitchen/pending-order" element={<Pending_order />} />
        <Route path="/kitchen/complete-order" element={<Complete_order />} />
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

        <Route path="/cart" element={<Cart />} />
        <Route
          path="/order/dashboard"
          element={
            <OrderLayout>
              <OrderDashBoard />
            </OrderLayout>
          }
        />
        <Route
          path="/order/orders"
          element={
            <OrderLayout>
              <Order />
            </OrderLayout>
          }
        />
        <Route
          path="/order/pending"
          element={
            <OrderLayout>
              <PendingOrder />
            </OrderLayout>
          }
        />
        <Route
          path="/order/complete"
          element={
            <OrderLayout>
              <CompleteOrder />
            </OrderLayout>
          }
        />
        <Route
          path="/order/delivering"
          element={
            <OrderLayout>
              <DeliveringOrder />
            </OrderLayout>
          }
        />
        <Route
          path="/order/deliver"
          element={
            <OrderLayout>
              <DeliveredOrder />
            </OrderLayout>
          }
        />
        <Route
          path="/order/cancel"
          element={
            <OrderLayout>
              <CancelOrder />
            </OrderLayout>
          }
        />
        <Route path="/order/new" element={<NewOrder />} />

        <Route path="/order/update/:id" element={<UpdateOrder />} />
      </Routes>
    </div>
  );
}

export default App;
