import "./UpdateOrder.css";
import OrderSideBar from "../../Components/Admin_Order_SideBar/OrderSideBar";
import Header from "../../Components/header/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";

function UpdateOrder() {
    //Update
    const [customername, setCustomerName] = useState("");
    const [orderType, setOrderType] = useState("");
    const [telephone, setTelephone] = useState("");
    const [orderStatus, setOrderStatus] = useState(1);
    const [foodName, setFoodName] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [unitPrice, setUnitPrice] = useState(0);
    const [price, setPrice] = useState(0);
    const [customerid, setCustomerId] = useState("-");

    const handleUpdate = (e) => {
        e.preventDefault();

        const newOrder = {
            customername,
            orderType,
            telephone,
            orderStatus,
            foodName,
            quantity,
            unitPrice,
            price,
            customerid,
        };

        console.log(newOrder);
        axios
            .put(`http://localhost:5000/api/order/update/${id}`, newOrder)
            .then(() => {
                console.log("Success!");
            })
            .catch((err) => {
                alert(err);
            });

        Swal.fire({
            icon: "success",
            title: "Order Updated",
        });

        setTimeout(() => {
            window.location.replace("/order/orders");
        }, 1000);
    };

    //Fetch Order By Id
    const { id } = useParams();
    useEffect(() => {
        const fetctOrders = async () => {
            const result = await axios.get(
                `http://localhost:5000/api/order/get/one/${id}`
            );

            setCustomerName(result.data.customername);
            setOrderType(result.data.orderType);
            setTelephone(result.data.telephone);
            setOrderStatus(result.data.orderStatus);
            setFoodName(result.data.foodName);
            setQuantity(result.data.quantity);
            setUnitPrice(result.data.unitPrice);
            setPrice(result.data.price);
        };

        fetctOrders();
    }, []);

    //Display Products
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
            const result = await axios.get(
                "http://localhost:5000/api/products/"
            );
            setProducts(result.data);
        };

        fetchProducts();
        console.log(products);
    }, []);

    //Calculate Total
    useEffect(() => {
        const calTotal = quantity * unitPrice;
        setPrice(calTotal);
    }, [quantity, unitPrice]);

    return (
        <div style={{ maxHeight: "100%" }}>
            <Header />
            <div className="new-order-container">
                <div className="left-container">
                    <OrderSideBar />
                </div>

                <div className="right-container">
                    <div className="left">
                        <h3
                            className="left-header"
                            style={{ marginLeft: "50px" }}
                        >
                            Update Order
                        </h3>

                        <div className="input-item">
                            <div className="input-field">
                                <form>
                                    <div className="customer-name">
                                        <label
                                            className="form-label"
                                            style={{ fontWeight: "600" }}
                                        >
                                            Customer Name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            required="true"
                                            style={{ width: "300px" }}
                                            onChange={(e) => {
                                                setCustomerName(e.target.value);
                                            }}
                                            value={customername}
                                        />
                                    </div>

                                    <div className="order-type">
                                        <label
                                            className="form-label"
                                            style={{ fontWeight: "600" }}
                                        >
                                            Order Type
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            required="true"
                                            style={{ width: "300px" }}
                                            onChange={(e) => {
                                                setOrderType(e.target.value);
                                            }}
                                            value={orderType}
                                        />
                                    </div>

                                    <div className="mobile">
                                        <label
                                            className="form-label"
                                            style={{ fontWeight: "600" }}
                                        >
                                            Mobile Number
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            required="true"
                                            style={{ width: "300px" }}
                                            onChange={(e) => {
                                                setTelephone(e.target.value);
                                            }}
                                            value={telephone}
                                        />
                                    </div>

                                    <div className="order-status">
                                        <label
                                            className="form-label"
                                            style={{ fontWeight: "600" }}
                                        >
                                            Order Status
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            required="true"
                                            style={{ width: "300px" }}
                                            onChange={(e) => {
                                                setOrderStatus(e.target.value);
                                            }}
                                            value={orderStatus}
                                        />
                                    </div>
                                </form>
                            </div>
                            <div
                                className="add-item-box"
                                style={{
                                    fontWeight: "600",
                                }}
                            >
                                <span
                                    style={{
                                        position: "relative",
                                        top: "10px",
                                    }}
                                >
                                    Items
                                </span>
                                <div
                                    className="itembox-container"
                                    style={{ height: "auto" }}
                                >
                                    <div
                                        className="topics"
                                        style={{ fontWeight: "600" }}
                                    >
                                        <span>Food Name</span>
                                        <span
                                            style={{
                                                position: "relative",
                                                left: "407px",
                                                borderLeft: "1px solid #5E5BFF",
                                                borderRight:
                                                    "1px solid #5E5BFF",
                                                padding: "0 10px",
                                            }}
                                        >
                                            Qty
                                        </span>
                                        <span
                                            style={{
                                                position: "relative",
                                                left: "430px",
                                            }}
                                        >
                                            Unit Price
                                        </span>
                                    </div>
                                    <div
                                        class="input-group"
                                        style={{ marginTop: "8px" }}
                                    >
                                        <input
                                            type="text"
                                            class="form-control"
                                            style={{
                                                width: "500px",
                                                height: "35px",
                                            }}
                                            onChange={(e) => {
                                                setFoodName(e.target.value);
                                            }}
                                            value={foodName}
                                        />

                                        <input
                                            type="text"
                                            class="form-control"
                                            style={{
                                                width: "50px",
                                                height: "35px",
                                            }}
                                            onChange={(e) => {
                                                setQuantity(e.target.value);
                                            }}
                                            value={quantity}
                                        />
                                        <input
                                            type="text"
                                            class="form-control"
                                            style={{
                                                width: "100px",
                                                height: "35px",
                                            }}
                                            onChange={(e) => {
                                                setUnitPrice(e.target.value);
                                            }}
                                            value={unitPrice}
                                        />
                                    </div>

                                    <div>
                                        <span className="total">
                                            Total : LKR {price}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="btn-add-order">
                            <Link to="/order/orders">
                                <button
                                    type="button"
                                    class="btn btn-outline-warning"
                                    onClick={handleUpdate}
                                    style={{ marginTop: "25px" }}
                                >
                                    Update
                                </button>
                            </Link>
                        </div>
                    </div>

                    <div className="right">
                        <h4>Menu</h4>
                        {products.map((product) => (
                            <div key={product.id} className="read-value">
                                <span>
                                    {product.name}[{product.varients[0]}] [
                                    {product.prices[product.varients[0]]}]
                                </span>
                                <br />

                                <span>
                                    {product.name}[{product.varients[1]}] [
                                    {product.prices[product.varients[1]]}]
                                </span>
                                <br />

                                <span>
                                    {product.name}[{product.varients[2]}] [
                                    {product.prices[product.varients[2]]}]
                                </span>
                                <br />
                                <br />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateOrder;
