import "./OrderLayout.css";
import Header from "../../Components/header/Header";
import OrderSideBar from "../Admin_Order_SideBar/OrderSideBar";

function OrderLayout({ children }) {
    let title;
    return (
        <div className="order-layout-caontainer">
            <Header />
            <div className="inner-layout">
                <OrderSideBar />
                {children}
            </div>
        </div>
    );
}

export default OrderLayout;
