import "./Cart.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CartImg from "../../assets/images/Cart.png";
import ItemImg from "../../assets/images/Item.jpg";
import { Link } from "react-router-dom";

function Cart() {
    return (
        <div className="cart-container">
            <div className="c-left">
                <h3 className="c-topic">My Orders</h3>
                <div className="cart-item">
                    <img src={ItemImg} className="item-image" alt="" />
                    <span className="name" style={{ marginLeft: "25px" }}>
                        Veg Pizza
                    </span>
                    <span className="price" style={{ marginLeft: "23px" }}>
                        LKR 500 x 1
                    </span>
                    <button className="addBtn">
                        <AddIcon />
                    </button>
                    <button className="removeBtn">
                        <RemoveIcon />
                    </button>
                    <button className="deleteBtn">
                        <DeleteForeverIcon />
                    </button>
                </div>

                <div className="cart-item">
                    <img src={ItemImg} className="item-image" alt="" />
                    <span className="name" style={{ marginLeft: "25px" }}>
                        Veg Pizza
                    </span>
                    <span className="price" style={{ marginLeft: "23px" }}>
                        LKR 500 x 1
                    </span>
                    <button className="addBtn">
                        <AddIcon />
                    </button>
                    <button className="removeBtn">
                        <RemoveIcon />
                    </button>
                    <button className="deleteBtn">
                        <DeleteForeverIcon />
                    </button>
                </div>

                <div className="cart-item">
                    <img src={ItemImg} className="item-image" alt="" />
                    <span className="name" style={{ marginLeft: "25px" }}>
                        Veg Pizza
                    </span>
                    <span className="price" style={{ marginLeft: "23px" }}>
                        LKR 500 x 1
                    </span>
                    <button className="addBtn">
                        <AddIcon />
                    </button>
                    <button className="removeBtn">
                        <RemoveIcon />
                    </button>
                    <button className="deleteBtn">
                        <DeleteForeverIcon />
                    </button>
                </div>

                <div className="cart-item">
                    <img src={ItemImg} className="item-image" alt="" />
                    <span className="name" style={{ marginLeft: "25px" }}>
                        Veg Pizza
                    </span>
                    <span className="price" style={{ marginLeft: "23px" }}>
                        LKR 500 x 1
                    </span>
                    <button className="addBtn">
                        <AddIcon />
                    </button>
                    <button className="removeBtn">
                        <RemoveIcon />
                    </button>
                    <button className="deleteBtn">
                        <DeleteForeverIcon />
                    </button>
                </div>
            </div>

            <div className="c-right">
                <img src={CartImg} alt="cart" className="img" />

                <div className="content">
                    <span>Total : LKR 1050.00</span>
                    <button>
                        <Link to="/bill" className="place-order-btn">
                            Place Order
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Cart;
