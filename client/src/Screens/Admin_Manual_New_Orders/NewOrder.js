import "./NewOrder.css";
import OrderSideBar from "../../Components/Admin_Order_SideBar/OrderSideBar";
import Header from "../../Components/header/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

function NewOrder() {
    //Add order
    const [customername, setCustomerName] = useState("");
    const [orderType, setOrderType] = useState("Manual");
    const [telephone, setTelephone] = useState("");
    const [orderStatus, setOrderStatus] = useState(1);
    const [foodName, setFoodName] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [unitPrice, setUnitPrice] = useState(0);
    const [price, setPrice] = useState(0);
    const [customerid, setCustomerId] = useState("-");

    //Validations
    const [formErrors, setFormErrors] = useState({});
    function validateForm() {
        let errors = {};
        let isValid = true;

        if (!customername.trim()) {
            isValid = false;
            errors["customer"] = "*Customer Name is required";
        }

        if (!orderType.trim()) {
            isValid = false;
            errors["type"] = "*Order Type is required";
        }

        if (!telephone.trim()) {
            isValid = false;
            errors["telephone"] = "*Phone Number is required";
        } else if (!/^\d{10}$/.test(telephone)) {
            isValid = false;
            errors["telephone"] = "*Invalid phone number";
        }

        if (!orderStatus) {
            isValid = false;
            errors["status"] = "*Order Status is required";
        }

        if (!foodName.trim()) {
            isValid = false;
            errors["food"] = "*Food Name is required";
        }

        if (!quantity) {
            isValid = false;
            errors["qty"] = "*Qty";
        }

        if (!unitPrice) {
            isValid = false;
            errors["uni"] = "*Price";
        }

        setFormErrors(errors);

        return isValid;
    }

    //Add Data
    const handleAdd = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

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
            .post("http://localhost:5000/api/order/insert", newOrder)
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Order Added",
                });
                setTimeout(() => {
                    window.location.replace("/order/orders");
                }, 1000);
            })
            .catch((err) => {
                alert(err);
            });
    };

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
            <Toaster />
            <Header />
            <div className="new-order-container">
                <div className="left-container">
                    <OrderSideBar />
                </div>

                <div className="right-container">
                    <div className="left">
                        <h3 className="left-header">New Order</h3>

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
                                            style={{ width: "300px" }}
                                            onChange={(e) => {
                                                setCustomerName(e.target.value);
                                            }}
                                            required
                                        />
                                        {formErrors["customer"] && (
                                            <span className="err">
                                                {formErrors["customer"]}
                                            </span>
                                        )}
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
                                            style={{ width: "300px" }}
                                            value={orderType}
                                            onChange={(e) => {
                                                setOrderType(e.target.value);
                                            }}
                                            required
                                        />

                                        {formErrors["type"] && (
                                            <span className="err">
                                                {formErrors["type"]}
                                            </span>
                                        )}
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
                                            style={{ width: "300px" }}
                                            onChange={(e) => {
                                                setTelephone(e.target.value);
                                            }}
                                            required
                                        />
                                        {formErrors["telephone"] && (
                                            <span className="err">
                                                {formErrors["telephone"]}
                                            </span>
                                        )}
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
                                            style={{ width: "300px" }}
                                            value={orderStatus}
                                            onChange={(e) => {
                                                setOrderStatus(e.target.value);
                                            }}
                                            required
                                        />
                                        {formErrors["status"] && (
                                            <span className="err">
                                                {formErrors["status"]}
                                            </span>
                                        )}
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
                                    style={{
                                        height: "auto",
                                    }}
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
                                        <div>
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
                                                required
                                            />
                                            {formErrors["food"] && (
                                                <span className="err">
                                                    {formErrors["food"]}
                                                </span>
                                            )}
                                        </div>

                                        <div>
                                            <input
                                                type="text"
                                                class="form-control"
                                                style={{
                                                    width: "50px",
                                                    height: "35px",
                                                }}
                                                value={quantity}
                                                onChange={(e) => {
                                                    setQuantity(e.target.value);
                                                }}
                                                required
                                            />
                                            {formErrors["qty"] && (
                                                <span className="err">
                                                    {formErrors["qty"]}
                                                </span>
                                            )}
                                        </div>

                                        <div>
                                            <input
                                                type="text"
                                                class="form-control"
                                                style={{
                                                    width: "100px",
                                                    height: "35px",
                                                }}
                                                onChange={(e) => {
                                                    setUnitPrice(
                                                        e.target.value
                                                    );
                                                }}
                                                required
                                            />
                                            {formErrors["uni"] && (
                                                <span className="err">
                                                    {formErrors["uni"]}
                                                </span>
                                            )}
                                        </div>
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
                            <button
                                type="button"
                                class="btn btn-outline-success"
                                onClick={handleAdd}
                                style={{ marginTop: "25px" }}
                            >
                                Add Order
                            </button>
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

export default NewOrder;
